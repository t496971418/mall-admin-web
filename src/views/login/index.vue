<!--
 * @Author: Terryzh
 * @Date: 2019-08-19 17:23:55
 * @LastEditors: Terryzh
 * @LastEditTime: 2019-08-19 19:19:10
 * @Description: 添加描述
 -->
<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon
            icon-class="login-mall"
            style="width: 56px;height: 56px;color: #409EFF"
          ></svg-icon>
        </div>
        <h2 class="login-title color-main">商城后台管理</h2>
        <el-form-item prop="userName">
          <el-input
            name="userName"
            type="text"
            v-model="loginForm.userName"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon
                icon-class="user"
                class="color-main"
              ></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon
                icon-class="password"
                class="color-main"
              ></svg-icon>
            </span>
            <span
              slot="suffix"
              @click="showPwd"
            >
              <svg-icon
                icon-class="eye"
                class="color-main"
              ></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :span="24">
            <p
              v-if="waitShow"
              id="wait"
              class="show"
            >正在加载验证码......</p>
            <el-col
              :span="24"
              class="captcha"
            >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img
      :src="login_center_bg"
      class="login-center-layout"
    >
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
import { initGeetest } from '@/utils/gt.js'
import { newCaptchaGQL } from '@/api/auth.js'
import { setSupport, getSupport, SupportUrl } from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    };
    return {
      waitShow: true,
      loginForm: {
        userName: 'test',
        password: 'Sad458745',
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      dialogVisible: false,
      supportDialogVisible: false
    }
  },
  created() {
    this.refreshCode()
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let isSupport = getSupport();
          if (isSupport === undefined || isSupport == null) {
            this.dialogVisible = true;
            return;
          }
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(({data}) => {
            window.localStorage.setItem('token', data.signin.token)
            window.localStorage.setItem('Authorization', `Bearer ${data.signin.token}`)
            this.loading = false;
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('参数验证不合法！');
          return false
        }
      })
    },
    refreshCode() {
      this.$request.defaultClient
        .mutate({
          mutation: newCaptchaGQL
        })
        .then(response => {
          // console.log(response.data)
          // 调用 initGeetest 初始化参数
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          initGeetest({
            gt: response.data.newCaptcha.gt,
            challenge: response.data.newCaptcha.challenge,
            new_captcha: response.data.newCaptcha.new_captcha, // 用于宕机时表示是新验证码的宕机
            offline: !response.data.newCaptcha.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            product: 'float', // 产品形式，包括：float，popup
            width: '100%'
            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
          }, (captchaObj) => {
            // 只加载一次
            if (this.waitShow) {
              captchaObj.appendTo(`.captcha`)
            }
            captchaObj.onReady(() => {
              this.waitShow = false
            })
            // 验证成功
            captchaObj.onSuccess(() => {
              let result = captchaObj.getValidate()
              this.loginForm.challenge = result.geetest_challenge
              this.loginForm.validate = result.geetest_validate
              this.loginForm.seccode = result.geetest_seccode
            })
            // 验证失败
            captchaObj.onError(() => {
            })
          })
        }).catch(
          _ => {
            // console.log(err)
          }
        )
    },
  }
}
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
