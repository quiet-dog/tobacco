<template>
    <div class="h-full">
        <ScannerGun @change="getScangerCode" />

        <div style="height: 150px;">
            <el-row>
                <el-col :span="12">
                    <div>
                        <h1 class="text-2xl">条码生成</h1>
                        <h4>可使用扫码枪扫描商品条码，系统将自动查询样品信息</h4>
                    </div>
                </el-col>
                <el-col :span="12" class="flex">
                    <div class="flex-grow">

                    </div>
                    <div class="pt-4" style="width: 400px;">
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <ElFormItem label="生成数量">
                                    <ElInput v-model="tobaccoForm.tobaccoNum" />
                                </ElFormItem>
                            </el-col>
                            <el-col :span="6">
                                <ElButton @click="createTobaccoDetail">生成</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="w-2/3">
                        <ElFormItem label="商品名称">
                            <ElInput v-model="tobaccoForm.tobaccoName" />
                        </ElFormItem>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="w-2/3">
                        <ElFormItem label="厂商名称">
                            <ElInput v-model="tobaccoForm.tobaccoFactory" />
                        </ElFormItem>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="w-2/3">
                        <ElFormItem label="商品条码">
                            <ElInput v-model="tobaccoForm.tobaccoCode" />
                        </ElFormItem>
                    </div>
                </el-col>
                <el-col :span="6" class="flex">
                    <div class="flex-grow"></div>
                    <div class="w-2/3">
                        <ElFormItem label="包装规格">
                            <ElSelect v-model="tobaccoForm.tobaccoType">
                                <ElOption>13123</ElOption>
                            </ElSelect>
                        </ElFormItem>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="height: calc(100% - 150px);">
            <div style="height: calc(100% - 60px);">
                <ElTable max-height="100%" height="100%" :data="tableData"
                    :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ background: '#FAFAFA' }"
                    width="100%">
                    <ElTableColumn prop="name" label="样品名称"></ElTableColumn>
                    <ElTableColumn prop="code" label="编号"></ElTableColumn>
                    <ElTableColumn prop="manufacturer" label="厂商"></ElTableColumn>
                    <ElTableColumn label="包装规格"></ElTableColumn>
                    <ElTableColumn prop="quantity" label="样品数量"></ElTableColumn>
                    <ElTableColumn prop="good_code" label="商品条码"></ElTableColumn>
                    <ElTableColumn prop="add_time" label="添加时间"></ElTableColumn>
                    <ElTableColumn label="添加人"></ElTableColumn>
                    <!-- <ElTableColumn label="是否扫描"></ElTableColumn>
                    <ElTableColumn>
                        <template #default="scope">
                            <ElButton text>
                                移除
                            </ElButton>
                        </template>
                    </ElTableColumn> -->
                </ElTable>
            </div>
            <div class="flex" style="height: 60px;">
                <div class="mt-2 pl-4">共{{ total }}条</div>
                <div>
                    <el-pagination v-model:currentPage="page" v-model:page-size="pageSize" layout="prev, pager, next"
                        :total="total" @current-change="handlePage" @size-change="handeleSize" />
                </div>
                <div class="flex-grow"></div>
                <div>
                    <div style="width: 200px;">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <ElButton @click="goPrev(1)">上一步</ElButton>
                            </el-col>
                            <el-col :span="12">
                                <ElButton @click="goNext(3)">下一步</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getTobaccoListApi } from '@/api/tobacco';
import { uuid } from '@/utils';
import { ElMessage } from 'element-plus';
import { codeStore } from '@/store/code'

const { samples = [] } = defineProps<{
    samples: any[]
}>()

const codeS = codeStore()
const activeStep = inject("activeStep")
let tobaccoForm = $ref({
    tobaccoName: "",
    tobaccoFactory: "",
    tobaccoCode: "",
    tobaccoType: "",
    tobaccoNum: ""
})
let page = $ref(1)
let pageSize = $ref(20)
const total = $computed(() => {
    return samples.length
})
const tableData = $computed(() => {
    // 分页samples
    const copy_samples = JSON.parse(JSON.stringify(samples))
    return copy_samples.splice((page - 1) * pageSize, pageSize)
})
const handlePage = (val: number) => {

}

const handeleSize = (val: number) => {

}

function getScangerCode(code: any) {
    console.log('12312312312')
    getTobaccoListApi(code).then(res => {
        tobaccoForm.tobaccoCode = res.result.barcode
        tobaccoForm.tobaccoName = res.result.name
        tobaccoForm.tobaccoFactory = res.result.company
        tobaccoForm.tobaccoType = res.result.type
        console.log("getTobaccoListApi", res)
    }).catch(err => {
        tobaccoForm.tobaccoCode = ""
        tobaccoForm.tobaccoName = ""
        tobaccoForm.tobaccoFactory = ""
        tobaccoForm.tobaccoType = ""
        ElMessage({
            type: "error",
            message: err.msg
        })
    })
}

watch(() => codeS.code, (val) => {
    console.log('code change')
})

function createTobaccoDetail() {
    for (let i = 0; i < Number(tobaccoForm.tobaccoNum); i++) {
        samples.push({
            name: tobaccoForm.tobaccoName,
            code: uuid(16, 8),
            manufacturer: tobaccoForm.tobaccoFactory,
            quantity: String(1),
            add_time: new Date().getTime(),
            good_code: tobaccoForm.tobaccoCode,
        })
    }
}

function goNext(val: number) {
    activeStep.setActiveStep(val)
}
function goPrev(val: number) {
    activeStep.setActiveStep(val)
}

onMounted(() => {

})
</script>
<style scoped></style>