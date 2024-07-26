package com.perfree.controller.auth.attach.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Schema(description = "通过url上传附件ReqVO")
@Data
public class AttachUploadByUrlVO {

    @Schema(description = "url", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "url不能为空")
    private String url;

}
