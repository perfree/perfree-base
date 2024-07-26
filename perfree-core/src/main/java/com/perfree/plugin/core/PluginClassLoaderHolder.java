package com.perfree.plugin.core;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PluginClassLoaderHolder {
    private final static Map<String, PluginClassLoader> pluginClassLoaders = new ConcurrentHashMap<>();

    public static void addPluginClassLoader(String pluginId, PluginClassLoader pluginClassLoader) {
        pluginClassLoaders.put(pluginId, pluginClassLoader);
    }

    public static PluginClassLoader getPluginClassLoader(String pluginId) {
        return pluginClassLoaders.get(pluginId);
    }

}
