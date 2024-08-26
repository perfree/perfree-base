package com.perfree.file.handle.local;

import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.core.date.DateUtil;
import org.dromara.hutool.core.io.file.FileNameUtil;
import org.dromara.hutool.core.io.file.FileUtil;
import org.dromara.hutool.json.JSONUtil;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.FileTypeUtils;
import com.perfree.file.handle.BaseFileHandle;
import com.perfree.system.api.attach.dto.AttachFileDTO;
import com.perfree.system.api.attach.dto.AttachUploadDTO;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Date;

/**
 * 上传文件到本地的处理逻辑
 */
@Service
public class FileLocalHandleImpl extends BaseFileHandle {

    private final String DEFAULT_ATTACH_URL_PREFIX = "/attach/";


    @Override
    public AttachFileDTO upload(AttachUploadDTO attachUploadDTO) throws IOException {
        FileLocalConfig fileLocalConfig = JSONUtil.toBean(getAttachConfig().getConfig(), FileLocalConfig.class);
        // 统一使用/
        fileLocalConfig.setBasePath(fileLocalConfig.getBasePath().replaceAll("\\\\", SystemConstants.FILE_SEPARATOR));
        if (!fileLocalConfig.getBasePath().endsWith(SystemConstants.FILE_SEPARATOR)) {
            fileLocalConfig.setBasePath(fileLocalConfig.getBasePath() + SystemConstants.FILE_SEPARATOR);
        }

        String datePath = DateUtil.format(new Date(), "yyyy-MM-dd") + SystemConstants.FILE_SEPARATOR;
        fileLocalConfig.setBasePath(fileLocalConfig.getBasePath() + datePath);
        File baseDir = new File(fileLocalConfig.getBasePath());
        if (!FileUtil.exists(baseDir.getAbsoluteFile())) {
            FileUtil.mkdir(baseDir.getAbsoluteFile());
        }

        String fileName = IdUtil.fastSimpleUUID() + "." + FileNameUtil.extName(attachUploadDTO.getFile().getOriginalFilename());
        String mineType = FileTypeUtils.getMineType(attachUploadDTO.getFile().getBytes(), attachUploadDTO.getFile().getOriginalFilename());
        AttachFileDTO attachFileDTO = new AttachFileDTO();
        String originalFilename = attachUploadDTO.getFile().getOriginalFilename();
        attachFileDTO.setMineType(mineType);
        attachFileDTO.setType(FileTypeUtils.getFileTypeByMineType(mineType));
        attachUploadDTO.getFile().transferTo(new File(baseDir.getAbsolutePath() + SystemConstants.FILE_SEPARATOR + fileName));
        attachFileDTO.setName(originalFilename);
        attachFileDTO.setPath( datePath  + fileName);
        attachFileDTO.setDesc(attachUploadDTO.getDesc());
        attachFileDTO.setUrl(DEFAULT_ATTACH_URL_PREFIX + datePath  + fileName);
        attachFileDTO.setConfigId(getAttachConfig().getId());
        attachFileDTO.setStorage(getAttachConfig().getStorage());
        attachFileDTO.setAttachGroup(attachUploadDTO.getAttachGroup());
        return attachFileDTO;
    }

    @Override
    public boolean delete(AttachFileDTO attachFileDTO) {
        FileLocalConfig fileLocalConfig = JSONUtil.toBean(getAttachConfig().getConfig(), FileLocalConfig.class);
        // 统一使用/
        fileLocalConfig.setBasePath(fileLocalConfig.getBasePath().replaceAll("\\\\", SystemConstants.FILE_SEPARATOR));
        if (FileUtil.exists(fileLocalConfig.getBasePath() + SystemConstants.FILE_SEPARATOR + attachFileDTO.getPath())) {
            FileUtil.del(fileLocalConfig.getBasePath() + SystemConstants.FILE_SEPARATOR + attachFileDTO.getPath());
            return true;
        }
        return false;
    }

    @Override
    public byte[] getFileContent(String path) {
        FileLocalConfig fileLocalConfig = JSONUtil.toBean(getAttachConfig().getConfig(), FileLocalConfig.class);
        // 统一使用/
        fileLocalConfig.setBasePath(fileLocalConfig.getBasePath().replaceAll("\\\\", SystemConstants.FILE_SEPARATOR));
        return FileUtil.readBytes(fileLocalConfig.getBasePath() + SystemConstants.FILE_SEPARATOR + path);
    }
}
