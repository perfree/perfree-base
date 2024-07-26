package com.perfree.system.api.attach.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AttachUploadDTO {

    /**
     * 附件
     */
    private MultipartFile file;

    /**
     * 附件描述
     */
    private String desc;

    /**
     * 附件分组
     */
    private String attachGroup;

    /**
     * 附件名
     */
    private String name;
}
