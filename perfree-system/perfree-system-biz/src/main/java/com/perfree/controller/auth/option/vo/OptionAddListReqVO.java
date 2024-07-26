package com.perfree.controller.auth.option.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "主题配置添加ReqVO")
@Data
public class OptionAddListReqVO {

    private List<OptionAddReqVO> options;
}
