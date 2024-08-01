package com.perfree.controller.auth.dict.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 数据字典 BaseVO
* @author Perfree
**/
@Data
public class DictBaseVO {


    @Schema(description = "字典类型", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "字典类型不能为空")
    private String dictType;

    @Schema(description = "状态", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "状态不能为空")
    private Byte status;

    @Schema(description = "备注")
    private String remark;

    @Schema(description = "字典名", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "字典名不能为空")
    private String dictName;

    @Schema(description = "排序", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "排序不能为空")
    private Integer seq;
}
