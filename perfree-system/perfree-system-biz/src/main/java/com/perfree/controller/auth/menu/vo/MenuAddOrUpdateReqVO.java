package com.perfree.controller.auth.menu.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "菜单添加或更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MenuAddOrUpdateReqVO extends MenuBaseVO {
    @Schema(description = "菜单id")
    private String id;

    @Schema(description = "父级id")
    private String pid;
}
