<template>
    <div class="login">
        <div class="herder">
            <img src="../../assets/img/logo.svg" alt="Svg Image" />
            <span> 咸阳市烟草专卖局质检侠管理后台 </span>
        </div>
        <div class="from">
            <div class="from_left">
                <img src="../../assets/img/background.svg" alt="Svg Image" />
            </div>
            <div class="from_right">
                <div class="from_right_nei">
                    <div class="from_right_neiform">
                        <div class="from_right_neiform_herder">
                            <div>欢迎登录</div>
                            <div>—— Welcome to login ——</div>
                        </div>
                        <el-form :model="form" label-position="top" ref="formRef">
                            <el-form-item prop="username" label="用户名">
                                <el-input v-model="form.username" placeholder="请填写用户名"
                                    style="width: 100%;height: 50px;border-radius: 10px;"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" label="密码" style="margin-top: 28px;">
                                <el-input v-model="form.password" placeholder="请填写密码" type="password"
                                    style="width: 100%;height: 50px;border-radius: 10px;"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 50px;">
                                <el-button type="primary" @click="login"
                                    style="width: 100%;height: 50px;font-size: 20px;background: #1371EA;">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="custom-container pr-96">
          <div class="flex-grow"></div>
          <div>
              <h1 class="text-center">登陆</h1>
              
          </div>
  
      </div> -->
</template>
<script lang="ts" setup>
import { loginApi } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const form = $ref({
    username: "",
    password: "",
});
const formRef = ref();
const router = useRouter();
function login() {
    // if(formRef.value.)
    formRef.value.validate((valid) => {
        if (valid) {
            loginApi(form)
                .then((res) => {
                    router.push("/home/case");
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("user", JSON.stringify(res.data.user_info));
                    ElMessage({
                        message: "登陆成功",
                        type: "success",
                    });
                })
                .catch((err) => {
                    ElMessage({
                        message: err.msg,
                        type: "error",
                    });
                });
        } else {
            ElMessage({
                message: "请填写完整",
                type: "error",
            });
        }
    });
}
</script>
<style scoped>
/* .custom-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  } */
.login {
    width: 100vw;
    height: 100vh;
    background: url("../../assets/img/login.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.herder {
    display: flex;
    align-items: center;
    padding: 26px 0;
}

.herder img {
    margin-left: 26px;
}

.herder span {
    font-size: 36px;
    color: #ffffff;
    padding-left: 10px;
    font-family: huxiaobonanshen;
}

.from {
    width: 100%;
    height: 680px;
    position: absolute;
    top: 50%;
    margin-top: -290px;
    display: flex;
}

.from_left {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.from_left img {
    height: 100%;
}

.from_right {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.from_right_nei {
    width: 586px;
    height: 100%;
    border-radius: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

}

.from_right_neiform {
    width: 458px;
    height: 461px;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.from_right_neiform_herder {
    width: 100%;
    text-align: center;
}

.from_right_neiform_herder div:nth-child(1) {
    font-size: 40px;
    font-weight: 500;
}

.from_right_neiform_herder div:nth-child(2) {
    font-size: 24px;
    font-weight: normal;
    margin-top: 5px;
    color: #666666;
}</style>
  