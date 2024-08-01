package com.perfree.service.dictData;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.convert.dictData.DictDataConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.DictDataMapper;
import com.perfree.model.DictData;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @description 数据字典值 ServiceImpl
 * @author Perfree
 **/
@Service
public class DictDataServiceImpl extends ServiceImpl<DictDataMapper, DictData> implements DictDataService {

    @Resource
    private DictDataMapper dictDataMapper;


    @Override
    public PageResult<DictData> dictDataPage(DictDataPageReqVO pageVO) {
        return dictDataMapper.selectPage(pageVO);
    }

    @Override
    @Transactional
    public DictData add(DictDataAddReqVO dictDataAddReqVO) {
        DictData queryDictData = dictDataMapper.queryByDictType(dictDataAddReqVO.getDictType());
        if (null != queryDictData) {
            throw new ServiceException(ErrorCode.DICT_DATA_EXIST);
        }
        DictData dictData = DictDataConvert.INSTANCE.convertAddReqVO(dictDataAddReqVO);
        dictDataMapper.insert(dictData);
        return dictData;
    }

    @Override
    @Transactional
    public DictData update(DictDataUpdateReqVO dictDataUpdateReqVO) {
        DictData queryDictData = dictDataMapper.queryByDictType(dictDataUpdateReqVO.getDictType());
        if (null != queryDictData && !queryDictData.getId().equals(dictDataUpdateReqVO.getId())) {
            throw new ServiceException(ErrorCode.DICT_DATA_EXIST);
        }
        DictData dictData = DictDataConvert.INSTANCE.convertUpdateReqVO(dictDataUpdateReqVO);
        dictDataMapper.updateById(dictData);
        return dictData;
    }

    @Override
    public DictData get(Integer id) {
        return dictDataMapper.selectById(id);
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        dictDataMapper.deleteById(id);
        return true;
    }

    @Override
    public List<DictData> listAll() {
        return dictDataMapper.listAll();
    }
}
