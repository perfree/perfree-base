package com.perfree.controller.auth.option;


import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.option.vo.OptionAddListReqVO;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.model.Option;
import com.perfree.service.option.OptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "系统配置相关接口")
@RequestMapping("api/auth/option")
public class OptionController {

    @Resource
    private OptionService optionService;

    @PostMapping("/saveCurrentThemeSetting")
    @Operation(summary = "保存当前启用主题的设置项")
    public CommonResult<Boolean> saveCurrentThemeSetting(@RequestBody @Valid OptionAddListReqVO optionAddListReqVO) {
        return success(optionService.saveCurrentThemeSetting(optionAddListReqVO));
    }

    @GetMapping("/getCurrentThemeSettingValue")
    @Operation(summary = "获取当前启用主题的所有配置项值")
    public CommonResult<List<OptionRespVO>> getCurrentThemeSettingValue() {
        List<Option> optionList = optionService.getCurrentThemeSettingValue();
        return success(OptionConvert.INSTANCE.convertToRespVOList(optionList));
    }

    @PostMapping("/saveOptionList")
    @Operation(summary = "保存配置项")
    public CommonResult<Boolean> saveOptionList(@RequestBody @Valid OptionAddListReqVO optionAddListReqVO) {
        return success(optionService.saveOptionList(optionAddListReqVO));
    }

    @GetMapping("/getOptionByIdentification")
    @Operation(summary = "根据标识获取所有的配置项")
    public CommonResult<List<OptionRespVO>> getOptionByIdentification(@RequestParam(value = "identification") String identification) {
        List<Option> optionList = optionService.getOptionByIdentification(identification);
        return success(OptionConvert.INSTANCE.convertToRespVOList(optionList));
    }


}