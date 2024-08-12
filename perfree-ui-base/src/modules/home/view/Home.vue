<template>
  <el-row :gutter="10">
    <el-col :span="20">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="访问量" :value="79552415" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="用户数量" :value="21999" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="下载数量" :value="5648155" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="交易量" :value="268500" />
          </div>
        </el-col>
        <el-col :span="24">
          <div  class="panelBox" id="main" style="height:500px;"></div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="panelBox">
            <div>快捷功能</div>
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
          <div class="panelBox" style="height:220px;">
            相关文档
          </div>
        </el-col>

        <el-col :span="24">
          <div class="panelBox" style="height:220px;">
            最新插件
          </div>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";
import {Edit} from "@element-plus/icons-vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

onMounted(() => {
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary').trim();
  let myChart = echarts.init(document.getElementById('main'));
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['访问量', '下载量']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [12458, 9999, 13004, 18888, 20598, 26658, 29999]
      },
      {
        name: '下载量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [10000, 9000, 13000, 15000, 18000, 25000, 28000]
      },
    ]
  });
})

</script>
<style scoped>
.panelBox{
  background: var(--el-bg-color);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
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
</style>
