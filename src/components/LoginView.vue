<template>
  <div class="login" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <a-form
      id="formLogin"
      class="user-layout-login"
      @submit="handleSubmit"
      style="width: 300px;"
    >
    <div>
      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="$t('user.login.message-invalid-credentials')" />
      <a-form-item>
            <a-input
              size="large"
              type="text"
              :placeholder="a"
             
            >
            <template #prefix>
            <UserOutlined :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </template> 
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              :placeholder="s"
             
            >
            <template #prefix>
            <LockOutlined :style="{ color: 'rgba(100,0,0,.25)' }"/>              
            </template>
            </a-input-password>
          </a-form-item>
    </div>
  </a-form>
  <a-form-item>
    <a-checkbox v-model:checked="checked">Remember me</a-checkbox>
  </a-form-item>
  </div>
</template>

<script>
import { UserOutlined,LockOutlined } from '@ant-design/icons-vue';

export default {
  data(){
    return {
      
    }
  },
  components: {
    'UserOutlined':UserOutlined,
    'LockOutlined':LockOutlined,
  },
  methods: {
    handleUsernameOrEmail (rule, value, callback) {
      console.log(rule, value, callback);
    },
  },
  handleSubmit (e) {
    e.preventDefault()
  },
}
</script>