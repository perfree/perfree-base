package com.perfree.controller.auth.system;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.controller.auth.system.vo.LoginUserInfoRespVO;
import com.perfree.controller.auth.system.vo.MenuTreeListRespVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.service.menu.MenuService;
import com.perfree.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @description 系统基础接口
 * @author Perfree
 * @version 1.0.0
 * @create 2023/9/28 10:16
 **/
@RestController
@Tag(name = "系统基础接口")
@RequestMapping("api/auth")
public class SystemController {
    @Resource
    private UserService userService;

    @Resource
    private MenuService menuService;

    @Resource
    private OptionCacheService optionCacheService;



    @GetMapping("menuAdminList")
    @Operation(summary = "获取当前账号拥有的菜单")
    public CommonResult<List<MenuTreeListRespVO>> menuList(){
        return CommonResult.success(menuService.menuAdminListByLoginUser());
    }

    @GetMapping("getAllOption")
    @Operation(summary = "获取所有配置信息")
    public CommonResult<List<OptionRespVO>> getAllOption(){
        return CommonResult.success(OptionConvert.INSTANCE.convertCacheDTO2RespListVO(optionCacheService.getAllOption()));
    }

    @GetMapping("userInfo")
    @Operation(summary = "获取当前登录账号的信息")
    public CommonResult<LoginUserInfoRespVO> userInfo(){
        return CommonResult.success(userService.userInfo());
    }

    @PostMapping("logout")
    @Operation(summary = "退出登录")
    public CommonResult<String> logout(){
        return CommonResult.success("退出成功");
    }
}
