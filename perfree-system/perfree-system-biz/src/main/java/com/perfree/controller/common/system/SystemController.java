package com.perfree.controller.common.system;

import com.perfree.cache.CaptchaCacheService;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.controller.auth.option.vo.OptionRespVO;
import com.perfree.controller.auth.system.vo.CaptchaImageRespVO;
import com.perfree.controller.auth.user.vo.UserRespVO;
import com.perfree.controller.common.system.vo.LoginUserReqVO;
import com.perfree.controller.common.system.vo.LoginUserRespVO;
import com.perfree.controller.common.system.vo.RegisterUserReqVO;
import com.perfree.convert.option.OptionConvert;
import com.perfree.convert.user.UserConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.model.User;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.user.UserService;
import com.perfree.system.api.option.dto.OptionDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.dromara.hutool.core.codec.binary.Base64;
import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.swing.captcha.CaptchaUtil;
import org.dromara.hutool.swing.captcha.LineCaptcha;
import org.dromara.hutool.swing.captcha.generator.RandomGenerator;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @description 系统基础接口
 * @author Perfree
 * @version 1.0.0
 * @create 2023/9/28 10:16
 **/
@RestController
@Tag(name = "系统基础接口")
@RequestMapping("api")
public class SystemController {
    @Resource
    private UserService userService;

    @Resource
    private CaptchaCacheService captchaCacheService;

    @Resource
    private OptionCacheService optionCacheService;


    @PostMapping("login")
    @Operation(summary = "使用账号密码登录")
    public CommonResult<LoginUserRespVO> login(@RequestBody @Valid LoginUserReqVO loginUserVO){
        return CommonResult.success(userService.login(loginUserVO));
    }

    @PostMapping("register")
    @Operation(summary = "注册账号")
    public CommonResult<UserRespVO> register(@RequestBody @Valid RegisterUserReqVO reqVO){
        return CommonResult.success(UserConvert.INSTANCE.convertRespVO(userService.register(reqVO)));
    }


    @GetMapping("getOptionByNoAuth")
    @Operation(summary = "获取未登录时可拥有的配置信息")
    public CommonResult<List<OptionRespVO>> getOptionByNoAuth(){
        List<OptionDTO> optionDTOList = new ArrayList<>();
        optionDTOList.add(optionCacheService.getOption(OptionEnum.WEB_OPEN_CAPTCHA.getKey()));
        optionDTOList.add(optionCacheService.getOption(OptionEnum.WEB_NAME.getKey()));
        optionDTOList.add(optionCacheService.getOption(OptionEnum.WEB_IS_REGISTER.getKey()));
        return CommonResult.success(OptionConvert.INSTANCE.convertCacheDTO2RespListVO(optionDTOList));
    }

    @PostMapping("captchaImage")
    @Operation(summary = "获取验证码")
    public CommonResult<CaptchaImageRespVO> captchaImage(){
        LineCaptcha lineCaptcha = CaptchaUtil.ofLineCaptcha(SystemConstants.CAPTCHA_IMAGE_WIDTH, SystemConstants.CAPTCHA_IMAGE_HEIGHT);
        lineCaptcha.setGenerator(new RandomGenerator(SystemConstants.CAPTCHA_RANDOM, SystemConstants.CAPTCHA_LENGTH));
        String code = lineCaptcha.getCode();
        String uuid = IdUtil.simpleUUID();
        captchaCacheService.putCaptcha(uuid, code);
        BufferedImage image = lineCaptcha.getImage();
        CaptchaImageRespVO captchaImageResp = new CaptchaImageRespVO();
        captchaImageResp.setUuid(uuid);
        // 转换流信息写出
        FastByteArrayOutputStream os = new FastByteArrayOutputStream();
        try {
            ImageIO.write(image, "png", os);
        } catch (IOException e) {
            return CommonResult.error(ErrorCode.CAPTCHA_IMAGE_ERROR);
        }
        captchaImageResp.setImg(Base64.encode(os.toByteArray()));
        return CommonResult.success(captchaImageResp);
    }

    @GetMapping("/getLoginUser")
    @Operation(summary = "获取当前登录用户")
    public CommonResult<UserRespVO> getApiLoginUser() {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser) {
            return CommonResult.success(null);
        }
        User byId = userService.getById(loginUser.getId());
        return CommonResult.success(UserConvert.INSTANCE.convertRespVO(byId));
    }
}
