package com.perfree.controller.auth.mailServer.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 邮箱服务 BaseVO
* @author Perfree
**/
@Data
public class MailServerBaseVO {


    @Schema(description = "邮箱服务名称", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮箱服务名称不能为空")
    private String name;

    @Schema(description = "邮箱服务账号", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮箱服务账号不能为空")
    private String account;

    @Schema(description = "邮箱服务用户名", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮箱服务用户名不能为空")
    private String userName;

    @Schema(description = "邮箱服务密码", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮箱服务密码不能为空")
    private String password;

    @Schema(description = "邮箱服务SMTP域名", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮箱服务SMTP域名不能为空")
    private String address;

    @Schema(description = "邮箱服务SMTP端口", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "邮箱服务SMTP端口不能为空")
    private Integer port;


    @Schema(description = "状态", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "状态不能为空")
    private Integer status;

    @Schema(description = "是否开启SSL", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "是否开启SSL不能为空")
    private Byte enableSSL;
}
