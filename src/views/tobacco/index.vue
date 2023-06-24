<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="250px" class="border-right-my">
                <el-scrollbar height="100%">
                    <el-menu class="border-right-my-test " default-active="0">
                        <ElMenuItem class="my-main border-b-2" @click="selectId(0)" :index="'0'">
                            <span class="text-2xl pt-2">咸阳市烟草局</span>
                        </ElMenuItem>
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
            <el-main class="h-full" style="padding-left: 0;padding-right: 0;">
                <div class="px-3" style="height: 60px; border-bottom: 5px whitesmoke solid;">
                    <div class="flex pt-1">
                        <div class="flex">
                            <ElButton type="primary" @click="$router.push('/home/create')">新建案件</ElButton>
                        </div>

                        <div class="flex-grow"></div>
                        <div class="pr-6">
                            <ElInput v-model="searchValue" @input="changeSearchValue" placeholder="请输入搜索内容">
                                <template #append>
                                    <el-button :icon="Search" />
                                </template>
                            </ElInput>
                        </div>
                        <div style="width: 120px">
                            <el-select @change="changeTimeValue" v-model="timeValue" placeholder="时间筛选条件">
                                <el-option v-for="item in timeOption" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="pr-2">
                            <el-date-picker value-format="x" style="width: 250px;" v-model="datePickerValue"
                                type="daterange" :shortcuts="timeValue === '1' ? datePickerShortcuts : datePickerShortcuts"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                @change="changePickerTime" />
                        </div>
                        <div>
                            <el-dropdown split-button type="primary" @click="importFile(1)">
                                导出所选
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="importFile(2)">导出全部</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <!-- <div>
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
                        </div> -->
                    </div>
                </div>
                <div class="px-3 pt-4" style="height: calc(100% - 60px);">
                    <div style="height: calc(100% - 60px);">
                        <ElTable @selection-change="handleSelectionChange" v-loading="loadingTable"
                            element-loading-text="正在加载中" size="large" max-height="100%" height="100%"
                            @row-click="rowClickTableData" :data="tableData" :header-cell-style="{ background: '#FAFAFA' }">
                            <el-table-column fixed type="selection" width="55" />
                            <ElTableColumn fixed prop="name" width="150" label="样品名称" show-overflow-tooltip>
                                <template #default="scope">
                                    <span v-html="highText(scope.row.name, searchValue)"></span>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn fixed prop="code" width="150" label="样品编号" show-overflow-tooltip>
                                <template #default="scope">
                                    <span v-html="highText(scope.row.code, searchValue)"></span>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="350" prop="location" label="存放位置" show-overflow-tooltip>
                                <template #header>
                                    <el-cascader v-if="shelf_id === 0" size="default" v-model="positionFilter"
                                        :options="positionList" :props="props" placeholder="位置" clearable collapse-tags
                                        collapse-tags-tooltip @change="changePostion">
                                        <template v-slot:footer></template>
                                    </el-cascader>
                                    <el-cascader v-else v-model="positionFilter2" :props="props" :options="positionList2"
                                        collapse-tags clearable @change="changePostion2" />
                                </template>
                                <template #default="scope">
                                    <span v-html="highText(scope.row.location, searchValue)"></span>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="100" prop="law_case.name" label="案件名称" show-overflow-tooltip>
                                <template #default="scope">
                                    <span v-html="highText(scope.row.law_case.name, searchValue)"></span>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="170" prop="law_case.sampling_time" label="抽样时间" show-overflow-tooltip>
                                <template #default="scope">
                                    {{ formatDate(scope.row.law_case.sampling_time) }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="100" prop="is_real" label="鉴定结果" show-overflow-tooltip>
                                <template #default="scope">
                                    <el-tag v-if="scope.row.is_real" type="success">真烟</el-tag>
                                    <el-tag v-else type="danger">假烟</el-tag>
                                </template>
                            </ElTableColumn>
                            <!-- <ElTableColumn prop="code" label="库存状态" show-overflow-tooltip>
                                <template #default="scope">
                                    {{ scope.row.status }}
                                </template>
                            </ElTableColumn> -->
                            <ElTableColumn prop="law_case.stocker.username" label="入库人" show-overflow-tooltip>
                                <template #default="scope">
                                    <span v-html="highText(scope.row.law_case.stocker.username, searchValue)"></span>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="150" prop="info" label="入库时间" show-overflow-tooltip>
                                <template #default="scope">
                                    {{ scope.row.storage_time === null ? "-" : formatDate(scope.row.storage_time) }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="200" prop="info" label="期满倒计时" show-overflow-tooltip>
                                <template #default="scope">
                                    {{ scope.row.law_case.expire_time === null ? "-" : getExpireTime(scope.row.expire_time)
                                    }}
                                </template>
                            </ElTableColumn>
                            <!-- <ElTableColumn width="90" label="&nbsp;&nbsp;&nbsp;&nbsp;操作">
                                <template #default="scope">
                                    <ElButton type="primary" text @click="">编辑</ElButton>
                                </template>
                            </ElTableColumn> -->
                        </ElTable>
                    </div>
                    <div style="height: 60px;" class="flex py-4">
                        <div class="pt-1/2 text-gray-400">共{{ total }}条 </div>
                        <div class="flex-grow"></div>
                        <div>
                            <el-pagination v-model:currentPage="page" @current-change="handlePage"
                                @size-change="handeleSize" v-model:page-size="pageSize" large
                                layout="sizes,prev, pager, next" :total="total" />
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
        <ElDrawer class="my-drawer" v-model="drawerVisible" @closed="closeDrawer" title="样品概述" size="50%">
            <div>
                <el-card shadow="hover" class="title-card-my">
                    <template #header>
                        <div class="flex">
                            <div class="border-solid border-l-4 border-blue-400 pl-4 text-1xl">案件概述</div>
                            <div class="flex-grow">
                            </div>
                        </div>

                    </template>
                    <div class="flex-col px-5">
                        <div class="grid grid-cols-14 ">
                            <el-descriptions class="pl-12" title="" :column="3">
                                <el-descriptions-item label-align="left" label="名称">{{ caseInfo.name
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="报告编号">{{ caseInfo.law_case.report_code
                                }}</el-descriptions-item>

                                <el-descriptions-item label-align="right" label="委托单位">{{ caseInfo.law_case.entrust_unit
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="当事人">{{ caseInfo.law_case.party
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="抽样人">{{ caseInfo.law_case.sampler
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="鉴定人">{{ caseInfo.law_case.identifier
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="抽样时间">{{
                                    formatDate2(caseInfo.identify_time) }}</el-descriptions-item>

                                <el-descriptions-item label-align="right" label="查看原因">
                                    <el-tag>行政案件</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查扣地点">{{ caseInfo.law_case.seized_site
                                }}</el-descriptions-item>
                            </el-descriptions>
                            <div class="mt-12 ">
                                <el-steps class="my-step" :active="setActive" finish-status="success" align-center>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件建立<br>
                                                {{ caseInfo.law_case.created_at ? formatDate2(caseInfo.law_case.created_at)
                                                    :
                                                    "-" }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件鉴定<br>
                                                {{ caseInfo.law_case.identify_time ?
                                                    formatDate2(caseInfo.law_case.identify_time) : '-' }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件入库<br>
                                                {{ caseInfo.law_case.storage_time ?
                                                    formatDate2(caseInfo.law_case.storage_time) : '-' }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件到期<br>
                                                {{ caseInfo.law_case.expire_time ?
                                                    formatDate2(caseInfo.law_case.expire_time) : '-' }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件出库<br>
                                                {{ caseInfo.law_case.archived_time ?
                                                    formatDate2(caseInfo.law_case.archived_time) : '-' }}
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
                                <div class="border-solid border-l-4 border-blue-400 pl-4 text-1xl">同案件样品列表</div>
                                <div class="flex-grow"></div>
                            </div>
                        </template>
                        <div>
                            <div style="height: 450px;">
                                <el-table height="100%" max-height="100%" :data="tableData2"
                                    :default-sort="{ prop: 'date', order: 'descending' }"
                                    :header-cell-style="{ background: '#FAFAFA' }" width="100%">
                                    <el-table-column prop="code" label="编号"></el-table-column>

                                    <el-table-column prop="name" label="样品名称" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="manufacturer" label="厂商" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="packing_spec" label="包装形式" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="is_real" label="鉴定结果" show-overflow-tooltip>
                                        <template #default="scope">
                                            <el-tag v-if="scope.row.is_real" type="primary">真烟</el-tag>
                                            <el-tag v-else type="danger">假烟</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="law_case.identifier" label="鉴定人" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="location" label="存放位置" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="storage_time" label="入库时间" show-overflow-tooltip>
                                        <template #default="scope">
                                            <div>{{ formatDate2(scope.row.storage_time) }}</div>
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
                <!-- <ElButton style="width: 100%;" type="primary">开始鉴定</ElButton> -->
            </template>
        </ElDrawer>
    </div>
</template>
<script setup lang="ts">
import { getAreaSelectorApi } from '@/api/area';
import { getSampleListApi, getSampleInfoApi, exportSampleApi } from '@/api/sample';
import { highText, formatDate, getExpireTime, getAreaOptionsDisableSelect, getShlefOptionSelect, formatDate2 } from '@/utils'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

const props = $ref(
    { multiple: true, }
)
let loadingTable = $ref(false)
// let positionList = $ref([])

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
let searchValue = $ref('')
function changeSearchValue(val) {
    getSampleList()
}
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

function changePostion(val) {
    getSampleList()
}
function changePostion2(val) {
    getSampleList()
}

let positionFilter = $ref([])
let positionFilter2 = $ref([])

let exportType = $ref(1)
function importFile(val) {
    if (val === 1) {
        exportType = 1
    } else {
        exportType = 2
    }
    exportExecel()
}
let multipleIds = $ref([])
const tableRef = ref()
function handleSelectionChange(rows) {
    multipleIds = []
    if (rows) {
        rows.forEach(row => {
            multipleIds.push(row.id)
        })

    } else {
        multipleIds = rows
    }
    // exportExecel()
}
function exportExecel() {
    exportSampleApi({
        page_index: page,
        page_size: pageSize,
        shelf_id: shelf_id === 0 ? undefined : shelf_id,
        storage_time_start: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        storage_time_end: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        sampling_time_start: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        sampling_time_end: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        keyword: searchValue,
        is_in_stock: true,
        locations_filter: shelf_id === 0 ? (positionFilter.length === 0 ? undefined : positionFilter) : positionFilter2.length === 0 ? undefined : positionFilter2
    }).then(res => {
        console.log('res.data', res)
        let blob = new Blob([res]);
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', '样品列表.xlsx')
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link)
        ElMessage({
            type: 'success',
            message: '导出成功'
        })
    }).catch(err => {
        ElMessage({
            type: 'error',
            message: err.msg
        })
    })
}


const changePickerTime = (val: any) => {
    // console.log(datePickerValue)
    getSampleList()
}
let tableData = $ref([])
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

let caseInfo = $ref({
    name: "",
    law_case: {
        name: "",
        entrust_unit: "",
        report_code: "",
        party: "",
        sampler: '',
        identifier: "",
        seized_site: "",
        created_at: "",
        identify_time: "",
        storage_time: "",
        expire_time: "",
    },
    identify_time: "",
})

function getCurActive(row: any) {
    if (row.created_at) {
        setActive = 1
    }
    if (row.identify_time !== null) {
        setActive = 2
    }
    if (row.storage_time !== null) {
        setActive = 3
    }
    if (row.expire_time !== null && (new Date().getTime() - row.expire_time) > 0) {
        setActive = 4
    }
    if (row.archived_time !== null) {
        setActive = 5
    }
}
function rowClickTableData(row, column, event) {
    console.log(row)
    law_case_id = row.law_case_id
    getSampleInfoApi({
        id: row.id
    }).then(res => {
        caseInfo = res.data
        getCurActive(caseInfo.law_case)
    }).catch(err => { })
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
// let positionList2 = $ref([])
function getAreaMenuList() {
    getAreaSelectorApi().then(res => {
        treeMenu = res.data as any

    }).catch(err => {

    })
}

let positionList = $computed(() => {
    return getAreaOptionsDisableSelect(treeMenu)
})
let positionList2 = $computed(() => {
    if (shelf_id === 0) {
        return []
    }
    return getShlefOptionSelect(treeMenu, shelf_id)
})



function getSampleList() {
    loadingTable = true
    getSampleListApi({
        page_index: page,
        page_size: pageSize,
        shelf_id: shelf_id === 0 ? undefined : shelf_id,
        storage_time_start: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        storage_time_end: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        sampling_time_start: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        sampling_time_end: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        keyword: searchValue,
        is_in_stock: true,
        locations_filter: shelf_id === 0 ? (positionFilter.length === 0 ? undefined : positionFilter) : positionFilter2.length === 0 ? undefined : positionFilter2
    }).then(res => {
        tableData = res.data.list
        total = res.data.total
        loadingTable = false
    }).catch(err => {
        loadingTable = false
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
    getSampleList()
})

</script>
<style scoped>
div.title-card-my :deep(>div.el-card__header) {
    padding: 10px;
}

#layout-main>div:nth-child(2)>div>section>aside>div>div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default>div>ul {
    border-right: 0 !important;
}


.border-right-my-test {
    border-right: 0;
}

.border-right-my-test :deep(li.el-menu-item.is-active) {
    /* background-color: blue !important; */
    background-color: var(--el-menu-hover-bg-color);
    /* 右边框 */
    border-right: 3px solid var(--el-menu-active-color);
}

.border-right-my-test :deep(li.my-main) {
    /* background-color: blue !important; */
    /* 右边框 */
    border-right: 0 !important;
}
</style>