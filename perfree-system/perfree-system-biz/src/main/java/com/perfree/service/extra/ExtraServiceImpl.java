package com.perfree.service.extra;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.extra.vo.ExtraAddReqVO;
import com.perfree.controller.auth.extra.vo.ExtraPageReqVO;
import com.perfree.controller.auth.extra.vo.ExtraUpdateReqVO;
import com.perfree.convert.extra.ExtraConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.ExtraMapper;
import com.perfree.model.Extra;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public PageResult<Extra> extraPage(ExtraPageReqVO pageVO) {
        SortingFieldUtils.handleDefaultSortingField(pageVO);
        return extraMapper.selectExtraPage(pageVO);
    }

    @Override
    public Extra get(Integer id) {
        return extraMapper.selectById(id);
    }

    @Override
    @Transactional
    public Extra add(ExtraAddReqVO extraAddReqVO) {
        Extra byKey = extraMapper.getByKey(extraAddReqVO.getExtraKey());
        if (null != byKey) {
            throw new ServiceException(ErrorCode.EXTRA_KEY_EXIST);
        }
        Extra extra = ExtraConvert.INSTANCE.convertByAddReqVO(extraAddReqVO);
        extraMapper.insert(extra);
        return extra;
    }

    @Override
    @Transactional
    public Extra updateExtra(ExtraUpdateReqVO extraUpdateReqVO) {
        Extra byKey = extraMapper.getByKey(extraUpdateReqVO.getExtraKey());
        if (null != byKey && !byKey.getId().equals(extraUpdateReqVO.getId())) {
            throw new ServiceException(ErrorCode.EXTRA_KEY_EXIST);
        }
        Extra extra = ExtraConvert.INSTANCE.convertByUpdateReqVO(extraUpdateReqVO);
        extraMapper.updateById(extra);
        return extra;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        extraMapper.deleteById(id);
        return true;
    }
}
