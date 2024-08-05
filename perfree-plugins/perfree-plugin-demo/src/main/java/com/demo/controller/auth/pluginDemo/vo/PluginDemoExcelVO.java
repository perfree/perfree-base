package com.demo.controller.auth.pluginDemo.vo;

import com.alibaba.excel.annotation.*;
import com.alibaba.excel.annotation.format.*;
import com.perfree.commons.excel.*;
import com.perfree.constant.UserConstant;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class PluginDemoExcelVO {

    @ExcelProperty("名称")
    private String name;

    @ExcelProperty("信息")
    private String msg;

    @ExcelProperty("创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
