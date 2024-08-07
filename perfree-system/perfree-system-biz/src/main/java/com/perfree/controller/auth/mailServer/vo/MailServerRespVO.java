package com.perfree.controller.auth.mailServer.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @description 邮箱服务 RespVO
 * @author Perfree
 **/
@Schema(description = "邮箱服务RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailServerRespVO extends MailServerBaseVO{

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer id;

    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
