<template>
  <el-drawer
    v-model="themeSettingOpen"
    direction="rtl"
    size="350px"
    :z-index="99"
    class="themeSettingBox"
  >
    <template #header>
      <span class="theme-header">主题配置</span>
    </template>
    <template #default>
      <el-divider>侧边栏样式</el-divider>
      <div class="theme-style-box">
        <el-radio-group v-model="theme" @change="changeTheme">
          <div class="theme-style" @click="selectTheme('default')">
            <el-container class="theme-box t-default">
              <el-aside></el-aside>
              <el-container>
                <el-header></el-header>
                <el-main></el-main>
              </el-container>
            </el-container>
            <el-radio :value="'default'">默认</el-radio>
          </div>
          <div class="theme-style" @click="selectTheme('light')">
            <el-container class="theme-box t-light">
              <el-aside width="30px"></el-aside>
              <el-container>
                <el-header></el-header>
                <el-main></el-main>
              </el-container>
            </el-container>
            <el-radio :value="'light'">白色</el-radio>
          </div>

          <div class="theme-style" @click="selectTheme('purple')">
            <el-container class="theme-box t-purple">
              <el-aside width="30px"></el-aside>
              <el-container>
                <el-header></el-header>
                <el-main></el-main>
              </el-container>
            </el-container>
            <el-radio :value="'purple'">骚紫</el-radio>
          </div>
        </el-radio-group>
      </div>
      <el-divider>其他配置</el-divider>
      <div class="other-setting">
        <span class="label">主题颜色</span>
        <el-color-picker
          v-model="primaryColor"
          :show-alpha="false"
          :predefine="predefineColors"
          color-format="hex"
          @change="changePrimaryColor"
        />
      </div>
      <div class="other-setting">
        <span class="label">顶栏通色</span>
        <el-switch v-model="headerUnified" @change="changeHeaderColor" />
      </div>

      <div class="other-setting">
        <span class="label">顶部tab栏</span>
        <el-switch v-model="tabOpen" @change="changeTabOpen" />
      </div>

      <div class="other-setting">
        <span class="label">路由动画</span>
        <el-select
          v-model="routeAnimation"
          placeholder="请选择"
          style="width: 180px"
          @change="changeRouteAnimation"
        >
          <el-option key="animate__fadeIn" label="fadeIn" value="animate__fadeIn" />
          <el-option key="animate__fadeInDown" label="fadeInDown" value="animate__fadeInDown" />
          <el-option key="animate__fadeInLeft" label="fadeInLeft" value="animate__fadeInLeft" />
          <el-option key="animate__fadeInRight" label="fadeInRight" value="animate__fadeInRight" />
          <el-option key="animate__fadeInUp" label="fadeInUp" value="animate__fadeInUp" />
          <el-option key="animate__flipInX" label="flipInX" value="animate__flipInX" />
          <el-option
            key="animate__lightSpeedInRight"
            label="lightSpeedInRight"
            value="animate__lightSpeedInRight"
          />
          <el-option
            key="animate__lightSpeedInLeft"
            label="lightSpeedInLeft"
            value="animate__lightSpeedInLeft"
          />
          <el-option
            key="animate__rotateInDownLeft"
            label="rotateInDownLeft"
            value="animate__rotateInDownLeft"
          />
          <el-option
            key="animate__rotateInDownRight"
            label="rotateInDownRight"
            value="animate__rotateInDownRight"
          />
          <el-option
            key="animate__rotateInUpLeft"
            label="rotateInUpLeft"
            value="animate__rotateInUpLeft"
          />
          <el-option key="animate__zoomIn" label="zoomIn" value="animate__zoomIn" />
          <el-option key="animate__slideInDown" label="slideInDown" value="animate__slideInDown" />
          <el-option key="animate__slideInLeft" label="slideInLeft" value="animate__slideInLeft" />
          <el-option key="animate__slideInUp" label="slideInUp" value="animate__slideInUp" />
        </el-select>
      </div>
    </template>
    <template #footer>
      <el-button @click="resetThemeSetting">重置主题</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { useCssVar } from '@vueuse/core'
