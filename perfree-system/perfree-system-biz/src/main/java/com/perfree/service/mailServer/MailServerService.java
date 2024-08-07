package com.perfree.service.mailServer;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailServer.vo.*;
import com.perfree.model.MailServer;

import java.util.List;

/**
 * @description 邮箱服务 Service
 * @author Perfree
 **/
public interface MailServerService extends IService<MailServer> {

    /**
     * 邮箱服务分页
     * @param pageVO pageVO
     * @return PageResult<MailServer>
     */
    PageResult<MailServer> mailServerPage(MailServerPageReqVO pageVO);

    /**
     * 添加邮箱服务
     * @param addReqVO addReqVO
     * @return MailServer
     */
    MailServer add(MailServerAddReqVO addReqVO);

    /**
     * 更新邮箱服务
     * @param updateReqVO updateReqVO
     * @return MailServer
     */
    MailServer update(MailServerUpdateReqVO updateReqVO);

    /**
     * 根据id获取邮箱服务信息
     * @param id id
     * @return MailServer
     */
    MailServer get(Integer id);

    /**
     * 根据id删除邮箱服务
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有邮箱服务
     * @return List<MailServer>
     */
    List<MailServer> listAll();

    /**
     * 查询要导出的数据
     * @param exportReqVO exportReqVO
     * @return List<MailServer>
     */
    List<MailServer> queryExportData(MailServerExportReqVO exportReqVO);
}