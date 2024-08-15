package com.perfree.controller.auth.mailTemplate.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @description 邮件模板 RespVO
 * @author Perfree
 **/
@Schema(description = "邮件模板RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailTemplateRespVO extends MailTemplateBaseVO{

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer id;

    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @Schema(description = "参数")
    private List<String> mailParams;
}
