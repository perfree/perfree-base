package com.perfree.plugin.commons;

import com.perfree.commons.exception.ServiceException;
import com.perfree.enums.ErrorCode;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.plugin.pojo.PluginBaseConfig;

import java.util.List;

public class PluginUtils {

    public static PluginBaseConfig getPluginConfig(Class<?> c) {
        ClassLoader classLoader = c.getClassLoader();
        List<PluginInfo> allPluginInfo = PluginInfoHolder.getAllPluginInfo();
        for (PluginInfo pluginInfo : allPluginInfo) {
            if (pluginInfo.getPluginClassLoader() == classLoader) {
                return pluginInfo.getPluginConfig();
            }
        }
       throw new ServiceException(ErrorCode.PLUGIN_NOT_FOUND);
    }
}
