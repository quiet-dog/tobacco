<template>
    <div class="custom-container pr-96">
        <div class="flex-grow"></div>
        <div>
            <h1 class="text-center">登陆</h1>
            <el-form :model="form" label-width="120px" ref="formRef">
                <el-form-item :rules="[{
                    required: true,
                    message: '请填写用户名',
                    trigger: ['blur', 'change'],
                }]" prop="username" label="用户名">
                    <el-input v-model="form.username" placeholder="请填写用户名"></el-input>
                </el-form-item>
                <el-form-item :rules="[{
                    required: true,
                    message: '请填写密码',
                    trigger: ['blur', 'change'],
                }]" prop="password" label="密码">
                    <el-input v-model="form.password" placeholder="请填写密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { loginApi } from '@/api/login';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const form = $ref({
    username: '',
    password: ''
})
const formRef = ref()
const router = useRouter();
function login() {
    // if(formRef.value.)
    formRef.value.validate(valid => {
        if (valid) {
            loginApi(form).then(res => {
                router.push("/home/case")
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('user', JSON.stringify(res.data.user_info))
                ElMessage({
                    message: '登陆成功',
                    type: 'success'
                })
            }).catch(err => {
                ElMessage({
                    message: err.msg,
                    type: 'error'
                })
            })
        } else {
            ElMessage({
                message: '请填写完整',
                type: 'error'
            })
        }
    })
}
</script>
<style scoped>
.custom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>