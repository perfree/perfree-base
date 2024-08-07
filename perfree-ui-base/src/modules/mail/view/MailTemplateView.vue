<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="模板名称">
          <el-input v-model="searchForm.name" placeholder="请输入模板名称" clearable/>
        </el-form-item>
        <el-form-item label="模板编码">
          <el-input v-model="searchForm.code" placeholder="请输入模板编码" clearable/>
        </el-form-item>
        <el-form-item label="邮箱服务">
          <el-select v-model="searchForm.mailServerId" placeholder="请选择邮箱服务" clearable  style="width: 200px">
            <el-option :key="mailServer.id" :label="mailServer.name" :value="mailServer.id" v-for="mailServer in mailServerList" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search" v-hasPermission="['admin:mailTemplate:query']">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
          <el-button :icon="Download" @click="exportExcel" v-hasPermission="['admin:mailTemplate:export']">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" v-hasPermission="['admin:mailTemplate:create']">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="name" label="模板名称" min-width="120"/>
        <el-table-column prop="code" label="模板编码" min-width="120"/>
        <el-table-column prop="nickname" label="发送人名称" min-width="120"/>
        <el-table-column prop="mailTitle" label="邮件标题" min-width="120"/>
        <el-table-column prop="mailContent" label="邮件内容" min-width="150"/>
        <el-table-column prop="status" label="状态" min-width="80">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.status === 0">启用</el-tag>
            <el-tag class="ml-2" type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150"/>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)" v-hasPermission="['admin:mailTemplate:update']">修改</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:mailTemplate:delete']">删除</el-button>
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
          label-width="100px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入模板名称"/>
        </el-form-item>
        <el-form-item label="模板编码" prop="code">
          <el-input v-model="addForm.code" placeholder="请输入模板编码"/>
        </el-form-item>
          <el-form-item label="邮箱服务" prop="mailServerId">
            <el-select v-model="addForm.mailServerId" placeholder="请选择邮箱服务" clearable  style="width: 200px">
              <el-option :key="mailServer.id" :label="mailServer.name" :value="mailServer.id" v-for="mailServer in mailServerList" />
            </el-select>
          </el-form-item>
        <el-form-item label="发送人名称" prop="nickname">
          <el-input v-model="addForm.nickname" placeholder="请输入发送人名称"/>
        </el-form-item>
        <el-form-item label="邮件标题" prop="mailTitle">
          <el-input v-model="addForm.mailTitle" placeholder="请输入邮件标题"/>
        </el-form-item>
        <el-form-item label="邮件内容" prop="mailContent">
          <el-input v-model="addForm.mailContent" placeholder="请输入邮件内容"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addForm.status" inline-prompt active-text="启用" inactive-text="禁用" :active-value="0" :inactive-value="1" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" placeholder="请输入备注"/>
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
import {handleTree, parseTime} from "@/core/utils/perfree.js";
import {mailTemplateAddApi, mailTemplateDelApi, mailTemplateGetApi, mailTemplatePageApi, mailTemplateUpdateApi, mailTemplateExportExcelApi} from "../api/mailTemplate.js";
import {Delete, Edit, Filter, Plus, Refresh, Search, Download} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {getDictByParentDictType, getDictByParentDictTypeAndValue} from "@/core/utils/dictUtils.js";
import {mailServerListAllApi} from "@/modules/mail/api/mailServer.js";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name:  null ,
  code:  null ,
  mailServerId:  null ,
})
const addForm = ref({
  id: null,
  name: null,
  code: null,
  mailServerId: null,
  nickname: null,
  mailTitle: null,
  mailContent: null,
  status: 0,
  remark: null,
});
const addRule = reactive({
  name: [{required: true, message: '模板名称不能为空', trigger: 'blur'}],
  code: [{required: true, message: '模板编码不能为空', trigger: 'blur'}],
  mailServerId: [{required: true, message: '邮箱服务不能为空', trigger: 'blur'}],
  nickname: [{required: true, message: '发送人名称不能为空', trigger: 'blur'}],
  mailTitle: [{required: true, message: '邮件标题不能为空', trigger: 'blur'}],
  mailContent: [{required: true, message: '邮件内容不能为空', trigger: 'blur'}],
  status: [{required: true, message: '状态不能为空', trigger: 'blur'}],
});

const searchFormRef = ref();
const addFormRef = ref();
let open = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);
let mailServerList = ref([])

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        mailTemplateUpdateApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        mailTemplateAddApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
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
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加邮件模板';
  open.value = true;
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改邮件模板';
  open.value = true;
  mailTemplateGetApi(row.id).then((res) => {
    addForm.value = res.data;
  })
}

/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  let keys = Object.keys(row);
  ElMessageBox.confirm('确定要删除[' + row[keys[0]] + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    mailTemplateDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {
  })
}

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  mailTemplatePageApi(searchForm.value).then((res) => {
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
    name:   null ,
    code:   null ,
    mailServerId:   null ,
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: null,
    name: null,
    code: null,
    mailServerId: null,
    nickname: null,
    mailTitle: null,
    mailContent: null,
    status: 0,
    remark: null,
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 导出excel
 */
function exportExcel() {
  loading.value = true;
  mailTemplateExportExcelApi(searchForm.value).then(res => {
    window.download.excel(res,  '邮件模板数据.xlsx');
    loading.value = false;
  }).catch(e => {
    ElMessage.error('导出失败');
    loading.value = false;
  })
}

function initMailServerList() {
  mailServerListAllApi().then(res => {
    mailServerList.value = res.data
  })
}
initMailServerList();
initList();
</script>
<style scoped></style>