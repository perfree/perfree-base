package com.perfree.controller.auth.mailLog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * @description 邮件日志 AddReqVO
 * @author Perfree
 **/
@Schema(description = "邮件日志AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailLogUpdateReqVO extends MailLogBaseVO{

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "id不能为空")
    private Integer id;
}
