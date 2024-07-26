package com.perfree.service.role;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.role.vo.RoleAddOrUpdateReqVO;
import com.perfree.controller.auth.role.vo.RoleMenuReqVO;
import com.perfree.controller.auth.role.vo.RolePageReqVO;
import com.perfree.convert.role.RoleConvert;
import com.perfree.mapper.RoleMapper;
import com.perfree.mapper.RoleMenuMapper;
import com.perfree.model.Role;
import com.perfree.model.RoleMenu;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private RoleMenuMapper roleMenuMapper;


    @Override
    public PageResult<Role> rolePage(RolePageReqVO pageVO) {
        SortingFieldUtils.handleDefaultSortingField(pageVO);
        return roleMapper.selectPage(pageVO);
    }

    @Override
    public List<RoleMenu> getRoleMenus(Integer id) {
        return roleMenuMapper.selectByRoleId(id);
    }

    @Override
    @Transactional
    public Boolean assignRoleMenu(RoleMenuReqVO roleMenuReqVO) {
        roleMenuMapper.deleteByRoleId(roleMenuReqVO.getRoleId());
        List<RoleMenu> roleMenuList = new ArrayList<>();
        for (String menuId : roleMenuReqVO.getMenuIds()) {
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setRoleId(roleMenuReqVO.getRoleId());
            roleMenu.setMenuId(menuId);
            roleMenuList.add(roleMenu);
        }
        roleMenuMapper.insertBatch(roleMenuList);
        return true;
    }

    @Override
    public Role get(Integer id) {
        return roleMapper.selectById(id);
    }

    @Override
    public Role addOrUpdate(RoleAddOrUpdateReqVO roleAddOrUpdateReqVO) {
        Role role = RoleConvert.INSTANCE.convertAddOrUpdate(roleAddOrUpdateReqVO);
        if (null != role.getId()) {
            roleMapper.updateById(role);
        } else {
            roleMapper.insert(role);
        }
        return role;
    }

    @Override
    public Boolean del(Integer id) {
        roleMenuMapper.deleteByRoleId(id);
        roleMapper.deleteById(id);
        return true;
    }

    @Override
    public List<Role> getByUserId(Integer userId) {
        return roleMapper.getByUserId(userId);
    }
}
