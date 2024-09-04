<template>
  <el-row :gutter="15" style="height: 100%;">
    <el-col :span="24">
      <div class="panelBox">
        <div style="display: flex">
          <el-avatar :size="65" :src="userInfo.avatar" />
          <div class="loginBoxRight">
            <div class="title">欢迎登录, {{userInfo.userName}}</div>
            <div class="welcome">工欲善其事，必先利其器。 -- 论语</div>
          </div>
          <div style="margin-left: auto">
            <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tg&skin=pitaya" frameborder="0" width="470" height="60" allowtransparency="true"></iframe>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <el-row :gutter="15">
        <el-col :span="6">
          <div class="panelBox"  v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.userTotal">
              <template #title>
                <span><el-icon><UserFilled /></el-icon> 用户数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.attachTotal">
              <template #title>
                <span><el-icon><PictureFilled /></el-icon> 附件数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.installPluginTotal">
              <template #title>
                <span><el-icon><List /></el-icon> 已安装插件数量</span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox" v-loading="statisticLoading">
            <el-statistic :value="homeStatistic.runningPluginTotal">
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
                <el-button plain @click="shortcutClick('/admin/menu')"><font-awesome-icon icon="fa-solid fa-list-numeric"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">菜单管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/user')"><font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">用户管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/role')"><font-awesome-icon icon="fa-solid fa-male"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">角色管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/setting')"><font-awesome-icon icon="fa-solid fa-tools"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">系统设置</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/dict')"><font-awesome-icon icon="fa-solid fa-clipboard"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">字典管理</div>
              </el-col>
              <el-col :span="8" class="shortcuts-item">
                <el-button plain @click="shortcutClick('/admin/plugin')"><font-awesome-icon icon="fa-solid fa-swatchbook"></font-awesome-icon></el-button>
                <div class="shortcuts-item-name">插件管理</div>
              </el-col>

            </el-row>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="panelBox">
            <div class="panelTitle">相关文档</div>
            <ul class="link-ul">
              <li>
                <el-link :icon="Link" href="https://cn.vuejs.org" target="_blank">Vue 官方文档</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://element-plus.org" target="_blank">Element Plus 官方文档</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://base.perfree.org.cn" target="_blank">PerfreeBase 官网</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://base.perfree.org.cn/useDoc" target="_blank">PerfreeBase 使用文档</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://base.perfree.org.cn/devDoc" target="_blank">PerfreeBase 开发文档</el-link>
              </li>
              <li>
                <el-link :icon="Link" href="https://base.perfree.org.cn/pluginDoc" target="_blank">PerfreeBase 插件开发文档</el-link>
              </li>
            </ul>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="panelBox" v-loading="statisticLoading">
            <div class="panelTitle">附件统计</div>
            <div  class="echartsBox" id="attachEcharts" style="height:130px;"></div>
          </div>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Checked, Link, List, PictureFilled, UserFilled} from "@element-plus/icons-vue";
import {getHomeStatisticApi, getServerInfoApi} from "../api/adminHome.js";
import {ElMessage} from "element-plus";
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';

let statisticLoading = ref(true);
let serverLoading = ref(true);
let homeStatistic = ref({});
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
const userInfo = ref(window.pinia.state._value?.userStore?.userInfo)
watch(() => window.pinia.state._value?.userStore?.userInfo, (val) => {
  userInfo.value = val;
})

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

function getHomeStatistic() {
  statisticLoading.value = true;
  getHomeStatisticApi().then(res => {
    if (res.code === 200) {
      homeStatistic.value = res.data;
      let myChart = echarts.init(document.getElementById('attachEcharts'));
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '附件统计',
            type: 'pie',
            radius: '50%',
            data: [
              { value: homeStatistic.value.attachImageTotal, name: '图片' },
              { value: homeStatistic.value.attachVideoTotal, name: '视频' },
              { value: homeStatistic.value.attachAudioTotal, name: '音频' },
              { value: homeStatistic.value.attachOtherTotal, name: '其他' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    } else {
      ElMessage.error(res.msg);
    }
    statisticLoading.value = false;
  })
}

function shortcutClick(path) {
  router.replace(path);
}

onMounted(() => {
  getHomeStatistic();
})

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
.link-ul{
  list-style: none;
  padding: 0;
  margin: 0;
  li{
    line-height: 30px;
    .el-link{
      width: 100%;
      justify-content: left;
    }
  }
}
:deep(.el-link__inner){
  padding-left: 5px;
}
</style>
