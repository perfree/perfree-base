package com.perfree.controller.auth.mailLog.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

/**
* @description 邮件日志 BaseVO
* @author Perfree
**/
@Data
public class MailLogBaseVO {


    @Schema(description = "模板编号", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "模板编号不能为空")
    private String mailTemplateCode;

    @Schema(description = "发送时间", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "发送时间不能为空")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sendDate;

    @Schema(description = "接收邮箱", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "接收邮箱不能为空")
    private String receiveMail;

    @Schema(description = "邮件标题", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮件标题不能为空")
    private String mailTitle;

    @Schema(description = "发送状态", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "发送状态不能为空")
    private Integer sendStatus;

    @Schema(description = "发件邮箱", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "发件邮箱不能为空")
    private String sendMail;

    @Schema(description = "邮件内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮件内容不能为空")
    private String content;
}
