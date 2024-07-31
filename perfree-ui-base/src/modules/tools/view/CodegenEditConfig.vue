<template>
  <div class="page">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基础信息" name="base">
        <el-form
            ref="baseFormRef"
            :model="baseForm"
            label-width="120px"
            status-icon
            :rules="baseRule"
        >
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="生成场景" prop="scene">
                <el-select v-model="baseForm.scene" placeholder="请选择生成场景" style="width: 240px">
                  <el-option :key="0" :label="'后台代码'" :value="0" />
                  <el-option :key="1" :label="'插件代码'" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="父级菜单" prop="parentMenuId">
                <el-tree-select
                    v-model="baseForm.parentMenuId"
                    :data="treeData"
                    :props="treeSelectProps"
                    check-strictly
                    :render-after-expand="false"
                    style="width: 240px"
                    clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="baseForm.scene === 0 ? '后端模块名称' : '插件名称'" prop="moduleName">
                <el-input v-model="baseForm.moduleName" placeholder="请输入模块名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="包名称" prop="packageName">
                <el-input v-model="baseForm.packageName" placeholder="请输入包名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类注释" prop="classComment">
                <el-input v-model="baseForm.classComment" placeholder="请输入类注释"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="前端模块名称" prop="moduleName">
                <el-input v-model="baseForm.frontModuleName" placeholder="请输入模块名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类名称" prop="className">
                <el-input v-model="baseForm.className" placeholder="请输入类名称"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="作者" prop="author">
                <el-input v-model="baseForm.author" placeholder="请输入作者"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="字段配置" name="column">
        <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" max-height="600px" >
          <el-table-column prop="columnName" label="字段名称" min-width="100"/>
          <el-table-column prop="dataType" label="字段类型" min-width="100"/>
          <el-table-column prop="columnComment" label="字段描述" min-width="120">
            <template v-slot="scope">
              <el-input v-model="scope.row.columnComment" placeholder="字段描述"/>
            </template>
          </el-table-column>
          <el-table-column prop="javaType" label="java类型" min-width="160">
            <template v-slot="scope">
              <el-select v-model="scope.row.javaType" placeholder="java类型" style="width: 160px">
                <el-option :key="0" :label="'Long'" :value="'Long'" />
                <el-option :key="1" :label="'String'" :value="'String'" />
                <el-option :key="2" :label="'Integer'" :value="'Integer'" />
                <el-option :key="3" :label="'Double'" :value="'Double'" />
                <el-option :key="4" :label="'BigDecimal'" :value="'BigDecimal'" />
                <el-option :key="5" :label="'LocalDateTime'" :value="'LocalDateTime'" />
                <el-option :key="6" :label="'Boolean'" :value="'Boolean'" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="javaField" label="java字段名" min-width="100">
            <template v-slot="scope">
              <el-input v-model="scope.row.javaField" placeholder="java字段名"/>
            </template>
          </el-table-column>
          <el-table-column prop="insertOperation" label="插入" min-width="50">
            <template v-slot="scope">
              <el-checkbox v-model="scope.row.insertOperation"/>
            </template>
          </el-table-column>
          <el-table-column prop="updateOperation" label="编辑" min-width="50">
            <template v-slot="scope">
              <el-checkbox v-model="scope.row.updateOperation"/>
            </template>
          </el-table-column>
          <el-table-column prop="listOperation" label="列表" min-width="50">
            <template v-slot="scope">
              <el-checkbox v-model="scope.row.listOperation"/>
            </template>
          </el-table-column>
          <el-table-column prop="listQueryOperation" label="查询" min-width="50">
            <template v-slot="scope">
              <el-checkbox v-model="scope.row.listQueryOperation"/>
            </template>
          </el-table-column>
          <el-table-column prop="nullable" label="允许空" min-width="70">
            <template v-slot="scope">
              <el-checkbox v-model="scope.row.nullable"/>
            </template>
          </el-table-column>
          <el-table-column prop="formType" label="表单类型" min-width="120">
            <template v-slot="scope">
              <el-select v-model="scope.row.formType" placeholder="表单类型" style="width: 120px">
                <el-option :key="0" :label="'文本框'" :value="0" />
                <el-option :key="1" :label="'文本域'" :value="1" />
                <el-option :key="2" :label="'单选框'" :value="2" />
                <el-option :key="3" :label="'下拉框'" :value="3" />
                <el-option :key="4" :label="'日期框'" :value="4" />
                <el-option :key="5" :label="'数字输入框'" :value="5" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="queryType" label="查询方式" min-width="120">
            <template v-slot="scope">
              <el-select v-model="scope.row.queryType" placeholder="查询方式" style="width: 120px">
                <el-option :key="0" :label="'='" :value="0" />
                <el-option :key="1" :label="'!='" :value="1" />
                <el-option :key="2" :label="'>'" :value="2" />
                <el-option :key="3" :label="'>='" :value="3" />
                <el-option :key="4" :label="'<'" :value="4" />
                <el-option :key="5" :label="'<='" :value="5" />
                <el-option :key="6" :label="'Like'" :value="6" />
                <el-option :key="7" :label="'Between'" :value="7" />
              </el-select>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>

      <div style="text-align: center; margin-top: 15px">
        <el-button type="primary" @click="submitConfig">提交</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </el-tabs>
  </div>
</template>
<script setup>
import {menuPageApi} from "../api/menu.js";
import {handleTree} from "@/core/utils/perfree.js";
import {getCodegenInfoByTableId, saveConfig} from "../api/codegen.js";
import {closeTab, toPage} from "@/core/utils/tabs.js";
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";

let activeTab = ref('base');
const route = useRoute();
const baseForm = ref({
  id: '',
  scene: 0,
  moduleName: '',
  frontModuleName: '',
  className: '',
  classComment: '',
  author: '',
  parentMenuId: '-1',
  packageName: ''
});
const baseRule = reactive({
  scene: [{required: true, message: '请选择生成场景', trigger: 'blur'}],
  moduleName: [{required: true, message: '请输入模块/插件名称', trigger: 'blur'}],
  frontModuleName: [{required: true, message: '请输入前端模块名称', trigger: 'blur'}],
  className: [{required: true, message: '请输入类名称', trigger: 'blur'}],
  packageName: [{required: true, message: '请输入包名称', trigger: 'blur'}],
});
const baseFormRef = ref();
let tableData = ref([])
let treeData = ref([]);
let loading = ref(false)
const treeSelectProps = reactive({
  children: 'children',
  label: 'name',
  value: 'id',
})

function initMenuTree() {
  menuPageApi({type: 1}).then((res) => {
    treeData.value = [{id: '-1', name: '主类目', children: handleTree(res.data, "id", "pid",'children', '-1')}];
  });
}

function initInfo() {
  loading.value = true;
  getCodegenInfoByTableId(route.params.id).then(res => {
    if (res.code === 200) {
      baseForm.value = res.data.codegenTable;
      tableData.value = res.data.codegenColumnList;
      loading.value = false;
    }
  })
}

function submitConfig() {
  baseFormRef.value.validate(valid => {
    if (valid) {
      let param = {
        codegenTable: baseForm.value,
        codegenColumnList: tableData.value
      }
      saveConfig(param).then(res => {
        if (res.code === 200) {
          ElMessage.success('配置成功');
          back();
        }
      })
    }
  });
}

function back() {
  closeTab(route.fullPath)
  toPage('', '/admin/codegen', '')
}

initMenuTree();
initInfo();
</script>