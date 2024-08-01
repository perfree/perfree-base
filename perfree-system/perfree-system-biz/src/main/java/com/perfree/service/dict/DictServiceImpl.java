package com.perfree.service.dict;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.convert.dict.DictConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.DictDataMapper;
import com.perfree.mapper.DictMapper;
import com.perfree.model.Dict;
import com.perfree.model.DictData;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @description 数据字典 ServiceImpl
 * @author Perfree
 **/
@Service
public class DictServiceImpl extends ServiceImpl<DictMapper, Dict> implements DictService {

    @Resource
    private DictMapper dictMapper;

    @Resource
    private DictDataMapper dictDataMapper;


    @Override
    public PageResult<Dict> dictPage(DictPageReqVO pageVO) {
        return dictMapper.selectPage(pageVO);
    }

    @Override
    @Transactional
    public Dict add(DictAddReqVO dictAddReqVO) {
        Dict queryDict = dictMapper.queryByDictType(dictAddReqVO.getDictType());
        if (null != queryDict) {
            throw new ServiceException(ErrorCode.DICT_TYPE_EXIST);
        }
        Dict dict = DictConvert.INSTANCE.convertAddReqVO(dictAddReqVO);
        dictMapper.insert(dict);
        return dict;
    }

    @Override
    @Transactional
    public Dict update(DictUpdateReqVO dictUpdateReqVO) {
        Dict queryDict = dictMapper.queryByDictType(dictUpdateReqVO.getDictType());
        if (null != queryDict && !queryDict.getId().equals(dictUpdateReqVO.getId())) {
            throw new ServiceException(ErrorCode.DICT_TYPE_EXIST);
        }
        Dict dict = DictConvert.INSTANCE.convertUpdateReqVO(dictUpdateReqVO);
        dictMapper.updateById(dict);
        return dict;
    }

    @Override
    public Dict get(Integer id) {
        return dictMapper.selectById(id);
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        Dict dict = dictMapper.selectById(id);
        List<DictData> dictDataList = dictDataMapper.queryByParentDictType(dict.getDictType());
        if (!dictDataList.isEmpty()) {
            throw new ServiceException(ErrorCode.NO_DEL_EXIST_DICT_DATA);
        }
        dictMapper.deleteById(id);
        return true;
    }

    @Override
    public List<Dict> listAll() {
        return dictMapper.listAll();
    }

    @Override
    public List<Dict> queryListAll(String dictType, String dictName) {
        return dictMapper.queryListAll(dictType, dictName);
    }
}
