<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd">新增</el-button>
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
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
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


    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="60px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入名称" />
        </el-form-item>

        <el-form-item label="信息" prop="msg">
          <el-input v-model="addForm.msg" placeholder="请输入信息" />
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
import {parseTime} from "@/utils/utils.js";
import {Delete, Edit, Filter, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {addDemoApi, delDemoApi, demoPageApi, getDemoApi, updateDemoApi} from "@/modules/demo/api/demo.js";
import {ElMessage, ElMessageBox} from "element-plus";

const searchForm = ref({
  pageNo: 1,
  pageSize: 20,
  total: 0,
  name: ''
})

const searchFormRef = ref();
let tableData = ref([]);
let loading = ref(false);
let open = ref(false);
let title = ref('');
const addFormRef = ref();

const addForm = ref({
  id: '',
  name: '',
  msg: '',
});

const addRule = reactive({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称必须在2-20字之间', trigger: 'blur' }
  ],
});

/**
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加';
  open.value = true;
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: '',
    name: '',
    msg: '',
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}



/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  demoPageApi(searchForm.value).then((res) => {
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
    name: ''
  }
  searchFormRef.value.resetFields();
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改';
  open.value = true;
  getDemoApi(row.id).then((res) => {
    addForm.value = res.data;
  })
}


/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        updateDemoApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('更新成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        addDemoApi(addForm.value).then((res) => {
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
  ElMessageBox.confirm('确定要删除[' + row.name + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delDemoApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {})
}

initList();
</script>
<style scoped></style>