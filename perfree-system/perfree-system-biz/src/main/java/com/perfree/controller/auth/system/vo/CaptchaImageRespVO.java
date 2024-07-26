package com.perfree.controller.auth.system.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "验证码 Response VO")
@Data
public class CaptchaImageRespVO {

    @Schema(description = "uuid")
    private String uuid;

    @Schema(description = "img")
    private String img;
}
