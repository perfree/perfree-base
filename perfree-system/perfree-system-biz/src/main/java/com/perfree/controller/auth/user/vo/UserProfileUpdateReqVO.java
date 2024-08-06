package com.perfree.controller.auth.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "用户个人信息修改ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserProfileUpdateReqVO extends UserBaseVO {

}
