<template>
    <div class="h-full">
        <el-config-provider :locale="locale" :size="'large'">
            <RouterView v-slot="{ Component }">
                <component :is="Component"></component>
            </RouterView>
        </el-config-provider>
    </div>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = ref(zhCn)
</script>
