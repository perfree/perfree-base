<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable/>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="searchForm.msg" placeholder="请输入信息" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search" v-hasPermission="['admin:pluginDemo:query']">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
          <el-button :icon="Download" @click="exportExcel" v-hasPermission="['admin:pluginDemo:export']">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" v-hasPermission="['admin:pluginDemo:create']">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="name" label="名称" min-width="150"/>
        <el-table-column prop="msg" label="信息" min-width="150"/>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)" v-hasPermission="['admin:pluginDemo:update']">修改</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:pluginDemo:delete']">删除</el-button>
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
          label-width="80px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="信息" prop="msg">
          <el-input v-model="addForm.msg" placeholder="请输入信息"/>
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
import {pluginDemoAddApi, pluginDemoDelApi, pluginDemoGetApi, pluginDemoPageApi, pluginDemoUpdateApi, pluginDemoExportExcelApi} from "../api/pluginDemo.js";
import {Delete, Edit, Filter, Plus, Refresh, Search, Download} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {getDictByParentDictType, getDictByParentDictTypeAndValue} from "@/core/utils/dictUtils.js";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name:  null ,
  msg:  null ,
})
const addForm = ref({
  id: null,
  name: null,
  msg: null,
});
const addRule = reactive({
});

const searchFormRef = ref();
const addFormRef = ref();
let open = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        pluginDemoUpdateApi(addForm.value).then((res) => {
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
        pluginDemoAddApi(addForm.value).then((res) => {
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
  title.value = '添加测试';
  open.value = true;
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改测试';
  open.value = true;
  pluginDemoGetApi(row.id).then((res) => {
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
    pluginDemoDelApi(row.id).then((res) => {
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
  pluginDemoPageApi(searchForm.value).then((res) => {
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
    msg:   null ,
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
    msg: null,
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
  pluginDemoExportExcelApi(searchForm.value).then(res => {
    window.download.excel(res,  '测试数据.xlsx');
    loading.value = false;
  }).catch(e => {
    ElMessage.error('导出失败');
    loading.value = false;
  })
}

initList();
</script>
<style scoped></style>