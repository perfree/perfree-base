package com.perfree.controller.common.role;

import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.role.vo.RoleRespVO;
import com.perfree.convert.role.RoleConvert;
import com.perfree.service.role.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "角色相关公共接口")
@RequestMapping("api/role")
public class RoleController {
    @Resource
    private RoleService roleService;

    @GetMapping("/listAll")
    @Operation(summary = "获取所有角色")
    public CommonResult<List<RoleRespVO>> listAll() {
        return success(RoleConvert.INSTANCE.convertRespListVO(roleService.list()));
    }
}
