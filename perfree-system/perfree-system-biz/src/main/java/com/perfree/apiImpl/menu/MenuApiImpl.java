package com.perfree.apiImpl.menu;

import com.perfree.convert.menu.MenuConvert;
import com.perfree.model.Menu;
import com.perfree.service.menu.MenuService;
import com.perfree.system.api.menu.MenuApi;
import com.perfree.system.api.menu.dto.MenuDTO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MenuApiImpl implements MenuApi {

    private final static Logger LOGGER = LoggerFactory.getLogger(MenuApiImpl.class);
    @Resource
    private MenuService menuService;

    @Override
    public MenuDTO createMenu(MenuDTO menuDTO) {
        Menu menu = MenuConvert.INSTANCE.convertByDTO(menuDTO);
        menu = menuService.createMenu(menu);
        return MenuConvert.INSTANCE.convertToDTO(menu);
    }

    @Override
    public Boolean deleteMenuByPluginId(String pluginId) {
        return menuService.deleteMenuByPluginId(pluginId);
    }
}
