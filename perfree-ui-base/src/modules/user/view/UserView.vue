<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="昵称">
          <el-input v-model="searchForm.userName" placeholder="请输入昵称" clearable/>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="searchForm.account" placeholder="请输入账户" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
          <el-button :icon="Download" @click="exportExcel" v-hasPermission="['admin:user:export']">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" v-hasPermission="['admin:user:create']">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading">
        <el-table-column label="序号" min-width="80" type="index" />
        <el-table-column prop="userName" label="用户名称" min-width="150" />
        <el-table-column prop="account" label="账号" min-width="150" />
        <el-table-column prop="status" label="状态" min-width="100">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.status === 0">开启</el-tag>
            <el-tag class="ml-2" type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="150" />
        <el-table-column prop="website" label="网站" min-width="150" />
        <el-table-column prop="createTime" label="创建时间" min-width="120" >
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)" v-hasPermission="['admin:user:update']">修改</el-button>
            <el-button size="small" type="primary" link :icon="Filter" @click="handleUserRole(scope.row)" v-hasPermission="['admin:user:configRole']">分配角色</el-button>
            <el-button size="small" type="primary" link :icon="RefreshLeft" @click="handleRestPassword(scope.row)" v-hasPermission="['admin:user:resetPassword']">重置密码</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:user:delete']">删除</el-button>

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
    <el-dialog v-model="userRoleOpen" :title="title" width="600px" draggable>
      <el-form
          ref="userRoleFormRef"
          :model="userRoleForm"
          label-width="80px"
          status-icon
      >
        <el-form-item label="昵称" prop="userName">
          <el-input v-model="userRoleForm.userName" disabled placeholder="请输入昵称" />
        </el-form-item>

        <el-form-item label="账户" prop="account">
          <el-input v-model="userRoleForm.account" disabled placeholder="请输入账户" />
        </el-form-item>

        <el-form-item label="角色" prop="roles">
          <el-select
              v-model="userRoleForm.roles"
              clearable
              multiple
              placeholder="请选择角色"
              style="width: 100%"
          >
            <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitUserRoleForm">确 定</el-button>
              <el-button @click="userRoleOpen = false; resetUserRoleForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="60px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="昵称" prop="userName">
          <el-input v-model="addForm.userName" placeholder="请输入昵称" />
        </el-form-item>

        <el-form-item label="账户" prop="account">
          <el-input v-model="addForm.account" placeholder="请输入账户" />
        </el-form-item>

        <el-form-item label="密码" prop="password" v-if="!isUpdate">
          <el-input v-model="addForm.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入邮箱地址" />
        </el-form-item>

        <el-form-item label="网站" prop="website">
          <el-input v-model="addForm.website" placeholder="请输入网站地址" />
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
  addUserApi,
  delUserApi, exportExcelApi,
  getUserApi, getUserRoleApi,
  resetPasswordApi,
  updateUserApi,
  updateUserRoleApi,
  userPageApi
} from "../api/user.js";
import {roleListAllApi} from "../api/role.js";
import {Delete, Download, Edit, Filter, Plus, Refresh, RefreshLeft, Search} from "@element-plus/icons-vue";
import {parseTime} from "@/core/utils/perfree.js";
import {reactive, ref} from "vue";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  userName: '',
  account: ''
})
const addForm = ref({
  id: '',
  userName: '',
  account: '',
  password: '',
  email: '',
  website: ''
});
const userRoleForm = ref({
  id: '',
  userName: '',
  account: '',
  roles: '',
});
const addRule = reactive({
  userName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称必须在2-20字之间', trigger: 'blur' }
  ],
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 5, max: 16, message: '账户必须在5-16字之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '密码必须在5-16字之间', trigger: 'blur' }
  ],
});

const searchFormRef = ref();
const addFormRef = ref();
const userRoleFormRef = ref();
let open = ref(false);
let userRoleOpen = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);
let isUpdate = ref(false);
let roleList = ref([]);


/**
 * 重置密码
 */
function handleRestPassword(row) {
  ElMessageBox.prompt('请输入[' + row.userName + ']的新密码', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValidator: resetPasswordValidator,
    inputPlaceholder: '请输入新密码',
    inputErrorMessage: '请输入新密码',
  }).then(({ value }) => {
    resetPasswordApi({id: row.id, password: value}).then((d) => {
      if (d.code === 200) {
        ElMessage.success('重置成功');
      } else {
        ElMessage.error(d.msg);
      }
    })
  }).catch(() => {});
}

function resetPasswordValidator( value) {
  return value;
}


/**
 * 分配角色提交
 */
function submitUserRoleForm() {
  userRoleFormRef.value.validate(valid => {
    if (valid) {
      updateUserRoleApi(userRoleForm.value).then((res) => {
        if (res.code === 200) {
          ElMessage.success('操作成功');
          userRoleOpen.value = false;
          resetUserRoleForm();
          initList();
        } else {
          ElMessage.error(res.msg);
        }
      })
    }
  })
}

/**
 * 重置分配角色表单
 */
function resetUserRoleForm() {
  userRoleForm.value = {
    id: '',
    userName: '',
    account: '',
    roles: '',
  }
  if (userRoleFormRef.value) {
    userRoleFormRef.value.resetFields();
  }
}

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        addForm.value.password = null;
        updateUserApi(addForm.value).then((res) => {
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
        addUserApi(addForm.value).then((res) => {
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
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加用户';
  open.value = true;
  isUpdate.value = false;
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改用户';
  open.value = true;
  isUpdate.value = true;
  getUserApi(row.id).then((res) => {
    addForm.value = res.data;
    addForm.value.password = '';
  })
}

/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.userName + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delUserApi(row.id).then((res) => {
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
 * 加载列表
 */
function initList() {
  loading.value = true;
  userPageApi(searchForm.value).then((res) => {
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
    userName: '',
    account: ''
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
    userName: '',
    account: '',
    password: '',
    email: '',
    website: ''
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 分配角色
 */
function handleUserRole(row) {
  resetUserRoleForm();
  userRoleForm.value.id = row.id;
  userRoleForm.value.userName = row.userName;
  userRoleForm.value.account = row.account;
  roleListAllApi().then((res) => {
    roleList.value = res.data;
    getUserRoleApi(row.id).then((d) => {
      userRoleForm.value.roles = d.data.roles;
    });
  })
  title.value = '分配角色';
  userRoleOpen.value = true;
}

/**
 * 导出excel
 */
function exportExcel() {
  loading.value = true;
  exportExcelApi(searchForm.value).then(res => {
    loading.value = false;
  }).catch(e => {
    ElMessage.error('导出失败');
    loading.value = false;
  })
}

initList();
</script>