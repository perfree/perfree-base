package com.perfree.system.api.mailServer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MailServerDTO {

    /**
     * id
     */
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
     * 邮箱服务密码
     */
    private String password;

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
