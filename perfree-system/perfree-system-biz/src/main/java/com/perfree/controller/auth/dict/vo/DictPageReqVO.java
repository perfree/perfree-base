package com.perfree.controller.auth.dict.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import com.perfree.commons.common.PageParam;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 数据字典 分页ReqVO
* @author Perfree
**/
@Schema(description = "数据字典分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictPageReqVO extends PageParam {

    @Schema(description = "字典类型")
    private String dictType;

    @Schema(description = "字典名")
    private String dictName;
}
