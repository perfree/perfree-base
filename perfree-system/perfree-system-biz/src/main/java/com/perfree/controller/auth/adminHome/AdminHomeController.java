package com.perfree.controller.auth.adminHome;

import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.adminHome.vo.HomeStatisticRespVO;
import com.perfree.controller.auth.adminHome.vo.ServerInfoRespVO;
import com.perfree.controller.auth.mailLog.vo.MailLogRespVO;
import com.perfree.convert.mailLog.MailLogConvert;
import com.perfree.service.adminHome.AdminHomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.perfree.commons.common.CommonResult.success;


@RestController
@Tag(name = "首页相关接口")
@RequestMapping("api/auth/adminHome")
public class AdminHomeController {

    @Resource
    private AdminHomeService homeService;


    @GetMapping("/getServerInfo")
    @Operation(summary = "获取系统服务信息")
    public CommonResult<ServerInfoRespVO> getServerInfo() {
        return success(homeService.getServerInfo());
    }

    @GetMapping("/getHomeStatistic")
    @Operation(summary = "获取首页统计信息")
    public CommonResult<HomeStatisticRespVO> getHomeStatistic() {
        return success(homeService.getHomeStatistic());
    }

}
