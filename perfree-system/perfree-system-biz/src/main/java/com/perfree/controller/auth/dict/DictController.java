package com.perfree.controller.auth.dict;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.convert.dict.DictConvert;
import com.perfree.model.Dict;
import com.perfree.service.dict.DictService;
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
* @description 数据字典 controller
* @author Perfree
**/
@RestController
@Tag(name = "数据字典相关接口}")
@RequestMapping("api/auth/dict")
public class DictController {

    @Resource
    private DictService dictService;

    @PostMapping("/page")
    @Operation(summary = "数据字典分页列表")
    @PreAuthorize("@ss.hasPermission('admin:dict:page')")
    public CommonResult<PageResult<DictRespVO>> page(@RequestBody DictPageReqVO pageVO) {
        PageResult<Dict> dictPageResult = dictService.dictPage(pageVO);
        return success(DictConvert.INSTANCE.convertPageResultVO(dictPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:create')")
    public CommonResult<DictRespVO> add(@RequestBody @Valid DictAddReqVO dictAddReqVO) {
        return success(DictConvert.INSTANCE.convertRespVO(dictService.add(dictAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:update')")
    public CommonResult<DictRespVO> update(@RequestBody @Valid DictUpdateReqVO dictUpdateReqVO) {
        return success(DictConvert.INSTANCE.convertRespVO(dictService.update(dictUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:get')")
    public CommonResult<DictRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(DictConvert.INSTANCE.convertRespVO(dictService.get(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(dictService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:listAll')")
    public CommonResult<List<DictRespVO>> listAll() {
        return success(DictConvert.INSTANCE.convertListRespVO(dictService.listAll()));
    }

    @GetMapping("/queryListAll")
    @Operation(summary = "根据条件获取所有数据字典")
    @PreAuthorize("@ss.hasPermission('admin:dict:queryListAll')")
    public CommonResult<List<DictRespVO>> queryListAll(@RequestParam(value = "dictType") String dictType, @RequestParam(value = "dictName") String dictName) {
        return success(DictConvert.INSTANCE.convertListRespVO(dictService.queryListAll(dictType, dictName)));
    }
}