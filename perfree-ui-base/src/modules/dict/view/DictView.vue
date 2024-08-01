<template>
  <div class="page">
    <el-row :gutter="10" class="elRow">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6" class="elCol">
        <div class="dictTypeBox">
          <div class="dictTypeHead">
            <el-button type="primary" style="width: 100%" @click="clickAddDictType" v-hasPermission="['admin:dict:create']">添加字典分类</el-button>
            <el-input v-model="searchDictTypeValue" placeholder="请输入字典类型或名称" class="searchDictTypeInput" clearable >
              <template #append>
                <el-button :icon="Search" @click="initDictTypeList" />
              </template>
            </el-input>
          </div>
          <div class="dictTypeList" v-loading="dictTypeLoading">
            <ul>
              <el-tooltip placement="right" v-for="dictType in dictTypeDataList" :key="dictType.id"  effect="light" >
                <template #content>
                  <div>字典名: {{dictType.dictName}}</div>
                  <div>字典类型: {{dictType.dictType}}</div>
                  <div>备注: {{dictType.remark}}</div>
                  <div>状态:  <el-text class="mx-1" type="primary" v-if="dictType.status === 0" size="small">启用</el-text>
                    <el-text class="mx-1" type="danger" v-else size="small">禁用</el-text></div>
                </template>
                <li @click="clickDictType(dictType)" :class="{active: dictType.id === activeDictType.id}">
                  <div class="dictTypeName">{{dictType.dictName}}</div>
                  <div class="dictTypeOpt">
                    <el-button type="primary" link @click.stop="clickUpdateDictType(dictType)" v-hasPermission="['admin:dict:update']"><el-icon><Edit /></el-icon></el-button>
                    <el-button type="danger" link @click.stop="clickDelDictType(dictType)" v-hasPermission="['admin:dict:delete']"><el-icon><Delete /></el-icon></el-button>
                  </div>
                </li>
              </el-tooltip>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" class="elCol">
        <div class="dictDataBox">
          <div class="search-box">
            <el-form :inline="true" :model="dictDataSearchForm" class="demo-form-inline" ref="dictDataSearchFormRef">
              <el-form-item label="字典展示值">
                <el-input v-model="dictDataSearchForm.dictLabel" placeholder="请输入展示值" clearable/>
              </el-form-item>
              <el-form-item label="字典类型">
                <el-input v-model="dictDataSearchForm.dictType" placeholder="请输入字典类型" clearable/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="initDictDataPage" :icon="Search">查询</el-button>
                <el-button :icon="Refresh" @click="resetDictDataSearchForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button :icon="Plus" type="primary" plain @click="clickAddDictData" v-hasPermission="['admin:dictData:create']">新增字典值</el-button>
            </el-col>
            <div class="right-tool">
              <el-button :icon="Refresh" circle @click="initDictDataPage"/>
            </div>
          </el-row>

          <div class="table-box">

            <el-table :data="dictDataTableData" style="width: 100%;height:100%;" row-key="id" v-loading="dictDataLoading" >
              <el-table-column prop="dictType" label="字典类型" min-width="150"/>
              <el-table-column prop="dictLabel" label="字典展示值" min-width="120"/>
              <el-table-column prop="dictValue" label="字典值" min-width="120"/>
              <el-table-column prop="dictExtendValue" label="扩展值" min-width="120"/>
              <el-table-column prop="status" label="状态" min-width="80">
                <template #default="scope">
                  <el-tag class="ml-2" type="success" v-if="scope.row.status === 0">启用</el-tag>
                  <el-tag class="ml-2" type="danger" v-else>禁用</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="seq" label="排序" min-width="80"/>
              <el-table-column prop="createTime" label="创建时间" min-width="120">
                <template v-slot="scope">
                  <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140" fixed="right">
                <template v-slot="scope">
                  <el-button size="small" type="primary" link :icon="Edit" @click="clickUpdateDictData(scope.row)" v-hasPermission="['admin:dictData:update']">修改</el-button>
                  <el-button size="small" type="primary" link :icon="Delete" @click="clickDelDictData(scope.row)" v-hasPermission="['admin:dictData:delete']">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
                v-model:current-page="dictDataSearchForm.pageNo"
                v-model:page-size="dictDataSearchForm.pageSize"
                :page-sizes="[10, 20, 30, 50]"
                layout="total,sizes,prev, pager, next, jumper"
                background
                small
                @change="initDictDataPage"
                :total="dictDataSearchForm.total"
            />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-model="dictTypeOpen" :title="title" width="600px" draggable>
      <el-form
          ref="addDictTypeFormRef"
          :model="addDictTypeForm"
          label-width="80px"
          status-icon
          :rules="addDictTypeRule"
      >
        <el-form-item label="字典名" prop="dictName">
          <el-input v-model="addDictTypeForm.dictName" placeholder="请输入字典名"/>
        </el-form-item>

        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="addDictTypeForm.dictType" placeholder="请输入字典类型" :disabled="addDictTypeForm.id !== ''"/>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="addDictTypeForm.status" inline-prompt active-text="启用" inactive-text="禁用" :active-value="0" :inactive-value="1" />
        </el-form-item>

        <el-form-item label="排序" prop="seq">
          <el-input-number v-model="addDictTypeForm.seq" :min="0" :max="9999999" placeholder="排序"/>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="addDictTypeForm.remark" placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitDictTypeAddForm">确 定</el-button>
              <el-button @click="dictTypeOpen = false; resetDictTypeAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog v-model="dictDataOpen" :title="title" width="600px" draggable>
      <el-form
          ref="addDictDataFormRef"
          :model="addDictDataForm"
          label-width="80px"
          status-icon
          :rules="addDictDataRule"
      >

        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="addDictDataForm.dictType" placeholder="请输入字典类型" :disabled="addDictDataForm.id !== ''"/>
        </el-form-item>

        <el-form-item label="展示值" prop="dictLabel">
          <el-input v-model="addDictDataForm.dictLabel" placeholder="请输入展示值"/>
        </el-form-item>

        <el-form-item label="字典值" prop="dictValue">
          <el-input v-model="addDictDataForm.dictValue" placeholder="请输入字典值"/>
        </el-form-item>

        <el-form-item label="扩展值" prop="dictExtendValue">
          <el-input v-model="addDictDataForm.dictExtendValue" placeholder="请输入扩展值"/>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="addDictDataForm.status" inline-prompt active-text="启用" inactive-text="禁用" :active-value="0" :inactive-value="1" />
        </el-form-item>

        <el-form-item label="排序" prop="seq">
          <el-input-number v-model="addDictDataForm.seq" :min="0" :max="9999999" placeholder="排序"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitDictDataAddForm">确 定</el-button>
              <el-button @click="dictDataOpen = false; resetDictDataAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {Delete, Edit, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {parseTime} from "@/core/utils/perfree.js";
