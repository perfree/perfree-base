<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.name" placeholder="请输入角色名称" clearable/>
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
        <el-table-column prop="name" label="角色名称" min-width="150"/>
        <el-table-column prop="code" label="角色编码" min-width="150"/>
        <el-table-column prop="description" label="描述" min-width="240"/>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button size="small" type="primary" link :icon="Filter" @click="handleRoleMenu(scope.row)">菜单权限
            </el-button>
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

    <el-dialog v-model="roleMenuOpen" :title="title" width="600px" draggable>
      <el-form
          ref="menuFormRef"
          :model="menuForm"
          label-width="80px"
          class="demo-ruleForm"
          status-icon
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="menuForm.name" disabled/>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="menuForm.code" disabled/>
        </el-form-item>
        <el-form-item label="菜单权限" prop="code">
          <el-checkbox v-model="menuForm.expand" label="展开/折叠" @change="expandAllTree"/>
          <el-checkbox v-model="menuForm.selectAll" label="全选/全不选" @change="selectAllTree"/>
          <div style="width: 100%;border: 1px solid rgb(228 231 237);padding: 5px;">
            <el-tree
                :props="defaultProps"
                :data="menuData"
                node-key="id"
                show-checkbox
                ref="menuTree"
                :check-strictly="true"
                v-loading="menuTreeLoading"
            />
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitMenuForm">确 定</el-button>
              <el-button @click="roleMenuOpen = false; resetMenuForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入角色名称"/>
        </el-form-item>

        <el-form-item label="角色编码" prop="code">
          <el-input v-model="addForm.code" placeholder="请输入角色编码"/>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="addForm.description" placeholder="请输入角色描述" :autosize="{ minRows: 3, maxRows: 6 }"
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
import {assignRoleMenuApi, getRoleMenusApi, menuListApi} from "../api/menu.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {handleTree, parseTime} from "@/core/utils/perfree.js";
import {roleAddOrUpdateApi, roleDelApi, roleGetRoleApi, rolePageApi} from "../api/role.js";
import {Delete, Edit, Filter, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";

let menuData = ref([]);

const defaultProps = {
  children: 'children',
  label: 'name'
}

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name: ''
})
const menuForm = ref({
  id: '',
  name: '',
  code: '',
  expand: false,
  selectAll: false
});
const addForm = ref({
  id: '',
  name: '',
  code: '',
  description: ''
});
const addRule = reactive({
  name: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
  code: [{required: true, message: '请输入角色编码', trigger: 'blur'}],
});

const menuTree = ref();
const searchFormRef = ref();
const addFormRef = ref();
const menuFormRef = ref();
let roleMenuOpen = ref(false);
let open = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);
let menuTreeLoading = ref(false);

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      roleAddOrUpdateApi(addForm.value).then((res) => {
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
  })
}

/**
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加角色';
  open.value = true;
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改角色';
  open.value = true;
  roleGetRoleApi(row.id).then((res) => {
    addForm.value = res.data;
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
    roleDelApi(row.id).then((res) => {
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
  rolePageApi(searchForm.value).then((res) => {
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
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: '',
    name: '',
    code: '',
    description: ''
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 重置菜单权限表单
 */
function resetMenuForm() {
  menuForm.value = {
    id: '',
    name: '',
    code: '',
    expand: false,
    selectAll: false
  }
  if (menuFormRef.value) {
    menuFormRef.value.resetFields();
  }
}

/**
 * 菜单权限
 */
function handleRoleMenu(row) {
  if (row.code === 'admin') {
    ElMessage.warning('admin角色默认拥有所有权限,不可修改');
    return;
  }
  resetMenuForm();
  roleMenuOpen.value = true;
  menuForm.value.name = row.name;
  menuForm.value.code = row.code;
  menuForm.value.id = row.id;
  title.value = '菜单权限';
  menuTreeLoading.value = true;
  menuListApi({}).then((res) => {
    menuData.value = handleTree(res.data, "id", "pid", 'children', '-1');
    getRoleMenusApi(row.id).then((d) => {
      menuTree.value.setCheckedKeys(d.data);
      menuTreeLoading.value = false;
    })
  })
}

/**
 * 展开/收缩节点
 */
function expandAllTree() {
  if (menuForm.value.expand) {
    Object.values(menuTree.value.store.nodesMap).forEach((v) => v.expand())
  } else {
    Object.values(menuTree.value.store.nodesMap).forEach((v) => v.collapse())
  }
}

/**
 * 选中所有节点
 */
function selectAllTree() {
  if (menuForm.value.selectAll) {
    Object.values(menuTree.value.store.nodesMap).forEach((v) => {
      v.checked = true;
    })
  } else {
    Object.values(menuTree.value.store.nodesMap).forEach((v) => {
      v.checked = false;
    })
  }
}

/**
 * 提交菜单权限
 */
function submitMenuForm() {
  let param = {
    menuIds: [...menuTree.value.getCheckedKeys(), ...menuTree.value.getHalfCheckedKeys()],
    roleId: menuForm.value.id
  };
  assignRoleMenuApi(param).then((res) => {
    if (res.code === 200 && res.data) {
      ElMessage.success('操作成功');
      roleMenuOpen.value = false;
      resetMenuForm();
    } else {
      ElMessage.error(res.msg);
    }
  })
}

initList();
</script>
<style scoped></style>