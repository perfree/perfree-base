package com.perfree.controller.auth.user.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "用户重置密码ReqVO")
@Data
public class UserResetPasswordReqVO {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "用户登录密码")
    private String password;
}
