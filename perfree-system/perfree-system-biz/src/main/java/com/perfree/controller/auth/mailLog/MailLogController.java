package com.perfree.controller.auth.mailLog;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailLog.vo.*;
import com.perfree.convert.mailLog.MailLogConvert;
import com.perfree.model.MailLog;
import com.perfree.service.mailLog.MailLogService;
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
* @description 邮件日志 controller
* @author Perfree
**/
@RestController
@Tag(name = "邮件日志相关接口")
@RequestMapping("api/auth/mailLog")
public class MailLogController {

    @Resource
    private MailLogService mailLogService;

    @PostMapping("/page")
    @Operation(summary = "邮件日志分页列表")
    @PreAuthorize("@ss.hasPermission('admin:mailLog:query')")
    public CommonResult<PageResult<MailLogRespVO>> page(@RequestBody MailLogPageReqVO pageVO) {
        PageResult<MailLog> mailLogPageResult = mailLogService.mailLogPage(pageVO);
        return success(MailLogConvert.INSTANCE.convertPageResultVO(mailLogPageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加邮件日志")
    @PreAuthorize("@ss.hasPermission('admin:mailLog:create')")
    public CommonResult<MailLogRespVO> add(@RequestBody @Valid MailLogAddReqVO mailLogAddReqVO) {
        return success(MailLogConvert.INSTANCE.convertRespVO(mailLogService.add(mailLogAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新邮件日志")
    @PreAuthorize("@ss.hasPermission('admin:mailLog:update')")
    public CommonResult<MailLogRespVO> update(@RequestBody @Valid MailLogUpdateReqVO mailLogUpdateReqVO) {
        return success(MailLogConvert.INSTANCE.convertRespVO(mailLogService.update(mailLogUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取邮件日志")
    public CommonResult<MailLogRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(MailLogConvert.INSTANCE.convertRespVO(mailLogService.get(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除邮件日志")
    @PreAuthorize("@ss.hasPermission('admin:mailLog:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(mailLogService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有邮件日志")
    public CommonResult<List<MailLogRespVO>> listAll() {
        return success(MailLogConvert.INSTANCE.convertListRespVO(mailLogService.listAll()));
    }

    @PostMapping("/export")
    @Operation(summary = "导出邮件日志")
    @PreAuthorize("@ss.hasPermission('admin:mailLog:export')")
    public void export(@RequestBody MailLogExportReqVO exportReqVO, HttpServletResponse response) {
        List<MailLog> mailLogList = mailLogService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, MailLogConvert.INSTANCE.convertToExcelVOList(mailLogList), MailLogExcelVO.class, "邮件日志数据","邮件日志数据.xlsx");
    }
}