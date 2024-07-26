package com.perfree.controller.common.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author Perfree
 * @description 登录 Response VO
 * @date 15:36 2023/9/28
 */
@Schema(description = "登录 Response VO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginUserRespVO {
    @Schema(description = "用户编号", example = "1024")
    private Integer userId;

    @Schema(description = "访问令牌", example = "happy")
    private String accessToken;

    @Schema(description = "刷新令牌", example = "nice")
    private String refreshToken;

    @Schema(description = "过期时间")
    private LocalDateTime expiresTime;
}
