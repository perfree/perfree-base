<template>
  <div ref="vditor" id="vditor"></div>
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

import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import Vditor from "vditor";
import 'vditor/dist/index.css';
import AttachSelectPanel from "@/core/components/attach/attach-select-panel.vue";
import {CONSTANTS} from "@/core/utils/constants.js";

let contentEditor = null;
let open = ref(false)
let title = ref('')
let selectData = ref([])
let attachType = ref('')
let attachMaxSelect = ref(0)
const props = defineProps(['initValue'])

watch(() => props.initValue, (val) => {
  if (contentEditor) {
    contentEditor.setValue(val);
  }
})
onMounted(() => {
  contentEditor = new Vditor('vditor', {
    height: 666,
    width: '100%',
    cdn: '/static/public/libs/vditor',
    placeholder: "写点什么?",
    toolbarConfig: {
      hide: false,
      pin: false,
    },
    outline: {
      enable: true
    },
    mode: "ir",
    preview: {
      hljs: {
        lineNumber: true
      }
    },
    cache: {
      enable: false,
    },
    toolbar: [
      "emoji", "headings", "bold", "italic", "strike", "link", "|", "list", "ordered-list", "check", "outdent",
      "indent", "|", "quote", "line", "code", "inline-code", "insert-before", "insert-after", "|",
      {
        hotkey: '⇧⌘S',
        name: 'video',
        tipPosition: 's',
        tip: '插入图片',
        className: 'right',
        icon: '<svg t="1721714738903" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2729" width="200" height="200"><path d="M426.663822 378.880887A126.292491 126.292491 0 1 0 303.784641 256.001707 126.292491 126.292491 0 0 0 426.663822 378.880887z m0-176.638822a50.346331 50.346331 0 1 1-47.786348 53.759642 50.346331 50.346331 0 0 1 47.786348-53.759642zM1090.55273 341.334471L767.99488 699.732082 533.329778 535.893174a40.106399 40.106399 0 0 0-30.719795-11.093259 40.106399 40.106399 0 0 0-30.719796 11.093259L243.198379 837.97116a39.253072 39.253072 0 0 0 0 56.319625 40.959727 40.959727 0 0 0 57.172952 0L511.996587 616.105973l231.251791 163.838907a44.373038 44.373038 0 0 0 58.879608 0l341.331058-378.877474a39.253072 39.253072 0 0 0 0-56.319624 40.959727 40.959727 0 0 0-52.906314-3.413311z" fill="#333333" p-id="2730"></path><path d="M1262.924914 0.003413H102.399317A101.54599 101.54599 0 0 0 0 101.549403v820.047866A103.252645 103.252645 0 0 0 102.399317 1023.996587h1160.525597a101.54599 101.54599 0 0 0 102.399317-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.924914 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.745648a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832935a68.266212 68.266212 0 0 1 67.412884 68.266211z" fill="#333333" p-id="2731"></path></svg>',
        click () {
          attachType.value = 'img';
          attachMaxSelect.value = 8;
          title.value = '选择图片'
          open.value = true;
        },
      },
      {
        hotkey: '⇧⌘S',
        name: 'video',
        tipPosition: 's',
        tip: '插入视频',
        className: 'right',
        icon: '<svg t="1721714674236" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1700" width="200" height="200"><path d="M256.006827 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0zM554.671502 383.147526c0-23.039846 16.213225-33.279778 37.546417-23.039847l227.838481 114.345905c41.813055 21.333191 40.959727 55.466297 0 75.94616l-33.279778 17.066553-193.705376 96.426024c-21.333191 10.239932-38.399744 0-38.399744-23.039847z" fill="#333333" p-id="1701"></path><path d="M0.008533 384.000853A41.813055 41.813055 0 0 1 41.821588 341.334471h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294A42.666382 42.666382 0 0 1 0.008533 384.000853zM0.008533 639.999147A41.813055 41.813055 0 0 1 41.821588 597.332764h255.998293a42.666382 42.666382 0 0 1 43.51971 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294A42.666382 42.666382 0 0 1 0.008533 639.999147zM1024.001707 384.000853a41.813055 41.813055 0 0 1 41.813054-42.666382h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666382 41.813055 41.813055 0 0 1-41.813054 42.666383h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666383zM1024.001707 639.999147a41.813055 41.813055 0 0 1 41.813054-42.666383h255.998294a42.666382 42.666382 0 0 1 41.813054 42.666383 41.813055 41.813055 0 0 1-41.813054 42.666382h-255.998294a42.666382 42.666382 0 0 1-41.813054-42.666382z" fill="#333333" p-id="1702"></path><path d="M1024.001707 42.669796a42.666382 42.666382 0 1 1 85.332764 0v938.660408a42.666382 42.666382 0 1 1-85.332764 0z" fill="#333333" p-id="1703"></path><path d="M1262.933447 0.003413H102.407851A101.54599 101.54599 0 0 0 0.008533 101.549403v820.047866A103.252645 103.252645 0 0 0 102.407851 1023.996587h1160.525596a101.54599 101.54599 0 0 0 102.399318-101.54599V101.549403A103.252645 103.252645 0 0 0 1262.933447 0.003413z m17.066553 870.394198a68.266212 68.266212 0 0 1-67.412884 68.266211H152.754182a68.266212 68.266212 0 0 1-67.412884-68.266211V153.602389a68.266212 68.266212 0 0 1 67.412884-68.266211h1059.832934a68.266212 68.266212 0 0 1 67.412884 68.266211z" fill="#333333" p-id="1704"></path></svg>',
        click () {
          attachType.value = 'video';
          attachMaxSelect.value = 1;
          title.value = '选择视频'
          open.value = true;
        },
      },
      {
        hotkey: '⇧⌘S',
        name: 'file',
        tipPosition: 's',
        tip: '插入附件',
        className: 'right',
        icon: '<svg t="1721726209680" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5092" width="200" height="200"><path d="M923.2 261.4h-45.7c-19.9 0-36 16.1-36 36s16.1 36 36 36h9.7v488.2h-748V217.2h196.7l85.6 103v0.1l0.1 0.1c6.6 7.9 16.6 13 27.7 13h182.4c19.9 0 36-16.1 36-36s-16.1-36-36-36h-81.5c13.4-35.3 44.7-60.1 81.1-60.1 48.6 0 88.1 44.3 88.1 98.7v304.2c0 54.4-39.5 98.7-88.1 98.7s-88.1-44.3-88.1-98.7V479.4c0-17.5 11.8-31.7 26.3-31.7s26.3 14.2 26.3 31.7h0.3c-0.2 1.4-0.3 2.8-0.3 4.2V601c0 19.9 16.1 36 36 36s36-16.1 36-36V483.5c0-1.4-0.1-2.8-0.3-4.2h0.3c0-57.2-44.1-103.7-98.3-103.7-51.9 0-94.6 42.7-98 96.6h-0.2v134.5c0.6 44.1 16.8 85.5 45.9 117 30.3 32.9 70.9 51 114.2 51s83.9-18.1 114.2-51c29-31.5 45.2-73 45.9-117V300c0-45-16.3-87.5-45.9-119.6-30.3-32.9-70.9-51-114.2-51s-83.9 18.1-114.2 51c-21 22.7-35.2 50.7-41.8 81h-9l-85.7-103.2c-6.8-8.2-17-13-27.7-13H103.1c-19.9 0-36 16.1-36 36V857.6c0 19.9 16.1 36 36 36h820c19.9 0 36-16.1 36-36V297.4c0.1-19.9-16-36-35.9-36z" fill="#333333" p-id="5093"></path></svg>',
        click () {
          attachType.value = 'other';
          attachMaxSelect.value = 1;
          title.value = '选择附件'
          open.value = true;
        },
      },
      "table", "|", "undo", "redo", "|", "fullscreen", "edit-mode",
      {name: "more", toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview"]},
    ],
    upload: {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_TOKEN)).accessToken,
      },
      fieldName: "file",
      filename: (name) => name.replace(/\W/g, ""),
      linkToImgUrl: "/api/auth/attach/uploadAttachByUrl",
      linkToImgFormat(responseText){
        let result = null;
        let res = JSON.parse(responseText);
        if (res.code === 200) {
          result = JSON.stringify({
            msg: '',
            code: 0,
            data: {
              originalURL: res.data.originalURL,
              url: res.data.url
            }
          });
        }
        return result
      },
      multiple: false,
      url: "/api/auth/attach/upload",
      format(files, responseText){
        let result = null;
        let res = JSON.parse(responseText);
        if (res.code === 200) {
          result = JSON.stringify({
            msg: "",
            code: 0,
            data: {
              errFiles: [],
              succMap: {
                [res.data.path]: res.data.url,
              }
            }
          });
        }
        return result
      },
      withCredentials: false,
    },
    after: () => {
     contentEditor.setValue(props.initValue? props.initValue: '');
    },
  })
});

onBeforeUnmount(() => {
  if (contentEditor) {
    contentEditor.setValue('');
    contentEditor.clearCache();
    contentEditor.clearStack();
  }
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
  selectData.value.forEach((r, index) => {
    if (attachType.value === 'img') {
      let insertStr = `\n![${r.name}](${r.url})`;
      contentEditor.insertValue(insertStr)
      if (index === selectData.value.length -1 )  {
        contentEditor.insertValue('\n')
      }
    }

    if (attachType.value === 'video') {
      let insertStr = `\n<video src="${r.url}" controls="controls" width="100%"></video>`;
      contentEditor.insertValue(insertStr)
    }
    if (attachType.value === 'other') {
      let insertStr = `\n[${r.name}](${r.url})`;
      contentEditor.insertValue(insertStr)
    }
  });
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
  if (contentEditor) {
    contentEditor.setValue('');
    contentEditor.clearCache();
    contentEditor.clearStack();
  }
}

function getValue() {
  return {
    content: contentEditor.getValue(),
    parseContent: contentEditor.getHTML()
  }
}

defineExpose({
  resetContent,
  getValue
})

</script>