import {dictAddApi, dictDelApi, dictGetApi, dictUpdateApi, queryListAllApi} from "@/modules/dict/api/dict.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  dictDataAddApi,
  dictDataDelApi,
  dictDataGetApi,
  dictDataPageApi,
  dictDataUpdateApi
} from "@/modules/dict/api/dictData.js";

let title = ref('');
const searchDictTypeValue = ref('')
let dictTypeDataList = ref([])
let dictTypeLoading = ref(true);
let activeDictType = ref({});
let dictTypeOpen = ref(false);
const addDictTypeFormRef = ref();
const addDictTypeForm = ref({
  id: '',
  dictType: '',
  remark: '',
  dictName: '',
  seq: 0,
  status: 0,
});
const addDictTypeRule = reactive({
  dictType: [{required: true, message: '字典类型不能为空', trigger: 'blur'}],
  dictName: [{required: true, message: '字典名称不能为空', trigger: 'blur'}],
  status: [{required: true, message: '状态不能为空', trigger: 'blur'}],
})

const dictDataSearchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  dictLabel: '',
  dictType: '',
  parentDictType: ''
})

const dictDataSearchFormRef = ref();
let dictDataTableData = ref([]);
let dictDataLoading = ref(false);
let dictDataOpen = ref(false);
const addDictDataForm = ref({
  id: '',
  dictLabel: '',
  dictValue: '',
  dictExtendValue: '',
  status: 0,
  seq: 0,
  dictType: '',
  parentDictType: ''
});
const addDictDataRule = reactive({
  dictLabel: [{required: true, message: '展示值不能为空', trigger: 'blur'}],
  dictType: [{required: true, message: '字典类型不能为空', trigger: 'blur'}],
  dictValue: [{required: true, message: '字典值不能为空', trigger: 'blur'}],
  status: [{required: true, message: '状态不能为空', trigger: 'blur'}],
});
const addDictDataFormRef = ref();

