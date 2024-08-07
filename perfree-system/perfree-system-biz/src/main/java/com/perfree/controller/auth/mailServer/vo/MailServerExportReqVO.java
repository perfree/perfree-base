package com.perfree.controller.auth.mailServer.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 邮箱服务 导出ReqVO
* @author Perfree
**/
@Schema(description = "邮箱服务导出ReqVO")
@Data
public class MailServerExportReqVO {

    @Schema(description = "邮箱服务名称")
    private String name;

    @Schema(description = "邮箱服务账号")
    private String account;
}
