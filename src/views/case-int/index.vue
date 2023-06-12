<template>
    <div class="w-full">
        <MyTable>
            <template #header>
                <div class="flex bg-white space-x-5">
                    <div>
                        <el-button type="primary" size="large" @click="goCreatTask('/home/create')">新建案件</el-button>
                    </div>

                    <div>
                    </div>

                    <div class="flex-grow"></div>

                    <div class="flex">

                        <div class="pr-4">
                            <ElInput size="large" v-model="searchValue" placeholder="输入标签进行过滤" />
                        </div>

                        <div style="width: 120px">
                            <el-select v-model="timeValue" @change="changeSelect" placeholder="时间筛选条件" size="large">
                                <el-option v-for="item in timeOption" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="pr-2">
                            <el-date-picker value-format="x" style="width: 250px;" size="large" v-model="datePickerValue"
                                type="daterange" :shortcuts="timeValue === '1' ? datePickerShortcuts : datePickerShortcuts"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                @change="changePickerTime" />
                        </div>

                        <div>
                            <el-dropdown size="large" split-button type="primary">
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
                    </div>
                </div>
            </template>
            <template #table>
                <ElTable max-height="100%" height="100%" @row-click="handleRowDrawer" :data="tableData"
                    :header-cell-style="{ background: '#FAFAFA' }">
                    <el-table-column prop="report_code" label="流水号" show-overflow-tooltip />
                    <el-table-column prop="name" label="案件名称" show-overflow-tooltip />
                    <el-table-column prop="seized_site" label="查扣地点" show-overflow-tooltip />
                    <el-table-column prop="party" label="当事人" show-overflow-tooltip />
                    <el-table-column prop="value" label="案值（元）" show-overflow-tooltip />
                    <el-table-column prop="reason" label="查扣原因" show-overflow-tooltip />
                    <el-table-column prop="sampling_time" label="抽样时间" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.sampling_time ? formatDate(scope.row.sampling_time) : "-" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sampler" label="抽样人" show-overflow-tooltip />
                    <el-table-column prop="delivery_location" label="抽样地点" show-overflow-tooltip />
                    <el-table-column prop="entrust_unit" label="委托单位" show-overflow-tooltip />
                    <el-table-column width="150" show-overflow-tooltip>
                        <template #default="scope">
                            <ElButton text style="padding: 0px;"> 编辑</ElButton>
                            <ElButton text style="padding: 0px;" type="danger"> 取消</ElButton>
                        </template>
                    </el-table-column>
                </ElTable>
            </template>
            <template #page>
                <div class="pt-1/2">总共{{ total1 }}</div>
                <div class="flex-grow"></div>
                <div>
                    <el-pagination v-model:currentPage="page1" @current-change="handlePage1" @size-change="handeleSize1"
                        v-model:page-size="pageSize1" large layout="prev, pager, next" :total="total1" />
                </div>
            </template>
        </MyTable>
        <ElDrawer v-model="drawer" title="案件概述" @closed="closedDrawer" width="50%">
            <div>
                <el-card shadow="hover" class="title-card-my">
                    <template #header>
                        <div class="flex">
                            <div class="border-l-4 border-blue-400 pl-2 text-2xl">概述</div>
                            <div class="flex-grow">
                            </div>
                        </div>

                    </template>
                    <div class="flex-col px-5">
                        <div class="grid grid-cols-14 gap-10">
                            <el-descriptions title="" :column="2">
                                <el-descriptions-item label-align="left" label="名称">{{ taskInfo.name
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="委托单位">{{ taskInfo.entrust_unit
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="当事人">{{ taskInfo.party
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查扣原因">
                                    <el-tag>{{ taskInfo.reason }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label-align="left" label="抽样时间">{{ taskInfo.sampling_time
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查扣地点">{{ taskInfo.delivery_location
                                }}</el-descriptions-item>
                            </el-descriptions>
                            <div class="mt-12 ">
                                <el-steps :active="setActive" :process-status="3 === 3 ? 'error' : 'finish'"
                                    :finish-status="3 === 3 ? 'error' : 'finish'" align-center>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件建立<br>
                                                2022-12-17
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                鉴定完成<br>
                                                2022-12-17
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                入库完成<br>
                                                2022-12-17
                                            </div>
                                        </template>
                                    </el-step>
                                </el-steps>
                            </div>
                        </div>
                    </div>
                </el-card>
                <div class="pt-2">
                    <el-card shadow="hover" class="title-card-my">
                        <template #header>
                            <div class="flex">
                                <div class="border-l-4 border-blue-400 pl-2 text-2xl">样品列表</div>
                                <div class="flex-grow"></div>
                            </div>
                        </template>
                        <div>
                            <div>
                                <el-table :data="tableData2" :default-sort="{ prop: 'date', order: 'descending' }"
                                    :header-cell-style="{ background: '#FAFAFA' }" width="100%">
                                    <el-table-column prop="code" label="编号" width="150"
                                        show-overflow-tooltip></el-table-column>

                                    <el-table-column prop="name" label="样品名称" width="150" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="manufacturer" label="厂商" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="packing_spec" label="包装形式" width="100" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="packing_spec" label="包装形式" width="100" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="packing_spec" label="鉴定结果" width="100" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="packing_spec" label="鉴定人" width="100" show-overflow-tooltip>
                                    </el-table-column>
                                    <!-- <el-table-column prop="name" label="操作">
                                        <template #default="scope">
                                            <div>
                                                <el-button text type="danger" @click="" :style="{ 'padding-left': '0px' }">
                                                    移除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column> -->
                                </el-table>
                            </div>
                            <div class="flex mt-3" v-if="total2 > 5">
                                <div class="mt-2 pl-4">共{{ total2 }}条</div>
                                <div class="flex-grow"></div>
                                <div>
                                    <el-pagination v-model:currentPage="page2" v-model:page-size="pageSize2"
                                        layout="prev, pager, next" :total="total2" @current-change="handlePage2"
                                        @size-change="handeleSize2" />
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <template #footer>
                <div class="flex">
                    <div class="w-1/2 pr-2">
                        <ElButton style="width: 100%;" type="primary">提前结束案件</ElButton>
                    </div>
                    <div class="w-1/2 pl-2">
                        <ElButton style="width: 100%;" type="primary">案件时间线</ElButton>
                    </div>
                </div>
            </template>
        </ElDrawer>
    </div>
</template>
<script setup lang="ts">
import { getCaseListApi } from '@/api/case';
import { getSampleListApi, } from '@/api/sample';
import { formatDate } from "@/utils"
import { ElMessage } from 'element-plus';

const status = $ref("在库案件")
const router = useRouter()
function goCreatTask(path: string) {
    router.push(path)
}
let searchValue = $ref('')
let timeValue = $ref('1')
let timeOption = [
    {
        value: '1',
        label: '抽样时间',
    },
    {
        value: '2',
        label: '入库时间',
    }
]
let tableData = $ref([])
let tableData2 = $ref([])
let total1 = $ref(50)
let total2 = $ref(50)
let drawer = $ref(false)
let setActive = $ref(0)
let page1 = $ref(1)
let pageSize1 = $ref(10)
let page2 = $ref(1)
let pageSize2 = $ref(5)
let law_case_id = $ref(0)

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
const datePickerValue = $ref(null)

const changePickerTime = (val: any) => {
    console.log(val)
    getCaseList()
}

const handlePage1 = (val: number) => {
    getCaseList()
}

const handeleSize1 = (val: number) => {
    getCaseList()
}

const handlePage2 = (val: number) => {
    getSampleList()
}

const handeleSize2 = (val: number) => {
    getSampleList()
}

let taskInfo = $ref({
    name: "",
    entrust_unit: "",
    party: '',
    reason: "",
    sampling_time: "",
    delivery_location: ""
})
const handleRowDrawer = (row: any, _column: any, _event: any) => {
    drawer = true
    law_case_id = row.id
    taskInfo = row
    getSampleList()
    console.log(row)
}

function changeSelect(val) {
    getCaseList()
}

function closedDrawer() {
    page2 = 1
    pageSize2 = 5
    total2 = 0
    law_case_id = 0
}

function getCaseList() {
    getCaseListApi({
        page_index: page1,
        page_size: pageSize1,
        storage_time_start: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        storage_time_end: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        sampling_time_start: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        sampling_time_end: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        status
    }).then(res => {
        total1 = res.data.total
        tableData = res.data.list
    })
}

function getSampleList() {
    getSampleListApi({
        page_index: page2,
        page_size: pageSize2,
        law_case_id: law_case_id === 0 ? undefined : law_case_id,
    }).then(res => {
        total2 = res.data.total
        tableData2 = res.data.list
    })
}


onMounted(() => {
    getCaseList()
})
</script>