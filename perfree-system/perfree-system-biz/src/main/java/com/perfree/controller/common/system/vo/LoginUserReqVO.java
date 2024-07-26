package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

/**
 * @author Perfree
 * @description 账号密码登录  Request VO
 * @date 15:36 2023/9/28
 */
@Schema(description = "账号密码登录 Request VO")
@Data
public class LoginUserReqVO {

    @Schema(description = "账号", example = "admin")
    @NotEmpty(message = "登录账号不能为空")
    private String username;

    @Schema(description = "密码", example = "123456")
    @NotEmpty(message = "密码不能为空")
    private String password;

    @Schema(description = "验证码uuid", example = "123456")
    private String uuid;

    @Schema(description = "验证码", example = "123456")
    private String code;

}
