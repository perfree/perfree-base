<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-tree
            style="width: 100%;max-height: 700px;overflow: auto;"
            :data="fileList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="id"
            :default-checked-keys="activeFileId"
            default-expand-all
            ref="treeRef"
        >
          <template #default="{ node, data }">
          <span class="custom-tree-node">
            <font-awesome-icon  icon="fa-regular fa-folder-open " v-if="data.fileType === 'dir'" class="file-list-icon folder"></font-awesome-icon>
            <font-awesome-icon  icon="fa-brands fa-js-square" v-else-if="data.fileType === 'js'" class="file-list-icon js"></font-awesome-icon>
            <font-awesome-icon  icon="fa-brands fa-html5 " v-else-if="data.fileType === 'html'" class="file-list-icon html"></font-awesome-icon>
            <font-awesome-icon  icon="fa-brands fa-css3 "
                                v-else-if="data.fileType === 'css' || data.fileType === 'less' || data.fileType === 'scss'" class="file-list-icon css"
            ></font-awesome-icon>
             <font-awesome-icon  icon="fa-solid fa-text-height " v-else-if="data.fileType === 'txt'" class="file-list-icon txt"></font-awesome-icon>
            <font-awesome-icon  icon="fa-regular fa-file " v-else class="file-list-icon"></font-awesome-icon>
            <span>{{ node.label }}</span>
          </span>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="19">
        <codemirror
            v-model="code"
            placeholder="请选择左侧要编辑的文件..."
            :style="{ height: '700px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {handleTree} from "@/core/utils/perfree.js";
import {ElMessage} from "element-plus";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'
import {getCodeFileContent, getCodeFileList} from "../api/codegen.js";
import {useRoute} from "vue-router";

const route = useRoute();
let fileList = ref([]);
let loading = ref(true)
const defaultProps = {
  children: 'children',
  label: 'fileName',
}
let activeFileId = ref([]);
let activeFile = ref({});
const treeRef = ref();

// 编辑器
const code = ref(``)
const extensions = [javascript(), oneDark]
const supportEditFileType = ['java', 'js', 'css', 'html', 'json', 'yaml', 'less', 'scss', 'txt', 'md','vue']
function initFileList() {
  loading.value = true;
  getCodeFileList(route.params.id).then(res => {
    if (res.code === 200) {
      fileList.value = handleTree(res.data, "id", "pid",'children', '-1');
    } else {
      ElMessage.error(res.msg);
    }
    loading.value = false;
  })
}

function handleNodeClick(data) {
  if (data.fileType === 'dir') {
    return;
  }
  let index = supportEditFileType.findIndex((type) => type === data.fileType);
  if (index < 0) {
    return;
  }
  let param = {
    tableId: route.params.id,
    path:  data.filePath
  }
  loading.value = true;
  getCodeFileContent(param).then(res => {
    if (res.code === 200) {
      activeFileId.value = [data.id];
      code.value = res.data
      activeFile.value = data;
      treeRef.value.setCheckedKeys([data.id], true)
    } else {
      ElMessage.error(res.msg);
    }
    loading.value = false;
  })
}

initFileList()

</script>

<style scoped>
.file-list-icon{
  margin-right: 5px;
}
.file-list-icon.folder{
  color: #ebd109;
}
.file-list-icon.js{
  color: #ebd109;
}
.file-list-icon.css{
  color: #eb6909;
}
.file-list-icon.html{
  color: #09eb46;
}
.file-list-icon.txt{
  color: #09eb46;
}
:deep().ͼ1.cm-focused{
  outline: none!important;
}
:deep().ͼ1 .cm-scroller{
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', serif;
  font-size: 14px;
}
:deep().el-tree-node.is-checked{
  background-color: var(--el-fill-color-darker)!important;
}

.theme-editor-title{
  font-size: 17px;
  margin: 0 ;
  color: var(--el-text-color-regular);
}
.el-divider--horizontal{
  margin: 15px 0;
}
.theme-header-box{
  display: flex;
}
</style>