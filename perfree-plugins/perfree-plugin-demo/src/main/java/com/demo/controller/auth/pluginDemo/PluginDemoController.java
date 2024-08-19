package com.demo.controller.auth.pluginDemo;


import com.demo.controller.auth.pluginDemo.vo.*;
import com.demo.convert.pluginDemo.PluginDemoConvert;
import com.demo.model.PluginDemo;
import com.demo.service.pluginDemo.PluginDemoService;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.excel.ExcelUtils;
import com.perfree.security.annotation.PluginPreAuthorize;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 测试 controller
* @author Perfree
**/
@RestController
@Tag(name = "测试相关接口")
@RequestMapping("api/auth/pluginDemo")
public class PluginDemoController {

    @Resource
    private PluginDemoService pluginDemoService;

    @PostMapping("/page")
    @Operation(summary = "测试分页列表2")
    @PluginPreAuthorize("@ss.hasPermission('admin:pluginDemo:query')")
    public CommonResult<PageResult<PluginDemoRespVO>> page(@RequestBody PluginDemoPageReqVO pageVO) {
        PageResult<PluginDemo> pluginDemoPageResult = pluginDemoService.pluginDemoPage(pageVO);
        return success(PluginDemoConvert.INSTANCE.convertPageResultVO(pluginDemoPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加测试")
    @PluginPreAuthorize("@ss.hasPermission('admin:pluginDemo:create')")
    public CommonResult<PluginDemoRespVO> add(@RequestBody @Valid PluginDemoAddReqVO pluginDemoAddReqVO) {
        return success(PluginDemoConvert.INSTANCE.convertRespVO(pluginDemoService.add(pluginDemoAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新测试")
    @PluginPreAuthorize("@ss.hasPermission('admin:pluginDemo:update')")
    public CommonResult<PluginDemoRespVO> update(@RequestBody @Valid PluginDemoUpdateReqVO pluginDemoUpdateReqVO) {
        return success(PluginDemoConvert.INSTANCE.convertRespVO(pluginDemoService.update(pluginDemoUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取测试")
    public CommonResult<PluginDemoRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(PluginDemoConvert.INSTANCE.convertRespVO(pluginDemoService.get(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除测试")
    @PluginPreAuthorize("@ss.hasPermission('admin:pluginDemo:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(pluginDemoService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有测试")
    public CommonResult<List<PluginDemoRespVO>> listAll() {
        return success(PluginDemoConvert.INSTANCE.convertListRespVO(pluginDemoService.listAll()));
    }

    @PostMapping("/export")
    @Operation(summary = "导出测试")
    @PluginPreAuthorize("@ss.hasPermission('admin:pluginDemo:export')")
    public void export(@RequestBody PluginDemoExportReqVO exportReqVO, HttpServletResponse response) {
        List<PluginDemo> pluginDemoList = pluginDemoService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, PluginDemoConvert.INSTANCE.convertToExcelVOList(pluginDemoList), PluginDemoExcelVO.class, "测试数据","测试数据.xlsx");
    }
}