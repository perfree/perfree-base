package com.perfree.file.handle.s3;

import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.core.date.DateUtil;
import org.dromara.hutool.core.io.IoUtil;
import org.dromara.hutool.core.io.file.FileNameUtil;
import org.dromara.hutool.core.text.StrUtil;
import org.dromara.hutool.http.HttpUtil;
import org.dromara.hutool.json.JSONUtil;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.FileTypeUtils;
import com.perfree.enums.ErrorCode;
import com.perfree.file.handle.BaseFileHandle;
import com.perfree.system.api.attach.dto.AttachFileDTO;
import com.perfree.system.api.attach.dto.AttachUploadDTO;
import io.minio.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;

/**
 * 代理文件上传服务(案例)
 */
@Service
public class FileS3HandleImpl extends BaseFileHandle {

    private final static Logger LOGGER = LoggerFactory.getLogger(FileS3HandleImpl.class);
    public static final String ENDPOINT_QINIU = "qiniucs.com";
    public static final String ENDPOINT_ALIYUN = "aliyuncs.com";
    public static final String ENDPOINT_TENCENT = "myqcloud.com";

    private MinioClient client;

    private FileS3Config fileS3Config;

    @Override
    public AttachFileDTO upload(AttachUploadDTO attachUploadDTO) {
        init();
        // 执行上传
        try {
            byte[] bytes = attachUploadDTO.getFile().getInputStream().readAllBytes();
            String path = IdUtil.fastSimpleUUID() + "." + FileNameUtil.extName(attachUploadDTO.getFile().getOriginalFilename());
            if (StringUtils.isNotBlank(fileS3Config.getUploadDir())) {
                path = fileS3Config.getUploadDir() + path;
            }
            String mineType = FileTypeUtils.getMineType(bytes, attachUploadDTO.getFile().getOriginalFilename());
            client.putObject(PutObjectArgs.builder()
                    .bucket(fileS3Config.getBucket()) // bucket 必须传递
                    .contentType(mineType)
                    .object(path) // 相对路径作为 key
                    .stream(new ByteArrayInputStream(bytes), bytes.length, -1) // 文件内容
                    .build());
            AttachFileDTO attachFileDTO = new AttachFileDTO();
            attachFileDTO.setMineType(mineType);
            attachFileDTO.setType(FileTypeUtils.getFileTypeByMineType(mineType));
            attachFileDTO.setName(attachUploadDTO.getFile().getOriginalFilename());
            attachFileDTO.setPath(path);
            attachFileDTO.setDesc(attachUploadDTO.getDesc());
            attachFileDTO.setUrl(fileS3Config.getDomain() + "/" + path);
            attachFileDTO.setConfigId(getAttachConfig().getId());
            attachFileDTO.setStorage(getAttachConfig().getStorage());
            attachFileDTO.setAttachGroup(attachUploadDTO.getAttachGroup());
            return attachFileDTO;
        } catch (Exception e) {
            LOGGER.error("file upload error", e);
            throw new ServiceException(ErrorCode.FILE_HANDLE_ERROR);
        }
    }

    /**
     * 初始化
     */
    private void init() {
        fileS3Config = JSONUtil.toBean(getAttachConfig().getConfig(), FileS3Config.class);
        if (StringUtils.isNotBlank(fileS3Config.getUploadDir())) {
            fileS3Config.setUploadDir(fileS3Config.getUploadDir().replaceAll("\\{year}", String.valueOf(DateUtil.thisYear())));
            fileS3Config.setUploadDir(fileS3Config.getUploadDir().replaceAll("\\{month}", String.format("%02d", DateUtil.thisMonth() + 1)));
            fileS3Config.setUploadDir(fileS3Config.getUploadDir().replaceAll("\\{day}", String.format("%02d",DateUtil.thisDayOfMonth())));
            if (!fileS3Config.getUploadDir().endsWith("/")) {
                fileS3Config.setUploadDir(fileS3Config.getUploadDir() + "/");
            }
            if (fileS3Config.getUploadDir().startsWith("/")) {
                fileS3Config.setUploadDir(fileS3Config.getUploadDir().replaceFirst("/", ""));
            }
        }
        // 补全 domain
        if (StrUtil.isEmpty(fileS3Config.getDomain())) {
            fileS3Config.setDomain(buildDomain());
        }
        // 初始化客户端
        client = MinioClient.builder()
                .endpoint(buildEndpointURL()) // Endpoint URL
                .region(buildRegion()) // Region
                .credentials(fileS3Config.getAccessKey(), fileS3Config.getAccessSecret()) // 认证密钥
                .build();
    }

    @Override
    public boolean delete(AttachFileDTO attachFileDTO) {
        init();
        try {
            client.removeObject(RemoveObjectArgs.builder()
                    .bucket(fileS3Config.getBucket()) // bucket 必须传递
                    .object(attachFileDTO.getPath()) // 相对路径作为 key
                    .build());
            return true;
        } catch (Exception e) {
            LOGGER.error("file delete error", e);
            return false;
        }
    }

    @Override
    public byte[] getFileContent(String path) {
        init();
        GetObjectResponse response;
        try {
            response = client.getObject(GetObjectArgs.builder()
                    .bucket(fileS3Config.getBucket()) // bucket 必须传递
                    .object(path) // 相对路径作为 key
                    .build());
        } catch (Exception e) {
            LOGGER.error("file getContent error", e);
            throw new ServiceException(ErrorCode.FILE_GET_CONTENT_ERROR);
        }
        return IoUtil.readBytes(response);
    }

    /**
     * 基于 bucket + endpoint 构建访问的 Domain 地址
     *
     * @return Domain 地址
     */
    private String buildDomain() {
        // 如果已经是 http 或者 https，则不进行拼接.主要适配 MinIO
        if (HttpUtil.isHttp(fileS3Config.getEndpoint()) || HttpUtil.isHttps(fileS3Config.getEndpoint())) {
            return StrUtil.format("{}/{}", fileS3Config.getEndpoint(), fileS3Config.getBucket());
        }
        // 阿里云、腾讯云、华为云都适合。七牛云比较特殊，必须有自定义域名
        return StrUtil.format("https://{}.{}", fileS3Config.getBucket(), fileS3Config.getEndpoint());
    }


    /**
     * 基于 endpoint 构建调用云服务的 URL 地址
     *
     * @return URI 地址
     */
    private String buildEndpointURL() {
        // 如果已经是 http 或者 https，则不进行拼接.主要适配 MinIO
        if (HttpUtil.isHttp(fileS3Config.getEndpoint()) || HttpUtil.isHttps(fileS3Config.getEndpoint())) {
            return fileS3Config.getEndpoint();
        }
        return StrUtil.format("https://{}", fileS3Config.getEndpoint());
    }

    /**
     * 基于 bucket 构建 region 地区
     *
     * @return region 地区
     */
    private String buildRegion() {
        // 阿里云必须有 region，否则会报错
        if (fileS3Config.getEndpoint().contains(ENDPOINT_ALIYUN)) {
            return StrUtil.subBefore(fileS3Config.getEndpoint(), '.', false)
                    .replaceAll("-internal", "")// 去除内网 Endpoint 的后缀
                    .replaceAll("https://", "");
        }
        // 腾讯云必须有 region，否则会报错
        if (fileS3Config.getEndpoint().contains(ENDPOINT_TENCENT)) {
            return StrUtil.subAfter(fileS3Config.getEndpoint(), ".cos.", false)
                    .replaceAll("." + ENDPOINT_TENCENT, ""); // 去除 Endpoint
        }
        return null;
    }
}
