package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.perfree.system.api.dictData.dto.DictDataDTO;
import org.springframework.stereotype.Service;

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
    public DictDataDTO getDictDataByDictType(String dictType) {
        return dictDataCache.getIfPresent(dictType);
    }

    /**
     * 根据值获取数据字典
     * @param dictValue dictValue
     * @return DictDataDTO
     */
    public DictDataDTO getDictDataByDictValue(String dictValue) {
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getDictValue().equals(dictValue)) {
                return dictDataDTO;
            }
        }
        return null;
    }

    /**
     * 根据展示值获取数据字典
     * @param dictLabel dictLabel
     * @return DictDataDTO
     */
    public DictDataDTO getDictDataByDictLabel(String dictLabel) {
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getDictLabel().equals(dictLabel)) {
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
    public DictDataDTO getDictDataByDictExtendValue(String dictExtendValue) {
        for (String dictType : dictDataCache.asMap().keySet()) {
            DictDataDTO dictDataDTO = dictDataCache.getIfPresent(dictType);
            if (null != dictDataDTO && dictDataDTO.getDictExtendValue().equals(dictExtendValue)) {
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
