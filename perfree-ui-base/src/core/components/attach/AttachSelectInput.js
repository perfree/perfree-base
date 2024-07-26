import uniqueId from "@form-create/utils/lib/unique.js";

export const AttachSelectInputRule = {
    //插入菜单位置
    menu: 'main',
    //图标
    icon: 'icon-upload',
    //名称
    label: '附件选择输入',
    //id,唯一!
    name: 'AttachSelectInput',
    //是否可以操作, 除了容器类组件建议为true !
    mask: true,
    //支持组件验证, 值的类型
    validate: ['string'],
    //定义组件的事件
    event: ['change'],
    //定义组件的渲染规则
    rule({t}) {
        //组件的生成规则
        return {
            type: 'AttachSelectInput',
            //field不能重复!!!
            field: uniqueId(),
            title: '附件选择输入',
            info: '',
            $required: false,
            props: {},
        };
    },
    //组件的属性配置
    props(_, {t}) {
        return [
            {
                type: 'select',
                title: '文件类型',
                field: 'attachType',
                options: [
                    {label: '图片', value: 'img'},
                    {label: '视频', value: 'video'},
                    {label: '音频',value: 'audio'},
                    {label: '其他',value: 'other'}
                ]
            },
            {
                type: 'switch',
                title: '是否允许输入',
                field: 'enableInput'
            },
            {
                type: 'input',
                title: '提示内容',
                field: 'placeholder'
            },
        ];
    }
};