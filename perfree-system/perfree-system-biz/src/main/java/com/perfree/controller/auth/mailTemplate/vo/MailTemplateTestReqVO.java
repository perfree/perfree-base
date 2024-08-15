package com.perfree.controller.auth.mailTemplate.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashMap;

/**
 * @description 邮件模板 AddReqVO
 * @author Perfree
 **/
@Schema(description = "邮件模板AddReqVO")
@Data
public class MailTemplateTestReqVO {

    @Schema(description = "模板id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "模板id不能为空")
    private Integer mailTemplateId;

    @Schema(description = "接收邮箱", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "接收邮箱不能为空")
    private String receiveMail;

    @Schema(description = "参数")
    private HashMap<String, String> mailParams;
}
