package com.perfree.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Objects;

/**
 * mybatis-plus字段填充
 */
@Component
public class DefaultDBFieldHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        boolean hasCreateTime = metaObject.hasGetter("createTime");
        if (hasCreateTime) {
            Object createTime = getFieldValByName("createTime", metaObject);
            if (Objects.isNull(createTime)) {
                setFieldValByName("createTime", new Date(), metaObject);
            }
        }

        boolean hasCreateUserId = metaObject.hasGetter("createUserId");
        if (hasCreateUserId) {
            Object createUserId = getFieldValByName("createUserId", metaObject);
            LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
            if (Objects.isNull(createUserId) && null != loginUser) {
                setFieldValByName("createUserId", loginUser.getId(), metaObject);
            }
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        boolean hasUpdateTime = metaObject.hasGetter("updateTime");
        if (hasUpdateTime) {
            Object updateTime = getFieldValByName("updateTime", metaObject);
            if (Objects.isNull(updateTime)) {
                setFieldValByName("updateTime", new Date(), metaObject);
            }
        }

        boolean hasUpdateUserId = metaObject.hasGetter("updateUserId");
        if (hasUpdateUserId) {
            Object updateUserId = getFieldValByName("updateUserId", metaObject);
            LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
            if (Objects.isNull(updateUserId) && null != loginUser) {
                setFieldValByName("updateUserId", loginUser.getId(), metaObject);
            }
        }
    }
}
