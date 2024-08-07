package com.perfree.controller.auth.mailServer.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import com.perfree.commons.common.PageParam;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 邮箱服务 分页ReqVO
* @author Perfree
**/
@Schema(description = "邮箱服务分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailServerPageReqVO extends PageParam {

    @Schema(description = "邮箱服务名称")
    private String name;

    @Schema(description = "邮箱服务账号")
    private String account;
}
