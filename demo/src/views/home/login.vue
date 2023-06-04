<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form :model="loginForm" status-icon :rules="rules" ref="FormRef" label-width="100px" class="demo-loginForm">
      <h1><i class="el-icon-switch-button" style="margin-right: 10px;margin-left: 30px"></i>GsCyhMusic登录</h1>
 
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
 
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
 
      <el-form-item>
        <el-button type="primary" @click="submitForm(FormRef)" style="width: 100%;">登录</el-button>
      </el-form-item>
      <el-form-item  >
        <router-link to="./register" class="registerBtn" >注册账号</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
 


<script lang="ts" setup>
import { ref , onMounted,reactive} from 'vue'
import { FormInstance, FormRules ,ElMessage} from 'element-plus'
import { useRouter } from 'vue-router'
import { checklogin , python} from '../../http/index'
import store from '@/store'

const FormRef = ref<FormInstance>()
  const loginForm = reactive({
    username: '',
    password: '',
  })

  const rules = reactive<FormRules>({
    username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ]
  })

  const router = useRouter();
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid) => {
        if (valid) {
          // 收集用户名和密码，发送给后端
           checklogin (
            loginForm.username,loginForm.password  
          ).then(res => {
            console.log("接收后端响应登录请求的数据: ", res.data);
            if (res.data) {
              ElMessage({
                    type: "success",
                    message: "恭喜你，登录成功!"
                })
                python()
                let userinfo={
                  isLogin:true,
                  manage:true,
                  username: loginForm.username
                };
                localStorage.setItem("userInfo",JSON.stringify(userinfo))
                store.state.userinfo=userinfo
                router.push({ path: '/' })
      }else{
        
      ElMessage({
            type: "warning",
            message: "登录失败!"
            
      })
    }
    })
    }
  })

  
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    margin: 0;
    padding: 0;
  }
  html, body, #app, .login {
    height: 100%;
  }
  .login {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .el-form {
    width: 400px;
    height: 250px;
    padding: 10px 40px 30px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 130px;
  }
  h1 {
    text-align: center;
  }
</style>