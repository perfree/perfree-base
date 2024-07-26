package com.perfree.controller.auth.attach.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Schema(description = "附件上传ReqVO")
@Data
public class AttachUpdateVO {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "附件描述")
    private String desc;

    @Schema(description = "附件名")
    @NotBlank(message = "附件名不能为空")
    private String name;

    @Schema(description = "附件分组")
    private String attachGroup;
}
