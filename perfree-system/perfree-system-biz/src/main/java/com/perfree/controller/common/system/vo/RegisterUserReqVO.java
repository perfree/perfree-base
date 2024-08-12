package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * @author Perfree
 * @description 账号密码登录  Request VO
 * @date 15:36 2023/9/28
 */
@Schema(description = "账号密码登录 Request VO")
@Data
public class RegisterUserReqVO {

    @Schema(description = "昵称")
    @NotBlank(message = "昵称不能为空")
    @Size(min = 2, max = 20, message = "昵称必须在2-20字之间")
    private String userName;

    @Schema(description = "账号")
    @NotBlank(message = "账号不能为空")
    @Size(min = 5, max = 16, message = "账户必须在5-16字之间")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账号格式为数字以及字母")
    private String account;

    @Schema(description = "密码", example = "123456")
    @NotEmpty(message = "密码不能为空")
    private String password;

    @Schema(description = "邮箱")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Schema(description = "验证码uuid", example = "123456")
    private String uuid;

    @Schema(description = "验证码", example = "123456")
    private String code;

}
