package com.perfree.service.extra;

import com.baomidou.mybatisplus.extension.service.IService;
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

}
