<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="配置名称">
          <el-input v-model="searchForm.name" placeholder="请输入配置名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" v-hasPermission="['admin:attachConfig:create']">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column label="序号" min-width="80" type="index" />
        <el-table-column prop="name" label="配置名称" min-width="240" />
        <el-table-column prop="storage" label="存储器类型" min-width="240">
          <template v-slot="scope">
            <span v-if="scope.row.storage === 0">本地磁盘</span>
            <span v-if="scope.row.storage === 1">S3对象存储</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="240" />
        <el-table-column prop="master" label="默认配置" min-width="100">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.master">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120" >
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)" v-hasPermission="['admin:attachConfig:update']">修改</el-button>
            <el-button size="small" type="primary" link :icon="Discount" @click="handleUpdateMaster(scope.row)" v-hasPermission="['admin:attachConfig:master']">默认配置</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:attachConfig:delete']">删除</el-button>

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


    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="120px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入配置名称" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item label="存储器类型" prop="storage">
          <el-select v-model="addForm.storage" placeholder="请选择存储器类型" :disabled="isUpdate">
            <el-option :key="0" :label="'本地磁盘'" :value="0" />
            <el-option :key="1" :label="'S3对象存储'" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="存储路径" prop="basePath" v-if="addForm.storage === 0">
          <el-input v-model="addForm.basePath" placeholder="请输入存储路径" />
          <el-text class="mx-1" type="danger" v-if="isUpdate">提示: 修改存储路径将会造成原有上传图片不能访问,建议新增存储策略</el-text>
        </el-form-item>

        <el-form-item label="节点地址" prop="endpoint" v-if="addForm.storage === 1">
          <el-input v-model="addForm.endpoint" placeholder="请输入节点地址" />
        </el-form-item>

        <el-form-item label="存储bucket" prop="bucket" v-if="addForm.storage === 1">
          <el-input v-model="addForm.bucket" placeholder="请输入存储bucket" />
        </el-form-item>

        <el-form-item label="accessKey" prop="accessKey" v-if="addForm.storage === 1">
          <el-input v-model="addForm.accessKey" placeholder="请输入accessKey" />
        </el-form-item>

        <el-form-item label="accessSecret" prop="accessSecret" v-if="addForm.storage === 1">
          <el-input v-model="addForm.accessSecret" placeholder="请输入accessSecret" />
        </el-form-item>

        <el-form-item label="上传目录" prop="uploadDir" v-if="addForm.storage === 1">
          <el-input v-model="addForm.uploadDir" placeholder="请输入上传目录" />
          <el-text class="mx-1" type="info">支持{year},{month}, {day}占位符,不填写则上传至根目录</el-text>
        </el-form-item>

        <el-form-item label="访问域名" prop="domain" v-if="addForm.storage === 1">
          <el-input v-model="addForm.domain" placeholder="请输入访问域名" />
          <el-text class="mx-1" type="info">如未配置访问域名,将采用节点地址 + 存储bucket的形式作为访问域名</el-text>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定</el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import {
  attachConfigAddApi,
  attachConfigDelApi,
  attachConfigPageApi,
  attachConfigUpdateApi, attachConfigUpdateMasterApi, getAttachConfigApi
} from "../api/attachConfig.js";
import {Delete, Discount, Edit, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {parseTime} from "@/core/utils/perfree.js";
import {reactive, ref} from "vue";

let tableData = ref([]);
let loading = ref(false);
const searchFormRef = ref();
let open = ref(false);
let isUpdate = ref(false);
let title = ref('');
const addFormRef = ref();

const addForm = ref({
  id: '',
  name: '',
  remark: '',
  storage: undefined,
  basePath: '',
  endpoint: '',
  bucket: '',
  accessKey: '',
  accessSecret: '',
  domain: '',
  uploadDir: ''
});
const addRule = reactive({
  name: [{ required: true, message: '请输入配置名称', trigger: 'blur' }],
  storage: [{ required: true, message: '请选择存储器类型', trigger: 'blur' }],
  basePath: [{ required: true, message: '请输入存储路径', trigger: 'blur' }],
  endpoint: [{ required: true, message: '请输入节点地址', trigger: 'blur' }],
  bucket: [{ required: true, message: '请输入存储bucket', trigger: 'blur' }],
  accessKey: [{ required: true, message: '请输入accessKey', trigger: 'blur' }],
  accessSecret: [{ required: true, message: '请输入accessSecret', trigger: 'blur' }],
});


const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name: ''
})

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  attachConfigPageApi(searchForm.value).then((res) => {
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
  initList();
}

/**
 * 新增
 */
function handleAdd() {
  isUpdate.value = false;
  title.value = '新增配置';
  resetAddForm();
  open.value = true;
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: '',
    name: '',
    remark: '',
    storage: undefined,
    basePath: '',
    endpoint: '',
    bucket: '',
    accessKey: '',
    accessSecret: '',
    domain: '',
    uploadDir: ''
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      let config;
      if (addForm.value.storage === 0) {
        config = {
          basePath: addForm.value.basePath,
        }
      } else {
        config = {
          endpoint: addForm.value.endpoint,
          bucket: addForm.value.bucket,
          accessKey: addForm.value.accessKey,
          accessSecret: addForm.value.accessSecret,
          domain: addForm.value.domain,
          uploadDir: addForm.value.uploadDir,
        }
      }

      const param = {
        id: addForm.value.id,
        name: addForm.value.name,
        remark: addForm.value.remark,
        storage: addForm.value.storage,
        config: JSON.stringify(config)
      }

      if (addForm.value.id) {
        attachConfigUpdateApi(param).then((res) => {
          if (res.code === 200) {
            ElMessage.success('修改成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        });
      } else {
        attachConfigAddApi(param).then((res) => {
          if (res.code === 200) {
            ElMessage.success('添加成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      }
    }
  })
}


/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  if (row.master) {
    ElMessage.error('默认配置不允许删除!');
    return;
  }

  ElMessageBox.confirm('确定要删除[' + row.name + ']吗？删除后该配置内上传的文件将无法展示!', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    attachConfigDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {})
}

/**
 * 修改
 */
function handleUpdate(row) {
  isUpdate.value = true;
  title.value = '修改配置';
  resetAddForm();
  open.value = true;
  getAttachConfigApi(row.id).then((res) => {
    addForm.value = Object.assign(res.data, JSON.parse(res.data.config));
  })
}

/**
 * 修改默认配置
 */
function handleUpdateMaster(row){
  ElMessageBox.confirm('确定要将除[' + row.name + ']设置为主配置吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    attachConfigUpdateMasterApi({id: row.id}).then((res) => {
      ElMessage.success('修改成功');
      initList();
    })
  }).catch(() => {})
}

initList();
</script>