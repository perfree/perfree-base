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
        // ----这里演示安装时增加插件的菜单,当然,你也可以把这一部分放在安装sql里-------------------

        // 获取插件id
        String pluginId = PluginUtils.getPluginConfig(this.getClass()).getPlugin().getId();

        // 先根据插件id清空该插件的菜单,主要是为了防止冗余数据
        menuApi.deleteMenuByPluginId(pluginId);

        // 演示创建一个目录菜单
        MenuDTO parentMenu = MenuDTO.builder()
                // 菜单类型,菜单
                .menuType(MenuConstant.MENU_MENU_TYPE_DIR)
                // 注意,插件id必须和插件配置文件中的id保持一致
                .pluginId(pluginId)
                // 菜单名称
                .name("演示插件")
                // 图标
                .icon("fa-solid fa-feather")
                // 菜单父级ID, -1 为根节点
                .pid(MenuConstant.ROOT_MENU_CODE)
                // 菜单排序
                .seq(99)
                .build();
        parentMenu = menuApi.createMenu(parentMenu);


        // 演示创建一个子菜单
        MenuDTO menuDTO = MenuDTO.builder()
                // 菜单类型,菜单
                .menuType(MenuConstant.MENU_MENU_TYPE_MENU)
                // 注意,插件id必须和插件配置文件中的id保持一致
                .pluginId(pluginId)
                // 菜单名称
                .name("测试菜单")
                // 菜单父级ID, -1 为根节点
                .pid(parentMenu.getId())
                // 菜单排序
                .seq(0)
                // 模块名称,对应前端中modules目录第一层级的目录名称
                .moduleName("demo")
                // 前端组件地址,
                .component("/view/DemoView")
                // 组件名称(主要用来做区分,建议唯一)
                .componentName(pluginId + "-demo")
                // 菜单打开方式
                .target(MenuConstant.MENU_TARGET_SELF)
                // 菜单地址(前端的真实访问地址, 这里统一以/admin/plugin/插件id作为前缀,对应ViewController)
                .url("/admin/plugin/" + pluginId + "/demo")
                // 菜单图标
                .icon("fa-solid fa-feather")
                // 是否为外链
                .isFrame(MenuConstant.MENU_NOT_FRAME)
                .build();
        menuApi.createMenu(menuDTO);
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
