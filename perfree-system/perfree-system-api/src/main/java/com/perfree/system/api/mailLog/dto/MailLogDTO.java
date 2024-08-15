package com.perfree.system.api.mailLog.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MailLogDTO {

    /**
     * id
     */
    private Integer id;

    /**
     * 模板编号
     */
    private String mailTemplateCode;

    /**
     * 发送时间
     */
    private LocalDateTime sendDate;

    /**
     * 接收邮箱
     */
    private String receiveMail;

    /**
     * 邮件标题
     */
    private String mailTitle;

    /**
     * 发送状态
     */
    private Integer sendStatus;

    /**
     * 发件邮箱
     */
    private String sendMail;

    /**
     * 邮件内容
     */
    private String content;
}
