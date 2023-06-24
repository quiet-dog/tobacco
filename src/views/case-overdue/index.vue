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
                <ElTable v-loading="loadingTable" element-loading-text="正在加载中" empty-text="暂无案件"
                    @filter-change="fileterChange" @selection-change="handleSelectionChange" size="large" max-height="100%"
                    height="100%" @row-click="handleRowDrawer" :data="tableData"
                    :header-cell-style="{ background: '#FAFAFA' }">
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
                            <span v-html="highText(scope.row.reason, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="storage_time" label="入库时间" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.storage_time ? formatDate(scope.row.storage_time) : "-" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="expire_time" label="超期时长" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.expire_time ? getExpireTime(scope.row.storage_time) : "-" }}</span>
                        </template>
                    </el-table-column>
                    <ElTableColumn prop="stocker.username" label="入库人" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.stocker.username, searchValue)"></span>
                        </template>
                    </ElTableColumn>
                    <el-table-column prop="sampling_site" label="抽样地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.sampling_site, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column :column-key="'entrust_unit'" :filters="positionList" width="120" prop="entrust_unit"
                        label="委托单位" show-overflow-tooltip />
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
                    <!-- <el-table-column width="150">
                        <template #default="scope">
                            <ElButton text style="padding: 0px;" type="danger"> 取消</ElButton>
                        </template>
                    </el-table-column> -->
                </ElTable>
            </template>
            <template #page>
                <div class="pt-1/2 text-gray-400">共{{ total1 }}件</div>
                <div class="flex-grow"></div>
                <div>
                    <el-pagination v-model:currentPage="page1" @current-change="handlePage1" @size-change="handeleSize1"
                        v-model:page-size="pageSize1" large layout="sizes,prev, pager, next" :total="total1" />
                </div>
            </template>
        </MyTable>
        <ElDrawer class="my-drawer" size="50%" v-model="drawer" title="案件概述" @closed="closedDrawer" width="50%">
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
                                <div class="border-l-4 border-blue-400 pl-2 text-2xl">样品列表</div>
                                <div class="flex-grow"></div>
                            </div>
                        </template>
                        <div>
                            <div style="height: 450px;">
                                <el-table max-height="100%" height="100%" :data="tableData2"
                                    :default-sort="{ prop: 'date', order: 'descending' }"
                                    :header-cell-style="{ background: '#FAFAFA' }" width="100%">
                                    <el-table-column prop="code" label="编号" show-overflow-tooltip></el-table-column>

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
                                    <el-table-column prop="location" label="存放位置" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="storage_time" label="入库时间" show-overflow-tooltip>
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
                        <ElButton style="width: 100%;" :disabled="btnDisabled" type="primary" @click="endCase">立即结束案件!
                        </ElButton>
                    </div>
                    <div class="w-1/2 pl-2">
                        <ElButton style="width: 100%;" type="primary">案件时间线</ElButton>
                    </div>
                </div>
            </template>
        </ElDrawer>




        <ElDialog v-model="drawer2" :align-center="true" title="结束案件" width="30%" @closed="closedDrawer3">
            <div id="inner-drawer" style="width: 100%;">
                <div class="h-full flex-col flex">
                    <div style="height: calc(100% - 80px);" class="mt-8">
                        <el-row>
                            <el-col :span="24">


                                <ElForm ref="saveFormRef" class="px-12" :model="saveCaseForm" label-width="100">
                                    <ElFormItem
                                        :rules="[{ required: true, message: '请填写归档原因', trigger: ['blur', 'change'], },]"
                                        prop="out_stock_reason" label="归档原因">
                                        <ElInput v-model="saveCaseForm.out_stock_reason" />
                                    </ElFormItem>
                                    <ElFormItem
                                        :rules="[{ required: true, message: '请填写归档人', trigger: ['blur', 'change'], },]"
                                        prop="archiver" label="归档人">
                                        <ElInput v-model="saveCaseForm.archiver" />
                                    </ElFormItem>

                                    <el-form-item label="归档文件">
                                        <div id="upload-file">
                                            <el-upload v-model:file-list="fileList" :on-change="fileChange" :headers="{
                                                'Authorization': 'Bearer ' + '12345678abc'
                                            }" ref="upload" style="height: 100%;" class="upload-demo"
                                                :action="`${baseUrl}/api/admin/law_case/identify`" multiple
                                                :auto-upload="false" :data="{
                                                    'law_case_id': law_case_id,
                                                    'out_stock_reason': saveCaseForm.out_stock_reason
                                                }">
                                                <el-button type="primary">上传文件</el-button>

                                            </el-upload>
                                        </div>
                                    </el-form-item>

                                </ElForm>
                            </el-col>

                        </el-row>

                    </div>
                    <div style="height: 80px;" class="flex  pt-12">
                        <div class="flex-grow">

                        </div>
                        <div class="ml-2">
                            <ElButton type="primary" @click="submitSavaCase">完成</ElButton>
                        </div>
                    </div>
                </div>
            </div>
        </ElDialog>
    </div>
