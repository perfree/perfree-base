package com.perfree.controller.auth.extra;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.extra.vo.ExtraAddReqVO;
import com.perfree.controller.auth.extra.vo.ExtraPageReqVO;
import com.perfree.controller.auth.extra.vo.ExtraRespVO;
import com.perfree.controller.auth.extra.vo.ExtraUpdateReqVO;
import com.perfree.convert.extra.ExtraConvert;
import com.perfree.model.Extra;
import com.perfree.service.extra.ExtraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "附加数据相关接口")
@RequestMapping("api/auth/extra")
public class ExtraController {

    @Resource
    private ExtraService extraService;


    @GetMapping("/getByKey")
    @Operation(summary = "根据key获取附加数据")
    public CommonResult<ExtraRespVO> getByKey(@RequestParam(value = "extraKey") String extraKey) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.getByKey(extraKey)));
    }

    @PostMapping("/page")
    @Operation(summary = "附加数据分页列表")
    @PreAuthorize("@ss.hasPermission('admin:extra:page')")
    public CommonResult<PageResult<ExtraRespVO>> page(@RequestBody ExtraPageReqVO pageVO) {
        PageResult<Extra> extraPageResult = extraService.extraPage(pageVO);
        return success(ExtraConvert.INSTANCE.convertPageResultVO(extraPageResult));
    }

    @GetMapping("/get")
    @Operation(summary = "获取附加数据")
    @PreAuthorize("@ss.hasPermission('admin:extra:get')")
    public CommonResult<ExtraRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.get(id)));
    }

    @PostMapping("/add")
    @Operation(summary = "添加附加数据")
    @PreAuthorize("@ss.hasPermission('admin:extra:create')")
    public CommonResult<ExtraRespVO> add(@RequestBody @Valid ExtraAddReqVO extraAddReqVO) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.add(extraAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新附加数据")
    @PreAuthorize("@ss.hasPermission('admin:extra:update')")
    public CommonResult<ExtraRespVO> update(@RequestBody @Valid ExtraUpdateReqVO extraUpdateReqVO) {
        return success(ExtraConvert.INSTANCE.convertRespVO(extraService.updateExtra(extraUpdateReqVO)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除附加数据")
    @PreAuthorize("@ss.hasPermission('admin:extra:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(extraService.del(id));
    }
}
