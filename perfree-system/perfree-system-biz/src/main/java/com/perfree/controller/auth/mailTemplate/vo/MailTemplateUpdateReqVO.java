package com.perfree.controller.auth.mailTemplate.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * @description 邮件模板 AddReqVO
 * @author Perfree
 **/
@Schema(description = "邮件模板AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailTemplateUpdateReqVO extends MailTemplateBaseVO{

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "id不能为空")
    private Integer id;
}
