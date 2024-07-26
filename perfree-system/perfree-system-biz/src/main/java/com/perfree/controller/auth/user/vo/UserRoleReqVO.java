package com.perfree.controller.auth.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;


@Schema(description = "用户角色ReqVO")
@Data
public class UserRoleReqVO {

    @Schema(description = "id")
    @NotNull(message = "id不能为空")
    private Integer id;

    @Schema(description = "用户角色列表")
    private List<Integer> roles;

}
