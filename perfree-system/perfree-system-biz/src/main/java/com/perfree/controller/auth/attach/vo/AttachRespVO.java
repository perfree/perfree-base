package com.perfree.controller.auth.attach.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Schema(description = "附件RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachRespVO extends AttachBaseVO {
    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    private LocalDateTime updateTime;
}