</template>
<script setup lang="ts">
import { getCaseListApi, importFileExeclApi, endCaseApi, getCaseOutDetailApi } from '@/api/case';
import { getSampleListApi, } from '@/api/sample';
import { formatDate, getExpireTime, formatDate2, highText, expressCompanies, baseUrl } from "@/utils"
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
const emit = defineEmits(["update"])
let loadingTable = $ref(false)

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


// ================================================

const status = $ref("超期案件")
const router = useRouter()
function goCreatTask(path: string) {
    router.push(path)
}
let searchValue = $ref('')
let timeValue = $ref('2')
let timeOption = [
    {
        value: '2',
        label: '抽样时间',
    },
    {
        value: '1',
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
    getCaseOutDetailApi({
        law_case_id
    }).then(res => {
        if (res.data.not_out_storage_quantity === 0) {
            btnDisabled = false

        }
    })
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
    loadingTable = true
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
        loadingTable = false
    }).catch(err => {
        loadingTable = false
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



let saveCaseForm = $ref({
    out_stock_reason: '',
    archiver: '',
    files: [],
})
let fileList = $ref([])
function submitSavaCase() {
    saveFormRef.value.validate((valid) => {
        if (valid) {
            const loadingInstance = ElLoading.service({
                lock: true,
                text: '文件正在上传中....请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            const formData = new FormData()
            saveCaseForm.files.forEach(item => {
                formData.append('files', item.raw)
            })
            formData.append('out_stock_reason', saveCaseForm.out_stock_reason)
            formData.append('archiver', saveCaseForm.archiver)
            formData.append('law_case_id', String(law_case_id))
            endCaseApi(formData).then(res => {
                loadingInstance.close()
                ElMessage({
                    type: 'success',
                    message: res.msg
                })
                getCaseList()
                drawer2 = false
                emit('update')
            }).catch(err => {
                loadingInstance.close()
                ElMessage({
                    type: 'error',
                    message: err.msg
                })
            }).catch(err => {

            })
        } else { }
    })
}
const saveFormRef = ref()
let drawer2 = $ref(false)
const fileChange = (uploadFile, uploadFiles) => {
    // fileList = fileList.slice(-3)
    // console.log(uploadFile, uploadFiles)
    // fileList = uploadFiles
    console.log("uploadFiles", uploadFiles)
    uploadFiles.forEach(item => {
        item.name = "归档文件" + "-" + item.name
    })
    saveCaseForm.files = uploadFiles
}
function closedDrawer3() {
    saveCaseForm = {
        out_stock_reason: '',
        archiver: '',
        files: []
    }
    saveFormRef.value.resetFields()
}

function endCase() {
    drawer2 = true
}

let btnDisabled = $ref(true)
onMounted(() => {
    getCaseList()
})
</script>

<style scoped>
div.title-card-my :deep(>div.el-card__header) {
    padding: 10px;
}
</style>