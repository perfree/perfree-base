package com.perfree.controller.auth.mailTemplate.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 邮件模板 BaseVO
* @author Perfree
**/
@Data
public class MailTemplateBaseVO {


    @Schema(description = "模板名称", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "模板名称不能为空")
    private String name;

    @Schema(description = "模板编码", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "模板编码不能为空")
    private String code;

    @Schema(description = "邮箱服务id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "邮箱服务id不能为空")
    private Integer mailServerId;

    @Schema(description = "发送人名称", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "发送人名称不能为空")
    private String nickname;

    @Schema(description = "邮件标题", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮件标题不能为空")
    private String mailTitle;

    @Schema(description = "邮件内容", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotEmpty(message = "邮件内容不能为空")
    private String mailContent;

    @Schema(description = "状态", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "状态不能为空")
    private Integer status;

    @Schema(description = "备注")
    private String remark;
}
