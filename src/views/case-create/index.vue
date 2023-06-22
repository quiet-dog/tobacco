<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-header style="height: 220px;border-bottom: 5px whitesmoke solid;">
                <h1 class="pt-4" style="font-size: 26px;">新建案件</h1>
                <div class="px-36 pt-7">
                    <ElSteps class="my-step" finish-status="success" :active="activeStep" align-center>
                        <el-step title="基本信息" />
                        <el-step title="录入样品信息" />
                        <el-step title="核对信息" />
                        <el-step title="完成" />
                    </ElSteps>
                </div>
            </el-header>
            <el-main style="height: calc(100% - 220px);padding-left: 0;padding-right: 0;">
                <el-scrollbar v-show="activeStep === 0" height="100%">
                    <CaseOne ref="caseOneRef" v-model:form="form" v-show="activeStep === 0" />
                </el-scrollbar>
                <CaseTwo ref="caseTwoRef" v-model:samples="form.samples" v-model:formF="form" v-show="activeStep === 1" />
                <CaseThree @create="createCase" :samples="form.samples" v-show="activeStep === 2" />
                <CaseFour v-show="activeStep === 3" />
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { createCaseApi } from '@/api/case';
import { dayjs } from 'element-plus';
import { ElMessage, ElLoading } from 'element-plus';



let activeStep = $ref(0)
const caseOneRef = ref()
const caseTwoRef = ref()
let form = $ref({
    name: '',
    party: '',
    entrust_unit: '',
    reason: '',
    value: '',
    report_code: '',
    delivery_location: '',
    seized_site: '',
    sampling_site: '',
    sampler: '',
    sampling_time: dayjs(new Date).valueOf(),
    express_company: "",
    express_number: "",
    samples: []
})
function setActiveStep(step: number) {
    activeStep = step
}

function createCase() {
    const loading = ElLoading.service({
        lock: true,
        text: '正在创建......',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    createCaseApi(form).then(res => {
        activeStep = 3
        form = {
            name: '',
            party: '',
            entrust_unit: '',
            reason: '',
            value: '',
            report_code: '',
            delivery_location: '',
            seized_site: '',
            sampling_site: '',
            sampler: '',
            sampling_time: dayjs(new Date).valueOf(),
            samples: []
        }
        loading.close()
        ElMessage({
            message: res.msg,
            type: 'success'
        })
    }).catch(err => {
        loading.close()
        ElMessage({
            message: err.msg,
            type: 'error'
        })
    })
}

provide("activeStep", {
    setActiveStep: setActiveStep
})
watch(() => form.name, (val) => {
    console.log("formsss", val)
})

watch(() => activeStep, (val, old) => {
    if (old === 3 && val === 0) {
        caseOneRef.value.resetFields()
        caseTwoRef.value.clearData()
    }
})
</script>
<style scoped>
/* .my-step:deep(div.is-process) {
    color: var(--el-color-primary);
}

.my-step:deep(div.is-process>div.el-step__icon) {
    border-color: var(--el-color-primary);
} */
</style>