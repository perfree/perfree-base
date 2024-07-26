package com.perfree.plugin;

/**
 * @author Perfree
 * @description 插件事件接口,所有的插件想要监听生命周期,需实现该接口
 * @date 15:35 2023/9/28
 */
public interface BasePluginEvent {

    /**
     * 插件启动时加载
     * @author perfree
     * @date 2023-09-27 16:09:05
     */
    void onStart();

    /**
     * 插件停止时加载
     * @author perfree
     * @date 2023-09-27 16:09:05
     */
    void onStop();

    /**
     * 插件更新时加载
     * @author perfree
     * @date 2023-09-27 16:09:05
     */
    void onUpdate();

    /**
     * 插件安装时加载
     * @author perfree
     * @date 2023-09-27 16:09:05
     */
    void onInstall();

    /**
     * 插件卸载时调用
     * @author perfree
     * @date 2023-09-27 16:09:05
     */
    void onUnInstall();
}
