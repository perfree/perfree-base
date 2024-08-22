package com.perfree.controller.auth.adminHome.vo;

import lombok.Data;

@Data
public class HomeStatisticRespVO {

    private Long userTotal;

    private Long attachTotal;

    private Long installPluginTotal;

    private Long runningPluginTotal;
}
