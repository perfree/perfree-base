package com.perfree.service.extra;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.mapper.ExtraMapper;
import com.perfree.model.Extra;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class ExtraServiceImpl extends ServiceImpl<ExtraMapper, Extra> implements ExtraService {

    @Resource
    private ExtraMapper extraMapper;

    @Override
    public Extra getByKey(String extraKey) {
        return extraMapper.getByKey(extraKey);
    }
}
