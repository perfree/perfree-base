package com.perfree.controller.auth.mailTemplate.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import com.perfree.commons.common.PageParam;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 邮件模板 分页ReqVO
* @author Perfree
**/
@Schema(description = "邮件模板分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailTemplatePageReqVO extends PageParam {

    @Schema(description = "模板名称")
    private String name;

    @Schema(description = "模板编码")
    private String code;

    @Schema(description = "邮箱服务id")
    private Integer mailServerId;
}
