package com.perfree.controller.auth.role.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Schema(description = "角色RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class RoleRespVO extends RoleBaseVO{
    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    private LocalDateTime updateTime;
}
