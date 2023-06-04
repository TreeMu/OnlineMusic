<template>
    <div class="register">
        <!-- 注册表单 -->
        <el-form :model="registerForm" status-icon :rules="rules" ref="FormRef" label-width="100px"
            class="demo-registerForm">
            <h1><i class="el-icon-switch-button" style="margin-right: 10px;margin-left: 30px"></i>GsCyhMusic注册</h1>

            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="repwd">
                <el-input type="password" v-model="registerForm.repwd" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="手机号码" prop="phone">
                <el-input type="text" v-model="registerForm.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="电子邮箱" prop="email">
                <el-input type="text" v-model="registerForm.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(FormRef)" style="width: 100%;">注册</el-button>
            </el-form-item>
            <el-form-item>
                <router-link to="./login" class="loginBtn">已有账号</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, reactive } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { register } from '../../http/index'
import store from '@/store'
import qs from 'qs'

const FormRef = ref<FormInstance>()
const registerForm = reactive({
    username: '',
    password: '',
    repwd: '',
    phone: '',
    email: ''
})

let checkPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
let checkEmail = /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' },
    ],
    repwd: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    ]
})

const router = useRouter();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (valid) {
            if (registerForm.password != registerForm.repwd) {
                ElMessage({
                    type: "warning",
                    message: "两次输入密码不同!"
                })
            } else if (!checkPhone.test(registerForm.phone)) {
                ElMessage({
                    type: "warning",
                    message: "手机号码格式有误!"
                })
            } else if (!checkEmail.test(registerForm.email)) {
                ElMessage({
                    type: "warning",
                    message: "电子邮箱格式有误!"
                })
            } else {
                
                 register(
                     qs.stringify({
                        username: registerForm.username,
                        password: registerForm.password,
                        phone: registerForm.phone,
                        email: registerForm.email,
                    })
                ).then(res => {
                    console.log("接收后端响应登录请求的数据: ", res.data);
                    if (res.data.message=="账号已存在") {
                        ElMessage({
                            type: "warning",
                            message: "账号已存在!"  
                        })
                    }else{
                        console.log(res.data)
                        ElMessage({
                            type: "success",
                            message: "恭喜你，注册成功!"
                        })
                        let userinfo = {
                            isLogin: true,
                            manage: true,
                            username: registerForm.username
                        };
                        localStorage.setItem("userInfo", JSON.stringify(userinfo))
                        store.state.userinfo = userinfo
                        router.push({ path: '/' })
                    }
                })

            }
        }

    })
}
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
}

html,
body,
#app,
.login {
    height: 100%;
}

.register {
    display: flex;
    justify-content: center;
    align-content: center;
}

.el-form {
    width: 500px;
    height: 400px;
    padding: 10px 40px 30px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 100px;
}

h1 {
    text-align: center;
}</style>