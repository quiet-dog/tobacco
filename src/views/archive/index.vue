<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="200px">
                <el-menu>
                    <ElMenuItem>测试</ElMenuItem>
                </el-menu>
            </el-aside>
            <el-main class="h-full">

                <div style="height: 200px;">
                    <div class="flex">
                        <ElButton type="primary">新建案件</ElButton>
                    </div>
                    <div>
                        <div class="flex">
                            <div style="width: 120px">
                                <el-select v-model="timeValue" placeholder="时间筛选条件">
                                    <el-option v-for="item in timeOption" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div class="pr-2">
                                <el-date-picker style="width: 250px;" v-model="datePickerValue" type="daterange"
                                    :shortcuts="timeValue === '1' ? datePickerShortcuts : datePickerShortcuts"
                                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                    @change="changePickerTime" />
                            </div>
                            <div class="flex-grow"></div>
                            <div class="pr-4" style="width: 300px;">
                                <ElInput class="w-full" />
                            </div>
                            <div>
                                <el-dropdown split-button type="primary">
                                    批量操作
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>选择1</el-dropdown-item>
                                            <el-dropdown-item>Action 2</el-dropdown-item>
                                            <el-dropdown-item>Action 3</el-dropdown-item>
                                            <el-dropdown-item>Action 4</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: calc(100% - 200px);">
                    <div>
                        <ElTable @row-click="handleRowDrawer" :data="tableData"
                            :header-cell-style="{ background: '#FAFAFA' }">
                            <ElTableColumn label="样品名称"></ElTableColumn>
                            <ElTableColumn label="样品编号"></ElTableColumn>
                            <ElTableColumn label="存放位置"></ElTableColumn>
                            <ElTableColumn label="案件名称"></ElTableColumn>
                            <ElTableColumn label="案件编号"></ElTableColumn>
                            <ElTableColumn label="抽样时间"></ElTableColumn>
                            <ElTableColumn label="鉴定结果"></ElTableColumn>
                            <ElTableColumn label="库存状态"></ElTableColumn>
                            <ElTableColumn label="入库人"></ElTableColumn>
                            <ElTableColumn label="入库时间"></ElTableColumn>
                            <ElTableColumn label="期满倒计时"></ElTableColumn>
                            <ElTableColumn>
                                <template #default="scope">
                                    <ElButton text>编辑</ElButton>
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div>
                        <div class="pt-1/2">总共{{ total }}</div>
                        <div class="flex-grow"></div>
                        <div>
                            <el-pagination v-model:currentPage="page" @current-change="handlePage"
                                @size-change="handeleSize" v-model:page-size="pageSize" large layout="prev, pager, next"
                                :total="total" />
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script setup lang="ts">
let searchValue = $ref('')
let timeValue = $ref('')
let timeOption = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    }
]
const datePickerShortcuts = ref([
    {
        text: '上一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]);
const datePickerValue = $ref([])
const changePickerTime = (val: any) => {
    console.log(val)
}
let drawer = $ref(false)
const handleRowDrawer = (row: any, _column: any, _event: any) => {
    drawer = true
    console.log(row)
}

let tableData = $ref([{
    date: "222"
}])
let total = $ref(50)
let page = $ref(1)
let pageSize = $ref(10)
const handlePage = (val: number) => {

}

const handeleSize = (val: number) => {

}


</script>
<style scoped></style>