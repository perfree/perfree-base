package com.perfree.controller.auth.dictData.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @description 数据字典值 RespVO
 * @author Perfree
 **/
@Schema(description = "数据字典值RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class DictDataRespVO extends DictDataBaseVO{

    @Schema(description = "主键", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer id;

    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
