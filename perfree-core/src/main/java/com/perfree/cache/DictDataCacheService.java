package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.perfree.system.api.dictData.dto.DictDataDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Perfree
 * @description 数据字典缓存相关
 */
@Service
public class DictDataCacheService {
    private final Cache<String, DictDataDTO> dictDataCache;

    public DictDataCacheService() {
        dictDataCache = CacheBuilder.newBuilder().build();
    }

    /**
     * 新增数据字典缓存
     * @param dictType dictType
     * @param dictDataDTO dictDataDTO
     */
    public void putDictData(String dictType, DictDataDTO dictDataDTO) {
        dictDataCache.put(dictType, dictDataDTO);
    }

    /**
     * 根据类型获取数据字典
     * @param dictType dictType
     * @return DictDataDTO
     */
    public DictDataDTO getByDictType(String dictType) {
        return dictDataCache.getIfPresent(dictType);
    }

    /**
     * 根据值和父级数据字典类型获取数据字典
     * @param dictValue dictValue
     * @param parentDictType parentDictType
     * @return DictDataDTO
     */
    public DictDataDTO getByDictValueAndParentDictType(String parentDictType, String dictValue) {
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getDictValue().equals(dictValue) && dictDataDTO.getParentDictType().equals(parentDictType)) {
                return dictDataDTO;
            }
        }
        return null;
    }

    /**
     * 获取所有值
     * @return DictDataDTO
     */
    public List<DictDataDTO> getAllDictData() {
        List<DictDataDTO> result = new ArrayList<>();
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            result.add(dictDataDTO);
        }
        return result;
    }

    /**
     * 根据父级数据字典类型获取所有数据字典值
     * @return DictDataDTO
     */
    public List<DictDataDTO> getByParentDictType(String parentDictType) {
        List<DictDataDTO> result = new ArrayList<>();
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getParentDictType().equals(parentDictType)) {
                result.add(dictDataDTO);
            }
        }
        return result;
    }

    /**
     * 根据展示值获取数据字典
     * @param dictLabel dictLabel
     * @return DictDataDTO
     */
    public DictDataDTO getByDictLabelAndParentDictType(String parentDictType, String dictLabel) {
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getDictLabel().equals(dictLabel) && dictDataDTO.getParentDictType().equals(parentDictType)) {
                return dictDataDTO;
            }
        }
        return null;
    }

    /**
     * 根据扩展值获取数据字典
     * @param dictExtendValue dictExtendValue
     * @return DictDataDTO
     */
    public DictDataDTO getByDictExtendValueAndParentDictType(String parentDictType, String dictExtendValue) {
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getDictExtendValue().equals(dictExtendValue) && dictDataDTO.getParentDictType().equals(parentDictType)) {
                return dictDataDTO;
            }
        }
        return null;
    }

    /**
     * 移除数据字典缓存
     * @param dictType dictType
     */
    public void removeDictData(String dictType) {
        dictDataCache.invalidate(dictType);
    }
}
