DROP TABLE IF EXISTS `p_plugin_demo`;
CREATE TABLE `p_plugin_demo`  (
                                  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                                  `name` varchar(255) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '名称',
                                  `msg` varchar(255) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '信息',
                                  `createTime` datetime NOT NULL COMMENT '创建时间',
                                  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;
INSERT INTO `p_plugin_demo` (`id`, `name`, `msg`, `createTime`, `updateTime`, `createUserId`, `updateUserId`) VALUES (1, '测试数据1', '测试数据1', '2024-07-19 11:40:24', NULL, NULL, NULL);
INSERT INTO `p_plugin_demo` (`id`, `name`, `msg`, `createTime`, `updateTime`, `createUserId`, `updateUserId`) VALUES (2, '测试数据2', '测试数据2', '2024-07-19 11:40:39', NULL, NULL, NULL);
