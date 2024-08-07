package com.perfree.controller.auth.mailTemplate.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 邮件模板 导出ReqVO
* @author Perfree
**/
@Schema(description = "邮件模板导出ReqVO")
@Data
public class MailTemplateExportReqVO {

    @Schema(description = "模板名称")
    private String name;

    @Schema(description = "模板编码")
    private String code;

    @Schema(description = "邮箱服务id")
    private Integer mailServerId;
}
