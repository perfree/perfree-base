package com.perfree.service.mailLog;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailLog.vo.*;
import com.perfree.model.MailLog;

import java.util.List;

/**
 * @description 邮件日志 Service
 * @author Perfree
 **/
public interface MailLogService extends IService<MailLog> {

    /**
     * 邮件日志分页
     * @param pageVO pageVO
     * @return PageResult<MailLog>
     */
    PageResult<MailLog> mailLogPage(MailLogPageReqVO pageVO);

    /**
     * 添加邮件日志
     * @param addReqVO addReqVO
     * @return MailLog
     */
    MailLog add(MailLogAddReqVO addReqVO);

    /**
     * 更新邮件日志
     * @param updateReqVO updateReqVO
     * @return MailLog
     */
    MailLog update(MailLogUpdateReqVO updateReqVO);

    /**
     * 根据id获取邮件日志信息
     * @param id id
     * @return MailLog
     */
    MailLog get(Integer id);

    /**
     * 根据id删除邮件日志
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有邮件日志
     * @return List<MailLog>
     */
    List<MailLog> listAll();

    /**
     * 查询要导出的数据
     * @param exportReqVO exportReqVO
     * @return List<MailLog>
     */
    List<MailLog> queryExportData(MailLogExportReqVO exportReqVO);

    void saveMailLog(MailLog mailLog);

}