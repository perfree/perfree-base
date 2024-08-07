package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 邮箱服务
* @author Perfree
*/
@Getter
@Setter
@TableName("p_mail_server")
public class MailServer extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * id
    */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
    * 邮箱服务名称
    */
    private String name;

    /**
    * 邮箱服务账号
    */
    private String account;

    /**
    * 邮箱服务用户名
    */
    private String userName;

    /**
    * 邮箱服务SMTP域名
    */
    private String address;

    /**
    * 邮箱服务SMTP端口
    */
    private Integer port;

    /**
    * 状态
    */
    private Integer status;

    /**
    * 是否开启SSL
    */
    private Byte enableSSL;
}
