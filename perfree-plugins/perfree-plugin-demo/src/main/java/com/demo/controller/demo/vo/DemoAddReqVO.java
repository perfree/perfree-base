package com.demo.controller.demo.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "插件demo添加ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DemoAddReqVO extends DemoBaseVO {

}
