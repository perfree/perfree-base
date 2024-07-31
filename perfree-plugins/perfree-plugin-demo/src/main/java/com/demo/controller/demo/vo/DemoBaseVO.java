package com.demo.controller.demo.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DemoBaseVO {

    @Schema(description = "名称", requiredMode = Schema.RequiredMode.REQUIRED, example = "测试")
    @NotBlank(message = "名称不能为空")
    private String name;

    @Schema(description = "信息")
    private String msg;

}
