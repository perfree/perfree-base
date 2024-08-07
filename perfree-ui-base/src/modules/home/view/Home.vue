<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="Daily active users" :value="268500" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="Daily active users" :value="268500" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="Daily active users" :value="268500" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="panelBox">
            <el-statistic title="Daily active users" :value="268500" />
          </div>
        </el-col>
        <el-col :span="24">
          <div  class="panelBox" id="main" style="height:500px;"></div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="panelBox" style="height:220px;">
            快捷功能
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
      data: ['访问量', 'Union Ads']
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
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
</style>
