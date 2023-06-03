<template>
    <div>
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="goRouter('/home/screen')">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>数据大屏</span>
                </template>
            </el-menu-item>
            <el-menu-item index="2" @click="goRouter('/home/case')">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>案件中心</span>
                </template>
            </el-menu-item>
            <el-menu-item index="3" @click="goRouter('/home/tobacco')">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>烟草管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="4" @click="goRouter('/home/warehouse')">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>库房管理</span>
                </template>
            </el-menu-item>
            <el-menu-item index="5" @click="goRouter('/home/user')">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>用户管理</span>
                </template>
            </el-menu-item>

        </el-menu>
    </div>
</template>
<script lang="ts" setup>

const router = useRouter();
function goRouter(path: string) {
    router.push(path)
}
let defaultActive = $ref("1")
watch(() => router.currentRoute.value.path, (a, old) => {
    // 获取/home/后面的内容
    const path = a.split("/")[1]
    switch (path) {
        case "screen":
            defaultActive = "1"
            break;
        case "case":
            defaultActive = "2"
            break;
        case "tobacco":
            defaultActive = "3"
            break;
        case "warehouse":
            defaultActive = "4"
            break;
        case "user":
            defaultActive = "5"
            break;
    }
})
</script>