package com.perfree.service.adminHome;

import com.perfree.controller.auth.adminHome.vo.HomeStatisticRespVO;
import com.perfree.controller.auth.adminHome.vo.ServerInfoRespVO;

public interface AdminHomeService {

    /**
     * 获取系统服务信息
     * @return ServerInfoRespVO
     */
    ServerInfoRespVO getServerInfo();

    /**
     * 获取首页统计信息
     * @return HomeStatisticRespVO
     */
    HomeStatisticRespVO getHomeStatistic();
}
