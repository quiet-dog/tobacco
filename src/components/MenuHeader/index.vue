<template>
    <div id="main-header" class="h-full">
        <el-page-header style="height: 100%;" :icon="null" title="xxxxy烟草管理系统 ">
            <template #extra>
                <div class="flex items-center">
                    <!-- <el-button>Print</el-button>
                    <el-button type="primary" class="ml-2">Edit</el-button> -->
                    <ElButton text>
                        <ElIcon>
                            <Edit />
                        </ElIcon>
                    </ElButton>
                    <ElButton text>
                        <ElIcon>
                            <Edit />
                        </ElIcon>
                    </ElButton>
                    <ElButton text>
                        <ElIcon>
                            <Edit />
                        </ElIcon>
                    </ElButton>
                </div>
            </template>
        </el-page-header>
    </div>
</template>
<script lang="ts" setup>
import { Edit, DataLine } from '@element-plus/icons-vue'
// <el-icon><DataLine /></el-icon>
</script>
<style scoped>
#main-header :deep(> div > div > div.el-page-header__left > div.el-divider.el-divider--vertical) {
    display: none;
}

#main-header :deep(> div > div) {
    height: 100%;
}

#main-header {
    background: var(--el-color-primary);
}
</style>