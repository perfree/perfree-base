package com.perfree.service.attach;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileNameUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.CustomMultipartFile;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.attach.vo.AttachPageReqVO;
import com.perfree.controller.auth.attach.vo.AttachUpdateVO;
import com.perfree.controller.auth.attach.vo.AttachUploadVO;
import com.perfree.convert.attach.AttachConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.file.FileHandleService;
import com.perfree.file.handle.BaseFileHandle;
import com.perfree.mapper.AttachMapper;
import com.perfree.model.Attach;
import com.perfree.system.api.attach.dto.AttachFileDTO;
import com.perfree.system.api.attach.dto.AttachUploadDTO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class AttachServiceImpl extends ServiceImpl<AttachMapper, Attach> implements AttachService {

    private final static Logger LOGGER = LoggerFactory.getLogger(AttachServiceImpl.class);

    @Resource
    private AttachMapper attachMapper;

    @Resource
    private FileHandleService fileHandleService;


    @Override
    public PageResult<Attach> attachPage(AttachPageReqVO pageVO) {
        return attachMapper.selectPage(pageVO);
    }

    @Override
    @Transactional
    public Attach create(AttachUploadVO attachUploadVO) {
        try{
            BaseFileHandle fileHandle = fileHandleService.getFileHandle(attachUploadVO.getAttachConfigId());
            AttachFileDTO upload = fileHandle.upload(AttachConvert.INSTANCE.convertAttachUploadDTO(attachUploadVO));
            Attach attach = AttachConvert.INSTANCE.convertAttachFileDTO(upload);
            if (null == attach) {
                LOGGER.error("file upload error, Attach is empty");
                throw new ServiceException(ErrorCode.FILE_HANDLE_ERROR);
            }
            attachMapper.insert(attach);
            return attach;
        }catch (Exception e) {
            LOGGER.error("file upload error", e);
            throw new ServiceException(ErrorCode.FILE_HANDLE_ERROR);
        }

    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        Attach attach = attachMapper.selectById(id);
        BaseFileHandle fileHandle = fileHandleService.getFileHandle(attach.getConfigId());
        boolean result = fileHandle.delete(AttachConvert.INSTANCE.convertToAttachFileDTO(attach));
        if (!result) {
            return false;
        }
        attachMapper.deleteById(id);
        return true;
    }

    @Override
    public byte[] getFileContent(Integer configId, String path) {
        return fileHandleService.getFileContent(configId, path);
    }

    @Override
    public List<Attach> getAllAttachGroup() {
        return attachMapper.getAllAttachGroup();
    }

    @Override
    @Transactional
    public Boolean updateAttach(AttachUpdateVO attachUpdateVO) {
        Attach attach = AttachConvert.INSTANCE.convertByUpdateVO(attachUpdateVO);
        attachMapper.updateById(attach);
        return true;
    }

    @Override
    public Attach uploadAttachByUrl(String url) {
        try{
            String fileName = URLUtil.getPath(url);
            fileName = IdUtil.fastSimpleUUID() + "." + FileNameUtil.extName(FileUtil.getName(fileName));
            File tmpSaveFile = FileUtil.file(SystemConstants.UPLOAD_TEMP_PATH + File.separator + fileName);
            HttpUtil.downloadFile(url, tmpSaveFile.getAbsoluteFile());
            // 自动检测文件 MIME 类型
            String contentType = Files.probeContentType(Paths.get(tmpSaveFile.getAbsolutePath()));
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // 创建 CustomMultipartFile
            MultipartFile multipartFile = new CustomMultipartFile(tmpSaveFile.getAbsoluteFile(), contentType);
            BaseFileHandle fileHandle = fileHandleService.getFileHandle(null);
            AttachUploadDTO attachUploadDTO = new AttachUploadDTO();
            attachUploadDTO.setFile(multipartFile);
            AttachFileDTO upload = fileHandle.upload(attachUploadDTO);
            Attach attach = AttachConvert.INSTANCE.convertAttachFileDTO(upload);
            if (null == attach) {
                LOGGER.error("file upload error, Attach is empty");
                throw new ServiceException(ErrorCode.FILE_HANDLE_ERROR);
            }
            attachMapper.insert(attach);
            FileUtil.del(tmpSaveFile.getAbsoluteFile());
            return attach;
        }catch (Exception e) {
            LOGGER.error("file upload error", e);
            throw new ServiceException(ErrorCode.FILE_HANDLE_ERROR);
        }
    }
}
