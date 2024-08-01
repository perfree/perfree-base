package com.perfree.controller.auth.dictData.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import com.perfree.commons.common.PageParam;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;


/**
* @description 数据字典值 分页ReqVO
* @author Perfree
**/
@Schema(description = "数据字典值分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictDataPageReqVO extends PageParam {

    @Schema(description = "展示值")
    private String dictLabel;

    @Schema(description = "字典类型")
    private String dictType;

    @Schema(description = "父级字典类型")
    private String parentDictType;
}
