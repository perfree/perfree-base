package com.perfree.controller.auth.role.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "角色菜单权限ReqVO")
@Data
public class RoleMenuReqVO {

    @Schema(description = "角色id")
    @NotNull(message = "角色id不能为空")
    private Integer roleId;

    @Schema(description = "菜单id集合")
    private List<String> menuIds = new ArrayList<>();
}
