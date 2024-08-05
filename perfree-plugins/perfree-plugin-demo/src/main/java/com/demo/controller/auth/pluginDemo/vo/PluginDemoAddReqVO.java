package com.demo.controller.auth.pluginDemo.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 测试 AddReqVO
* @author Perfree
**/
@Schema(description = "测试AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class PluginDemoAddReqVO extends PluginDemoBaseVO{
}
