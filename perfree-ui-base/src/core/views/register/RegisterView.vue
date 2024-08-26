<template>
  <div class="container">
    <div class="login-box">
      <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="login-form">
        <h3 class="title">Perfree</h3>
        <el-form-item prop="userName">
          <el-input
              v-model="registerForm.userName"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入昵称"
              autocomplete="off"
              readonly onfocus="this.removeAttribute('readonly');"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-chalkboard-user "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="account">
          <el-input
              v-model="registerForm.account"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入账户"
              autocomplete="off"
              readonly onfocus="this.removeAttribute('readonly');"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-user "/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="registerForm.password"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="请输入密码"
              readonly onfocus="this.removeAttribute('readonly');"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-lock "/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input
              v-model="registerForm.email"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="请输入邮箱地址"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-mail-bulk"/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
              v-model="registerForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              size="large"
              style="width: 63%"
          >
            <template #prefix>
              <font-awesome-icon icon="fa-solid fa-fax  "/>
            </template>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" alt=""/>
          </div>
        </el-form-item>

        <el-form-item style="width:100%;margin-top: 20px">
          <el-button
              :loading="loading"
              size="large"
              type="primary"
              style="width:100%;"
              @click.prevent="handleRegister"
          >
            <span>注  册</span>
          </el-button>

          <div class="login-bottom-box">
            <div class="register-box">
              已有账号?
              <router-link class="link-type" :to="'/login'">前往登录</router-link>
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
import {getCodeImg, register} from "@/core/api/system.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {useCommonStore} from "@/core/stores/commonStore.js";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {getOptionByKey} from "@/core/utils/optionUtils.js";

const router = useRouter();

const registerRef = ref();
let captchaEnabled = ref(false);
const commonStore = useCommonStore()

const registerForm = ref({
  userName: "",
  account: "",
  password: "",
  email: "",
  rememberMe: false,
  code: "",
  uuid: ""
});

const registerRules = computed(() => ({
  userName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称必须在2-20字之间', trigger: 'blur' }
  ],
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 5, max: 16, message: '账户必须在5-16字之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '密码必须在5-16字之间', trigger: 'blur' }
  ],
  code: [{required: true, trigger: "blur", message: '验证码不能为空'}],
  email: [{type: "email",message: "请输入正确的邮箱地址",trigger: ["blur", "change"]}],
}))

let codeUrl = ref("");
const loading = ref(false);

/**
 * 处理登录逻辑
 */
const handleRegister = () => {
  registerRef.value.validate(valid => {
    if (valid) {
      register(registerForm.value).then((res) => {
        if (res.code === 200) {
          ElMessageBox.confirm('注册成功,前往登录~', '提示', {
            confirmButtonText: '确认',
            showCancelButton: false,
            type: 'success',
          }).then(() => {
            router.replace("/login");
          }).catch(() => {})
        } else {
          ElMessage.error(res.msg);
          registerForm.value.code = "";
          loading.value = false;
          getCode();
        }
      }).catch(() => {
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
    registerForm.value.uuid = res.data.uuid;
  });
}

const initOption = () => {
  captchaEnabled.value = getOptionByKey('WEB_OPEN_CAPTCHA') ? getOptionByKey('WEB_OPEN_CAPTCHA').value === 'ON' : true;
  if (captchaEnabled.value) {
    getCode();
  }
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
