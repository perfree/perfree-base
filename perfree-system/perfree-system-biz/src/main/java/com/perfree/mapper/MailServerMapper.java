package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.mailServer.vo.*;
import com.perfree.model.MailServer;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 邮箱服务
* @author Perfree
*/
@Mapper
public interface MailServerMapper extends BaseMapperX<MailServer> {

    default PageResult<MailServer> selectPage(MailServerPageReqVO reqVO) {
        LambdaQueryWrapper<MailServer> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), MailServer::getName, reqVO.getName());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getAccount()), MailServer::getAccount, reqVO.getAccount());
        lambdaQueryWrapper.orderByDesc(MailServer::getId);
        return selectPage(reqVO, lambdaQueryWrapper);
    }

    default List<MailServer> listAll() {
        return selectList(new LambdaQueryWrapper<MailServer>()
            .orderByDesc(MailServer::getId)
        );
    }

    default List<MailServer> queryExportData(MailServerExportReqVO reqVO){
        LambdaQueryWrapper<MailServer> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), MailServer::getName, reqVO.getName());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getAccount()), MailServer::getAccount, reqVO.getAccount());
        lambdaQueryWrapper.orderByDesc(MailServer::getId);
        return selectList(lambdaQueryWrapper);
    }

}