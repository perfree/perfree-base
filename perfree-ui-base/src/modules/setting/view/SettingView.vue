<template>
  <div class="page" v-loading="loading">
    <form-create v-model="formData" v-model:api="fApi" :rule="rule" :option="option" ></form-create>
    <el-empty description="当前主题无设置项" v-if="notSetting" />
  </div>
</template>
<script setup>

import {extraGetByKeyApi} from "../api/extra.js";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {getOptionByIdentificationApi, saveOptionListApi} from "../api/option.js";
import formCreate from "@form-create/element-ui";

const fApi = ref({});
const formData = ref({});
const option = ref({})
const rule = ref([]);
const notSetting = ref(false);
const loading = ref(true);

function initSettingFrom() {
  extraGetByKeyApi('system_setting').then(res => {
    if (res.code === 200) {
      if (!res.data) {
        notSetting.value = true;
        loading.value = false;
        return;
      }
      option.value = JSON.parse(res.data.extraData).option
      option.value.onSubmit = submitSetting;
      rule.value = JSON.parse(res.data.extraData).rule;
      initValue();
    } else {
      ElMessage.error(res.msg);
      loading.value = false;
    }
  })
}

function initValue() {
  getOptionByIdentificationApi('system_setting').then(res => {
    if (res.code === 200) {
      formData.value = res.data.reduce((acc, { key, value }) => {
        const formRule = fApi.value.getRule(key);
        if (formRule) {
          if (formRule.type === 'select' && formRule.props.multiple && value) {
            acc[key] = value.split(',');
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});
    } else {
      ElMessage.success(res.msg);
    }
    loading.value = false;
  })
}

/**
 * 提交主题设置
 * @param formData
 */
function submitSetting(formData) {
  loading.value = true;
  const keys = Object.keys(formData);
  let param = {
    options: []
  }
  for (let key of keys) {
    let value = formData[key];
    const formRule = fApi.value.getRule(key);
    if (!formRule) {
      continue;
    }
    if (formRule.type === 'select' && formRule.props.multiple && value) {
      value = value.join(',');
    }
    let option = {
      key,
      value: value,
      title: formRule.title,
      identification: 'system_setting'
    }
    param.options.push(option);
  }

  saveOptionListApi(param).then(res => {
    if (res.code === 200) {
      ElMessage.success('保存成功');
    } else {
      ElMessage.success(res.msg);
    }
    loading.value = false;
  })
}

initSettingFrom();
</script>
