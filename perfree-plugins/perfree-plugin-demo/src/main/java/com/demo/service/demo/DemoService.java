package com.demo.service.demo;

import com.baomidou.mybatisplus.extension.service.IService;
import com.demo.controller.demo.vo.DemoAddReqVO;
import com.demo.controller.demo.vo.DemoPageReqVO;
import com.demo.controller.demo.vo.DemoUpdateReqVO;
import com.demo.model.Demo;
import com.perfree.commons.common.PageResult;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface DemoService extends IService<Demo> {

    /**
     * 插件demo分页列表
     * @param pageVO pageVO
     * @return PageResult<Demo>
     */
    PageResult<Demo> demoPage(DemoPageReqVO pageVO);

    /**
     * 插件demo 添加
     * @param demoAddReqVO demoAddReqVO
     * @return Demo
     */
    Demo addDemo(DemoAddReqVO demoAddReqVO);

    /**
     * 插件demo 更新
     * @param demoUpdateReqVO demoUpdateReqVO
     * @return Demo
     */
    Demo updateLink(DemoUpdateReqVO demoUpdateReqVO);

    /**
     * 删除
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

}
