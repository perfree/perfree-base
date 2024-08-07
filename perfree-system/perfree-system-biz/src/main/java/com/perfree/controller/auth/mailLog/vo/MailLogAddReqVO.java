package com.perfree.controller.auth.mailLog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 邮件日志 AddReqVO
* @author Perfree
**/
@Schema(description = "邮件日志AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailLogAddReqVO extends MailLogBaseVO{
}
