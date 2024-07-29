package com.perfree.service.extra;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.extra.vo.ExtraAddReqVO;
import com.perfree.controller.auth.extra.vo.ExtraPageReqVO;
import com.perfree.controller.auth.extra.vo.ExtraUpdateReqVO;
import com.perfree.model.Extra;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface ExtraService extends IService<Extra> {

    /**
     * 根据key获取数据
     * @param extraKey extraKey
     * @return Extra
     */
    Extra getByKey(String extraKey);

    /***
     * 分页列表
     * @param pageVO pageVO
     * @return PageResult<Extra>
     */
    PageResult<Extra> extraPage(ExtraPageReqVO pageVO);

    /**
     * 根据id获取附加数据
     * @param id id
     * @return Extra
     */
    Extra get(Integer id);

    /**
     * 添加附加数据
     * @param extraAddReqVO extraAddReqVO
     * @return Extra
     */
    Extra add(ExtraAddReqVO extraAddReqVO);

    /**
     * 更新附件数据
     * @param extraUpdateReqVO extraUpdateReqVO
     * @return Extra
     */
    Extra updateExtra(ExtraUpdateReqVO extraUpdateReqVO);

    /**
     * 删除附加数据
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

}
