package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.mailLog.vo.*;
import com.perfree.model.MailLog;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 邮件日志
* @author Perfree
*/
@Mapper
public interface MailLogMapper extends BaseMapperX<MailLog> {

    default PageResult<MailLog> selectPage(MailLogPageReqVO reqVO) {
        LambdaQueryWrapper<MailLog> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getMailTemplateCode()), MailLog::getMailTemplateCode, reqVO.getMailTemplateCode());
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 0 && reqVO.getSendDate()[0] != null) {
            lambdaQueryWrapper.ge(MailLog::getSendDate, reqVO.getSendDate()[0]);
        }
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 1 && reqVO.getSendDate()[1] != null) {
            lambdaQueryWrapper.le(MailLog::getSendDate, reqVO.getSendDate()[1]);
        }
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getReceiveMail()), MailLog::getReceiveMail, reqVO.getReceiveMail());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getMailTitle()), MailLog::getMailTitle, reqVO.getMailTitle());
        lambdaQueryWrapper.eq(null != reqVO.getSendStatus(), MailLog::getSendStatus, reqVO.getSendStatus());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getSendMail()), MailLog::getSendMail, reqVO.getSendMail());
        lambdaQueryWrapper.orderByDesc(MailLog::getId);
        return selectPage(reqVO, lambdaQueryWrapper);
    }

    default List<MailLog> listAll() {
        return selectList(new LambdaQueryWrapper<MailLog>()
            .orderByDesc(MailLog::getId)
        );
    }

    default List<MailLog> queryExportData(MailLogExportReqVO reqVO){
        LambdaQueryWrapper<MailLog> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getMailTemplateCode()), MailLog::getMailTemplateCode, reqVO.getMailTemplateCode());
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 0 && reqVO.getSendDate()[0] != null) {
            lambdaQueryWrapper.ge(MailLog::getSendDate, reqVO.getSendDate()[0]);
        }
        if (reqVO.getSendDate() != null && reqVO.getSendDate().length > 1 && reqVO.getSendDate()[1] != null) {
            lambdaQueryWrapper.le(MailLog::getSendDate, reqVO.getSendDate()[1]);
        }
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getReceiveMail()), MailLog::getReceiveMail, reqVO.getReceiveMail());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getMailTitle()), MailLog::getMailTitle, reqVO.getMailTitle());
        lambdaQueryWrapper.eq(null != reqVO.getSendStatus(), MailLog::getSendStatus, reqVO.getSendStatus());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getSendMail()), MailLog::getSendMail, reqVO.getSendMail());
        lambdaQueryWrapper.orderByDesc(MailLog::getId);
        return selectList(lambdaQueryWrapper);
    }

}