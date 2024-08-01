package com.perfree.controller.auth.dictData.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 数据字典值 BaseVO
* @author Perfree
**/
@Data
public class DictDataBaseVO {


    @Schema(description = "展示值", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "展示值不能为空")
    private String dictLabel;

    @Schema(description = "字典值", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "字典值不能为空")
    private String dictValue;

    @Schema(description = "扩展值")
    private String dictExtendValue;

    @Schema(description = "状态", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "状态不能为空")
    private Byte status;

    @Schema(description = "排序", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "排序不能为空")
    private Integer seq;

    @Schema(description = "字典类型", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "字典类型不能为空")
    private String dictType;

    @Schema(description = "父级字典类型", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "父级字典类型不能为空")
    private String parentDictType;
}
