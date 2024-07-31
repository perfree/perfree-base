package com.perfree.controller.auth.user.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "用户导出ReqVO")
@Data
public class UserExportReqVO {
    @Schema(description = "昵称")
    private String userName;

    @Schema(description = "账户")
    private String account;
}
