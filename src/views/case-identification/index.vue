<template>
    <div class="h-full">
        <!-- header -->
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
                            <ElInput @input="changeSearchValue" v-model="searchValue" placeholder="可搜索表格内任意信息">
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
                            <el-dropdown split-button type="primary">
                                <span @click="importFile(1)">导出所选</span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="importFile(2)">导出全部</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
            </template>
            <template #table>
                <ElTable v-loading="loadingTable" element-loading-text="正在加载中" empty-text="暂无案件"
                    @filter-change="fileterChange" @selection-change="handleSelectionChange" size="large" max-height="100%"
                    style="width: 100%" height="100%" @row-click="handleRowDrawer" :data="tableData"
                    :header-cell-style="{ background: '#FAFAFA' }">
                    <el-table-column fixed type="selection" width="55" />
                    <el-table-column fixed width="100" prop="id" label="流水号" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.id, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed width="200" prop="name" label="案件名称" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.name, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" prop="seized_site" label="查扣地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.seized_site, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="party" label="当事人" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.party, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" width="120" label="案值（元）" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.value, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column :column-key="'reason'" width="150" :filters="reasonList" prop="reason" label="查扣原因"
                        show-overflow-tooltip>
                        <template #default="scope">
                            <el-tag v-if="scope.row.reason === '民事案件'" type="primary">{{ scope.row.reason }}</el-tag>
                            <el-tag v-else>{{ scope.row.reason }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" prop="sampling_time" label="抽样时间" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.sampling_time ? formatDate(scope.row.sampling_time) : "-" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sampler" label="抽样人" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.sampler, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" prop="sampling_site" label="抽样地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-html="highText(scope.row.sampling_site, searchValue)"></span>
                        </template>
                    </el-table-column>
                    <el-table-column :column-key="'entrust_unit'" width="120" :filters="positionList" prop="entrust_unit"
                        label="委托单位" show-overflow-tooltip />
                    <el-table-column prop="express_company" width="120" :column-key="'express_company_filter'"
                        :filters="expressCompanies" label="快递公司" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.express_company.length > 0 ? scope.row.express_company : "-" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" prop="express_number" label="快递单号" show-overflow-tooltip>
                        <template #default="scope">
                            <span
                                v-html="scope.row.express_number.length > 0 ? highText(scope.row.express_number, searchValue) : '-'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" prop="delivery_location" label="发货地点" show-overflow-tooltip>
                        <template #default="scope">
                            <span
                                v-html="scope.row.delivery_location.length > 0 ? highText(scope.row.delivery_location, searchValue) : '-'"></span>
                        </template>
                    </el-table-column>
                    <el-table-column width="70" label="操作" show-overflow-tooltip>
                        <template #default="scope">
                            <ElButton text style="padding: 0px;" type="danger" @click="deleteCase(scope.row.id)"> 取消
                            </ElButton>
                        </template>
                    </el-table-column>
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
        <ElDrawer size="30%" class="my-drawer" v-model="drawer" title="案件概述" @closed="closedDrawer">
            <div>
                <el-card shadow="hover" class="title-card-my">
                    <template #header>
                        <div class="flex">
                            <div class="border-solid border-l-4 border-blue-400 pl-4 text-1xl">概述</div>
                            <div class="flex-grow">
                            </div>
                        </div>

                    </template>
                    <div class="flex-col">
                        <div class="grid grid-cols-14">
                            <div class="ml-1 pl-4">
                                <el-descriptions title="" :column="2">
                                    <el-descriptions-item label-align="left" label="名称:">{{ taskInfo.name
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label-align="right" label="委托单位:">{{ taskInfo.entrust_unit
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label-align="left" label="当事人:">{{ taskInfo.party
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label-align="right" label="查扣原因:">
                                        <el-tag>{{ taskInfo.reason }}</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item label-align="left" label="抽样时间:">{{
                                        formatDate(taskInfo.sampling_time)
                                    }}</el-descriptions-item>
                                    <el-descriptions-item label-align="right" label="查扣地点:">{{ taskInfo.seized_site
                                    }}</el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <div class="mt-12">
                                <el-steps class="my-step" :active="setActive" finish-status="success" align-center>
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
                                <div class="border-solid border-l-4 border-blue-400 pl-4 text-1xl">待检列表</div>
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
                                    <el-table-column width="80" prop="packing_spec" label="包装形式" show-overflow-tooltip>
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
                <ElButton style="width: 100%;height: 34px;" type="primary" @click="openDialog">开始鉴定</ElButton>
            </template>
        </ElDrawer>

        <!-- jian ding -->
        <ElDialog v-model="drawer1" title="鉴定案件" id="drawer-drawer" @closed="closedDrawer1">
            <!-- one -->
            <div id="inner-drawer" style="width: 100%;height: 600px;">
                <div v-if="targetDialog === 1" class="w-full h-full">
                    <ScannerGun @change="getScannerCode" />
                    <div class="flex">
                        <div class="flex-grow">
                        </div>
                        <div>
                            <ElButton @click="openProgress">鉴定进度({{ identified_quantity }}/{{ total2 }})</ElButton>
                        </div>
                    </div>
                    <div style="height: 450px;" v-if="scannerTable1.length > 0" class="px-36 pt-10">
                        <h1 class="text-2xl">请判断</h1>
                        <div style="height: 250px;" class="mt-2">
                            <ElTable height="100%" :header-cell-style="{ background: '#FAFAFA' }" :data="scannerTable1">
                                <ElTableColumn prop="code" label="编号">
                                </ElTableColumn>
                                <ElTableColumn prop="name" label="样品名称">
                                </ElTableColumn>
                                <ElTableColumn prop="manufacturer" label="厂商">
                                </ElTableColumn>
                                <ElTableColumn prop="packing_spec" label="包装形式">
                                </ElTableColumn>
                            </ElTable>
                        </div>
                        <div class="flex px-36  pt-12">
                            <div class="flex-grow">
                            </div>
                            <div class="pr-12">
                                <ElButton type="primary" @click="setIsSample(scannerTable1[0].id, true)">正品</ElButton>
                            </div>
                            <div>
                                <ElButton type="danger" @click="setIsSample(scannerTable1[0].id, false)">赝品</ElButton>
                            </div>
                            <div class="flex-grow">
                            </div>
                        </div>
                    </div>
                    <div style="height: 450px;" v-else>
                        <div style="height: 500px;" class="flex">
                            <div class="flex-grow">
                            </div>
                            <div>
                                <img :src="EmptySvg" width="400" alt="" srcset="" />
                                <div class="flex">
                                    <div class="flex-grow"></div>
                                    <h1 style="font-size: 16px;">请扫描二维码</h1>
                                    <div class="flex-grow"></div>
                                </div>
                            </div>

                            <div class="flex-grow">
                            </div>
                        </div>
                    </div>
                    <div class="flex mt-9 pt-12">
                        <div class="flex-grow">
                        </div>
                        <div>
                            <ElButton type="primary" @click="goNext(2)">下一步</ElButton>
                        </div>
                    </div>
                </div>

                <!-- two -->
                <div v-if="targetDialog === 2" class="w-full h-full">
                    <div>
                        <el-tabs v-model="tabsValue" @tab-change="changeTabs">
                            <el-tab-pane name="0" :label="`正品&nbsp;${real_quantity}`"></el-tab-pane>
                            <el-tab-pane name="1" :label="`赝品&nbsp;${fake_quantity}`"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div style="height: 450px;">
                        <ElTable :header-cell-style="{ background: '#FAFAFA' }" height="100%" :data="scannerTableT_table">
                            <ElTableColumn prop="code" label="编号"></ElTableColumn>
                            <ElTableColumn prop="name" label="样品名称"></ElTableColumn>
                            <ElTableColumn prop="manufacturer" label="厂商"></ElTableColumn>
                            <ElTableColumn prop="packing_spec" align="center" label="包装形式"></ElTableColumn>
                            <ElTableColumn prop="is_real" label="鉴定结果">
                                <template #default="scope">
                                    <el-tag v-if="scope.row.is_real" type="success">正品</el-tag>
                                    <el-tag v-else type="danger">赝品</el-tag>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="operator.username" label="鉴定人"></ElTableColumn>
                            <ElTableColumn width="150" prop="identify_time" label="鉴定时间">
                                <template #default="scope">
                                    {{ scope.row.identify_time ? formatDate(scope.row.identify_time) : '-' }}
                                </template>
                            </ElTableColumn>
                            <!-- <ElTableColumn label="操作"></ElTableColumn> -->
                        </ElTable>
                    </div>
                    <div class="flex mt-3">
                        <div class="pt-2">
                            共{{ total3 }}条
                        </div>
                        <div class="flex-grow">
                        </div>
                        <div>
                            <el-pagination v-model:currentPage="page3" v-model:page-size="pageSize3" large
                                layout="prev, pager, next" @current-change="handlePage3" @size-change="handeleSize3"
                                :total="total3" />
                        </div>
                    </div>
                    <div class="flex mt-4">
                        <div class="flex-grow">

                        </div>
                        <div>
                            <ElButton @click="targetDialog = 1">上一步</ElButton>
                        </div>
                        <div class="ml-5">
                            <ElButton type="primary" @click="goNext(3)">下一步</ElButton>
                        </div>
                    </div>
                </div>

                <!-- three -->
                <div v-if="targetDialog === 3" class="h-full flex-col flex">
                    <div style="height: calc(100% - 80px);" class="mt-8">
                        <el-row>
                            <el-col :span="24">



                                <ElForm ref="saveFormRef" :model="saveCaseForm" label-width="100" style="width: 50%;">
                                    <ElFormItem
                                        :rules="[{ required: true, message: '请填写报告编号', trigger: ['blur', 'change'], },]"
                                        prop="report_code" label="报告编号">
                                        <ElInput v-model="saveCaseForm.report_code" />
                                    </ElFormItem>
                                    <ElFormItem
                                        :rules="[{ required: true, message: '请填写鉴定人', trigger: ['blur', 'change'], },]"
                                        prop="identifier" label="鉴定人">
                                        <ElInput v-model="saveCaseForm.identifier" />
                                    </ElFormItem>
                                    <el-form-item label="案件头图"
                                        :rules="[{ message: '请上传案件头图', required: true, trigger: ['blur', 'change'], }]">
                                        <div id="upload-file">
                                            <!-- :on-exceed="handleExceed"  beforeAvatarUpload-->
                                            <!-- :before-upload="beforeAvatarUpload"  :on-exceed="handleExceed" :before-upload="beforeAvatarUpload"-->
                                            <el-upload accept=".jpeg,.png,.jpg,.bmp,.gif" :on-remove="handleRemove"
                                                :before-upload="beforeAvatarUpload" :on-exceed="handleExceed"
                                                :on-change="imgFileChange" ref="uploadRef2" style="height: 100%;"
                                                class="upload-demo" :action="`${baseUrl}/api/admin/law_case/identify`"
                                                :limit="1" :auto-upload="false">
                                                <template #trigger>
                                                    <el-button type="primary">上传头图</el-button>
                                                </template>
                                            </el-upload>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="鉴定文件">
                                        <div id="upload-file">
                                            <el-upload v-model:file-list="fileList" :on-change="fileChange" :headers="{
                                                'Authorization': 'Bearer ' + '12345678abc'
                                            }" ref="upload" style="height: 100%;" class="upload-demo"
                                                :action="`${baseUrl}/api/admin/law_case/identify`" multiple
                                                :auto-upload="false" :data="{
                                                    'law_case_id': law_case_id,
                                                    'remark': saveCaseForm.remark,
                                                    'report_code': saveCaseForm.report_code
                                                }">
                                                <el-button type="primary">上传文件</el-button>

                                            </el-upload>
                                        </div>
                                    </el-form-item>
                                    <ElFormItem prop="remark" label="备注">
                                        <ElInput v-model="saveCaseForm.remark" />
                                    </ElFormItem>

                                </ElForm>
                            </el-col>

                        </el-row>

                    </div>
                    <div style="height: 80px;" v-if="targetDialog === 3" class="flex mt-12 pt-12">
                        <div class="flex-grow">

                        </div>
                        <div class="mr-2">
                            <ElButton @click="targetDialog = 2">上一步</ElButton>
                        </div>
                        <div class="ml-2">
                            <ElButton type="primary" @click="submitSavaCase">完成</ElButton>
                        </div>
                    </div>
                </div>

            </div>

            <ElDialog class="my-dialog-2" v-model="drawer2" title="鉴定进度" @closed="closedDialog2">
                <div>
                    <div class="flex">
                        <div :style="{ width: tabsValue4 === '2' ? 'calc(100% - 190px)' : '100%' }">
                            <el-tabs v-model="tabsValue4" @tab-change="changeTabs4">
                                <el-tab-pane name="0" :label="`正品&nbsp;${real_quantity}`"></el-tab-pane>
                                <el-tab-pane name="1" :label="`赝品&nbsp;${fake_quantity}`"></el-tab-pane>
                                <el-tab-pane name="2" :label="`未鉴定&nbsp;${unidentified_quantity}`"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="flex-grow"></div>
                        <div style="width: 190px;height: 34px;margin-top: 8px;" v-if="tabsValue4 === '2'">
                            <ElButton type="primary" @click="setAllCaseStatus(true)" :loading="loading2">均为正品</ElButton>
                            <ElButton type="danger" @click="setAllCaseStatus(false)">均为赝品</ElButton>
                        </div>
                    </div>
                    <div>
                        <ElTable :header-cell-style="{ background: '#FAFAFA' }" :data="statusTableData" height="100%">
                            <ElTableColumn prop="name" label="编号"></ElTableColumn>
                            <ElTableColumn prop="manufacturer" label="厂商"></ElTableColumn>
                            <ElTableColumn prop="packing_spec" label="包装形式"></ElTableColumn>
                            <ElTableColumn label="鉴定结果">
                                <template #default="scope">
                                    <el-tag v-if="scope.row.is_real" type="success">正品</el-tag>
                                    <el-tag v-else type="danger">赝品</el-tag>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="operator.username" label="鉴定人"></ElTableColumn>
                            <ElTableColumn label="鉴定时间">
                                <template #default="scope">
                                    {{ scope.row.identify_time ? formatDate(scope.row.identify_time) : '-' }}
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div class="flex py-3">
                        <div class="pt-1">
                            共{{ total4 }}条
                        </div>
                        <div class="flex-grow">
                        </div>
                        <div>
                            <el-pagination v-model:currentPage="page4" @current-change="handlePage4"
                                @size-change="handeleSize4" v-model:page-size="pageSize4" large layout="prev, pager, next"
                                :total="total4" />
                        </div>
                    </div>
                </div>
            </ElDialog>
        </ElDialog>
    </div>
</template>
<script lang="ts" setup>
import { getCaseApi, getCaseListApi, saveCaseApi, importFileExeclApi, cancelCaseApi } from '@/api/case';
import { getSampleListApi, getSampleByCodeApi, sampleIdentifyApi, setSampleStatusApi, getSampleResultApi } from '@/api/sample';
import { formatDate, formatDate2, highText, expressCompanies, baseUrl } from "@/utils"
import { ElMessage, genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import EmptySvg from '@/assets/empty.svg'
import { ElLoading, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const emit = defineEmits(['update'])

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
    // exportExecel()
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



// =====================================================


const saveFormRef = ref()

const imageUrl = ref('')
const beforeAvatarUpload = (rawFile) => {
    console.log('rawFilesss', rawFile)
    const fileName = rawFile.name
    const fileType = fileName.substring(fileName.lastIndexOf('.'))
    if (
        fileType === '.jpg' ||
        fileType === '.png' ||
        fileType === '.jpeg' ||
        fileType === '.bmp' ||
        fileType === '.gif'
    ) {
        return false
    }
    console.log('rawFile', rawFile)
    rawFile.name = "案件头图-" + rawFile.name
    rawFile.name.raw = "案件头图-" + rawFile.name.raw
    imageUrl.value = URL.createObjectURL(rawFile)
    return true
}
const status = $ref("待鉴定")
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
let drawer1 = $ref(false)
let upload = $ref()
let fileList = $ref([])
let fileList1 = $ref()
const uploadRef2 = ref()
const handleExceed = (files) => {
    uploadRef2.value!.clearFiles()
    const filea = files[0]
    filea.uid = genFileId()
    uploadRef2.value!.handleStart(filea)
}
const handleRemove = (uploadFile, uploadFiles) => {
    uploadRef2.value!.clearFiles()
    saveCaseForm.imgFile = null
}
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
    console.log('roqwww', row)

    // getCaseApi(law_case_id).then(res => {
    //     identified_quantity = res.data.identify_result.identified_quantity
    //     unidentified_quantity = res.data.identify_result.unidentified_quantity
    //     fake_quantity = res.data.identify_result.fake_quantity
    //     real_quantity = res.data.identify_result.real_quantity
    // })
    getSampleResultApi({
        law_case_id
    }).then(resa => {
        identified_quantity = resa.data.identified_quantity
        unidentified_quantity = resa.data.unidentified_quantity
        fake_quantity = resa.data.fake_quantity
        real_quantity = resa.data.real_quantity
    })

    getSampleList()
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

function closedDialog2() {
    tabsValue4 = '0'
    page4 = 1
    pageSize4 = 5
    total4 = 0
    statusTableData = []
    loading2 = false
}

function openDialog() {
    drawer1 = true
}


let page3 = $ref(1)
let pageSize3 = $ref(7)
let total3 = $ref(0)
let page4 = $ref(1)
let pageSize4 = $ref(5)
let total4 = $ref(0)
let targetDialog = $ref(1)
function handlePage3(val) {
    getCheckSampleLisk()
}

function handeleSize3(val) {
    getCheckSampleLisk()
}

function changeTabs(val) {
    console.log(val)
    getCheckSampleLisk()
}

function goNext(val) {
    if (identified_quantity < total2) {
        ElMessage({
            type: 'error',
            message: '请先鉴定完所有样本'
        })
        return
    }
    targetDialog = val
    getCheckSampleLisk()
}

let scannerTable1 = $ref([])
let progress = $ref(0)
let drawer2 = $ref(false)
let tabsValue = $ref('0')

let scannerTableT_table = $ref([])
const route = useRoute()
function getScannerCode(val) {
    // console.log(val)
    if (route.path.search("indenti") !== -1) return
    const parts = val.split("/")
    console.log('law_case_id', val)
    if (parts.length >= 5) {
        const content = parts[4];
        getSampleByCodeApi({
            code: content,
            law_case_id
        }).then(res => {
            // scannerTable1.push(res.data)
            scannerTable1 = res.data
            ElMessage({
                type: 'success',
                message: '扫码成功'
            })
        }).catch(err => {
            ElMessage({
                type: 'error',
                message: err.msg
            })
        })
    }

}

function falseScanner() {
    if (scannerTable1.length === 0) {
        scannerTable1.push({
            name: '22'
        })
        return
    }
}

function openProgress() {
    drawer2 = true
    getStatusSampleList()
}

let identified_quantity = $ref(0)
let real_quantity = $ref(0)
let fake_quantity = $ref(0)
let unidentified_quantity = $ref(0)
let saveCaseForm = $ref({
    remark: '',
    report_code: '',
    identifier: '',
    files: [],
    imgFile: null,
})
function setIsSample(id: any, val: boolean) {
    sampleIdentifyApi({
        id,
        is_real: val
    }).then(res => {
        scannerTable1 = []

        getSampleResultApi({
            law_case_id
        }).then(resa => {

            identified_quantity = resa.data.identified_quantity
            unidentified_quantity = resa.data.unidentified_quantity
            fake_quantity = resa.data.fake_quantity
            real_quantity = resa.data.real_quantity
        })

        ElMessage({
            type: 'success',
            message: res.msg
        })
    }).catch(err => {
        ElMessage({
            type: 'error',
            message: err.msg
        })
    })
}

function closedDrawer1() {
    page3 = 1
    pageSize3 = 7
    total3 = 0
    tabsValue = '0'
    progress = 0
    scannerTable1 = []
    scannerTableT_table = []
    targetDialog = 1
    // isCheck = 0
    // real_quantity = 0
    // fake_quantity = 0
    // unidentified_quantity = 0
    saveCaseForm.remark = ''
    saveCaseForm.report_code = ''
    saveCaseForm.identifier = ''
    saveCaseForm.imgFile = []
    saveCaseForm.files = []
}

let files = $ref([])
let imgFile = $ref()
const fileChange = (uploadFile, uploadFiles) => {
    // fileList = fileList.slice(-3)
    // console.log(uploadFile, uploadFiles)
    // fileList = uploadFiles
    console.log("uploadFiles", uploadFiles)
    uploadFiles.forEach(item => {
        item.name = "鉴定文件" + "-" + item.name
    })
    saveCaseForm.files = uploadFiles
}

const imgFileChange = (uploadFile, uploadFiles) => {

    // 创建文件
    uploadFile.name = "案件头图-" + uploadFile.name
    const file = new File([uploadFile.raw], uploadFile.name, { type: uploadFile.raw.type })
    saveCaseForm.imgFile = file
}


function submitSavaCase() {
    // upload.submit()
    console.log('imgFileimgFile', imgFile)
    if (saveCaseForm.imgFile === undefined || saveCaseForm.imgFile === null) {
        ElMessage({
            type: 'error',
            message: '请上传封面'
        })
        return
    }
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
            formData.append('cover_file', saveCaseForm.imgFile)
            formData.append('law_case_id', String(law_case_id))
            formData.append('remark', saveCaseForm.remark)
            formData.append('report_code', saveCaseForm.report_code)
            formData.append('identifier', saveCaseForm.identifier)
            saveCaseApi(formData).then(res => {
                ElMessage({
                    type: 'success',
                    message: res.msg
                })
                getCaseList()
                loadingInstance.close()
                drawer1 = false

                emit("update")
            }).catch(err => {
                ElMessage({
                    type: 'error',
                    message: err.msg
                })
                loadingInstance.close()
            })
        } else {
            ElMessage({
                type: 'error',
                message: '请填写完整信息'
            })
        }
    })

}


function handlePage4(val) {
    getStatusSampleList()
}

function handeleSize4(val) {
    getStatusSampleList()
}

let loading2 = $ref(false)
let loading3 = $ref(false)
function setAllCaseStatus(val: boolean) {
    if (val) {
        loading2 = true
    } else {
        loading3 = false
    }
    setSampleStatusApi({
        law_case_id,
        is_real: val
    }).then(res => {
        getSampleResultApi({
            law_case_id
        }).then(resa => {
            identified_quantity = resa.data.identified_quantity
            unidentified_quantity = resa.data.unidentified_quantity
            fake_quantity = resa.data.fake_quantity
            real_quantity = resa.data.real_quantity
        })
        getStatusSampleList()
        ElMessage({
            type: 'success',
            message: res.msg
        })
        loading2 = false
        loading3 = false
    }).catch(err => {
        ElMessage({
            type: 'error',
            message: err.msg
        })
        loading2 = false
        loading3 = false
    })
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
        loadingTable = false
        total1 = res.data.total
        tableData = res.data.list
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

let statusTableData = $ref([])
let tabsValue4 = $ref("0")
function changeTabs4(val) {
    getStatusSampleList()
}

function getStatusSampleList() {
    getSampleListApi({
        page_index: page4,
        page_size: pageSize4,
        law_case_id: law_case_id === 0 ? undefined : law_case_id,
        is_real: tabsValue4 === '0' ? true : false
    }).then(res => {
        total4 = res.data.total
        statusTableData = res.data.list
    })
}

function getCheckSampleLisk() {
    getSampleListApi({
        page_index: page3,
        page_size: pageSize3,
        law_case_id: law_case_id === 0 ? undefined : law_case_id,
        is_real: tabsValue === '0' ? true : false
    }).then(res => {
        // total2 = res.data.total
        // tableData2 = res.data.list
        scannerTableT_table = res.data.list
        total3 = res.data.total
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


function deleteCase(id) {
    ElMessageBox.confirm(
        '确定要取消该案件吗?',
        '提醒',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            cancelCaseApi({
                id: id
            }).then(res => {
                ElMessage({
                    type: 'success',
                    message: res.msg,
                })
                getCaseList()
            }).catch(err => {
                ElMessage({
                    type: 'error',
                    message: err.msg,
                })
            })

        })
        .catch(() => {
        })
}

function changeSearchValue(val) {
    getCaseList()
}
onMounted(() => {
    getCaseList()
})
</script>
<style scoped>
div.title-card-my :deep(>div.el-card__header) {
    padding: 10px;
}

#upload-file>div>div.el-upload.el-upload--text.is-drag>div {
    height: 300px;
}
</style>
<style>
#drawer-drawer>div>div:nth-child(2)>div>div>div {
    padding-bottom: 0;
    padding-top: 0;
}

#drawer-drawer>div {
    padding-top: 0 !important;
}

/* #drawer-drawer>div.el-dialog__body {
    padding: 0 0;
} */
</style>