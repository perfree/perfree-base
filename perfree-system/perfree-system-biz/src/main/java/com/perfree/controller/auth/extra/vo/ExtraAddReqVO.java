package com.perfree.controller.auth.extra.vo;

import com.perfree.controller.auth.role.vo.RoleBaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "附加数据 add RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ExtraAddReqVO extends ExtraBaseVO {
}
