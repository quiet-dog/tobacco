<template>
    <div class="h-full">
        <MyTable>
            <template #header>
                <div class="flex bg-white space-x-5 py-1">
                    <div>
                        <el-button type="primary" @click="goCreatTask('/home/create')">新建案件</el-button>
                    </div>

                    <div>
                    </div>

                    <div class="flex-grow"></div>

                    <div class="flex">

                        <div class="pr-4">
                            <ElInput @change="changeSearchValue" v-model="searchValue" placeholder="可搜索表格内任意信息">
                                <template #append>
                                    <el-button :icon="Search" />
                                </template>
                            </ElInput>
                        </div>

                        <div style="width: 120px">
                            <el-select v-model="timeValue" @change="changeSelect" placeholder="时间筛选条件">
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
                            <el-dropdown  split-button type="primary">
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
            </template>
            <template #table>
                <ElTable @filter-change="fileterChange" ref="tableRef" size="large" max-height="100%" height="100%"
                    @row-click="handleRowDrawer" :data="tableData" :header-cell-style="{ background: '#FAFAFA' }"
                    @selection-change="handleSelectionChange">
                    <el-table-column fixed type="selection" width="55" />
                    <el-table-column prop="report_code" label="报告编号" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.report_code, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="案件名称" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.name, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="seized_site" label="查扣地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.seized_site, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="party" label="当事人" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.party, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" label="案值（元）" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.value, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column :column-key="'reason'" :filters="reasonList" prop="reason" label="查扣原因"
                        show-overflow-tooltip>
                        <template #default="scope">
                            <el-tag v-if="scope.row.reason = '民事案件'" type="primary">{{ scope.row.reason }}</el-tag>
                            <el-tag v-else type="success">{{ scope.row.reason }}</el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column prop="sampling_time" label="抽样时间" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.sampling_time ? formatDate(scope.row.sampling_time) : "-" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sampler" label="抽样人" show-overflow-tooltip />
                    <el-table-column prop="sampling_site" label="抽样地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.sampling_site, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column :column-key="'entrust_unit'" :filters="positionList" prop="entrust_unit" label="委托单位"
                        show-overflow-tooltip />
                    <!-- <el-table-column prop="express_company" :column-key="'express_company_filter'"
                        :filters="expressCompanies" label="快递公司" show-overflow-tooltip />
                    <el-table-column prop="express_number" label="快递单号" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.express_number, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="delivery_location" label="快递地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.delivery_location, searchValue)"></span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column width="70" label="操作" show-overflow-tooltip>
                        <template #default="scope">
                            <ElButton text style="padding: 0px;" type="danger"> 取消</ElButton>
                        </template>
                    </el-table-column> -->
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
        <ElDrawer class="my-drawer" size="50%" v-model="drawer" title="案件概述" @closed="closedDrawer" width="50%">
            <div>
                <el-card shadow="hover" class="title-card-my">
                    <template #header>
                        <div class="flex">
                            <div class="border-solid border-l-4 border-blue-400 pl-4 text-1xl">概述</div>
                            <div class="flex-grow">
                            </div>
                        </div>

                    </template>
                    <div class="flex-col px-5">
                        <div class="grid grid-cols-14 gap-10">
                            <el-descriptions title="" :column="3">
                                <el-descriptions-item label-align="left" label="名称">{{ taskInfo.name
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="报告编号">{{ taskInfo.report_code
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="委托单位">{{ taskInfo.entrust_unit
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="当事人">{{ taskInfo.party
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="抽样人">{{ taskInfo.sampler
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="鉴定人">{{ taskInfo.identifier
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="left" label="抽样时间">{{ taskInfo.sampling_time ?
                                    formatDate(taskInfo.sampling_time) : '-'
                                }}</el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查扣原因">
                                    <el-tag>{{ taskInfo.reason }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label-align="right" label="查扣地点">{{ taskInfo.delivery_location
                                }}</el-descriptions-item>
                            </el-descriptions>
                            <div class="mt-12 ">
                                <el-steps :active="setActive" finish-status="success" align-center>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件建立<br>
                                                {{ taskInfo.created_at ? formatDate(taskInfo.created_at) : "-" }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件鉴定<br>
                                                {{ taskInfo.identify_time ? formatDate2(taskInfo.identify_time) : '-' }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件入库<br>
                                                {{ taskInfo.storage_time ? formatDate2(taskInfo.storage_time) : '-' }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件到期<br>
                                                {{ taskInfo.expire_time ? formatDate2(taskInfo.expire_time) : '-' }}
                                            </div>
                                        </template>
                                    </el-step>
                                    <el-step>
                                        <template #title>
                                            <div class="">
                                                案件出库<br>
                                                {{ taskInfo.archived_time ? formatDate2(taskInfo.archived_time) : '-' }}
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
                                <div class="border-solid border-l-4 border-blue-400 pl-4 text-1xl">样品列表</div>
                                <div class="flex-grow"></div>
                            </div>
                        </template>
                        <div>
                            <div>
                                <el-table :data="tableData2" :default-sort="{ prop: 'date', order: 'descending' }"
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
                                            <el-tag :type="scope.row.is_real ? 'primay' : 'danger'">{{ scope.row.is_real ?
                                                '真烟' : '假烟' }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="law_case.identifier" label="鉴定人" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="identify_time" label="鉴定时间" show-overflow-tooltip>
                                        <template #default="scope">
                                            {{ scope.row.identify_time ? formatDate(scope.row.identify_time) : '-' }}
                                        </template>
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
                        <ElButton style="width: 100%;" type="primary" @click="openDialog">开始鉴定</ElButton>
                    </div>
                    <div class="w-1/2 pl-2">
                        <ElButton style="width: 100%;" type="primary" @click="openDialog">存档照片</ElButton>
                    </div>
                </div>
            </template>
        </ElDrawer>
        <ElDialog v-model="drawer1" title="文件列表" @opened="prewview" @closed="closedDrawer2">
            <ul style="display: none;" id="images">
                <li v-for="item in fileTable">
                    <img v-if="item.mime_type.search('image') !== -1"
                        :src="`http://192.168.0.81:8081/api/admin/file/${item.path}`" alt="" srcset="">
                </li>
            </ul>
            <ElTable :data="fileTable">
                <ElTableColumn prop="name" label="文件名" />
                <ElTableColumn prop="created_at" label="创建时间" />
                <ElTableColumn prop="type" label="鉴定类型" />
                <!--  -->
                <ElTableColumn prop="mime_type" label="文件类型 " />
                <ElTableColumn width="100">
                    <template #default="scope">
                        <!-- <el-link type="primary" target="_blank"
                            :href="`http://192.168.0.81:8081/api/admin/file/${scope.row.path}`">查看</el-link> -->
                        <ElButton v-if="scope.row.mime_type.search('image') !== -1" @click="previewImgs(scope.row.id)">查看
                        </ElButton>
                        <ElButton v-if="scope.row.mime_type.search('video') !== -1" @click="previewTv(scope.row)">查看
                        </ElButton>
                        <ElButton v-if="scope.row.mime_type.search('zip') !== -1 && scope.row.name.search('docx') !== -1"
                            @click="previewDocx(scope.row)">
                            查看
                        </ElButton>
                        <ElButton v-if="scope.row.mime_type.search('pdf') !== -1 && scope.row.name.search('pdf') !== -1"
                            @click="previewPdf(scope.row)">
                            查看
                        </ElButton>
                        <ElButton v-if="scope.row.mime_type.search('zip') !== -1 && scope.row.name.search('xlsx') !== -1"
                            @click="previewXlsx(scope.row)">
                            查看
                        </ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>
            <TvVideo :video="videoObj" v-if="videoPlayer" @close="closeTv" />
            <DocPreview :src="docSrc" v-if="docPreview" @close="closeTv" />
            <PdfPreview :src="pdfSrc" v-if="pdfPreview" @close="closeTv" />
            <XlsxPreview :src="xlsxSrc" v-if="xlsxPreview" @close="closeTv" />
        </ElDialog>
    </div>
</template>
<script setup lang="ts">
import "viewerjs/dist/viewer.css";
import { getCaseListApi, importFileExeclApi } from '@/api/case';
import { getSampleListApi, } from '@/api/sample';
import { formatDate, formatDate2, highText, expressCompanies } from "@/utils"
import { ElMessage } from 'element-plus';
import { getFileListApi } from '@/api/file';
import Viewer from 'viewerjs';
import { Search } from '@element-plus/icons-vue'

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
}

let exportType = $ref(1)
function importFile(val) {
    if (val === 1) {
        exportType = 1
    } else {
        exportType = 2
    }
    exportExecel()
}

const positionList = [
    { text: "秦都区局", value: "秦都区局" },
    { text: "渭城区局", value: "渭城区局" },
    { text: "兴平市局", value: "兴平市局" },
    { text: "泾阳县局", value: "泾阳县局" },
    { text: "武功县局", value: "武功县局" },
    { text: "三原县局", value: "三原县局" },
    { text: "乾县局", value: "乾县局" },
    { text: "礼泉县局", value: "礼泉县局" },
    { text: "淳化县局", value: "淳化县局" },
    { text: "旬邑县局", value: "旬邑县局" },
    { text: "永寿县局", value: "永寿县局" },
    { text: "彬州市局", value: "彬州市局" },
    { text: "长武县局", value: "长武县局" },
];
let entrust_unit = $ref([])
let reason_filter = $ref([])
let express_company_filter = $ref([])
function fileterChange(val) {
    console.log('val', val)
    if (val['entrust_unit']) {
        if (val['entrust_unit'].length > 0) {
            entrust_unit = val['entrust_unit']
        } else {
            entrust_unit = []
        }
    }
    if (val['reason']) {
        if (val['reason'].length > 0) {
            reason_filter = val['reason']
        } else {
            reason_filter = []
        }
    }
    if (val['express_company_filter']) {
        if (val['express_company_filter'].length > 0) {
            express_company_filter = val['express_company_filter']
        } else {
            express_company_filter = []
        }
    }
    getCaseList()
}

let reasonList = [
    { text: '刑事案件', value: '刑事案件' },
    { text: '民事案件', value: '民事案件' },
]

// =================================================

// watch(() => tableData, (val) => {
// val.forEach(item => {
//     const result = multipleIds.findIndex((id) => id === item.id)
//     if (result !== -1) {
//         tableRef.value.toggleRowSelection(tableData[result], true)
//     }
// })
// })

let docSrc = $ref('')
let docPreview = $ref(false)
let pdfPreview = $ref(false)
let videoPlayer = $ref(false)
let xlsxPreview = $ref(false)
let xlsxSrc = $ref('')
let pdfSrc = $ref('')
let videoObj = $ref({
    path: '',
    mime_type: ''
})
function closeTv() {
    videoPlayer = false
    docPreview = false
    pdfPreview = false
    xlsxPreview = false
}

function previewTv(row) {
    videoPlayer = true
    videoObj.path = "http://192.168.0.81:8081/api/admin/file/" + row.path
    videoObj.mime_type = row.mime_type
}

function previewDocx(row) {
    docPreview = true
    docSrc = "http://192.168.0.81:8081/api/admin/file/" + row.path
}

function previewPdf(row) {
    pdfPreview = true
    pdfSrc = "http://192.168.0.81:8081/api/admin/file/" + row.path
}

function previewXlsx(row) {
    xlsxPreview = true
    xlsxSrc = "http://192.168.0.81:8081/api/admin/file/" + row.path
}

let drawer2 = $ref(false)
let gallery = $ref<Viewer>()
let fileIndex = $computed(() => {
    let result = []

    if (fileTable.length === 0) return result
    let index = -1
    for (let i = 0; i < fileTable.length; i++) {
        if (fileTable[i].mime_type.search('image') !== -1) {
            index++
            result.push({
                index: index,
                id: fileTable[i].id
            })
        }
    }
    return result
})

function getImageIndex(id: number) {
    console.log('dassdad', id, fileIndex)
    if (fileIndex.length === 0) return -1
    for (let i = 0; i < fileIndex.length; i++) {
        if (fileIndex[i].id === id) return fileIndex[i].index
    }
}

function previewImgs(id: number) {
    console.log("iddasdasd", id)
    let index = getImageIndex(id)
    if (index === -1) {
        ElMessage.error('该文件不是图片')
        return
    }
    console.log("index.as", index)
    gallery.view(index)
}

function closedDrawer2() {
    gallery.destroy()
}

function prewview() {
    gallery = new Viewer(document.getElementById('images'), {
        inline: false,
        viewed() {
            gallery.zoomTo(1);
        },
        zIndex: 100000,
    });
}


const status = $ref("待入库")
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
    // {
    //     value: '2',
    //     label: '入库时间',
    // }
]
let tableData = $ref([])
let tableData2 = $ref([])
let total1 = $ref(0)
let total2 = $ref(0)
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
    sampling_time: 0,
    delivery_location: ""
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
const handleRowDrawer = (row: any, _column: any, _event: any) => {
    drawer = true
    law_case_id = row.id
    taskInfo = row
    getCurActive(row)
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

let drawer1 = $ref(false)
let fileTable = $ref([])
let fileTotal = $ref(0)
function openDialog() {
    drawer1 = true
    getFileListApi({
        law_case_id,
        page_index: 1,
        page_size: 10
    }).then(res => {
        fileTable = res.data.list
        fileTotal = res.data.total
    })
}

function getCaseList() {
    getCaseListApi({
        page_index: page1,
        page_size: pageSize1,
        storage_time_start: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        storage_time_end: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        sampling_time_start: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        sampling_time_end: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        status,
        entrust_units: entrust_unit,
        reasons: reason_filter,
        express_companies: express_company_filter,
        keyword: searchValue
    }).then(res => {
        total1 = res.data.total
        tableData = res.data.list
        tableData.forEach(item => {
            const result = multipleIds.findIndex((id) => id === item.id)
            if (result !== -1) {
                tableRef.value.toggleRowSelection(tableData[result], true)
            }
        })
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

function exportExecel() {
    importFileExeclApi({
        page_index: page1,
        page_size: pageSize1,
        storage_time_start: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        storage_time_end: timeValue === '2' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        sampling_time_start: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[0],
        sampling_time_end: timeValue === '1' ? undefined : datePickerValue === null ? undefined : datePickerValue[1],
        status,
        entrust_units: entrust_unit,
        reasons: reason_filter,
        express_companies: express_company_filter,
        ids: exportType !== 1 ? [] : multipleIds,
        keyword: searchValue
    }).then(res => {
        // 文件下载
        // let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);
        console.log('res.data', res)
        let blob = new Blob([res]);
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', '案件列表.xlsx')
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link)
    }).catch(err => {
        console.log('123123')

        ElMessage({
            type: 'error',
            message: err.msg
        })
    })
}
function changeSearchValue(val) {
    getCaseList()
}
onMounted(() => {
    // gallery = new Viewer(document.getElementById('images'), {
    //     inline: false,
    //     viewed() {
    //         gallery.zoomTo(1);
    //     },
    //     zIndex: 100000,
    // });
    getCaseList()
})
</script>
<style scoped>
div.title-card-my :deep(>div.el-card__header) {
    padding: 10px;
}
</style>