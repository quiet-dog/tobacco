<template>
    <div class="h-full">
        <div style="height: 150px;">
            <el-row>
                <el-col :span="12">
                    <div>
                        <h1 class="text-2xl">条码生成</h1>
                        <h4>可使用扫码枪扫描商品条码，系统将自动查询样品信息</h4>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="pt-4">
                        <el-row :gutter="20">
                            <el-col :span="7">
                                <ElFormItem label="条数">
                                    <ElInput />
                                </ElFormItem>
                            </el-col>
                            <el-col :span="7">
                                <ElFormItem label="条数">
                                    <ElInput />
                                </ElFormItem>
                            </el-col>
                            <el-col :span="7">
                                <ElFormItem label="条数">
                                    <ElInput />
                                </ElFormItem>
                            </el-col>
                            <el-col :span="3">
                                <ElButton>生成</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <ElFormItem label="样品名称">
                        <ElInput />
                    </ElFormItem>
                </el-col>
                <el-col :span="6">
                    <ElFormItem label="厂商名称">
                        <ElInput />
                    </ElFormItem>
                </el-col>
                <el-col :span="6">
                    <ElFormItem label="样品名称">
                        <ElInput />
                    </ElFormItem>
                </el-col>
                <el-col :span="6">
                    <ElFormItem label="包装规格">
                        <ElSelect>
                            <ElOption label="Zone one" value="shanghai"></ElOption>
                            <ElOption label="Zone two" value="beijing"> </ElOption>
                        </ElSelect>
                    </ElFormItem>
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
                    <ElTableColumn prop="" label="商品条码"></ElTableColumn>
                    <ElTableColumn label="添加时间"></ElTableColumn>
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
                                <ElButton @click="goPrev(2)">上一步</ElButton>
                            </el-col>
                            <el-col :span="12">
                                <ElButton @click="goNext(4)">完成</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { samples = [] } = defineProps<{
    samples: any[]
}>()
const emit = defineEmits<{
    create: []
}>()
let page = $ref(1)
let pageSize = $ref(10)
const tableData = $computed(() => {
    // 分页samples
    const copy_samples = JSON.parse(JSON.stringify(samples))
    return copy_samples.splice((page - 1) * pageSize, pageSize)
})
const total = $computed(() => {
    return samples.length
})
const handlePage = (val: number) => {

}

const handeleSize = (val: number) => {

}


const activeStep = inject("activeStep")
function goNext(val: number) {
    emit("create")
    // activeStep.setActiveStep(val)
}
function goPrev(val: number) {
    activeStep.setActiveStep(val)
}
</script>
<style scoped></style>