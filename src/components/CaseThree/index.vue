<template>
    <div class="h-full">
        <div style="height: calc(100%);">
            <div class="px-3">
                <h5 class="border-solid border-l-4 border-blue-400 pl-2"
                    style="font-size: 18px;height: 25px;line-height: 25px;">条码生成</h5>
            </div>
            <div class="px-3 mt-3" style="height: calc(100% - 85px);">
                <ElTable max-height="100%" height="100%" :data="tableData"
                    :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ background: '#FAFAFA' }"
                    width="100%">
                    <ElTableColumn prop="name" label="样品名称"></ElTableColumn>
                    <ElTableColumn prop="code" label="编号"></ElTableColumn>
                    <ElTableColumn prop="manufacturer" label="厂商"></ElTableColumn>
                    <ElTableColumn prop="packing_spec" label="包装规格"></ElTableColumn>
                    <ElTableColumn prop="quantity" label="样品数量"></ElTableColumn>
                    <ElTableColumn prop="good_code" label="商品条码"></ElTableColumn>
                    <ElTableColumn prop="add_time" label="添加时间">
                        <template #default="scope">
                            {{ formatDate(scope.row.add_time) }}
                        </template>
                    </ElTableColumn>
                    <ElTableColumn width="100" prop="add_person" label="添加人"></ElTableColumn>
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
            <div class="flex py-3" style="height: 60px;">
                <div class="mt-1 pl-4">共{{ total }}条</div>
                <div>
                    <el-pagination v-model:currentPage="page" v-model:page-size="pageSize" layout="prev, pager, next"
                        :total="total" @current-change="handlePage" @size-change="handeleSize" />
                </div>
                <div class="flex-grow"></div>
                <div>
                    <div style="" class="flex pr-8">

                        <div class="mr-4">
                            <ElButton @click="goPrev(1)">上一步</ElButton>
                        </div>

                        <div class="ml-4">
                            <ElButton type="primary" @click="goNext(3)">完成</ElButton>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { formatDate } from '@/utils'
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