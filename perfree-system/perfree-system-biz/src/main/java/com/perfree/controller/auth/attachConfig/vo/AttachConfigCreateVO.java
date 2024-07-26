package com.perfree.controller.auth.attachConfig.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "附件配置createVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachConfigCreateVO extends AttachConfigBaseVO{
}
