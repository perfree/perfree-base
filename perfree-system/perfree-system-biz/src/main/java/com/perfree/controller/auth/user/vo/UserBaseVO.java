package com.perfree.controller.auth.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserBaseVO {

    @Schema(description = "用户账号")
    @NotBlank(message = "用户账号不能为空")
    @Size(min = 5, max = 16, message = "账户必须在5-16字之间")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "账号格式为数字以及字母")
    private String account;

    @Schema(description = "昵称")
    @NotBlank(message = "昵称不能为空")
    @Size(min = 2, max = 20, message = "昵称必须在2-20字之间")
    private String userName;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "头像")
    private String avatar;

    @Schema(description = "邮箱")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Schema(description = "网站")
    private String website;

    @Schema(description = "备注")
    private String remark;

    @Schema(description = "手机号")
    private String mobile;

    @Schema(description = "性别")
    private Byte sex;
}
