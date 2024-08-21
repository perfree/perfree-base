<template>
  <el-row :gutter="15">
    <el-col :span="24">
      <div class="panelBox">
        <div style="display: flex">
          <el-avatar :size="65" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
          <div class="loginBoxRight">
            <div class="title">欢迎登录, Perfree</div>
            <div class="welcome">工欲善其事，必先利其器。 -- 论语</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <el-row :gutter="15">
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic :value="79552415">
              <template #title>
                <span><el-icon><UserFilled /></el-icon> 用户数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic :value="9999999">
              <template #title>
                <span><el-icon><PictureFilled /></el-icon> 附件数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic :value="50">
              <template #title>
                <span><el-icon><List /></el-icon> 已安装插件数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic :value="5">
              <template #title>
                <span><el-icon><Checked /></el-icon> 已运行插件数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="15" v-loading="serverLoading">
            <el-col :span="8">
              <div class="panelBox">
                <div class="panelTitle">服务器CPU使用率</div>
                <div style="text-align: center;margin-top: 10px;">
                 <el-progress type="dashboard" :percentage="cpuInfo.used" :color="colors"/>
                 <el-descriptions :column="1" border>
                   <el-descriptions-item label="CPU主频" label-class-name="my-label">{{cpuInfo.maxFrequency}}GHz</el-descriptions-item>
                   <el-descriptions-item label="核心数" label-class-name="my-label">{{cpuInfo.cpuNum}}</el-descriptions-item>
                 </el-descriptions>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="panelBox">
                <div class="panelTitle">服务器内存使用率</div>
                <div style="text-align: center;margin-top: 10px;">
                  <el-progress type="dashboard" :percentage="memInfo.usage" :color="colors"/>
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="总内存" label-class-name="my-label">{{memInfo.total}}G</el-descriptions-item>
                    <el-descriptions-item label="已用内存" label-class-name="my-label">{{memInfo.used}}G</el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="panelBox">
                <div class="panelTitle">服务器JVM使用率</div>
                <div style="text-align: center;margin-top: 10px;">
                  <el-progress type="dashboard" :percentage="jvmInfo.usage" :color="colors"/>
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="JVM大小" label-class-name="my-label">{{jvmInfo.total}}M</el-descriptions-item>
                    <el-descriptions-item label="已用JVM" label-class-name="my-label">{{jvmInfo.used}}M</el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="panelBox">
                <div class="panelTitle">服务器信息</div>
                <el-descriptions :column="2" border style="margin-top: 15px">
                  <el-descriptions-item label="服务器名称" >{{sysInfo.computerName}}</el-descriptions-item>
                  <el-descriptions-item label="操作系统">{{sysInfo.osName}}</el-descriptions-item>
                  <el-descriptions-item label="系统架构">{{sysInfo.osArch}}</el-descriptions-item>
                  <el-descriptions-item label="CPU">{{cpuInfo.cpuName}}</el-descriptions-item>
                  <el-descriptions-item label="CPU核心数">{{cpuInfo.cpuNum}}</el-descriptions-item>
                  <el-descriptions-item label="CPU主频">{{cpuInfo.maxFrequency}}GHz</el-descriptions-item>
                  <el-descriptions-item label="总内存">{{memInfo.total}}G</el-descriptions-item>
                  <el-descriptions-item label="可用内存">{{memInfo.free}}G</el-descriptions-item>
                  <el-descriptions-item label="JDK版本">{{jvmInfo.version}}</el-descriptions-item>
                  <el-descriptions-item label="JDK路径">{{jvmInfo.home}}</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="panelBox">
            <div class="panelTitle">快捷功能</div>
            <el-row>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain><font-awesome-icon icon="fa-solid fa-list-numeric"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">菜单管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain><font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">用户管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain><font-awesome-icon icon="fa-solid fa-male"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">角色管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain><font-awesome-icon icon="fa-solid fa-tools"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">系统设置</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain><font-awesome-icon icon="fa-solid fa-clipboard"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">字典管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain><font-awesome-icon icon="fa-solid fa-swatchbook"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">插件管理</div>
              </el-col>

            </el-row>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="panelBox" style="height:185px;">
            <div class="panelTitle">相关文档</div>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="panelBox" style="height:185px;">
            <div class="panelTitle">最新插件</div>
          </div>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Checked, List, PictureFilled, UserFilled} from "@element-plus/icons-vue";
import {getServerInfoApi} from "../api/adminHome.js";
import {ElMessage} from "element-plus";
import {ref} from "vue";

let serverLoading = ref(true);
let cpuInfo = ref({
  cpuNum: 0,
  free: 0,
  ioWait: 0,
  sys: 0,
  total: 0,
  used: 0
});
let jvmInfo = ref({});
let memInfo = ref({});
let sysInfo = ref({});

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary').trim();

const colors = [
  { color: primaryColor, percentage: 70 },
  { color: '#e6a23c', percentage: 90 },
  { color: '#f56c6c', percentage: 100 },
]

function getServerInfo() {
  serverLoading.value = true;
  getServerInfoApi().then(res => {
    if (res.code === 200) {
      cpuInfo.value = res.data.cpuInfo;
      jvmInfo.value = res.data.jvmInfo;
      memInfo.value = res.data.memInfo;
      sysInfo.value = res.data.sysInfo;
    } else {
      ElMessage.error(res.msg);
    }
    serverLoading.value = false;
  })
}

getServerInfo();
</script>
<style scoped>
.panelBox{
  background: var(--el-bg-color);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: calc(100% - 30px);
}
.shortcuts-item{
  text-align: center;
  margin-top: 15px;
}
.shortcuts-item-name{
  font-size: 14px;
  margin-top: 5px;
}
.loginBoxRight{
  padding-left: 10px;
  .title{
    padding-top: 5px;
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  .welcome{
    padding-top: 5px;
  }
}
:deep(.my-label){
  background: var(--el-bg-color) !important;
}
.panelTitle{
  font-size: 14px;
  border-bottom: 1px solid var(--el-border-color-light);
  padding-bottom: 10px;
}
</style>
