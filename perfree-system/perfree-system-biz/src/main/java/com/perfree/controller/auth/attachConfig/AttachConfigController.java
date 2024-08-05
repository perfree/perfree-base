package com.perfree.controller.auth.attachConfig;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachConfig.vo.*;
import com.perfree.convert.attachConfig.AttachConfigConvert;
import com.perfree.model.AttachConfig;
import com.perfree.service.attachConfig.AttachConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "附件服务器配置相关接口")
@RequestMapping("api/auth/attachConfig")
public class AttachConfigController {

    @Resource
    private AttachConfigService attachConfigService;

    @GetMapping("/getAll")
    @Operation(summary = "获取所有配置")
    public CommonResult<List<AttachConfigRespVO>> getAll() {
        List<AttachConfig> attachConfigList = attachConfigService.getAll();
        return CommonResult.success(AttachConfigConvert.INSTANCE.convertRespListVO(attachConfigList));
    }

    @PostMapping("/page")
    @Operation(summary = "配置分页列表")
    public CommonResult<PageResult<AttachConfigRespVO>> page(@RequestBody AttachConfigPageReqVO pageVO) {
        PageResult<AttachConfig> attachPage = attachConfigService.attachConfigPage(pageVO);
        return success(AttachConfigConvert.INSTANCE.convertPageResultVO(attachPage));
    }

    @PostMapping("/add")
    @Operation(summary = "新增配置")
    @PreAuthorize("@ss.hasPermission('admin:attachConfig:create')")
    public CommonResult<AttachConfigRespVO> add(@RequestBody @Valid AttachConfigCreateVO attachConfigCreateVO) {
        AttachConfig attachConfig = attachConfigService.add(attachConfigCreateVO);
        return CommonResult.success(AttachConfigConvert.INSTANCE.convertRespVO(attachConfig));
    }


    @PutMapping("/update")
    @Operation(summary = "修改配置")
    @PreAuthorize("@ss.hasPermission('admin:attachConfig:update')")
    public CommonResult<Boolean> update(@RequestBody @Valid AttachConfigUpdateVO attachConfigUpdateVO) {
        return CommonResult.success(attachConfigService.updateAttachConfig(attachConfigUpdateVO));
    }

    @PutMapping("/updateMaster")
    @Operation(summary = "修改默认配置")
    @PreAuthorize("@ss.hasPermission('admin:attachConfig:master')")
    public CommonResult<Boolean> updateMaster(@RequestBody @Valid AttachConfigUpdateMasterVO attachConfigUpdateMasterVO) {
        return CommonResult.success(attachConfigService.updateMaster(attachConfigUpdateMasterVO));
    }


    @GetMapping("/get")
    @Operation(summary = "根据id获取配置")
    public CommonResult<AttachConfigRespVO> get(@RequestParam(value = "id") Integer id) {
        AttachConfig attachConfig = attachConfigService.getById(id);
        return CommonResult.success(AttachConfigConvert.INSTANCE.convertRespVO(attachConfig));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除配置")
    @PreAuthorize("@ss.hasPermission('admin:attachConfig:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(attachConfigService.del(id));
    }
}
