<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="分组">
          <el-select v-model="searchForm.attachGroup" placeholder="请选择分组" filterable
                     allow-create clearable style="width: 200px">
            <el-option v-for="item in attachGroups" :key="item.attachGroup" :label="item.attachGroup" :value="item.attachGroup" />
          </el-select>
        </el-form-item>

        <el-form-item label="附件名称">
          <el-input v-model="searchForm.name" placeholder="请输入附件名称" clearable/>
        </el-form-item>

        <el-form-item label="存储器类型">
          <el-select v-model="searchForm.storage" placeholder="请选择存储器类型" clearable  style="width: 200px">
            <el-option :key="0" :label="'本地磁盘'" :value="0" />
            <el-option :key="1" :label="'S3对象存储'" :value="1" />
          </el-select>
        </el-form-item>


        <el-form-item label="存储策略">
          <el-select v-model="searchForm.attachConfigId" placeholder="请选择存储策略" clearable style="width: 200px">
            <el-option  v-for="item in attachConfigs" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="UploadFilled" type="primary" plain @click="handleAdd">上传附件</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">
      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading"  :show-overflow-tooltip="true">
        <el-table-column label="序号" min-width="50" type="index" />
        <el-table-column prop="name" label="附件名称" min-width="130" />
        <el-table-column prop="attachGroup" label="预览" min-width="80">
          <template v-slot="scope">
            <div class="block">
            <el-image style="height: 50px" :src="scope.row.url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[scope.row.url]" :initial-index="4" v-if="scope.row.type&&scope.row.type === 'img'"
                      append-to-body fit="cover" preview-teleported></el-image>
            <video v-else-if="scope.row.type&&scope.row.type === 'video'" controls preload="none"  style="height: 50px">
              <source :src="scope.row.url"/>
            </video>
            <i v-else>无法预览，点击
              <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" target="_blank"
                       :href="'/api/attach/file/' + scope.row.configId + '/get/' + scope.row.path">下载
              </el-link>
            </i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="访问地址" min-width="280">
          <template v-slot="scope">
            <el-link :href="scope.row.url" target="_blank" :underline="false">{{ scope.row.url }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="附件类型" min-width="60" >
          <template v-slot="scope">
            <span v-if="scope.row.type === 'img'">图片</span>
            <span v-if="scope.row.type === 'video'">视频</span>
            <span v-if="scope.row.type === 'audio'">音频</span>
            <span v-if="scope.row.type === 'other'">其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="attachGroup" label="分组" min-width="80">
          <template v-slot="scope">
            <span>{{scope.row.attachGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" min-width="100" >
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="View" @click="handleShow(scope.row)">详情</el-button>
            <el-link type="primary" :underline="false" target="_blank" :icon="Download" style="font-size: 12px;"
                     :href="'/api/attach/file/' + scope.row.configId + '/get/' + scope.row.path">下载
            </el-link>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
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

    <!---添加附件-->
    <el-dialog v-model="open" :title="title" width="600px" draggable  @close="closeAdd">
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          status-icon
      >
        <el-form-item label="存储策略" prop="name">
          <el-select v-model="addForm.attachConfigId" placeholder="请选择存储策略" clearable >
            <el-option  v-for="item in attachConfigs" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="分组" prop="attachGroup">
          <el-select v-model="addForm.attachGroup" placeholder="请选择分组" filterable
                     allow-create>
            <el-option v-for="item in attachGroups" :key="item.attachGroup" :label="item.attachGroup" :value="item.attachGroup" />
          </el-select>
        </el-form-item>

        <el-form-item label="附件描述" prop="name">
          <el-upload
              class="upload-demo"
              drag
              :headers="headers"
              :action="serverBaseUrl + '/api/auth/attach/upload'"
              multiple
              style="width: 100%"
              ref="uploadRef"
              v-model:file-list="addForm.fileList"
              :data="{attachConfigId: addForm.attachConfigId, attachGroup: addForm.attachGroup}"
              :on-success="uploadSuccess"
              :on-error="uploadError"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽文件到此处或者<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                请先选择存储策略及分组,如不选择将使用默认存储策略及分组
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--附件详情-->
    <el-dialog v-model="showOpen" :title="title" width="800px" draggable>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
          <div  style="padding-right: 15px">
            <el-image style="width: 100%; max-height: 100%" :src="showForm.url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[showForm.url]" :initial-index="4" fit="cover" v-if="showForm.type&&showForm.type === 'img'"/>
            <video v-else-if="showForm.type&&showForm.type === 'video'" preload="none" controls style="width: 100%; max-height: 100%">
              <source :src="showForm.url"/>
            </video>
            <audio controls v-else-if="showForm.type&&showForm.type === 'audio'" preload="none">
              <source :src="showForm.url" />
            </audio>
            <i v-else>无法预览，点击
              <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" target="_blank"
                       :href="'/api/attach/file/' + showForm.configId + '/get/' + showForm.path">下载
              </el-link>
            </i>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
          <div class="showForm">
            <el-form
                ref="showFormRef"
                :model="showForm"
                label-width="auto"
                :rules="showRule"
                :label-position="'top'"
            >
              <el-form-item label="附件名称" prop="name">
                <el-input v-model="showForm.name" />
              </el-form-item>
              <el-form-item label="附件mineType">
                <el-input v-model="showForm.mineType" disabled />
              </el-form-item>
              <el-form-item label="附件类型">
                <el-input v-model="showForm.type" disabled />
              </el-form-item>
              <el-form-item label="分组">
                <el-select v-model="showForm.attachGroup" placeholder="请选择分组" filterable style="width: 100%"
                           allow-create>
                  <el-option v-for="item in attachGroups" :key="item.attachGroup" :label="item.attachGroup" :value="item.attachGroup" />
                </el-select>
              </el-form-item>
              <el-form-item label="存储路径">
                <el-input v-model="showForm.path" disabled />
              </el-form-item>
              <el-form-item label="访问地址">
                <el-input v-model="showForm.url" disabled />
              </el-form-item>
              <el-form-item label="附件描述">
                <el-input v-model="showForm.desc"  :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" resize="none" placeholder="请输入附件描述"/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitUpdateForm">修 改</el-button>
              <el-button @click="showOpen = false; resetShowForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
<script setup>

import {ElMessage, ElMessageBox} from "element-plus";
import {parseTime} from "@/core/utils/perfree.js";
import {Delete, Download, Refresh, Search, UploadFilled, View} from "@element-plus/icons-vue";
import axios_config from "@/core/api/axios_config.js";
import {CONSTANTS} from "@/core/utils/constants.js";
import {attachDelApi, attachPageApi, attachUpdateApi, getAllAttachGroupApi, getAttachApi} from "../api/attach.js";
import {getAllAttachConfigApi} from "../api/attachConfig.js";
import {reactive, ref} from "vue";

let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
let serverBaseUrl = axios_config.baseURL;
let tableData = ref([]);
let loading = ref(false);
const searchFormRef = ref();
let open = ref(false);
let showOpen = ref(false);
let title = ref('');
let attachGroups = ref([]);
let attachConfigs = ref([]);
let defaultAttachConfig = ref(null);
let  headers = {
  Authorization: "Bearer " + JSON.parse(token_info).accessToken,
};
const addFormRef = ref();
const showFormRef = ref();
let uploadRef = ref();

const addForm = ref({
  attachConfigId: defaultAttachConfig.value,
  attachGroup: 'default',
  fileList: []
});

const showRule = reactive({
  name: [{ required: true, message: '请输入附件名称', trigger: 'blur' }],
});


const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name: '',
  attachConfigId: undefined,
  storage: undefined,
  attachGroup: undefined
})


const showForm = ref({
  name: '',
  type: '',
  attachGroup: 'default',
  path: '',
  url: '',
  desc: '',
  mineType: ''
})


/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  attachPageApi(searchForm.value).then((res) => {
    tableData.value = res.data.list;
    searchForm.value.total = res.data.total;
    loading.value = false;
  })
}

