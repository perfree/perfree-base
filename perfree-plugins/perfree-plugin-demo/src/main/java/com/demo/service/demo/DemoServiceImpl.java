package com.demo.service.demo;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.demo.controller.demo.vo.DemoAddReqVO;
import com.demo.controller.demo.vo.DemoPageReqVO;
import com.demo.controller.demo.vo.DemoUpdateReqVO;
import com.demo.convert.DemoConvert;
import com.demo.mapper.DemoMapper;
import com.demo.model.Demo;
import com.perfree.commons.common.PageResult;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class DemoServiceImpl extends ServiceImpl<DemoMapper, Demo> implements DemoService {

    @Resource
    private DemoMapper demoMapper;

    @Resource
    private DemoConvert demoConvert;


    @Override
    public PageResult<Demo> demoPage(DemoPageReqVO pageVO) {
        return demoMapper.selectDemoPage(pageVO);
    }

    @Override
    public Demo addDemo(DemoAddReqVO demoAddReqVO) {
        Demo demo = demoConvert.convertAddReqVOToModel(demoAddReqVO);
        demoMapper.insert(demo);
        return demo;
    }

    @Override
    public Demo updateLink(DemoUpdateReqVO demoUpdateReqVO) {
        Demo demo = demoConvert.convertUpdateReqVOToModel(demoUpdateReqVO);
        demoMapper.updateById(demo);
        return demo;
    }

    @Override
    public Boolean del(Integer id) {
        demoMapper.deleteById(id);
        return true;
    }
}
