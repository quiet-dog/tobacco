<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="250px" class="border-right-my">
                <el-menu :default-active="defaultActive">
                    <ElMenuItem index="1" @click="goRouter('/home/case/identification')">
                        <svg class="icon" aria-hidden="true" style="width: 20px;fill: #3BC4CF;height: 20px;">
                            <use xlink:href="#icon-chakan"></use>
                        </svg>
                        <span class="pl-5">待鉴定</span>
                    </ElMenuItem>
                    <ElMenuItem index="2" @click="goRouter('/home/case/enter')">
                        <svg class="icon" aria-hidden="true" style="width: 20px;fill: #A6A6FF;height: 20px;">
                            <use xlink:href="#icon-a-ruku2"></use>
                        </svg>
                        <span class="pl-5">
                            待入库
                        </span>
                    </ElMenuItem>
                    <ElMenuItem index="3" @click="goRouter('/home/case/int')">
                        <svg class="icon" aria-hidden="true" style="width: 20px;fill: #70B603;height: 20px;">
                            <use xlink:href="#icon-zaiku"></use>
                        </svg>
                        <span class="pl-5">
                            在库案件
                        </span>
                    </ElMenuItem>
                    <ElMenuItem index="4" @click="goRouter('/home/case/expires')">
                        <svg class="icon" aria-hidden="true" style="width: 20px;fill: #F9C27B;height: 20px;">
                            <use xlink:href="#icon-a-daoqichanpin2"></use>
                        </svg>
                        <span class="pl-5">
                            期满案件
                        </span>
                    </ElMenuItem>
                    <ElMenuItem index="5" @click="goRouter('/home/case/archive')">
                        <svg class="icon" aria-hidden="true" style="width: 20px;fill: #000000;height: 20px;">
                            <use xlink:href="#icon-guidang"></use>
                        </svg>
                        <span class="pl-5">
                            归档案件
                        </span>
                    </ElMenuItem>
                    <ElMenuItem index="6" @click="goRouter('/home/case/overdue')">
                        <svg class="icon" aria-hidden="true" style="width: 20px;fill: #F86F6F;height: 20px;">
                            <use xlink:href="#icon-daoqichanpin"></use>
                        </svg>
                        <span class="pl-5">
                            超期案件
                        </span>
                    </ElMenuItem>
                </el-menu>
            </el-aside>
            <el-main class="h-full">

                <RouterView v-slot="{ Component }">
                    <component :is="Component" />
                </RouterView>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
const router = useRouter()
let defaultActive = $ref('1')
function goRouter(path: string) {
    router.push(path)
}
watch(() => router.currentRoute.value.path, (val, old) => {
    // 获取/home/后面的内容
    if (val.search('identification') !== -1) {
        defaultActive = "1"
        return
    }
    if (val.search('enter') !== -1) {
        defaultActive = "2"
        return
    }
    if (val.search('int') !== -1) {
        defaultActive = "3"
        return
    }
    if (val.search('expires') !== -1) {
        defaultActive = "4"
        return
    }
    if (val.search('archive') !== -1) {
        defaultActive = "5"
        return
    }
    if (val.search('overdue') !== -1) {
        defaultActive = "6"
        return
    }

}, {
    deep: true,
    immediate: true
})
</script>
<style scoped>
#layout-main :deep(> div:nth-child(2) > div > section > aside > ul) {
    border-right: 0 !important;
}
</style>