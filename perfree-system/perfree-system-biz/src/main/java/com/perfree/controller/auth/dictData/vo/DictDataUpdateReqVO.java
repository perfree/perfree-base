package com.perfree.controller.auth.dictData.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * @description 数据字典值 AddReqVO
 * @author Perfree
 **/
@Schema(description = "数据字典值AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictDataUpdateReqVO extends DictDataBaseVO{

    @Schema(description = "主键", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer id;
}
