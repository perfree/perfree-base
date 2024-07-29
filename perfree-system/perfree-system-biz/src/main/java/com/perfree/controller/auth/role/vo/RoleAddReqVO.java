package com.perfree.controller.auth.role.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "角色RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class RoleAddReqVO extends RoleBaseVO{
}
