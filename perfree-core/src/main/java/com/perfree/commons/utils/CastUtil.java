package com.perfree.commons.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * Type Conversion Utils
 * @author Perfree
 */
public class CastUtil {

    /**
     * Object To Long
     * @param obj object
     * @param defaultValue defaultValue
     * @return Long
     */
    public static Long objToLong(Object obj, Long defaultValue) {
        if (obj != null && !(obj instanceof Long)) {
            String objStr = obj.toString();
            return StringUtils.isBlank(objStr) ? defaultValue : Long.parseLong(objStr);
        }
        Long result = (Long) obj;
        return result == null ? defaultValue : result;
    }


    /**
     * Object To Integer
     * @param obj object
     * @param defaultValue defaultValue
     * @return Integer
     */
    public static Integer objToInteger(Object obj, Integer defaultValue) {
        if (obj != null && !(obj instanceof Integer)) {
            String objStr = obj.toString();
            return StringUtils.isBlank(objStr) ? defaultValue : Integer.parseInt(objStr);
        }
        Integer result = (Integer) obj;
        return result == null ? defaultValue : result;
    }

    /**
     * String To Integer
     * @param str string
     * @param defaultValue defaultValue
     * @return Integer
     */
    public static Integer strToInteger(String str, Integer defaultValue) {
        if (StringUtils.isBlank(str)) {
            return defaultValue;
        }
        return Integer.parseInt(str);
    }

    /**
     * String To Long
     * @param str String
     * @param defaultValue defaultValue
     * @return Long
     */
    public static Long strToLong(String str, Long defaultValue) {
        if (StringUtils.isBlank(str)) {
            return defaultValue;
        }
        return Long.parseLong(str);
    }

    /**
     * String To Boolean
     * @param str String
     * @param defaultValue defaultValue
     * @return Boolean
     */
    public static Boolean strToBool(String str, Boolean defaultValue){
        if (StringUtils.isBlank(str)) {
            return defaultValue;
        }
        return Boolean.valueOf(str);
    }
}
