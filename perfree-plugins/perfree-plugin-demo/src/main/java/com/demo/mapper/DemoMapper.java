package com.demo.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.demo.controller.demo.vo.DemoPageReqVO;
import com.demo.model.Demo;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface DemoMapper extends BaseMapperX<Demo> {

    default PageResult<Demo> selectDemoPage(DemoPageReqVO pageVO){
        return selectPage(pageVO, new LambdaQueryWrapper<Demo>()
                .like(StringUtils.isNotBlank(pageVO.getName()), Demo::getName, pageVO.getName())
        );
    }

}
