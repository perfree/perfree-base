package com.perfree.controller.auth.extra;


import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.extra.vo.ExtraRespVO;
import com.perfree.convert.extra.ExtraConvert;
import com.perfree.service.extra.ExtraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
