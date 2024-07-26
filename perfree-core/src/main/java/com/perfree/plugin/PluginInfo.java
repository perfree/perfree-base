package com.perfree.plugin;

import com.perfree.plugin.core.PluginClassLoader;
import com.perfree.plugin.pojo.PluginBaseConfig;
import lombok.Data;

import java.util.List;

/**
 * @author Perfree
 * @description 插件信息
 * @date 15:35 2023/9/28
 */
@Data
public class PluginInfo {

    // 插件ID
    private String pluginId;

    // 插件内Class集合
    private List<Class<?>> classList;

    // 插件安装路径
    private String pluginPath;

    // 插件配置信息
    private PluginBaseConfig pluginConfig;

    private PluginClassLoader pluginClassLoader;
}