/**
 * 关闭新增
 */
function closeAdd() {
  initAttachGroups();
  initList();
}

/**
 * 重置搜索表单
 */
function resetSearchForm() {
  searchForm.value = {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    name: '',
    attachConfigId: undefined,
    storage: undefined,
    attachGroup: undefined
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 重置新增表单
 */
function resetAddForm() {
  addForm.value = {
    attachConfigId: defaultAttachConfig.value,
    attachGroup: 'default',
    fileList: []
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '上传附件';
  initAttachGroups();
  open.value = true;
}

function initAttachGroups() {
  getAllAttachGroupApi().then(res => {
    attachGroups.value = res.data;
  })
}

/**
 * 初始化存储策略列表
 */
function initAttachConfigs() {
  getAllAttachConfigApi().then(res => {
    attachConfigs.value = res.data;
    res.data.forEach(item => {
      if (item.master) {
        defaultAttachConfig.value = item.id;
      }
    })
  })
}

/**
 * 查看附件
 * @param row
 */
function handleShow(row) {
  resetShowForm();
  getAttachApi(row.id).then(res => {
    showForm.value = res.data;
    title.value = '详情';
    showOpen.value = true;
  })
}

/**
 * 重置详情表单
 */
function resetShowForm() {
  showForm.value = {
    name: '',
    type: '',
    attachGroup: 'default',
    path: '',
    url: '',
    desc: '',
    mineType: ''
  }
  if (showFormRef.value) {
    showFormRef.value.resetFields();
  }
}

function submitUpdateForm () {
  showFormRef.value.validate(valid => {
    if (valid) {
      attachUpdateApi(showForm.value).then((res) => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          showOpen.value = false;
          resetShowForm();
          initList();
        } else {
          ElMessage.error(res.msg);
        }
      })
    }
  })
}

function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.name + ']吗？删除后该文件将无法找回!', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    attachDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error('删除失败');
      }
    });
  }).catch(() => {})
}

/**
 * 上传成功回调
 * @param response
 * @param uploadFile
 * @param uploadFiles
 */
function uploadSuccess(response, uploadFile, uploadFiles) {
  if (response.code === 200) {
    ElMessage.success(`[${uploadFile.name}]上传成功`);
  }else {
    ElMessage.error(response.msg);
    uploadRef.value.handleRemove(uploadFile);
  }
}


/**
 * 上传失败回调
 * @param error
 */
function uploadError(error) {
  ElMessage.error('上传失败,请检查网络是否通通畅');
}

initAttachGroups();
initAttachConfigs();
initList();
</script>