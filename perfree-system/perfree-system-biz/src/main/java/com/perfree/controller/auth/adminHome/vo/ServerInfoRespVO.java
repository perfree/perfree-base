package com.perfree.controller.auth.adminHome.vo;

import lombok.Data;

import java.util.List;

@Data
public class ServerInfoRespVO {

    private CpuInfoRespVO cpuInfo;

    private JvmInfoRespVO jvmInfo;

    private MemInfoRespVO memInfo;

    private List<SysFileInfoRespVO> sysFileInfoList;

    private SysInfoRespVO sysInfo;
}
