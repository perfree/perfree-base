package com.demo.service.pluginDemo;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.demo.controller.auth.pluginDemo.vo.*;
import com.demo.model.PluginDemo;

import java.util.List;

/**
 * @description 测试 Service
 * @author Perfree
 **/
public interface PluginDemoService extends IService<PluginDemo> {

    /**
     * 测试分页
     * @param pageVO pageVO
     * @return PageResult<PluginDemo>
     */
    PageResult<PluginDemo> pluginDemoPage(PluginDemoPageReqVO pageVO);

    /**
     * 添加测试
     * @param addReqVO addReqVO
     * @return PluginDemo
     */
    PluginDemo add(PluginDemoAddReqVO addReqVO);

    /**
     * 更新测试
     * @param updateReqVO updateReqVO
     * @return PluginDemo
     */
    PluginDemo update(PluginDemoUpdateReqVO updateReqVO);

    /**
     * 根据id获取测试信息
     * @param id id
     * @return PluginDemo
     */
    PluginDemo get(Integer id);

    /**
     * 根据id删除测试
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有测试
     * @return List<PluginDemo>
     */
    List<PluginDemo> listAll();

    /**
     * 查询要导出的数据
     * @param exportReqVO exportReqVO
     * @return List<PluginDemo>
     */
    List<PluginDemo> queryExportData(PluginDemoExportReqVO exportReqVO);
}