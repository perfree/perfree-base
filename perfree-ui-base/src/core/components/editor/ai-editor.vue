<template>
  <div ref="divRef" style="height: 666px"/>
  <el-dialog v-model="open" :title="title" width="900px" draggable   destroy-on-close>
    <attach-select-panel @update:selected-attach="selectAttach" :max="attachMaxSelect" :attach-type="attachType"></attach-select-panel>
    <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定<span v-if="selectData.length > 0">(已选{{selectData.length}}个)</span></el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {AiEditor} from "aieditor";
import "aieditor/dist/style.css"
import {onMounted, onUnmounted, ref, watch} from "vue";
import AttachSelectPanel from "@/core/components/attach/attach-select-panel.vue";
import {CONSTANTS} from "@/core/utils/constants.js";
import {ElMessage} from "element-plus";

const divRef = ref();
let aiEditor = null;
let open = ref(false)
let title = ref('')
let selectData = ref([])
let attachType = ref('')
let attachMaxSelect = ref(0)
const props = defineProps(['initValue'])

watch(() => props.initValue, (val) => {
  if (aiEditor) {
    aiEditor.setContent(val)
  }
})
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value,
    placeholder: "写点什么?",
    content: props.initValue ? props.initValue : '',
    toolbarKeys: ["undo", "redo", "brush", "eraser",
      "|", "heading", "font-family", "font-size",
      "|", "bold", "italic", "underline", "strike", "link", "code", "subscript", "superscript", "hr", "todo", "emoji",
      "|", "highlight", "font-color",
      "|", "align", "line-height",
      "|", "bullet-list", "ordered-list", "indent-decrease", "indent-increase", "break",
      "|",
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5ZM18 17L14 11L7 17H18Z"></path></svg>',
        onClick: (event, editor) => {
          attachType.value = 'img';
          attachMaxSelect.value = 8;
          title.value = '选择图片'
          open.value = true;
        },
        tip: "插入图片",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19V5H9.58579L11.5858 7H20V19H4ZM21 5H12.4142L10.4142 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V6C22 5.44772 21.5523 5 21 5ZM15.0008 12.667L10.1219 9.41435C10.0562 9.37054 9.979 9.34717 9.9 9.34717C9.6791 9.34717 9.5 9.52625 9.5 9.74717V16.2524C9.5 16.3314 9.5234 16.4086 9.5672 16.4743C9.6897 16.6581 9.9381 16.7078 10.1219 16.5852L15.0008 13.3326C15.0447 13.3033 15.0824 13.2656 15.1117 13.2217C15.2343 13.0379 15.1846 12.7895 15.0008 12.667Z"></path></svg>',
        onClick: (event, editor) => {
          attachType.value = 'video';
          attachMaxSelect.value = 1;
          title.value = '选择视频'
          open.value = true;
        },
        tip: "插入视频",
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 12V9H13V12H16V14H13V17H11V14H8V12H11Z"></path></svg>',
        onClick: (event, editor) => {
          attachType.value = 'other';
          attachMaxSelect.value = 1;
          title.value = '选择附件'
          open.value = true;
        },
        tip: "插入附件",
      },
      "quote", "code-block", "table",
      "|", "printer", "fullscreen", "ai"
    ],
    image: {
      allowBase64: false,
      uploadUrl: "/api/auth/attach/upload",
      uploadFormName: "file",
      uploadHeaders: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_TOKEN)).accessToken,
      },
      uploaderEvent: {
        onFailed: (file, response) => {
          ElMessage.error('文件上传失败');
        },
        onError: (file, error) => {
          ElMessage.error('文件上传失败');
        },
        onSuccess: (file, response) => {
          if (response.code === 200) {
            ElMessage.success('文件上传成功');
            return {
              "errorCode": 0,
              "data": {
                "src": response.data.url,
                "alt": response.data.name
              }
            }
          } else {
            ElMessage.error(response.msg);
            return false;
          }
        },
      }
    },
  })
})

onUnmounted(() => {
  aiEditor && aiEditor.destroy();
})

/**
 * 选择附件
 */
function selectAttach(data) {
  selectData.value = data

}

/**
 * 确定选择
 */
function submitAddForm() {
  let insertStr = ''
  selectData.value.forEach((r, index) => {
    if (attachType.value === 'img') {
      insertStr += `![${r.name}](${r.url})`;
    }

    if (attachType.value === 'video') {
      insertStr += `<video src="${r.url}" controls="controls" width="100%"></video>`;
    }
    if (attachType.value === 'other') {
      insertStr += `[${r.name}](${r.url})`;
    }
  });
  aiEditor.insert(insertStr)
  open.value = false
  selectData.value = []
}

/**
 * 关闭选择附件面板
 */
function resetAddForm() {
  open.value = false
  selectData.value = []
}

function resetContent() {
  aiEditor.clear()
}

function getValue() {
  return {
    content: aiEditor.getMarkdown(),
    parseContent: aiEditor.getHtml()
  }
}

defineExpose({
  resetContent,
  getValue
})
</script>