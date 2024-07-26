package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import org.springframework.stereotype.Service;

/**
 * @author Perfree
 * @description 附件配置缓存相关
 * @date 15:35 2023/9/28
 */
@Service
public class AttachConfigCacheService {
    private final Cache<Integer, AttachConfigCacheDTO> attachConfingCache;

    public AttachConfigCacheService() {
        attachConfingCache = CacheBuilder.newBuilder().build();
    }

    public void putAttachConfig(Integer key, AttachConfigCacheDTO attachConfigCacheDTO) {
        attachConfingCache.put(key, attachConfigCacheDTO);
    }

    public AttachConfigCacheDTO getAttachConfig(Integer key) {
        return attachConfingCache.getIfPresent(key);
    }

    public AttachConfigCacheDTO getMasterAttachConfig() {
        for (Integer i : attachConfingCache.asMap().keySet()) {
            AttachConfigCacheDTO attachConfigCacheDTO = attachConfingCache.getIfPresent(i);
            assert attachConfigCacheDTO != null;
            if (attachConfigCacheDTO.getMaster()) {
                return attachConfigCacheDTO;
            }
        }
        return null;
    }

    public void removeAttachConfig(Integer key) {
        attachConfingCache.invalidate(key);
    }
}
