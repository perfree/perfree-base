package com.perfree.system.api.menu;

import com.perfree.system.api.menu.dto.MenuDTO;

public interface MenuApi {

    /**
     * 创建菜单
     * @param menuDTO menuDTO
     * @return MenuDTO
     */
    MenuDTO createMenu(MenuDTO menuDTO);

    /**
     * 根据插件id删除菜单
     * @return Boolean
     */
    Boolean deleteMenuByPluginId(String pluginId);
}
