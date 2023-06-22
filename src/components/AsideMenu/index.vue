<template>
    <el-menu mode="vertical" :default-active="defaultActive" class="el-menu-vertical-demo border-right-my-test">
        <!-- <el-menu-item index="1" @click="goRouter('/home/screen')">
      <template #title>
        <el-icon>
          <DataLine />
        </el-icon>
        <span>数据大屏</span>
      </template>
    </el-menu-item> -->
        <el-menu-item index="1" @click="goRouter('/home/case/identification')">
            <template #title>
                <el-icon>
                    <Management />
                </el-icon>
                <span>案件中心</span>
            </template>
        </el-menu-item>
        <el-menu-item index="2" @click="goRouter('/home/tobacco')">
            <template #title>
                <el-icon>
                    <Tickets />
                </el-icon>
                <span>烟草管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="3" @click="goRouter('/home/warehouse')">
            <template #title>
                <el-icon>
                    <OfficeBuilding />
                </el-icon>
                <span>库房管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="4" @click="goRouter('/home/user')">
            <template #title>
                <el-icon>
                    <User />
                </el-icon>
                <span>用户管理</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts" setup>
import { DataLine, Management, User, Tickets, OfficeBuilding } from '@element-plus/icons-vue'
// <el-icon><DataLine /></el-icon>
const router = useRouter();
function goRouter(path: string) {
    router.push(path)
}
let defaultActive = $ref("1")
watch(() => router.currentRoute.value.path, (val, old) => {
    // 获取/home/后面的内容
    if (val.search('case') !== -1) {
        defaultActive = "1"
        return
    }
    if (val.search('tobacco') !== -1) {
        defaultActive = "2"
        return
    }
    if (val.search('warehouse') !== -1) {
        defaultActive = "3"
        return
    }
    if (val.search('user') !== -1) {
        defaultActive = "4"
        return
    }
    // const path = a.split("/")[1]
    // switch (path) {
    //     case "screen":
    //         defaultActive = "1"
    //         break;
    //     case "case":
    //         defaultActive = "2"
    //         break;
    //     case "tobacco":
    //         defaultActive = "3"
    //         break;
    //     case "warehouse":
    //         defaultActive = "4"
    //         break;
    //     case "user":
    //         defaultActive = "5"
    //         break;
    // }
}, {
    deep: true,
    immediate: true
})
</script>
<style scoped lang="scss">
// .el-menu-item {
//     // background-color: #393D4E;
//     margin: 10px 5px;
//     border-right: 0;
//     transition: background-color 0.3s, border-radius 0.3s;
// }

// .el-menu-item:hover {
//     // color: #016955 !important;
//     text-decoration: underline;
// }

// .el-menu-item.is-active {
//     color: #ffffff;
//     // background-color: #016955 !important;
//     border-radius: 10px;
//     margin: 10px 5px;
// }

#aside-menu>ul {
    border-right: 0;
}



.border-right-my-test {
    border-right: 0;
}

.border-right-my-test :deep(li.el-menu-item.is-active) {
    /* background-color: blue !important; */
    background-color: var(--el-menu-hover-bg-color);
    /* 右边框 */
    border-right: 3px solid var(--el-menu-active-color);
}

.border-right-my-test :deep(li.my-main) {
    /* background-color: blue !important; */
    /* 右边框 */
    border-right: 0 !important;
}
</style>
<style></style>