/**
 * 重置数据值搜索表单
 */
function resetDictDataSearchForm() {
  dictDataSearchForm.value = {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    dictLabel: '',
    dictType: '',
    parentDictType: activeDictType.value.dictType
  }
  dictDataSearchFormRef.value.resetFields();
  initDictDataPage();
}

/**
 * 删除数据值事件
 */
function clickDelDictData(row) {
  ElMessageBox.confirm('确定要删除[' + row.dictType + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    dictDataLoading.value = true;
    dictDataDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initDictDataPage();
      } else {
        ElMessage.error(res.msg);
      }
      dictDataLoading.value = false;
    });
  }).catch(() => {
    dictDataLoading.value = false;
  })
}

/**
 * 编辑数据值事件
 */
function clickUpdateDictData(row) {
  title.value = '修改字典值';
  dictDataOpen.value = true;
  dictDataGetApi(row.id).then(res => {
    addDictDataForm.value = res.data;
  })
}

/**
 * 提交数据值表单
 */
function submitDictDataAddForm() {
  addDictDataFormRef.value.validate(valid => {
    if (valid) {
      if (addDictDataForm.value.id) {
        dictDataUpdateApi(addDictDataForm.value).then(res => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            dictDataOpen.value = false;
            resetDictDataAddForm();
            initDictDataPage();
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        addDictDataForm.value.parentDictType = activeDictType.value.dictType;
        dictDataAddApi(addDictDataForm.value).then(res => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            dictDataOpen.value = false;
            resetDictDataAddForm();
            initDictDataPage();
          } else {
            ElMessage.error(res.msg);
          }
        })
      }
    }
  });
}

/**
 * 重置数据值表单
 */
function resetDictDataAddForm() {
  addDictDataForm.value = {
    id: '',
    dictLabel: '',
    dictValue: '',
    dictExtendValue: '',
    status: 0,
    seq: 0,
    dictType: '',
    parentDictType: ''
  }
  if (addDictDataFormRef.value) {
    addDictDataFormRef.value.resetFields();
  }
}

/**
 * 点击添加数据字典值事件
 */
function clickAddDictData() {
  if (!activeDictType.value.id) {
    ElMessage.error('请选择字典分类');
    return;
  }
  addDictDataForm.value.dictType = activeDictType.value.dictType;
  dictDataOpen.value = true;
  title.value = '添加数据字典值';
}

/**
 * 字典类型删除点击事件
 */
