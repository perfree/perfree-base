package com.demo.controller.auth.pluginDemo.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 测试 BaseVO
* @author Perfree
**/
@Data
public class PluginDemoBaseVO {


    @Schema(description = "名称")
    private String name;

    @Schema(description = "信息")
    private String msg;
}
