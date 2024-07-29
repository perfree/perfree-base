package com.perfree.service.role;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.role.vo.RoleAddReqVO;
import com.perfree.controller.auth.role.vo.RoleMenuReqVO;
import com.perfree.controller.auth.role.vo.RolePageReqVO;
import com.perfree.controller.auth.role.vo.RoleUpdateReqVO;
import com.perfree.model.Role;
import com.perfree.model.RoleMenu;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface RoleService extends IService<Role> {

    /**
     * 角色分页
     * @param pageVO pageVO
     * @return PageResult<Role>
     */
    PageResult<Role> rolePage(RolePageReqVO pageVO);


    /**
     * 根据角色id获取拥有的菜单list
     * @param id id
     * @return List<RoleMenu>
     */
    List<RoleMenu> getRoleMenus(Integer id);

    /**
     * 设置角色菜单权限
     * @param roleMenuReqVO roleMenuReqVO
     * @return Boolean
     */
    Boolean assignRoleMenu(RoleMenuReqVO roleMenuReqVO);

    /**
     * 获取角色信息
     * @param id id
     * @return Role
     */
    Role get(Integer id);

    /**
     * 添加
     * @param roleAddReqVO roleAddReqVO
     * @return Role
     */
    Role add(RoleAddReqVO roleAddReqVO);

    /**
     * 更新
     * @param roleUpdateReqVO roleUpdateReqVO
     * @return Role
     */
    Role update(RoleUpdateReqVO roleUpdateReqVO);

    /**
     * 删除角色
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 根据用户id获取角色列表
     * @param userId userId
     * @return List<Role>
     */
    List<Role> getByUserId(Integer userId);
}
