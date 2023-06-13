<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-header style="height: 200px;">
                <h1 class="text-2xl pt-5">新建案件</h1>
                <div class="px-36">
                    <ElSteps :active="activeStep" align-center>
                        <el-step title="基本信息" />
                        <el-step title="录入样品信息" />
                        <el-step title="核对信息" />
                        <el-step title="完成" />
                    </ElSteps>
                </div>
            </el-header>
            <el-main style="height: calc(100% - 200px);">
                <el-scrollbar v-show="activeStep === 1" height="100%">
                    <CaseOne ref="caseOneRef" v-model:form="form" v-show="activeStep === 1" />
                </el-scrollbar>
                <CaseTwo ref="caseTwoRef" v-model:samples="form.samples" v-model:formF="form" v-show="activeStep === 2" />
                <CaseThree @create="createCase" :samples="form.samples" v-show="activeStep === 3" />
                <CaseFour v-show="activeStep === 4" />
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { createCaseApi } from '@/api/case';
import { dayjs } from 'element-plus';
import { ElMessage } from 'element-plus';

let activeStep = $ref(1)
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
    createCaseApi(form).then(res => {
        activeStep = 4
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
        ElMessage({
            message: res.msg,
            type: 'success'
        })
    }).catch(err => {
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
    if (old === 4 && val === 1) {
        caseOneRef.value.resetFields()
        caseTwoRef.value.clearData()
    }
})
</script>
<style scoped></style>