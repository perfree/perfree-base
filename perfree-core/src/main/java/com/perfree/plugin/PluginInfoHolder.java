package com.perfree.plugin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PluginInfoHolder {

    private final static Map<String, PluginInfo> pluginInfoList = new ConcurrentHashMap<>();

    /**
     * 新增PluginInfo
     * @author perfree
     * @date 2023-09-27 14:09:07
     * @param pluginId 插件id
     * @param pluginInfo pluginInfo
     */
    public static void addPluginInfo(String pluginId, PluginInfo pluginInfo) {
        pluginInfoList.put(pluginId, pluginInfo);
    }

    /**
     * 根据插件id移除PluginInfo
     * @author perfree
     * @date 2023-09-27 14:09:44
     * @param pluginId 插件id
     */
    public static void removePluginInfo(String pluginId) throws IOException {
        pluginInfoList.remove(pluginId);
    }

    /**
     * 根据插件id获取PluginInfo
     * @author perfree
     * @date 2023-09-27 14:09:02
     * @param pluginId 插件id
     * @return PluginInfo
     */
    public static PluginInfo getPluginInfo(String pluginId) {
        return pluginInfoList.get(pluginId);
    }

    /**
     * 获取所有PluginInfo
     * @author perfree
     * @date 2023-09-27 14:09:53
     * @return List<PluginInfo>
     */
    public static List<PluginInfo> getAllPluginInfo() {
        List<PluginInfo> pluginInfos = new ArrayList<>();
        for (String id : pluginInfoList.keySet()) {
            pluginInfos.add(pluginInfoList.get(id));
        }
        return pluginInfos;
    }
}
