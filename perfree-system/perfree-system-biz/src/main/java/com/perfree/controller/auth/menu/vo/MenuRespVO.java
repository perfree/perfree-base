package com.perfree.controller.auth.menu.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Schema(description = "菜单列表RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MenuRespVO extends MenuBaseVO {
    @Schema(description = "菜单id")
    private String id;

    @Schema(description = "父级id")
    private String pid;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

}
