<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="插件名称">
          <el-input v-model="searchForm.name" placeholder="请输入插件名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search" v-hasPermission="['admin:plugin:query']">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleInstallPlugin" v-hasPermission="['admin:plugin:install']">安装插件</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column label="序号" min-width="80" type="index" />
        <el-table-column prop="name" label="插件名称" min-width="150"/>
        <el-table-column prop="desc" label="描述信息" min-width="200"/>
        <el-table-column prop="version" label="版本" min-width="80"/>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.status === 1">已启用</el-tag>
            <el-tag class="ml-2" type="danger" v-else>已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" min-width="150"/>
        <el-table-column prop="website" label="作者网站" min-width="150">
          <template v-slot="scope">
            <a :href="scope.row.website" target="_blank">{{scope.row.website}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="联系方式" min-width="150"/>
        <el-table-column prop="createTime" label="安装时间" min-width="150">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Unlock" @click="handleEnable(scope.row)"  v-if="scope.row.status === 0" v-hasPermission="['admin:plugin:enable']">启用</el-button>
            <el-button size="small" type="primary" link :icon="Lock" @click="handleDisable(scope.row)"  v-if="scope.row.status === 1" v-hasPermission="['admin:plugin:disable']">禁用</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleUnInstall(scope.row)" v-hasPermission="['admin:plugin:uninstall']">卸载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          v-model:current-page="searchForm.pageNo"
          v-model:page-size="searchForm.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total,sizes,prev, pager, next, jumper"
          background
          small
          @change="initList"
          :total="searchForm.total"
      />
    </div>

    <el-dialog v-model="pluginUploadOpen" :title="'安装插件'" width="500px" draggable>
      <el-upload
          class="upload-demo"
          drag
          ref="uploadRef"
          accept="application/zip"
          :on-success="pluginUploadSuccess"
          :on-error="pluginUploadError"
          :headers="headers"
          :action="serverBaseUrl + '/api/auth/plugins/installPlugin'"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽插件文件到此或<em>点击上传插件文件</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            插件文件为zip格式,若插件已存在,则会自动覆盖更新!
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script setup>
import {Delete, Edit, Plus,Lock, Unlock,Refresh, Search, UploadFilled} from "@element-plus/icons-vue";
import { initMenu, parseTime } from "@/core/utils/perfree.js";
import {disablePluginApi, enablePluginApi, pluginsPageApi, uninstallPluginApi} from "../api/plugin.js";
import {CONSTANTS} from "@/core/utils/constants.js";
import axios_config from "@/core/api/axios_config.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {ref} from "vue";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name: ''
})
const searchFormRef = ref();
let tableData = ref([]);
let loading = ref(false);

let pluginUploadOpen = ref(false);
let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
let serverBaseUrl = axios_config.baseURL;
let  headers = {
  Authorization: "Bearer " + JSON.parse(token_info).accessToken,
};
let uploadRef = ref();

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  pluginsPageApi(searchForm.value).then((res) => {
    tableData.value = res.data.list;
    searchForm.value.total = res.data.total;
    loading.value = false;
  })
}


/**
 * 重置搜索表单
 */
function resetSearchForm() {
  searchForm.value = {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    name: ''
  }
  searchFormRef.value.resetFields();
  initList()
}

/**
 * 安装插件处理
 */
function handleInstallPlugin() {
  pluginUploadOpen.value = true;
}

/**
 * 插件上传成功回调
 * @param response
 * @param uploadFile
 * @param uploadFiles
 */
function pluginUploadSuccess(response, uploadFile, uploadFiles) {
  if (response.code === 200) {
    ElMessage.success('插件安装成功');
    pluginUploadOpen.value = false;
    uploadRef.value.clearFiles();
    initList();
  }else {
    ElMessage.error(response.msg);
    uploadRef.value.handleRemove(uploadFile);
  }
}

/**
 * 插件上传失败回调
 * @param error
 */
function pluginUploadError(error) {
  ElMessage.error('插件上传失败,请检查网络是否通通畅');
}

/**
 * 插件禁用
 * @param row
 */
function handleDisable(row) {
  ElMessageBox.confirm('确定要禁用[' + row.name + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    disablePluginApi(row.pluginId).then(res => {
      if (res.code === 200 && res.data) {
        initMenu().then(res => {

        })
        ElMessage.success('插件禁用成功');
        initList();
      }else {
        ElMessage.error(res.msg);
      }
    })
  }).catch(() => {})
}

/**
 * 插件启用
 * @param row
 */
function handleEnable(row){
  ElMessageBox.confirm('确定要启用[' + row.name + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    enablePluginApi(row.pluginId).then(res => {
      if (res.code === 200 && res.data) {
        initMenu().then(res => {

        })
        ElMessage.success('插件启用成功');
        initList();
      }else {
        ElMessage.error(res.msg);
      }
    })
  }).catch(() => {})
}

function handleUnInstall(row) {
  ElMessageBox.confirm('确定要卸载[' + row.name + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    uninstallPluginApi(row.pluginId).then(res => {
      if (res.code === 200) {
        if (res.data) {
          ElMessage.success('插件卸载成功');
          initList();
        } else {
          ElMessage.error('插件卸载失败');
        }
      }else {
        ElMessage.error(res.msg);
      }
    })
  }).catch(() => {})
}
initList();
</script>