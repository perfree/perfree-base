package com.perfree.controller.auth.dictData;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.convert.dictData.DictDataConvert;
import com.perfree.model.DictData;
import com.perfree.service.dictData.DictDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 数据字典值 controller
* @author Perfree
**/
@RestController
@Tag(name = "数据字典值相关接口}")
@RequestMapping("api/auth/dictData")
public class DictDataController {

    @Resource
    private DictDataService dictDataService;

    @PostMapping("/page")
    @Operation(summary = "数据字典值分页列表")
    @PreAuthorize("@ss.hasPermission('admin:dictData:query')")
    public CommonResult<PageResult<DictDataRespVO>> page(@RequestBody DictDataPageReqVO pageVO) {
        PageResult<DictData> dictDataPageResult = dictDataService.dictDataPage(pageVO);
        return success(DictDataConvert.INSTANCE.convertPageResultVO(dictDataPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加数据字典值")
    @PreAuthorize("@ss.hasPermission('admin:dictData:create')")
    public CommonResult<DictDataRespVO> add(@RequestBody @Valid DictDataAddReqVO dictDataAddReqVO) {
        return success(DictDataConvert.INSTANCE.convertRespVO(dictDataService.add(dictDataAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新数据字典值")
    @PreAuthorize("@ss.hasPermission('admin:dictData:update')")
    public CommonResult<DictDataRespVO> update(@RequestBody @Valid DictDataUpdateReqVO dictDataUpdateReqVO) {
        return success(DictDataConvert.INSTANCE.convertRespVO(dictDataService.update(dictDataUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取数据字典值")
    public CommonResult<DictDataRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(DictDataConvert.INSTANCE.convertRespVO(dictDataService.get(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除数据字典值")
    @PreAuthorize("@ss.hasPermission('admin:dictData:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(dictDataService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有数据字典值")
    public CommonResult<List<DictDataRespVO>> listAll() {
        return success(DictDataConvert.INSTANCE.convertListRespVO(dictDataService.listAll()));
    }
}