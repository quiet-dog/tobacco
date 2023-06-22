<template>
    <div id="main-header" class="h-full flex">
        <div>
            <!-- 这里放置你的logo内容 -->
            <img src="/public/head-logo.svg"> <img>
        </div>
        <div>
            <!-- 这里放置你的头像内容 -->
            <el-dropdown>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="36" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
// <el-icon><DataLine /></el-icon>
const router = useRouter()
function loginOut() {
    sessionStorage.clear()
    router.push('/login')
}
</script>
<style scoped>
#main-header :deep(> div > div > div.el-page-header__left > div.el-divider.el-divider--vertical) {
    display: none;
}

#main-header :deep(>div>div>div.el-page-header__left>div.el-page-header__back>div) {
    padding: auto;
    margin: 20px;
    color: white;
    font-weight: bold;
}

#main-header :deep(> div > div) {
    height: 100%;
}

#main-header {
    background: #0273FD;
    display: flex;
    /* 使用Flex布局 */
    justify-content: space-between;
    /* 子元素之间的间距均分，使logo和头像分别位于父元素的左右两侧 */
    align-items: center;
    /* 垂直居中对齐 */
    padding: 0 20px;
}
</style>