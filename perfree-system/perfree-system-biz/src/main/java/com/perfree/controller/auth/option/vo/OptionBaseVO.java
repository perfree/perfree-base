package com.perfree.controller.auth.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class OptionBaseVO {

    @Schema(description = "key" )
    private String key;

    @Schema(description = "value" )
    private String value;

    @Schema(description = "标识" )
    private String identification;
}
