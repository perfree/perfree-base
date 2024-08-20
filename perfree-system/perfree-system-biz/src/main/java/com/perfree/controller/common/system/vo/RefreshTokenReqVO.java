package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

/**
 * @author Perfree
 * @description 账号密码登录  Request VO
 * @date 15:36 2023/9/28
 */
@Schema(description = "刷新token Request VO")
@Data
public class RefreshTokenReqVO {

    @Schema(description = "refreshToken")
    @NotEmpty(message = "refreshToken不能为空")
    private String refreshToken;
}
