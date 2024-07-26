package com.perfree.commons.utils;

import com.perfree.commons.common.PageParam;
import com.perfree.commons.common.SortingField;

import java.util.ArrayList;
import java.util.Collection;

/**
 * 排序相关工具类
 */
public class SortingFieldUtils {

    /**
     * 处理排序规则
     * @param pageParam pageParam
     */
    public static void handleDefaultSortingField(PageParam pageParam) {
        // 如果未接收到排序字段,那么放入默认的排序规则
        if (null == pageParam.getSortingFields() || pageParam.getSortingFields().isEmpty()) {
            pageParam.setSortingFields(new ArrayList<>());
            pageParam.getSortingFields().add(new SortingField("createTime", SortingField.ORDER_DESC));
        }
    }

    /**
     * 自定义排序字段,会优先使用前端传过来的,如果前端未传,才会使用默认的
     * @param pageParam pageParam
     * @param sortingFields sortingFields
     */
    public static void handleCustomSortingField(PageParam pageParam, Collection<SortingField> sortingFields) {
        // 如果未接收到排序字段,那么放入默认的排序规则
        if (null == pageParam.getSortingFields() || pageParam.getSortingFields().isEmpty()) {
            if (null != sortingFields && !sortingFields.isEmpty()) {
                pageParam.setSortingFields(sortingFields.stream().toList());
            }
        }
    }
}
