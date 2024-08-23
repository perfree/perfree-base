package com.perfree.controller.auth.adminHome.vo;

import lombok.Data;

@Data
public class HomeStatisticRespVO {

    private Long userTotal;

    private Long attachTotal;

    private Long installPluginTotal;

    private Long runningPluginTotal;

    private Long attachImageTotal;

    private Long attachVideoTotal;

    private Long attachAudioTotal;

    private Long attachOtherTotal;
}
