package com.perfree.file;

import com.perfree.cache.AttachConfigCacheService;
import com.perfree.commons.exception.ServiceException;
import com.perfree.enums.ErrorCode;
import com.perfree.file.handle.BaseFileHandle;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 文件处理器
 * @create 2021-08-17 16:07
 */
@Service
public class FileHandleService {
    private final static Logger LOGGER = LoggerFactory.getLogger(FileHandleService.class);
    @Resource
    private AttachConfigCacheService attachConfigCacheService;

    /**
     * 获取文件处理器
     * @return BaseFileHandle
     */
    public BaseFileHandle getFileHandle(Integer attachConfigID) {
        AttachConfigCacheDTO masterAttachConfig;
        if (null != attachConfigID) {
            masterAttachConfig = attachConfigCacheService.getAttachConfig(attachConfigID);
        } else {
            masterAttachConfig = attachConfigCacheService.getMasterAttachConfig();
        }
        if (null == masterAttachConfig) {
            LOGGER.error("master attach config is empty");
            throw new ServiceException(ErrorCode.MASTER_ATTACH_CONFIG_EMPTY);
        }
        BaseFileHandle fileHandleStorage = FileHandleStorageHolder.getFileHandleStorage(masterAttachConfig.getStorage());
        if (null != fileHandleStorage) {
            fileHandleStorage.init(masterAttachConfig);
            return fileHandleStorage;
        }
       throw new ServiceException(500, "未匹配到文件处理器,请检查文件处配置!");
    }

    public byte[] getFileContent(Integer configId, String path) {
        AttachConfigCacheDTO attachConfig = attachConfigCacheService.getAttachConfig(configId);
        BaseFileHandle fileHandleStorage = FileHandleStorageHolder.getFileHandleStorage(attachConfig.getStorage());
        if (null != fileHandleStorage) {
            fileHandleStorage.init(attachConfig);
            return fileHandleStorage.getFileContent(path);
        }
        throw new ServiceException(500, "未匹配到文件处理器,请检查文件处配置!");
    }
}
