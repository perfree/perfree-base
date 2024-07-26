package com.perfree.controller.auth.role.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RoleBaseVO {

    @Schema(description = "角色名", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "角色名不能为空")
    private String name;

    @Schema(description = "角色描述")
    private String description;

    @Schema(description = "角色编码", requiredMode = Schema.RequiredMode.REQUIRED, example = "admin")
    @NotBlank(message = "角色编码不能为空")
    private String code;

}
