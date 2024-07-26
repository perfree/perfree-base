package com.perfree.controller.auth.system.vo;

import com.perfree.controller.auth.user.vo.UserBaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "登录用户信息 Response VO")
@Data
@EqualsAndHashCode(callSuper = true)
public class LoginUserInfoRespVO extends UserBaseVO {

    @Schema(description = "用户id")
    private Integer id;

    @Schema(description = "是否为管理员")
    private Boolean admin;

    @Schema(description = "角色编码集合")
    private List<String> roles = new ArrayList<>();

    @Schema(description = "权限编码集合")
    private List<String> permissions = new ArrayList<>();
}
