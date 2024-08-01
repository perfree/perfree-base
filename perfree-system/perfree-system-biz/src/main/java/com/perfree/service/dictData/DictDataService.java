package com.perfree.service.dictData;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.model.DictData;

import java.util.List;

/**
 * @description 数据字典值 Service
 * @author Perfree
 **/
public interface DictDataService extends IService<DictData> {

    /**
     * 数据字典值分页
     * @param pageVO pageVO
     * @return PageResult<DictData>
     */
    PageResult<DictData> dictDataPage(DictDataPageReqVO pageVO);

    /**
     * 添加数据字典值
     * @param addReqVO addReqVO
     * @return DictData
     */
    DictData add(DictDataAddReqVO addReqVO);

    /**
     * 更新数据字典值
     * @param updateReqVO updateReqVO
     * @return DictData
     */
    DictData update(DictDataUpdateReqVO updateReqVO);

    /**
     * 根据id获取数据字典值信息
     * @param id id
     * @return DictData
     */
    DictData get(Integer id);

    /**
     * 根据id删除数据字典值
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有数据字典值
     * @return List<DictData>
     */
    List<DictData> listAll();
}