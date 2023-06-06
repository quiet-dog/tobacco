<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="250px" class="border-right-my">
                <el-scrollbar height="100%">
                    <el-menu default-active="0">
                        <ElMenuItem @click="selectId(0)" :index="'0'">xxxxdgayudgasid</ElMenuItem>
                        <template v-for="item in treeMenu">
                            <ElSubMenu :index="String(item.id)" v-if="item.shelves.length > 0" :key="item">
                                <template #title>
                                    <span>{{ item.name }}</span>
                                </template>
                                <el-menu-item v-for="shelf in item.shelves" :key="shelf.id"
                                    :index="String(item.id + '-' + shelf.id)" @click="selectId(shelf.id)">
                                    <template #title>
                                        <span>{{ shelf.name }}</span>
                                    </template>
                                </el-menu-item>
                            </ElSubMenu>
                            <!-- <ElMenuItem :index="item.id" v-else>
                                {{ item.name }}
                            </ElMenuItem> -->
                        </template>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-main class="h-full">
                <div style="height: 120px;">
                    <div class="flex">
                        <ElButton size="large">新建案件</ElButton>
                    </div>
                    <div class="flex pt-4">
                        <div style="width: 120px">
                            <el-select @change="changeTimeValue" v-model="timeValue" placeholder="时间筛选条件" size="large">
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
                        <div class="flex-grow"></div>
                        <div class="pr-5">
                            <ElInput size="large" placeholder="请输入搜索内容" />
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
                <div style="height: calc(100% - 120px);">
                    <div style="height: calc(100% - 60px);">
                        <ElTable max-height="100%" @row-click="rowClickTableData" :data="tableData"
                            :header-cell-style="{ background: '#FAFAFA' }">
                            <ElTableColumn prop="name" label="样品名称"></ElTableColumn>
                            <ElTableColumn prop="code" label="样品编号"></ElTableColumn>
                            <ElTableColumn prop="code" label="存放位置"></ElTableColumn>
                            <ElTableColumn prop="code" label="案件名称"></ElTableColumn>
                            <ElTableColumn prop="code" label="抽样时间"></ElTableColumn>
                            <ElTableColumn prop="code" label="鉴定结果">
                                <template #default="scope">
                                    <el-tag v-if="scope.row.is_real" type="success">真烟</el-tag>
                                    <el-tag v-else type="danger">假烟</el-tag>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="code" label="库存状态"></ElTableColumn>
                            <ElTableColumn prop="code" label="入库人"></ElTableColumn>
                            <ElTableColumn prop="info" label="入库时间"></ElTableColumn>
                            <ElTableColumn prop="info" label="期满倒计时"></ElTableColumn>
                            <ElTableColumn label="操作">
                                <template #default="scope">
                                    <ElButton text @click="">编辑</ElButton>
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div style="height: 60px;" class="flex">
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
        <ElDrawer v-model="drawerVisible" @closed="closeDrawer" title="样品概述" width="50%">
            <div>
                <el-card shadow="hover" class="title-card-my">
                    <template #header>
                        <div class="flex">
                            <div class="border-l-4 border-blue-400 pl-2 text-3xl">样品概述</div>
                            <div class="flex-grow">
                            </div>
                        </div>

                    </template>
                    <div class="flex-col px-5">
                        <div class="grid grid-cols-14 gap-10">
                            <el-descriptions title="" :column="3">
                                <el-descriptions-item label-align="left" label="名称">kooriookami</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="委托单位">18100000000</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="当事人">Suzhou</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查看原因">
                                    <el-tag>行政案件</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label-align="left" label="抽样时间">Suzhou</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查扣地点">Suzhou</el-descriptions-item>
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
                <!-- ========================= -->
                <div class="pt-2">
                    <el-card shadow="hover" class="title-card-my">
                        <template #header>
                            <div class="flex">
                                <div class="border-l-4 border-blue-400 pl-2 text-3xl">待检列表</div>
                                <div class="flex-grow"></div>
                            </div>
                        </template>
                        <div>
                            <div>
                                <el-table :data="tableData2" :default-sort="{ prop: 'date', order: 'descending' }"
                                    :header-cell-style="{ background: '#FAFAFA' }" width="100%">
                                    <el-table-column prop="code" label="编号" width="150"></el-table-column>

                                    <el-table-column prop="name" label="样品名称" width="150" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="manufacturer" label="厂商">
                                    </el-table-column>
                                    <el-table-column prop="stock_status" label="包装形式" width="100">
                                    </el-table-column>
                                    <el-table-column prop="name" label="操作">
                                        <template #default="scope">
                                            <div>
                                                <el-button text type="danger" @click="" :style="{ 'padding-left': '0px' }">
                                                    移除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
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
                <ElButton style="width: 100%;" type="primary">开始鉴定</ElButton>
            </template>
        </ElDrawer>
    </div>
</template>
<script setup lang="ts">
import { getAreaSelectorApi } from '@/api/area';
import { getSampleListApi } from '@/api/sample';

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
let setActive = $ref(0)
let drawerVisible = $ref(false)
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
    // console.log(datePickerValue)
    getSampleList()
}
let tableData = $ref([{
    name: "222"
}])
let total = $ref(0)
let page = $ref(1)
let pageSize = $ref(20)
let treeMenu = $ref([])
const handlePage = (val: number) => {
    getSampleList()
}

const handeleSize = (val: number) => {
    getSampleList()
}

function handlePage2(val: number) {
    getWaitSampleLisst()
}

function handeleSize2(val: number) {
    getWaitSampleLisst()
}

function changeTimeValue(val) {
    getSampleList()
}
let shelf_id = $ref(0)
function selectId(val: number) {
    if (shelf_id === val) {
        return
    }
    page = 1
    pageSize = 20
    shelf_id = val
    getSampleList()
}

function rowClickTableData(row, column, event) {
    console.log(row)
    law_case_id = row.law_case_id
    drawerVisible = true
    getWaitSampleLisst()
}

function closeDrawer() {
    law_case_id = 0
    tableData2 = []
    page2 = 1
    pageSize2 = 5
    total2 = 0
}

function getAreaMenuList() {
    getAreaSelectorApi().then(res => {
        treeMenu = res.data as any
        console.log('treeMenu', treeMenu)
    }).catch(err => {

    })
}

function getSampleList() {
    getSampleListApi({
        page_index: page,
        page_size: pageSize,
        shelf_id: shelf_id === 0 ? undefined : shelf_id,
        storage_time_start: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        storage_time_end: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        sampling_time_start: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        sampling_time_end: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
    }).then(res => {
        tableData = res.data.list
        total = res.data.total
    })
}

let tableData2 = $ref([])
let page2 = $ref(1)
let pageSize2 = $ref(5)
let total2 = $ref(0)
let law_case_id = $ref(0)
function getWaitSampleLisst() {
    getSampleListApi({
        page_index: page2,
        page_size: pageSize2,
        law_case_id: law_case_id === 0 ? undefined : law_case_id
    }).then(res => {
        tableData2 = res.data.list
        total2 = res.data.total
    })
}

onMounted(() => {
    getAreaMenuList()
    getSampleList()
})

onActivated(() => {
    getAreaMenuList()
})

</script>
<style scoped>
div.title-card-my :deep(>div.el-card__header) {
    padding: 10px;
}

#layout-main>div:nth-child(2)>div>section>aside>div>div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default>div>ul {
    border-right: 0 !important;
}
</style>