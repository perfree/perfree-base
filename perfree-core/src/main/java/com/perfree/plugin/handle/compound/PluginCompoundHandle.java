package com.perfree.plugin.handle.compound;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.BasePluginRegistryHandler;
import com.perfree.plugin.handle.ClassHandler;
import com.perfree.plugin.handle.ControllerHandler;
import com.perfree.plugin.handle.MapperXmlHandle;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author Perfree
 * @description 定义插件加载运行处理逻辑聚合入口
 * @date 15:34 2023/9/28
 */
@Component
public class PluginCompoundHandle implements BasePluginRegistryHandler, ApplicationContextAware {

    // 主程序applicationContext
    ApplicationContext applicationContext;

    // 定义执行逻辑集合pluginRegisterList
    List<BasePluginRegistryHandler> pluginRegisterList = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void initialize() throws Exception {
        pluginRegisterList.clear();
        pluginRegisterList.add(new ClassHandler());
        pluginRegisterList.add(new MapperXmlHandle());
        pluginRegisterList.add(new ControllerHandler(this.applicationContext));
        for (BasePluginRegistryHandler pluginHandle : pluginRegisterList) {
            pluginHandle.initialize();
        }
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        for (BasePluginRegistryHandler pluginHandle : pluginRegisterList) {
            pluginHandle.registry(plugin);
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        try {
            for (BasePluginRegistryHandler pluginHandle : pluginRegisterList) {
                pluginHandle.unRegistry(plugin);
            }
        } finally {
            plugin.getClassList().clear();
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
