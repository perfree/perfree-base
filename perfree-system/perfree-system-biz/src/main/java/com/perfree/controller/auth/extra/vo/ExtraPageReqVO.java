package com.perfree.controller.auth.extra.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "附加数据分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ExtraPageReqVO extends PageParam {
    @Schema(description = "名称")
    private String extraName;
}
