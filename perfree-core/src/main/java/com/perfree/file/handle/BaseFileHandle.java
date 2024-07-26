package com.perfree.file.handle;

import com.perfree.system.api.attach.dto.AttachFileDTO;
import com.perfree.system.api.attach.dto.AttachUploadDTO;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import lombok.Getter;

import java.io.IOException;

@Getter
public abstract class BaseFileHandle {

    private AttachConfigCacheDTO attachConfig;

    public void init(AttachConfigCacheDTO attachConfig) {
        this.attachConfig = attachConfig;
    }

    /**
     * 文件上传
     *
     * @param attachUploadDTO attachUploadDTO
     * @return AttachFileDTO
     */
    public AttachFileDTO upload(AttachUploadDTO attachUploadDTO) throws IOException {
        return null;
    }

    /**
     * 删除文件
     *
     * @param attachFileDTO attachFileDTO
     * @return boolean
     */
    public boolean delete(AttachFileDTO attachFileDTO) {
        return false;
    }

    /**
     * 获取文件内容
     *
     * @param path path
     * @return byte[]
     */
    public byte[] getFileContent(String path) {
        return null;
    }
}
