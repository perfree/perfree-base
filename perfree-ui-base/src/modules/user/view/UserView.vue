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
          <el-button type="primary" @click="initList" :icon="Search" v-hasPermission="['admin:user:query']">查询</el-button>
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
        <el-table-column prop="userName" label="用户名称" min-width="100" />
        <el-table-column prop="account" label="账号" min-width="100" />
        <el-table-column prop="sex" label="性别" min-width="60">
          <template v-slot="scope">
            {{getDictByParentDictTypeAndValue(DICT_TYPE.SEX, scope.row.sex)?.dictLabel}}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="120"  show-overflow-tooltip/>
        <el-table-column prop="website" label="网站" min-width="150"  show-overflow-tooltip/>
        <el-table-column prop="loginIp" label="最后登录ip" min-width="120" />
        <el-table-column prop="loginDate" label="最后登录时间" min-width="120" >
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.loginDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="80">
          <template v-slot="scope">
            <el-switch v-model="scope.row.status"  :active-value="0" :inactive-value="1" inline-prompt active-text="启用" inactive-text="禁用"
                       @click.native.prevent="changeStatus(scope.row)"/>
          </template>
        </el-table-column>
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

        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别" clearable  style="width: 200px">
            <el-option :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" v-for="dict in getDictByParentDictType(DICT_TYPE.SEX)" />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入邮箱地址" />
        </el-form-item>

        <el-form-item label="网站" prop="website">
          <el-input v-model="addForm.website" placeholder="请输入网站地址" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"/>
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
  delUserApi,
  exportExcelApi,
  getUserApi,
  getUserRoleApi,
  resetPasswordApi, updateStatusApi,
  updateUserApi,
  updateUserRoleApi,
  userPageApi
} from "../api/user.js";
import {roleListAllApi} from "../api/role.js";
import {Delete, Download, Edit, Filter, Plus, Refresh, RefreshLeft, Search} from "@element-plus/icons-vue";
import {parseTime} from "@/core/utils/perfree.js";
import {h, reactive, ref} from "vue";
import {DICT_TYPE} from "../script/DictConstant.js";
import {getDictByParentDictType, getDictByParentDictTypeAndValue} from "@/core/utils/dictUtils.js";

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
  website: '',
  sex: undefined,
  remark: '',
  mobile: ''
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
  email: [{type: "email",message: "请输入正确的邮箱地址",trigger: ["blur", "change"]}],
  mobile: [ {pattern: /^1[3|456789][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}],
  website: [{
    pattern: /^(https?:\/\/)?((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/,
    message: "请输入正确的网址",
    trigger: "blur"
  }]
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

function changeStatus(row) {
  let msg = row.status === 0 ? '启用': '禁用';
  ElMessageBox({
    title: '提示',
    message: h('p', null, [
      `确定要修改[${row.userName}]为`,
      h('font', { style: 'color: var(--el-color-warning)' }, msg), '吗?'
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let param = {
      id: row.id,
      status: row.status
    }
    updateStatusApi(param).then(res => {
      if (res.code === 200) {
        initList();
        ElMessage.success("修改成功");
      } else {
        row.status = row.status === 0 ? 1 : 0
        ElMessage.error("修改失败");
      }
    }).catch(() => {
      row.status = row.status === 0 ? 1 : 0
    });
  }).catch(() => {
    row.status = row.status === 0 ? 1 : 0
  });
}

/**
 * 重置密码
 */
function handleRestPassword(row) {
  ElMessageBox.prompt('请输入[' + row.userName + ']的新密码', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValidator: resetPasswordValidator,
    inputPlaceholder: '请输入新密码',
    inputErrorMessage: '密码必须在5-16字之间',
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
  if (!value){
    return false;
  }
  if (value.length < 4) {
    return false;
  }
  return value.length <= 16;

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
    addForm.value.sex = addForm.value.sex.toString();
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
    website: '',
    sex: undefined,
    remark: '',
    mobile: ''
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
    window.download.excel(res, '用户数据.xlsx');
    loading.value = false;
  }).catch(e => {
    ElMessage.error('导出失败');
    loading.value = false;
  })
}

initList();
</script>
