<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="模板编号">
          <el-input v-model="searchForm.mailTemplateCode" placeholder="请输入模板编号" clearable/>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-date-picker
                  v-model="searchForm.sendDate"
                  type="datetimerange"
                  start-placeholder="请选择开始时间"
                  end-placeholder="请选择结束时间"
                  :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          />
        </el-form-item>
        <el-form-item label="接收邮箱">
          <el-input v-model="searchForm.receiveMail" placeholder="请输入接收邮箱" clearable/>
        </el-form-item>
        <el-form-item label="邮件标题">
          <el-input v-model="searchForm.mailTitle" placeholder="请输入邮件标题" clearable/>
        </el-form-item>
        <el-form-item label="发送状态">
          <el-select v-model="searchForm.sendStatus" placeholder="请选择发送状态" clearable  style="width: 200px">
            <el-option :key="0" :label="'发送成功'" :value="0" />
            <el-option :key="1" :label="'发送失败'" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="发件邮箱">
          <el-input v-model="searchForm.sendMail" placeholder="请输入发件邮箱" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search" v-hasPermission="['admin:mailLog:query']">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
          <el-button :icon="Download" @click="exportExcel" v-hasPermission="['admin:mailLog:export']">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="mailTemplateCode" label="模板编号" min-width="150"/>
        <el-table-column prop="sendDate" label="发送时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.sendDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiveMail" label="接收邮箱" min-width="120"/>
        <el-table-column prop="mailTitle" label="邮件标题" min-width="120"  show-overflow-tooltip/>
        <el-table-column prop="sendStatus" label="发送状态" min-width="80">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.sendStatus === 0">发送成功</el-tag>
            <el-tag class="ml-2" type="danger" v-else>发送失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sendMail" label="发件邮箱" min-width="120"/>
        <el-table-column prop="content" label="邮件内容" min-width="150"  show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
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

  </div>
</template>
<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import {handleTree, parseTime} from "@/core/utils/perfree.js";
import {mailLogAddApi, mailLogDelApi, mailLogGetApi, mailLogPageApi, mailLogUpdateApi, mailLogExportExcelApi} from "../api/mailLog.js";
import {Delete, Edit, Filter, Plus, Refresh, Search, Download} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {getDictByParentDictType, getDictByParentDictTypeAndValue} from "@/core/utils/dictUtils.js";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  mailTemplateCode:  null ,
  sendDate:  [] ,
  receiveMail:  null ,
  mailTitle:  null ,
  sendStatus:  null ,
  sendMail:  null ,
})

const searchFormRef = ref();
let tableData = ref([]);
let loading = ref(false);


/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  mailLogPageApi(searchForm.value).then((res) => {
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
    mailTemplateCode:   null ,
    sendDate:   [] ,
    receiveMail:   null ,
    mailTitle:   null ,
    sendStatus:   null ,
    sendMail:   null ,
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 导出excel
 */
function exportExcel() {
  loading.value = true;
  mailLogExportExcelApi(searchForm.value).then(res => {
    window.download.excel(res,  '邮件日志数据.xlsx');
    loading.value = false;
  }).catch(e => {
    ElMessage.error('导出失败');
    loading.value = false;
  })
}

initList();
</script>
<style scoped></style>