package com.perfree.controller.auth.mailServer.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 邮箱服务 AddReqVO
* @author Perfree
**/
@Schema(description = "邮箱服务AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class MailServerAddReqVO extends MailServerBaseVO{
}