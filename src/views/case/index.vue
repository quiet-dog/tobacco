<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="250px" class="border-right-my">
                <el-menu>
                    <ElMenuItem index="1" @click="goRouter('/home/case/identification')">待鉴定</ElMenuItem>
                    <ElMenuItem index="2" @click="goRouter('/home/case/enter')">待入库</ElMenuItem>
                    <ElMenuItem index="3" @click="goRouter('/home/case/int')">在库案件</ElMenuItem>
                    <ElMenuItem index="4" @click="goRouter('/home/case/expires')">期满案件</ElMenuItem>
                    <ElMenuItem index="5" @click="goRouter('/home/case/archive')">归档案件</ElMenuItem>
                    <ElMenuItem index="6" @click="goRouter('/home/case/overdue')">超期案件</ElMenuItem>
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
function goRouter(path: string) {
    router.push(path)
}
</script>
<style scoped>
#layout-main :deep(> div:nth-child(2) > div > section > aside > ul) {
    border-right: 0 !important;
}
</style>