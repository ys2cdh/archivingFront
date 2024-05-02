<template>
  <div class="login" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input size="large" v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password size="large" v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </a-form-item>

      <a-form-item>
        <a-button size="large" type="primary" html-type="submit" class="login-form-button" style="width: 300px;">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default {
  data() {
    return {
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      formState: {
        // 폼 데이터를 저장할 객체를 추가합니다.
        username: '', // 사용자 이름 또는 이메일 필드
        password: '', // 비밀번호 필드
        remember: false // "Remember me" 체크박스
      }
    }
  },
  components: {
    'UserOutlined': UserOutlined,
    'LockOutlined': LockOutlined,
  },
  methods: {
    onFinishFailed(errorInfo) {
      console.log(errorInfo);
    },

    onFinish() {
      console.log('Form submitted with data:', this.formState);
      // event.preventDefault();

      axios.post(`http://localhost:8080/user/login.jsp?id=${this.formState.username}&pw=${this.formState.password}`)
        .then(response => {
          localStorage.setItem('user_token', response.data.token);
          console.log('token :', response.data.token);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });

      this.$store.commit('login',this.formState.username);
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>