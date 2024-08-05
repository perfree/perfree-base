package com.demo;

import com.perfree.constant.MenuConstant;
import com.perfree.plugin.BasePluginEvent;
import com.perfree.plugin.commons.PluginUtils;
import com.perfree.system.api.menu.MenuApi;
import com.perfree.system.api.menu.dto.MenuDTO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class PluginEventService implements BasePluginEvent {

    @Resource
    private MenuApi menuApi;

    @Override
    public void onStart() {
        System.out.println("---------demo插件启动了-------------");
    }

    @Override
    public void onStop() {
        System.out.println("---------demo插件停止了-------------");
    }

    @Override
    public void onUpdate() {
        System.out.println("---------demo插件更新了-------------");
    }

    @Override
    public void onInstall() {
        System.out.println("---------exam插件安装了-------------");
    }

    @Override
    public void onUnInstall() {
        String pluginId = PluginUtils.getPluginConfig(this.getClass()).getPlugin().getId();
        // 卸载时删除插件菜单
        menuApi.deleteMenuByPluginId(pluginId);
        System.out.println("---------demo插件卸载了-------------");
    }
}
