package com.perfree.controller.auth.attach.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "附件上传ReqVO")
@Data
public class AttachUploadVO {

    @Schema(description = "文件附件", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文件附件不能为空")
    private MultipartFile file;

    @Schema(description = "附件描述")
    private String remark;

    @Schema(description = "附件名")
    private String name;

    @Schema(description = "附件标识")
    private String flag;

    @Schema(description = "附件分组")
    private String attachGroup;

    @Schema(description = "附件服务器配置ID")
    private Integer attachConfigId;

}
