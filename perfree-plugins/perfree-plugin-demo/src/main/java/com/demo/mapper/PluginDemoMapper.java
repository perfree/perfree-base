package com.demo.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.demo.controller.auth.pluginDemo.vo.*;
import com.demo.model.PluginDemo;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 测试
* @author Perfree
*/
@Mapper
public interface PluginDemoMapper extends BaseMapperX<PluginDemo> {

    default PageResult<PluginDemo> selectPage(PluginDemoPageReqVO reqVO) {
        LambdaQueryWrapper<PluginDemo> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), PluginDemo::getName, reqVO.getName());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getMsg()), PluginDemo::getMsg, reqVO.getMsg());
        lambdaQueryWrapper.orderByDesc(PluginDemo::getId);
        return selectPage(reqVO, lambdaQueryWrapper);
    }

    default List<PluginDemo> listAll() {
        return selectList(new LambdaQueryWrapper<PluginDemo>()
            .orderByDesc(PluginDemo::getId)
        );
    }

    default List<PluginDemo> queryExportData(PluginDemoExportReqVO reqVO){
        LambdaQueryWrapper<PluginDemo> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getName()), PluginDemo::getName, reqVO.getName());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getMsg()), PluginDemo::getMsg, reqVO.getMsg());
        lambdaQueryWrapper.orderByDesc(PluginDemo::getId);
        return selectList(lambdaQueryWrapper);
    }

}