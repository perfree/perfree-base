<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="附加数据名称">
          <el-input v-model="searchForm.extraName" placeholder="请输入附加数据名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search"   v-hasPermission="['admin:extra:query']">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" v-hasPermission="['admin:extra:create']">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="extraName" label="名称" min-width="150"/>
        <el-table-column prop="extraKey" label="key" min-width="150"/>
        <el-table-column prop="extraDescription" label="描述" min-width="240"/>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)" v-hasPermission="['admin:extra:update']">修改</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:extra:delete']">删除</el-button>
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
        <el-form-item label="名称" prop="extraName">
          <el-input v-model="addForm.extraName" placeholder="请输入名称"/>
        </el-form-item>

        <el-form-item label="key" prop="extraKey">
          <el-input v-model="addForm.extraKey" placeholder="请输入key"/>
        </el-form-item>

        <el-form-item label="描述" prop="extraDescription">
          <el-input v-model="addForm.extraDescription" placeholder="请输入描述" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
        </el-form-item>

        <el-form-item label="附加值" prop="extraData">
          <el-input v-model="addForm.extraData" placeholder="请输入附加数据值" :autosize="{ minRows: 5, maxRows: 10 }"
                    type="textarea"/>
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
import {parseTime} from "@/core/utils/perfree.js";
import {Delete, Edit, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {extraAddApi, extraDelApi, extraGetApi, extraPageApi, extraUpdateApi} from "../api/extra.js";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  extraName: ''
})
const addForm = ref({
  id: '',
  extraName: '',
  extraDescription: '',
  extraKey: '',
  extraData: ''
});
const addRule = reactive({
  extraName: [{required: true, message: '请输入名称', trigger: 'blur'}],
  extraKey: [{required: true, message: '请输入key', trigger: 'blur'}],
  extraData: [{required: true, message: '请输入附加数据值', trigger: 'blur'}],
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
        extraUpdateApi(addForm.value).then((res) => {
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
        extraAddApi(addForm.value).then((res) => {
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
  title.value = '添加附加数据';
  open.value = true;
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改附加数据';
  open.value = true;
  extraGetApi(row.id).then((res) => {
    addForm.value = res.data;
  })
}

/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.extraName + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    extraDelApi(row.id).then((res) => {
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
  extraPageApi(searchForm.value).then((res) => {
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
    extraName: ''
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: '',
    extraName: '',
    extraDescription: '',
    extraKey: '',
    extraData: ''
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

initList();
</script>
<style scoped></style>