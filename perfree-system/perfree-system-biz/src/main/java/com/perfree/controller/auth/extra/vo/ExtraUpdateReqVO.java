package com.perfree.controller.auth.extra.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "附加数据 update RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ExtraUpdateReqVO extends ExtraBaseVO {

    @Schema(description = "id")
    private Integer id;
}
