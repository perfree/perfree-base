package com.perfree.controller.auth.mailTemplate.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 邮件模板 AddReqVO
* @author Perfree
**/
@Schema(description = "邮件模板AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailTemplateAddReqVO extends MailTemplateBaseVO{
}
