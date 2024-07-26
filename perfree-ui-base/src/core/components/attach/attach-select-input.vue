<template>
  <div style="width: 100%">
    <el-input v-model="modelValue" :placeholder="props.placeholder" style="width: 100%"  :disabled="!props.enableInput" >
      <template #append>
        <el-button :icon="FolderOpened"  type="info" @click="openSelectImage"/>
      </template>
    </el-input>

    <el-dialog v-model="open" :title="title" width="900px" draggable   destroy-on-close>
      <attach-select-panel @update:selected-attach="selectAttach" :max="1" :attach-type="props.attachType"></attach-select-panel>
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定<span v-if="selectData.length > 0">(已选{{selectData.length}}个)</span></el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>

import {FolderOpened, Search} from "@element-plus/icons-vue";
import AttachSelectPanel from "./attach-select-panel.vue";
import {ref, watch} from "vue";


const placeholder = ref('请选择图片')
let open = ref(false)
let title = ref('')
let selectData = ref([])
// attachType: 附件类型
// spliter: 如果是多个，可以设置分割符号
// enableInput: 是否允许自由输入
// modelValue: 绑定值
const props = defineProps(['attachType', 'enableInput', 'placeholder', 'modelValue'])
const emits = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue, oldValue) => {
  modelValue.value = newValue;
});
/**
 * 打开选择附件面板
 */
function openSelectImage() {
  open.value = true
  title.value = '请选择附件'
}

/**
 * 确定选择
 */
function submitAddForm() {
  let result = ''
  selectData.value.forEach((r, index) => {
    result += r.url;
  });
  modelValue.value = result
  open.value = false
  selectData.value = []
  emits('update:modelValue', modelValue.value)
}

/**
 * 关闭选择附件面板
 */
function resetAddForm() {
  open.value = false
  selectData.value = []
}

/**
 * 选择附件
 */
function selectAttach(data) {
  selectData.value = data
 
}
</script>

<style scoped>
:deep().el-dialog.is-draggable .el-dialog__header{
  cursor: move;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  float: none;
  position: initial;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>