package com.perfree.commons.utils;

import com.perfree.commons.common.SortingField;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class DirectiveSortingUtils {

    public static List<SortingField> handleSortingField(String orderByStr) {
        List<SortingField> sortingFields = new ArrayList<>();
        if (StringUtils.isBlank(orderByStr)) {
            return sortingFields;
        }
        String[] split = orderByStr.split(",");
        for (String orderByItem : split) {
            String[] orderByDetail = orderByItem.split(" ");
            SortingField sortingField = new SortingField();
            sortingField.setField(orderByDetail[0]);
            if (orderByDetail.length < 2) {
                sortingField.setOrder(SortingField.ORDER_ASC);
                sortingFields.add(sortingField);
                return sortingFields;
            }

            if (orderByDetail[1].equals(SortingField.ORDER_ASC)) {
                sortingField.setOrder(SortingField.ORDER_ASC);
            } else if (orderByDetail[1].equals(SortingField.ORDER_DESC)) {
                sortingField.setOrder(SortingField.ORDER_DESC);
            } else {
                sortingField.setOrder(SortingField.ORDER_ASC);
            }
            sortingFields.add(sortingField);
            return sortingFields;
        }
        return sortingFields;
    }
}
