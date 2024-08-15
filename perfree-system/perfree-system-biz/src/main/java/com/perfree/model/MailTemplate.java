package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 邮件模板
* @author Perfree
*/
@Getter
@Setter
@TableName(value = "p_mail_template", autoResultMap = true)
public class MailTemplate extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * id
    */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
    * 模板名称
    */
    private String name;

    /**
    * 模板编码
    */
    private String code;

    /**
    * 邮箱服务id
    */
    private Integer mailServerId;

    /**
    * 发送人名称
    */
    private String nickname;

    /**
    * 邮件标题
    */
    private String mailTitle;

    /**
    * 邮件内容
    */
    private String mailContent;

    /**
    * 状态
    */
    private Integer status;

    /**
    * 备注
    */
    private String remark;

    /**
     * 参数
     */
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> mailParams;
}
