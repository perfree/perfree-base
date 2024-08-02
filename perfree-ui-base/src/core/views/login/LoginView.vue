<template>
  <div class="container">
    <div class="login-box">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">Perfree</h3>
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入账户"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-regular fa-user "/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="请输入密码"
              @keyup.enter="handleLogin"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-lock "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              size="large"
              style="width: 63%"
              @keyup.enter="handleLogin"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-fax  "/>
            </template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-form-item>

        <el-form-item style="width:100%;margin-top: 20px">
          <el-button
              :loading="loading"
              size="large"
              type="primary"
              style="width:100%;"
              @click.prevent="handleLogin"
          >
            <span>登  录</span>
          </el-button>

          <div class="login-bottom-box">
            <div class="register-box" v-if="isOpenRegister">
              没有账号?
              <router-link class="link-type" to="/register">立即注册</router-link>
            </div>
            <div class="forget-password-box">
              <a href="javascript:;">忘记密码?</a>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <!--  底部  -->
    <div class="login-footer">
      <span>Copyright © 2018-2024  All Rights Reserved. </span>
    </div>
  </div>
</template>

<script setup>
// 验证码开关
import {getCodeImg, getOptionByNoAuth, login} from "@/core/api/system.js";
import {CONSTANTS} from "@/core/utils/constants.js";
import {ElMessage} from "element-plus";
import {useCommonStore} from "@/core/stores/commonStore.js";
import {clearTabs} from "@/core/utils/tabs.js";
import {useRouter} from "vue-router";
import {computed, getCurrentInstance, ref} from "vue";

const {proxy} = getCurrentInstance();
const router = useRouter();

let captchaEnabled = ref(false);
let isOpenRegister = ref(false);
const commonStore = useCommonStore()

const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
});

const loginRules = computed(() => ({
  username: [{required: true, trigger: "blur", message: '请输入您的账户'}],
  password: [{required: true, trigger: "blur", message: '请输入您的密码'}],
  code: [{required: true, trigger: "blur", message: '请输入验证码'}]
}))

let codeUrl = ref("");
const loading = ref(false);

/**
 * 处理登录逻辑
 */
const handleLogin = () => {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      login(loginForm.value).then((res) => {
        if (res.code === 200) {
          commonStore.setMenuInit(false);
          clearTabs();
          localStorage.setItem(CONSTANTS.STORAGE_TOKEN, JSON.stringify(res.data));
          router.replace("/admin");
        } else {
          ElMessage.error(res.msg);
          loginForm.value.code = "";
          loading.value = false;
          getCode();
        }
      }).catch(() => {
        loginForm.value.code = "";
        loading.value = false;
        getCode();
      });
    }
  })
}

/**
 * 获取验证码
 */
const getCode = () => {
  getCodeImg().then(res => {
    codeUrl.value = "data:image/gif;base64," + res.data.img;
    loginForm.value.uuid = res.data.uuid;
  });
}

const initOption = () => {
  getOptionByNoAuth().then(res => {
    if (res.code === 200) {
      let options = {};
      res.data.forEach(item => {
        options[item.key] = item;
      })
      captchaEnabled.value = options["WEB_OPEN_CAPTCHA"] ? options["WEB_OPEN_CAPTCHA"].value === 'ON' : true;
      isOpenRegister.value = options["WEB_IS_REGISTER"]? options["WEB_IS_REGISTER"].value === 'ON' : true;
      if (captchaEnabled.value) {
        getCode();
      }
    }
  })
}

initOption();
</script>

<style scoped>
@media (min-width: 1024px) {
}

.container {
  height: 100%;
  width: 100%;
  background-image: url(@/assets/login-bg.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: var(--el-bg-color);
  box-shadow: 0 0 9px 1px rgb(0 0 0 / 8%);
  border-radius: 10px;
  width: 360px;
  padding: 30px;

  .title {
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
  }

  .login-form {
    box-sizing: border-box;

    .login-code {
      width: 37%;
      height: 40px;
      float: right;
      margin-bottom: 6px;

      img {
        cursor: pointer;
        vertical-align: middle;
        height: 40px;
        padding-left: 5px;
      }
    }
  }

  .login-bottom-box {
    margin-top: 6px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: var(--el-text-color-regular);

    .forget-password-box{
      margin-left: auto;
    }
    .register-box a, .forget-password-box a {
      color: var(--el-text-color-primary);
      text-decoration: none;
    }
  }
}

.login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: var(--el-menu-text-color);
  font-family: Arial, serif;
  font-size: 12px;
  letter-spacing: 1px;
}

.language-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;

  .language-icon {
    font-size: 40px;
    margin-right: 5px;
  }
}

</style>
