package com.demo.convert.pluginDemo;

import com.perfree.commons.common.PageResult;
import com.demo.controller.auth.pluginDemo.vo.*;
import com.demo.model.PluginDemo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 测试 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface PluginDemoConvert {
    PluginDemoConvert INSTANCE = Mappers.getMapper(PluginDemoConvert.class);

    /**
     * model转RespVO
     * @param pluginDemo pluginDemo
     * @return PluginDemoRespVO
     */
    PluginDemoRespVO convertRespVO(PluginDemo pluginDemo);

    /**
     * model PageResult转RespVO PageResult
     * @param pluginDemoPageResult pluginDemoPageResult
     * @return PageResult
     */
    PageResult<PluginDemoRespVO> convertPageResultVO(PageResult<PluginDemo> pluginDemoPageResult);

    /**
     * AddReqVO转model
     * @param pluginDemoAddReqVO pluginDemoAddReqVO
     * @return PluginDemo
     */
    PluginDemo convertAddReqVO(PluginDemoAddReqVO pluginDemoAddReqVO);

    /**
     * UpdateReqVO转model
     * @param pluginDemoUpdateReqVO pluginDemoUpdateReqVO
     * @return PluginDemo
     */
    PluginDemo convertUpdateReqVO(PluginDemoUpdateReqVO pluginDemoUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<PluginDemoRespVO>
     */
    List<PluginDemoRespVO> convertListRespVO(List<PluginDemo> list);

    /**
     * model List转ExcelVO List
     * @param list list
     * @return List<PluginDemoExcelVO>
     */
    List<PluginDemoExcelVO> convertToExcelVOList(List<PluginDemo> list);
}