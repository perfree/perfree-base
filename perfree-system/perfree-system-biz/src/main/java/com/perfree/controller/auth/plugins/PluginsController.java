package com.perfree.controller.auth.plugins;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.plugins.vo.InstallPluginReqVO;
import com.perfree.controller.auth.plugins.vo.PluginsPageReqVO;
import com.perfree.controller.auth.plugins.vo.PluginsRespVO;
import com.perfree.convert.plugins.PluginsConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Plugins;
import com.perfree.service.plugins.PluginsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "插件相关接口")
@RequestMapping("api/auth/plugins")
public class PluginsController {

    @Resource
    private PluginsService pluginsService;

    @PostMapping("/page")
    @Operation(summary = "插件分页列表")
    @PreAuthorize("@ss.hasPermission('admin:plugin:query')")
    public CommonResult<PageResult<PluginsRespVO>> page(@RequestBody PluginsPageReqVO pageVO) {
        PageResult<Plugins> pluginsPageResult = pluginsService.pluginsPage(pageVO);
        return success(PluginsConvert.INSTANCE.convertPageResultVO(pluginsPageResult));
    }


    @PostMapping("/installPlugin")
    @Operation(summary = "插件安装")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:plugin:install')")
    public CommonResult<Boolean> installPlugin(InstallPluginReqVO installPluginReqVO) {
        return success( pluginsService.installPlugin(installPluginReqVO.getFile()));
    }

    @PostMapping("/disablePlugin")
    @Operation(summary = "插件禁用")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:plugin:disable')")
    public CommonResult<Boolean> disablePlugin(@RequestParam(value = "pluginId") String pluginId) {
        return success( pluginsService.disablePlugin(pluginId));
    }

    @PostMapping("/enablePlugin")
    @Operation(summary = "插件启用")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:plugin:enable')")
    public CommonResult<Boolean> enablePlugin(@RequestParam(value = "pluginId") String pluginId) {
        return success( pluginsService.enablePlugin(pluginId));
    }

    @PostMapping("/uninstallPlugin")
    @Operation(summary = "卸载插件")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:plugin:uninstall')")
    public CommonResult<Boolean> uninstallPlugin(@RequestParam(value = "pluginId") String pluginId) {
        return success( pluginsService.unInstallPlugin(pluginId));
    }
}
