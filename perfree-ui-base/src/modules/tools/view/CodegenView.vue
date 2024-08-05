<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="表名称">
          <el-input v-model="searchForm.tableName" placeholder="请输入表名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Upload" type="primary" plain @click="handleAdd">导入表</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="tableName" label="表名称" min-width="150"/>
        <el-table-column prop="tableComment" label="表描述" min-width="150"/>
        <el-table-column prop="className" label="类名称" min-width="150"/>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handlePreview(scope.row)">预览</el-button>
            <el-button size="small" type="primary" link :icon="Filter" @click="handleConfig(scope.row)">配置</el-button>
            <el-button size="small" type="primary" link :icon="Filter" @click="handleRoleMenu(scope.row)">下载</el-button>
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
      <div>
        <el-form :inline="true" :model="addSearchForm" class="demo-form-inline" ref="addSearchFormRef">
          <el-form-item label="表名称">
            <el-input v-model="addSearchForm.tableName" placeholder="请输入表名称" clearable/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addTableInit" :icon="Search">查询</el-button>
            <el-button :icon="Refresh" @click="resetAddSearchForm">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="addTableData" style="width: 100%;height:100%;" row-key="id" v-loading="addLoading"
                  ref="multipleTableRef"  max-height="260" >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="表名称" min-width="150"/>
          <el-table-column prop="comment" label="表描述" min-width="150"/>
        </el-table>

      </div>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定</el-button>
              <el-button @click="open = false; resetAddSearchForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {Delete, Edit, Filter, Refresh, Search, Upload} from "@element-plus/icons-vue";
import {parseTime} from "@/core/utils/perfree.js";
import {codegenGetTableList, codegenTablePage, createCodegenList, delCodegenList} from "../api/codegen.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {toPage} from "@/core/utils/tabs.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  tableName: ''
})
const searchFormRef = ref();
const addSearchForm = ref({
  tableName: ''
})

const router = useRouter();
const addSearchFormRef = ref();
const multipleTableRef = ref();
let tableData = ref([]);
let addTableData = ref([]);
let addLoading = ref(false);
let loading = ref(false);
let open = ref(false);
let title = ref('');

function initList() {
  loading.value = true;
  codegenTablePage(searchForm.value).then(res => {
    loading.value = false;
    tableData.value = res.data.list;
    searchForm.value.total = res.data.total;
  })
}
/**
 * 新增
 */
function handleAdd() {
  resetAddSearchForm();
  title.value = '导入表';
  open.value = true;
  addTableInit();
}

/**
 * 初始化导入表
 */
function addTableInit() {
  addLoading.value = true
  codegenGetTableList(addSearchForm.value).then(res => {
    addTableData.value = res.data
    addLoading.value= false
  })
}

/**
 * 重置添加表单
 */
function resetAddSearchForm() {
  addSearchForm.value = {
    tableName: '',
  }
  if (addSearchFormRef.value) {
    addSearchFormRef.value.resetFields();
  }
}

/**
 * 导入表确定
 */
function submitAddForm() {
  if (multipleTableRef.value.getSelectionRows().length <= 0) {
    ElMessage.error("至少选择一张表!");
    return
  }

  let param = {
    tableNames: []
  }
  multipleTableRef.value.getSelectionRows().forEach(res => {
    param.tableNames.push(res.name)
  })
  createCodegenList(param).then(res => {
    initList();
    open.value = false;
  })
}

/**
 * 配置方法
 * @param item
 */
function handleConfig(item) {
  toPage(`代码生成-配置[${item.tableName}]`, '/admin/codegen/editConfig/' + item.id, '')
}

function handlePreview(item) {
  toPage(`代码生成-预览[${item.tableName}]`, '/admin/codegen/preview/' + item.id, '')
}

/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.tableName + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delCodegenList(row.id).then((res) => {
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

initList();
</script>