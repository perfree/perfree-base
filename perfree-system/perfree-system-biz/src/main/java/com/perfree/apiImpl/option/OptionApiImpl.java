package com.perfree.apiImpl.option;

import com.perfree.service.option.OptionService;
import com.perfree.system.api.option.OptionApi;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class OptionApiImpl implements OptionApi {

    @Resource
    private OptionService optionService;

    @Override
    public Boolean updateOptionByKey(String key, String value) {
        return optionService.updateOptionByKey(key, value);
    }
}
