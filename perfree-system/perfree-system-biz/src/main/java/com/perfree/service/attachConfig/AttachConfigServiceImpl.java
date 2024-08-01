package com.perfree.service.attachConfig;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.AttachConfigCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigCreateVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigPageReqVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigUpdateMasterVO;
import com.perfree.controller.auth.attachConfig.vo.AttachConfigUpdateVO;
import com.perfree.convert.attachConfig.AttachConfigConvert;
import com.perfree.file.handle.local.FileLocalConfig;
import com.perfree.mapper.AttachConfigMapper;
import com.perfree.model.AttachConfig;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

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
public class AttachConfigServiceImpl extends ServiceImpl<AttachConfigMapper, AttachConfig> implements AttachConfigService {

    private final static Logger LOGGER = LoggerFactory.getLogger(AttachConfigServiceImpl.class);

    @Resource
    private AttachConfigMapper attachConfigMapper;

    @Resource
    private AttachConfigCacheService attachConfigCacheService;

    @Override
    public List<AttachConfig> getAll() {
        return attachConfigMapper.getAll();
    }

    @Override
    @Transactional
    public AttachConfig add(AttachConfigCreateVO attachConfigCreateVO) {
        AttachConfig attachConfig = AttachConfigConvert.INSTANCE.convertCreateVO(attachConfigCreateVO);
        attachConfigMapper.insert(attachConfig);
        attachConfigCacheService.putAttachConfig(attachConfig.getId(), AttachConfigConvert.INSTANCE.convertCacheDTO(attachConfig));
        initLocalResourcesPatterns();
        return attachConfig;
    }

    @Override
    @Transactional
    public Boolean updateAttachConfig(AttachConfigUpdateVO attachConfigUpdateVO) {
        AttachConfig attachConfig = AttachConfigConvert.INSTANCE.convertUpdateVO(attachConfigUpdateVO);
        attachConfigMapper.updateById(attachConfig);
        attachConfigCacheService.putAttachConfig(attachConfig.getId(), AttachConfigConvert.INSTANCE.convertCacheDTO(attachConfig));
        initLocalResourcesPatterns();
        return true;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        attachConfigMapper.deleteById(id);
        attachConfigCacheService.removeAttachConfig(id);
        initLocalResourcesPatterns();
        return true;
    }

    @Override
    public PageResult<AttachConfig> attachConfigPage(AttachConfigPageReqVO pageVO) {
        return attachConfigMapper.attachConfigPage(pageVO);
    }

    @Override
    public Boolean updateMaster(AttachConfigUpdateMasterVO attachConfigUpdateMasterVO) {
        attachConfigMapper.clearMaster();
        attachConfigMapper.updateMaster(attachConfigUpdateMasterVO.getId());

        AttachConfigCacheDTO masterAttachConfig = attachConfigCacheService.getMasterAttachConfig();
        if (null != masterAttachConfig) {
            masterAttachConfig.setMaster(false);
            attachConfigCacheService.putAttachConfig(masterAttachConfig.getId(), masterAttachConfig);
        }

        AttachConfigCacheDTO attachConfig = attachConfigCacheService.getAttachConfig(attachConfigUpdateMasterVO.getId());
        attachConfig.setMaster(true);
        attachConfigCacheService.putAttachConfig(attachConfig.getId(), attachConfig);
        return true;
    }

    @Override
    public void initLocalResourcesPatterns() {
        List<AttachConfig> attachConfigs = attachConfigMapper.getAllLocalConfig();
        List<String> locationStrings = new ArrayList<>();
        for (AttachConfig attachConfig : attachConfigs) {
            FileLocalConfig fileLocalConfig = JSONUtil.toBean(attachConfig.getConfig(), FileLocalConfig.class);
            fileLocalConfig.setBasePath(fileLocalConfig.getBasePath().replaceAll("\\\\", SystemConstants.FILE_SEPARATOR));
            if (!fileLocalConfig.getBasePath().endsWith(SystemConstants.FILE_SEPARATOR)) {
                fileLocalConfig.setBasePath(fileLocalConfig.getBasePath() + SystemConstants.FILE_SEPARATOR);
            }
            locationStrings.add("file:" + fileLocalConfig.getBasePath());
        }
        SimpleUrlHandlerMapping mapping = (SimpleUrlHandlerMapping) SpringBeanUtil.context.getBean("resourceHandlerMapping");
        ResourceHttpRequestHandler handler = (ResourceHttpRequestHandler) mapping.getUrlMap().get(SystemConstants.DEFAULT_ATTACH_URL_PATTERNS);
        handler.setLocationValues(locationStrings);
        handler.getLocations().clear();
        handler.getResourceResolvers().clear();
        try {
            handler.afterPropertiesSet();
        } catch (Throwable ex) {
            throw new BeanInitializationException("Failed to init ResourceHttpRequestHandler", ex);
        }
    }
}
