
INSERT INTO `p_menu` (
`id`,`pid`,`name`,`url`,`icon`,
`menuType`,`pluginId`,`component`,`componentName`,`moduleName`
)
VALUES(
'a073e03a053e4428ab3184f1fd6abfc8','-1','测试管理','/admin/pluginDemo','fa-solid fa-feather-alt',
1,  'perfree-plugin-demo'  ,'/view/PluginDemoView','pluginDemo','PluginDemo'
);

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('111b90c2457c4409a9f499ac0fc9e454','a073e03a053e4428ab3184f1fd6abfc8','测试查询',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:query');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('fdf7a299496140aea09c3a64e9b94272','a073e03a053e4428ab3184f1fd6abfc8','测试创建',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:create');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('62dd55406c004830b83cc126298be9e5','a073e03a053e4428ab3184f1fd6abfc8','测试编辑',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:update');

INSERT INTO `p_menu` (`id`,`pid`,`name`,`menuType`,`pluginId`,`perms`)
VALUES('061cc872db60430a9f9d3e42f7c72c0c','a073e03a053e4428ab3184f1fd6abfc8','测试删除',2,  'perfree-plugin-demo'  ,'admin:pluginDemo:delete');
