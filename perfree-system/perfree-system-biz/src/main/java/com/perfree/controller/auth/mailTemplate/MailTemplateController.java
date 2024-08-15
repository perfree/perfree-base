package com.perfree.controller.auth.mailTemplate;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.convert.mailTemplate.MailTemplateConvert;
import com.perfree.model.MailTemplate;
import com.perfree.service.mailTemplate.MailTemplateService;
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
* @description 邮件模板 controller
* @author Perfree
**/
@RestController
@Tag(name = "邮件模板相关接口}")
@RequestMapping("api/auth/mailTemplate")
public class MailTemplateController {

    @Resource
    private MailTemplateService mailTemplateService;

    @PostMapping("/page")
    @Operation(summary = "邮件模板分页列表")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:query')")
    public CommonResult<PageResult<MailTemplateRespVO>> page(@RequestBody MailTemplatePageReqVO pageVO) {
        PageResult<MailTemplate> mailTemplatePageResult = mailTemplateService.mailTemplatePage(pageVO);
        return success(MailTemplateConvert.INSTANCE.convertPageResultVO(mailTemplatePageResult));
    }

    @PostMapping("/add")
    @Operation(summary = "添加邮件模板")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:create')")
    public CommonResult<MailTemplateRespVO> add(@RequestBody @Valid MailTemplateAddReqVO mailTemplateAddReqVO) {
        return success(MailTemplateConvert.INSTANCE.convertRespVO(mailTemplateService.add(mailTemplateAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新邮件模板")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:update')")
    public CommonResult<MailTemplateRespVO> update(@RequestBody @Valid MailTemplateUpdateReqVO mailTemplateUpdateReqVO) {
        return success(MailTemplateConvert.INSTANCE.convertRespVO(mailTemplateService.update(mailTemplateUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取邮件模板")
    public CommonResult<MailTemplateRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(MailTemplateConvert.INSTANCE.convertRespVO(mailTemplateService.get(id)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除邮件模板")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(mailTemplateService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有邮件模板")
    public CommonResult<List<MailTemplateRespVO>> listAll() {
        return success(MailTemplateConvert.INSTANCE.convertListRespVO(mailTemplateService.listAll()));
    }

    @PostMapping("/export")
    @Operation(summary = "导出邮件模板")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:export')")
    public void export(@RequestBody MailTemplateExportReqVO exportReqVO, HttpServletResponse response) {
        List<MailTemplate> mailTemplateList = mailTemplateService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, MailTemplateConvert.INSTANCE.convertToExcelVOList(mailTemplateList), MailTemplateExcelVO.class, "邮件模板数据","邮件模板数据.xlsx");
    }

    @PostMapping("/testMail")
    @Operation(summary = "发送测试邮件")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:testMail')")
    public CommonResult<Boolean> testMail(@RequestBody @Valid MailTemplateTestReqVO mailTemplateTestReqVO) {
        return success(mailTemplateService.testMail(mailTemplateTestReqVO));
    }
}