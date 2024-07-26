package com.perfree.controller.auth.option.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "配置RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class OptionRespVO extends OptionBaseVO{

    @Schema(description = "id" )
    private Integer id;
}
