<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
        <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="serverBaseUrl + '/api/auth/attach/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar"  alt=""/>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>


        <el-descriptions :column="1" border class="user-detail">
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-user-pen"/> 用户名
            </template>
            {{userInfo.userName}}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-user"/> 账 户
            </template>
            {{userInfo.account}}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-mars-stroke-up"/> 性 别
            </template>
            {{getDictByParentDictTypeAndValue(DICT_TYPE.SEX, userInfo.sex)?.dictLabel}}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-envelope-open-text"/> 邮 箱
            </template>
            {{userInfo.email}}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-phone-volume"/> 手机号
            </template>
            {{userInfo.mobile}}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-earth-americas"/> 个人网站
            </template>
            {{userInfo.website}}
          </el-descriptions-item>
          <el-descriptions-item label-class-name="user-detail-label">
            <template #label>
              <font-awesome-icon icon="fa-solid fa-calendar-alt"/> 最后登录时间
            </template>
            {{ parseTime(userInfo.loginDate) }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <el-tabs v-model="activeTab" class="demo-tabs">
          <el-tab-pane label="基础信息" name="base">
            <el-form
                ref="baseFormRef"
                :model="baseForm"
                label-width="60px"
                status-icon
                :rules="baseRule"
            >
              <el-form-item label="昵称" prop="userName">
                <el-input v-model="baseForm.userName" placeholder="请输入昵称" />
              </el-form-item>

              <el-form-item label="账户" prop="account">
                <el-input v-model="baseForm.account" placeholder="请输入账户" />
              </el-form-item>

              <el-form-item label="性别" prop="sex">
                <el-select v-model="baseForm.sex" placeholder="请选择性别" clearable  style="width: 200px">
                  <el-option :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" v-for="dict in getDictByParentDictType(DICT_TYPE.SEX)" />
                </el-select>
              </el-form-item>

              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="baseForm.mobile" placeholder="请输入手机号" />
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="baseForm.email" placeholder="请输入邮箱地址" />
              </el-form-item>

              <el-form-item label="网站" prop="website">
                <el-input v-model="baseForm.website" placeholder="请输入网站地址" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitBaseForm">修 改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="restPassword">Config</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import axios_config from "@/core/api/axios_config.js";
import {CONSTANTS} from "@/core/utils/constants.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getDictByParentDictType, getDictByParentDictTypeAndValue} from "@/core/utils/dictUtils.js";
import {DICT_TYPE} from "@/modules/user/script/DictConstant.js";
import {parseTime} from "@/core/utils/perfree.js";
import {getUserApi} from "@/core/api/user.js";

const imageUrl = ref('/attach/2024-08-06/317ff5452cc146c8a03c44862526238e.png')
let activeTab = ref('base');
let serverBaseUrl = axios_config.baseURL;
let  headers = {
  Authorization: "Bearer " + JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_TOKEN)).accessToken,
};
let userInfo = ref({})
const baseForm = ref({
  id: '',
  userName: '',
  account: '',
  email: '',
  website: '',
  sex: undefined,
  remark: '',
  mobile: ''
});
const baseRule = reactive({
  userName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称必须在2-20字之间', trigger: 'blur' }
  ],
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 5, max: 16, message: '账户必须在5-16字之间', trigger: 'blur' }
  ],
  email: [{type: "email",message: "请输入正确的邮箱地址",trigger: ["blur", "change"]}],
  mobile: [ {pattern: /^1[3|456789][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}],
  website: [{
    pattern: /^(https?:\/\/)?((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/,
    message: "请输入正确的网址",
    trigger: "blur"
  }]
});
const baseFormRef = ref()

function handleAvatarSuccess (response, uploadFile) {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

function beforeAvatarUpload (rawFile) {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

function getUserInfo() {
  let userId = JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_USER_INFO)).id
  getUserApi(userId).then(res => {
    userInfo.value = res.data
    baseForm.value = res.data;
    baseForm.value.sex = baseForm.value.sex.toString();
  })
}

getUserInfo();
</script>

<style scoped>
.left-box, .right-box{
  background-color: var(--el-bg-color);
  padding: 15px;
  border-radius: 5px;
}
.avatar-uploader{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader .el-upload .avatar{
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.user-detail{
  margin-top: 15px;
}
:deep(.user-detail-label){
  background-color: var(--el-bg-color)!important;
}
</style>