package com.perfree.service.dict;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.model.Dict;

import java.util.List;

/**
 * @description 数据字典 Service
 * @author Perfree
 **/
public interface DictService extends IService<Dict> {

    /**
     * 数据字典分页
     * @param pageVO pageVO
     * @return PageResult<Dict>
     */
    PageResult<Dict> dictPage(DictPageReqVO pageVO);

    /**
     * 添加数据字典
     * @param addReqVO addReqVO
     * @return Dict
     */
    Dict add(DictAddReqVO addReqVO);

    /**
     * 更新数据字典
     * @param updateReqVO updateReqVO
     * @return Dict
     */
    Dict update(DictUpdateReqVO updateReqVO);

    /**
     * 根据id获取数据字典信息
     * @param id id
     * @return Dict
     */
    Dict get(Integer id);

    /**
     * 根据id删除数据字典
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有数据字典
     * @return List<Dict>
     */
    List<Dict> listAll();

    /**
     * 根据条件获取所有数据字典
     * @param dictType dictType
     * @param dictName dictName
     * @return List<Dict>
     */
    List<Dict> queryListAll(String dictType, String dictName);
}