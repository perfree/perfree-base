package com.perfree.plugin.handle;

import com.perfree.plugin.PluginInfo;

/**
 * @author Perfree
 * @description 定义插件执行逻辑基类
 * @date 15:34 2023/9/28
 */
public interface BasePluginRegistryHandler {

    /**
     * 初始化
     * @author perfree
     * @date 2023-09-27 16:09:56
     */
    void initialize() throws Exception;

    /**
     * 注册
     * @author perfree
     * @date 2023-09-27 16:09:56
     * @param pluginInfo pluginInfo
     */
    void registry(PluginInfo pluginInfo) throws Exception;

    /**
     * 取消注册
     * @author perfree
     * @date 2023-09-27 16:09:56
     * @param pluginInfo pluginInfo
     */
    void unRegistry(PluginInfo pluginInfo) throws Exception;
}
