package com.perfree.service.adminHome;

import com.perfree.controller.auth.adminHome.vo.ServerInfoRespVO;

public interface AdminHomeService {

    /**
     * 获取系统服务信息
     * @return ServerInfoRespVO
     */
    ServerInfoRespVO getServerInfo();
}