function clickDelDictType(dictType) {
  ElMessageBox.confirm('确定要删除[' + dictType.dictName + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    dictDelApi(dictType.id).then((res) => {
      if (res.code === 200 && res.data) {
        if (activeDictType.value.id === dictType.id) {
          activeDictType.value = {};
        }
        ElMessage.success('删除成功');
        initDictTypeList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {
  })
}

/**
 * 字典类型编辑点击事件
 */
function clickUpdateDictType(dictType) {
  title.value = '修改字典分类';
  dictTypeOpen.value = true;
  dictGetApi(dictType.id).then(res => {
    addDictTypeForm.value = res.data;
  })
}

/**
 * 字典类型表单提交
 */
function submitDictTypeAddForm() {
  addDictTypeFormRef.value.validate(valid => {
    if (valid) {
      if (addDictTypeForm.value.id) {
        dictUpdateApi(addDictTypeForm.value).then(res => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            dictTypeOpen.value = false;
            resetDictTypeAddForm();
            initDictTypeList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        dictAddApi(addDictTypeForm.value).then(res => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            dictTypeOpen.value = false;
            resetDictTypeAddForm();
            initDictTypeList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      }
    }
  });
}

/**
 * 重置字典类型添加表单
 */
function resetDictTypeAddForm() {
  addDictTypeForm.value = {
    id: '',
    dictType: '',
    remark: '',
    dictName: '',
    seq: 0,
    status: 0,
  }
  if (addDictTypeFormRef.value) {
    addDictTypeFormRef.value.resetFields();
  }
}

/**
 * 点击添加字典分类事件
 */
function clickAddDictType() {
  title.value = '添加字典分类';
  dictTypeOpen.value = true;
}

/**
 * 点击字典分类事件
 */
function clickDictType(dictType) {
  activeDictType.value = dictType;
  dictDataSearchForm.value.parentDictType = dictType.dictType;
  initDictDataPage();
}

/**
 * 初始化字典项分页
 */
function initDictDataPage() {
  if (!dictDataSearchForm.value.parentDictType) {
    return;
  }
  dictDataLoading.value = true;
  dictDataPageApi(dictDataSearchForm.value).then(res => {
    if (res.code === 200) {
      dictDataTableData.value = res.data.list;
      dictDataSearchForm.value.total = res.data.total;
    } else {
      ElMessage.error(res.msg);
    }
    dictDataLoading.value = false;
  })
}

/**
 * 初始化字典分类列表
 */
function initDictTypeList() {
  dictTypeLoading.value = true;
  queryListAllApi(searchDictTypeValue.value, searchDictTypeValue.value).then(res => {
    if (res.code === 200) {
      dictTypeDataList.value = res.data;
      if (res.data.length > 0) {
        clickDictType(res.data[0]);
      }
    } else {
      ElMessage.error(res.msg);
    }
    dictTypeLoading.value = false;
  })
}

initDictTypeList();
</script>
<style scoped>
.page{
  height: 100%;
  padding: 0;
  background-color: var(--el-bg-color-page);
}
.elRow,.elCol{
  height: 100%;
  margin-bottom: 10px;
}
.dictTypeBox{
  background-color: var(--el-bg-color);
  height: 100%;
  border-radius: 5px;
}
.dictDataBox{
  background-color: var(--el-bg-color);
  padding: 15px;
  border-radius: 5px;
  height: calc(100% - 30px);
}
.dictTypeHead{
  padding: 15px 15px 0;
}
.searchDictTypeInput{
  margin-top: 15px;
}

.dictTypeList::-webkit-scrollbar {
  width: 0;
}

.dictTypeList::-webkit-scrollbar {
  height: 0;
}
.dictTypeList{
  padding: 15px;
  height: calc(100% - 130px);
  overflow: auto;
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
    li{
      display: flex;
      line-height: 40px;
      margin-bottom: 8px;
      background: var(--el-fill-color-light);
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: all .3s;
      font-size: 14px;
      .dictTypeName{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .dictTypeOpt{
        margin-left: auto;
        width: 60px;
      }
    }
    li.active{
      background: rgba(100, 108, 255, 0.1);
      color: var(--el-color-primary);
    }
    li:hover{
      background: rgba(100, 108, 255, 0.1);
    }
  }
}
</style>