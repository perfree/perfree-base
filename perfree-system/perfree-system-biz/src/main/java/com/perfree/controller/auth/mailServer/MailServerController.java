package com.perfree.controller.auth.mailServer;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailServer.vo.*;
import com.perfree.convert.mailServer.MailServerConvert;
import com.perfree.model.MailServer;
import com.perfree.service.mailServer.MailServerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import com.perfree.commons.excel.ExcelUtils;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 邮箱服务 controller
* @author Perfree
**/
@RestController
@Tag(name = "邮箱服务相关接口}")
@RequestMapping("api/auth/mailServer")
public class MailServerController {

    @Resource
    private MailServerService mailServerService;

    @PostMapping("/page")
    @Operation(summary = "邮箱服务分页列表")
    @PreAuthorize("@ss.hasPermission('admin:mailServer:query')")
    public CommonResult<PageResult<MailServerRespVO>> page(@RequestBody MailServerPageReqVO pageVO) {
        PageResult<MailServer> mailServerPageResult = mailServerService.mailServerPage(pageVO);
        return success(MailServerConvert.INSTANCE.convertPageResultVO(mailServerPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加邮箱服务")
    @PreAuthorize("@ss.hasPermission('admin:mailServer:create')")
    public CommonResult<MailServerRespVO> add(@RequestBody @Valid MailServerAddReqVO mailServerAddReqVO) {
        return success(MailServerConvert.INSTANCE.convertRespVO(mailServerService.add(mailServerAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新邮箱服务")
    @PreAuthorize("@ss.hasPermission('admin:mailServer:update')")
    public CommonResult<MailServerRespVO> update(@RequestBody @Valid MailServerUpdateReqVO mailServerUpdateReqVO) {
        return success(MailServerConvert.INSTANCE.convertRespVO(mailServerService.update(mailServerUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取邮箱服务")
    public CommonResult<MailServerRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(MailServerConvert.INSTANCE.convertRespVO(mailServerService.get(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除邮箱服务")
    @PreAuthorize("@ss.hasPermission('admin:mailServer:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(mailServerService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有邮箱服务")
    public CommonResult<List<MailServerRespVO>> listAll() {
        return success(MailServerConvert.INSTANCE.convertListRespVO(mailServerService.listAll()));
    }

    @PostMapping("/export")
    @Operation(summary = "导出邮箱服务")
    @PreAuthorize("@ss.hasPermission('admin:mailServer:export')")
    public void export(@RequestBody MailServerExportReqVO exportReqVO, HttpServletResponse response) {
        List<MailServer> mailServerList = mailServerService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, MailServerConvert.INSTANCE.convertToExcelVOList(mailServerList), MailServerExcelVO.class, "邮箱服务数据","邮箱服务数据.xlsx");
    }
}