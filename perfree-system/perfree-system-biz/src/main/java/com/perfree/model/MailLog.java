package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;
import java.time.LocalDateTime;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 邮件日志
* @author Perfree
*/
@Getter
@Setter
@TableName("p_mail_log")
public class MailLog extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * id
    */
    @TableId(type = IdType.AUTO)
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
