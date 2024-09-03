<template>
  <div class="page">
    <fc-designer ref="designer" height="100%" :config="config">
      <template #handle>
        <el-button size="small" type="primary" plain @click="importJson"><el-icon><UploadFilled /></el-icon> 导入 Json</el-button>
        <el-button size="small" type="primary" plain @click="genJson"><el-icon><List /></el-icon> 生成 Json</el-button>
      </template>
    </fc-designer>

    <el-dialog v-model="importJsonOpen" :title="'导入Json'" width="800px" draggable>
      <el-input
          v-model="importJsonValue"
          style="width: 100%"
          :rows="10"
          type="textarea"
          placeholder="请输入或复制json内容"
      />
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="onImportJson">确 定</el-button>
              <el-button @click="importJsonOpen = false">关 闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="jsonOpen" :title="'生成Json'" width="800px" draggable>
      <el-scrollbar height="580">
        <div>
          <pre><code v-dompurify-html="highlightedCode(jsonResult)" class="hljs"></code></pre>
        </div>
      </el-scrollbar>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="onCopy">复制Json</el-button>
              <el-button @click="jsonOpen = false">关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {List, UploadFilled} from "@element-plus/icons-vue";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import json from 'highlight.js/lib/languages/json'
import {useClipboard} from "@vueuse/core";
import {ElMessage} from "element-plus";
import {AttachSelectInputRule} from "@/core/components/attach/AttachSelectInput.js";
import {onMounted, ref} from "vue";

const { copy, isSupported } = useClipboard({ legacy: true })
const designer = ref();
let jsonOpen = ref(false);
let importJsonOpen = ref(false);
let jsonResult = ref("");
let importJsonValue = ref("");

const config = ref({
  //控制字段ID输入框能否输入
  fieldReadonly: false,
  //隐藏所有子表单组件
  hiddenMenu: ['subform'],
  //隐藏输入框和密码输入框
  //hiddenItem: ['input','pasasword'],
})

function genJson() {
  jsonOpen.value = true;
  jsonResult.value  = {
    option: designer.value.getOption(),
    rule: designer.value.getRule()
  }
}

function importJson() {
  importJsonOpen.value = true;
}

function onImportJson() {
  const parseJson = JSON.parse(importJsonValue.value);
  designer.value.setOption(parseJson.option);
  designer.value.setRule(parseJson.rule);
  ElMessage.success('导入成功');
  importJsonOpen.value = false;
}
/** 初始化 **/
onMounted(async () => {
  designer.value.addComponent(AttachSelectInputRule)
  // 注册代码高亮的各种语言
  hljs.registerLanguage('json', json)
})

/**
 * 代码高亮
 */
const highlightedCode = (code) => {
  code = JSON.stringify(code, null, 2)
  const result = hljs.highlight('json', code, true)
  return result.value || '&nbsp;'
}


/** 复制 **/
const onCopy = async () => {
  try {
    if (!isSupported.value){
      ElMessage.error('复制失败,可能浏览器不支持,请手动复制');
      return
    }
    await copy(JSON.stringify(jsonResult.value, null, 2) || '')
    ElMessage.success('复制成功');
  } catch (err) {
    ElMessage.error('复制失败,可能浏览器不支持,请手动复制');
  }
}
</script>
<style scoped>
.page{
  height: 100%;
}
pre,code{
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
}
</style>
