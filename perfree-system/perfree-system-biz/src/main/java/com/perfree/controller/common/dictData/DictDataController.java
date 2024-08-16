package com.perfree.controller.common.dictData;


import com.perfree.cache.DictDataCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.dictData.vo.DictDataRespVO;
import com.perfree.convert.dictData.DictDataConvert;
import com.perfree.service.dictData.DictDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 数据字典值 controller
* @author Perfree
**/
@RestController
@Tag(name = "数据字典值相关接口")
@RequestMapping("api/dictData")
public class DictDataController {

    @Resource
    private DictDataCacheService dictDataCacheService;

    @GetMapping("/listAllCache")
    @Operation(summary = "获取所有数据字典值(缓存)")
    public CommonResult<List<DictDataRespVO>> listAllCache() {
        return success(DictDataConvert.INSTANCE.convertDTOListToRespVOList(dictDataCacheService.getAllDictData()));
    }

}