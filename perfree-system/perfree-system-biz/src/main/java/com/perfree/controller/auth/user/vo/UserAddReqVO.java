package com.perfree.controller.auth.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "用户ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserAddReqVO extends UserBaseVO {

    @Schema(description = "用户登录密码")
    private String password;

}