import { themeSettings } from '@/core/theme.js'
import { useAppStore } from '@/core/stores/appStore'
import {ref} from "vue";

const appStore = useAppStore()
let theme = ref(appStore.theme)
let primaryColor = ref(appStore.primaryColor)
let headerUnified = ref(appStore.headerUnified)
let tabOpen = ref(appStore.tabOpen)

let routeAnimation = ref(appStore.routeAnimation)
let themeSettingOpen = ref(false)

const el = ref(null)
const color = useCssVar('--el-color-primary', el)
const primaryColor3 = useCssVar('--el-color-primary-light-3', el)
const primaryColor5 = useCssVar('--el-color-primary-light-5', el)
const primaryColor7 = useCssVar('--el-color-primary-light-7', el)
const primaryColor8 = useCssVar('--el-color-primary-light-8', el)
const primaryColor9 = useCssVar('--el-color-primary-light-9', el)
const primaryColor2 = useCssVar('--el-color-primary-dark-2', el)
const predefineColors = ref([
    '#5FB878',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
])

// 切换主题
const changeTheme = (x) => {
  appStore.setTheme(x)
  document.getElementsByTagName('body')[0].setAttribute('class', 'theme-' + x)
}

// 打开主题设置
const openThemeSetting = () => {
  themeSettingOpen.value = true
}

// 关闭主题设置
const resetThemeSetting = () => {
  headerUnified.value = themeSettings.headerUnified
  primaryColor.value = themeSettings.primaryColor
  tabOpen.value = themeSettings.tabOpen
  theme.value = themeSettings.theme
  routeAnimation.value = themeSettings.routeAnimation
  changeTheme(theme.value)
  changePrimaryColor(primaryColor.value)
  changeHeaderColor(headerUnified.value)
  changeTabOpen(tabOpen.value)
  changeRouteAnimation()
}

// 选择主题
const selectTheme = (val) => {
  theme.value = val
  changeTheme(val)
}

// 切换主题色
const changePrimaryColor = (val) => {
  color.value = val
  primaryColor3.value = val + 80
  primaryColor5.value = val
  primaryColor7.value = val
  primaryColor8.value = val
  primaryColor9.value = val + 10
  primaryColor2.value = val
  appStore.setPrimaryColor(val)
}

// 改变顶栏通色
const changeHeaderColor = (val) => {
  appStore.setHeaderUnified(val)
}

// 改变路由动画
const changeRouteAnimation = () => {
  appStore.setRouteAnimation(routeAnimation.value)
}

// 改变tab栏是否开启
const changeTabOpen = () => {
  appStore.setTabOpen(tabOpen.value)
}

// 暴露方法
defineExpose({
  openThemeSetting,
})
</script>

<style lang="scss" scoped>
.theme-header {
  color: var(--el-text-color-primary);
}
.saveTheme {
  margin-left: auto;
}
.theme-style-box {
  display: flex;
  flex-wrap: wrap;
}
.theme-style {
  width: 90px;
  height: 110px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  .theme-box {
    box-shadow: var(--el-box-shadow-light);
    border-radius: 5px;
    overflow: hidden;
    width: 90px;
    height: 70px;
    .el-aside {
      width: 30px;
      height: 70px;
    }
    .el-header {
      height: 15px;
      padding: 0;
    }
    .el-main {
      background-color: var(--el-color-info-light-9);
    }
  }
}
.t-default {
  .el-aside {
    background-color: #001428;
  }
}
.t-light {
  .el-aside {
    background-color: var(--el-bg-color);
  }
}
.t-purple {
  .el-aside {
    background-color: #302b63;
  }
}
.other-setting {
  display: flex;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  .label {
    font-size: 14px;
  }
}
</style>
