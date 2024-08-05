package com.perfree.controller.auth.attach;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attach.vo.*;
import com.perfree.convert.attach.AttachConvert;
import com.perfree.model.Attach;
import com.perfree.service.attach.AttachService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
 * @description 附件管理
 * @author Perfree
 * @version 1.0.0
 * @create 2023/1/15 10:16
 **/
@RestController
@Tag(name = "附件相关接口")
@RequestMapping("api/auth/attach")
public class AttachController {

    private final static Logger LOGGER = LoggerFactory.getLogger(AttachController.class);
    @Resource
    private AttachService attachService;

    @PostMapping("/upload")
    @Operation(summary = "附件上传")
    @PreAuthorize("@ss.hasPermission('admin:attach:upload')")
    public CommonResult<AttachRespVO> upload(AttachUploadVO attachUploadVO) {
        Attach attach = attachService.create(attachUploadVO);
        return success(AttachConvert.INSTANCE.convertRespVO(attach));
    }

    @PostMapping("/page")
    @Operation(summary = "附件分页列表")
    @PreAuthorize("@ss.hasPermission('admin:attach:query')")
    public CommonResult<PageResult<AttachRespVO>> page(@RequestBody AttachPageReqVO pageVO) {
        PageResult<Attach> rolePageResult = attachService.attachPage(pageVO);
        return success(AttachConvert.INSTANCE.convertPageResultVO(rolePageResult));
    }

    @GetMapping("/get")
    @Operation(summary = "获取附件")
    public CommonResult<AttachRespVO> get(@RequestParam(value = "id") Integer id) {
        Attach byId = attachService.getById(id);
        return success(AttachConvert.INSTANCE.convertRespVO(byId));
    }

    @PutMapping("/update")
    @Operation(summary = "修改附件")
    @PreAuthorize("@ss.hasPermission('admin:attach:update')")
    public CommonResult<Boolean> update(@RequestBody AttachUpdateVO attachUpdateVO) {
        return success(attachService.updateAttach(attachUpdateVO));
    }


    @DeleteMapping("/del")
    @Operation(summary = "删除附件")
    @PreAuthorize("@ss.hasPermission('admin:attach:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(attachService.del(id));
    }


    @GetMapping("/getAllAttachGroup")
    @Operation(summary = "获取所有附件分组")
    public CommonResult<List<AttachGroupRespVO>> getAllAttachGroup() {
        List<Attach> attachList = attachService.getAllAttachGroup();
        return success(AttachConvert.INSTANCE.convertGroupRespVO(attachList));
    }

    @PostMapping("/uploadAttachByUrl")
    @Operation(summary = "通过url下载并上传附件")
    public CommonResult<AttachByUrlRespVO> uploadAttachByUrl(@Valid @RequestBody AttachUploadByUrlVO attachUploadByUrlVO) {
        Attach attach = attachService.uploadAttachByUrl(attachUploadByUrlVO.getUrl());
        AttachByUrlRespVO attachByUrlRespVO = AttachConvert.INSTANCE.convertByUrlRespVO(attach);
        attachByUrlRespVO.setOriginalURL(attachUploadByUrlVO.getUrl());
        return success(attachByUrlRespVO);
    }
}
