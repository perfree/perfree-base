package com.perfree.apiImpl.user;

import com.perfree.convert.user.UserConvert;
import com.perfree.model.User;
import com.perfree.service.user.UserService;
import com.perfree.system.api.user.UserApi;
import com.perfree.system.api.user.dto.UserRespDTO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class UserApiImpl implements UserApi {

    @Resource
    private UserService userService;

    @Override
    public UserRespDTO findByAccount(String account) {
        User byAccount = userService.findByAccount(account);
        return UserConvert.INSTANCE.convertDto(byAccount);
    }
}
