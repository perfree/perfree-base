
INSERT INTO `p_menu` (
`id`,`pid`,`name`,`url`,`icon`,
`menuType`,`pluginId`,`component`,`componentName`,`moduleName`
)
VALUES(
'2cadaa1f51f042a3956f0d64e5cc7b76','-1','测试管理','/admin/pluginDemo','fa-solid fa-feather-alt',
1,  'perfree-plugin-demo'  ,'/view/PluginDemoView','pluginDemo','PluginDemo'
);

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('b4aa631b172e4897b2d8c29e93760773','2cadaa1f51f042a3956f0d64e5cc7b76','测试查询',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:query');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('623d28f36bca40929c02568041b52583','2cadaa1f51f042a3956f0d64e5cc7b76','测试创建',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:create');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('e95c31e9180f430eaed8f845494092a8','2cadaa1f51f042a3956f0d64e5cc7b76','测试编辑',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:update');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('25626ff8dcb2441e9ae51fe49e6b8d09','2cadaa1f51f042a3956f0d64e5cc7b76','测试删除',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:delete');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('4ce9d88d0e164a17bf49e8f002881f1b','2cadaa1f51f042a3956f0d64e5cc7b76','测试导出',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:export');
