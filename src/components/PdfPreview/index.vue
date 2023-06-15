<script lang='ts' setup>
import VueOfficePdf from '@vue-office/pdf'
import '@vue-office/docx/lib/index.css'
import { CloseBold } from '@element-plus/icons-vue'
const { src = '' } = defineProps<{
    src: string
}>()
const emit = defineEmits<{
    close: []
}>()
</script>

<template>
    <div class="test">
        <div class="my-dialog">
            <div class="flex my-content">
                <div class=" my-box">
                    <div class="flex">
                        <div class="flex-grow"></div>
                        <div>
                            <ElButton text @click="$emit('close')">
                                <div><el-icon size="30px">
                                        <CloseBold />
                                    </el-icon></div>
                            </ElButton>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex-grow">

                        </div>
                        <vue-office-pdf :src="src" style="height: 70vh;display: inline-block;" />
                        <div class="flex-grow">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.test {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    height: 100%;
    background-color: var(--el-overlay-color-lighter);
    overflow: auto;
    z-index: 9999999;
}

.my-dialog {
    position: fixed;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    align-items: center;
    justify-content: center;


}

.my-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.my-box {
    background-color: white;
}

.my-dialog :deep(.docx-wrapper) {
    /* padding: 30px auto; */
    background: white;
}
</style>

