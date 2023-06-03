<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="200px">
                <el-menu>
                    <ElMenuItem>测试</ElMenuItem>
                </el-menu>
            </el-aside>
            <el-main class="h-full">
                <div style="height: 120px;">
                    <div>
                        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                            <el-tab-pane label="库区管理" name="first">
                                <ElButton @click="openAreaDialog">新建</ElButton>
                            </el-tab-pane>
                            <el-tab-pane label="架体管理" name="second">
                                <ElButton @click="openSheveDialog">新建</ElButton>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div v-if="activeName === 'first'" style="height: calc(100% - 120px);">
                    <div style="height: calc(100% - 60px);">
                        <ElTable max-height="100%" :data="tableData" :header-cell-style="{ background: '#FAFAFA' }"
                            @row-click="handleRowAreaDrawer">
                            <ElTableColumn prop="name" label="库区名称"></ElTableColumn>
                            <ElTableColumn prop="code" label="库区编号"></ElTableColumn>
                            <ElTableColumn prop="info" label="备注"></ElTableColumn>
                            <ElTableColumn label="操作">
                                <template #default="scope">
                                    <ElButton text @click="openAreaDialog">编辑</ElButton>
                                    <ElButton text @click="deleteArea(scope.row.id)">删除</ElButton>
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

                <div v-else style="height: calc(100% - 120px);">
                    <div style="height: calc(100% - 60px);">
                        <ElTable max-height="100%" :data="tableShelf" :header-cell-style="{ background: '#FAFAFA' }">
                            <ElTableColumn prop="code" label="列号"></ElTableColumn>
                            <ElTableColumn prop="name" label="架体名称"></ElTableColumn>
                            <ElTableColumn prop="area.name" label="所在库区"></ElTableColumn>
                            <ElTableColumn prop="max_column" label="节数"></ElTableColumn>
                            <ElTableColumn prop="max_row" label="层数"></ElTableColumn>
                            <ElTableColumn prop="type" label="架体类型">
                                <template #default="scope">
                                    <div>{{ scope.row.type === 'mobile' ? '移动列' : '固定列' }}</div>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="info" label="备注"></ElTableColumn>
                            <ElTableColumn label="操作">
                                <template #default="scope">
                                    <ElButton text @click="editShelf(scope.row)">编辑</ElButton>
                                    <ElButton text @click="deleteShelf(scope.row.id)">删除</ElButton>
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div style="height: 60px;" class="flex">
                        <div class="pt-1/2">总共{{ totalShelf }}</div>
                        <div class="flex-grow"></div>
                        <div>
                            <el-pagination v-model:currentPage="page_index" @current-change="handelePageShelf"
                                @size-change="handeleSizeShelf" v-model:page-size="page_size" large
                                layout="prev, pager, next" :total="totalShelf" />
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>

        <ElDialog v-model="dialogArea" title="新增库区" width="500" @closed="cancelArea">
            <ElForm :model="areaForm" label-width="100px">
                <ElFormItem prop="name" label="库区名称">
                    <ElInput v-model="areaForm.name" />
                </ElFormItem>
                <ElFormItem prop="info" label="备注">
                    <ElInput v-model="areaForm.info" />
                </ElFormItem>
                <ElFormItem prop="code" label="编号">
                    <ElInput v-model="areaForm.code" />
                </ElFormItem>
            </ElForm>
            <template #footer>
                <div class="flex">
                    <div class="flex-grow"></div>
                    <div class="flex">
                        <div class="pr-5">
                            <ElButton @click="cancelArea">取消</ElButton>
                        </div>
                        <div>
                            <ElButton @click="submitArea">确定</ElButton>
                        </div>
                    </div>
                </div>
            </template>
        </ElDialog>

        <ElDialog v-model="dialogSheve" title="新增架提" width="500" @closed="cancelShelves">
            <ElForm>
                <ElFormItem label="架体名称">
                    <ElInput v-model="shelfForm.name" />
                </ElFormItem>
                <ElFormItem label="架提编号">
                    <ElInput v-model="shelfForm.code" />
                </ElFormItem>
                <ElFormItem label="架提位置">
                    <ElSelect v-model="shelfForm.area_id" :key="shelfSelectRefresh">
                        <ElOption v-for="item in areaShelvesOptions" :key="item" :label="item.name" :value="item.id" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="架提节数">
                    <el-input-number v-model="shelfForm.max_column" :min="1" :max="10" />
                </ElFormItem>
                <ElFormItem label="架提层数">
                    <el-input-number v-model="shelfForm.max_row" :min="1" :max="10" />
                </ElFormItem>
                <ElFormItem prop="type" label="架提类型">
                    <el-radio-group v-model="shelfForm.type" class="ml-4">
                        <el-radio label="mobile" size="large">移动列</el-radio>
                        <el-radio label="fixed" size="large">固定列</el-radio>
                    </el-radio-group>
                </ElFormItem>
                <ElFormItem label="备注">
                    <ElInput v-model="shelfForm.info" />
                </ElFormItem>
            </ElForm>
            <template #footer>
                <div class="flex">
                    <div class="flex-grow"></div>
                    <div class="flex">
                        <div class="pr-5">
                            <ElButton @click="cancelShelves">取消</ElButton>
                        </div>
                        <div>
                            <ElButton @click="submitShelves">确定</ElButton>
                        </div>
                    </div>
                </div>
            </template>
        </ElDialog>
    </div>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { createAreaApi, deleteAreaApi, editAreaApi, getAreaListApi, getAreaSelectorApi } from '@/api/area';
import { createShelveApi, deleteShelveApi, editShelveApi, getShelveListApi } from '@/api/shelve';

const activeName = ref('first')
const handleClick = (tab: any, event: Event) => {
    // console.log(tab.props.name, event)
    if (tab.props.name === "first") {
        getAreaList()
    } else {
        getShelfList()
    }
}
let tableData = $ref([{
    date: "222"
}])
let total = $ref(0)
let page = $ref(1)
let pageSize = $ref(10)
const handlePage = (val: number) => {
    getAreaList()
}

const handeleSize = (val: number) => {
    getAreaList()
}

function getAreaList() {
    getAreaListApi({
        page_index: page,
        page_size: pageSize
    }).then(res => {
        tableData = res.data.list
        total = res.data.total
    }).catch(err => {

    })
}



// ==========================库区===========================
let dialogArea = $ref(false)
function openAreaDialog() {
    dialogArea = true
}

let areaForm = $ref({
    id: 0,
    name: "",
    info: "",
    code: ""
})

function cancelArea() {
    dialogArea = false
    areaForm.id = 0
    areaForm.name = ""
    areaForm.info = ""
    areaForm.code = ""
}

function submitArea() {
    if (areaForm.id === 0) {
        createAreaApi(areaForm).then(res => {
            dialogArea = false
            getAreaList()
            ElMessage({
                message: '创建成功',
                type: 'success'
            })
        }).catch(err => {
            ElMessage({
                message: err.msg,
                type: 'error'
            })
        })
    } else {
        editAreaApi(areaForm).then(res => {
            dialogArea = false
            getAreaList()
            ElMessage({
                message: res.msg,
                type: 'success'
            })
        }).catch(err => {
            ElMessage({
                message: err.msg,
                type: 'error'
            })
        })
    }
}

function deleteArea(id) {
    ElMessageBox.alert("确认是否删除", "提醒", {
        confirmButtonText: '确定',
        callback: (action: Action) => {
            deleteAreaApi(id).then(res => {
                getAreaList()
                ElMessage({
                    message: res.msg,
                    type: 'success'
                })
            }).catch(err => {
                ElMessage({
                    message: err.msg,
                    type: 'success'
                })
            })
        },
    })
}
function handleRowAreaDrawer(data) {
    areaForm.id = data.id
    areaForm.code = data.code
    areaForm.info = data.info
    areaForm.name = data.name
}

// ==========================架体=========================

let dialogSheve = $ref(false)
let shelfForm = $ref({
    id: 0,
    name: "",
    code: "",
    area_id: 0,
    max_column: 1,
    max_row: 1,
    type: "mobile",
    info: ""
})
let areaShelvesOptions = $ref([])
let shelfSelectRefresh = $ref(Math.random())
function openSheveDialog() {
    dialogSheve = true
    getAreaSelectorApi().then(res => {
        areaShelvesOptions = res.data
        if (res.data.length > 0 && shelfForm.area_id === 0) {
            shelfForm.area_id = res.data[0].id
        }
    })
}

let page_index = $ref(1)
let page_size = $ref(10)
let tableShelf = $ref([])
let totalShelf = $ref(0)
function getShelfList() {
    getShelveListApi({
        page_index,
        page_size
    }).then(res => {
        tableShelf = res.data.list
        totalShelf = res.data.total
    })

}

function handeleSizeShelf() {
    getShelfList()
}
function handelePageShelf() {
    getShelfList()
}
function cancelShelves() {
    dialogSheve = false
    shelfForm.id = 0
    shelfForm.name = ""
    shelfForm.info = ""
    shelfForm.code = ""
    shelfForm.max_column = 1
    shelfForm.max_row = 1
    shelfForm.type = 'mobile'
    shelfForm.area_id = 0
}

function submitShelves() {
    if (shelfForm.id === 0) {
        createShelveApi(shelfForm).then(res => {
            cancelShelves()
            getShelfList()
            ElMessage({
                message: res.msg,
                type: 'success'
            })
        }).catch(err => {
            ElMessage({
                message: err.msg,
                type: 'error'
            })
        })
    } else {
        editShelveApi(shelfForm).then(res => {
            cancelShelves()
            getShelfList()
            ElMessage({
                message: res.msg,
                type: 'success'
            })
        }).catch(err => {
            ElMessage({
                message: err.msg,
                type: 'error'
            })
        })
    }
}

function editShelf(data: any) {
    shelfForm = data
    openSheveDialog()
}

function deleteShelf(id: number) {
    ElMessageBox.alert("确认是否删除", "提醒", {
        confirmButtonText: '确定',
        callback: (action: Action) => {
            deleteShelveApi(id).then(res => {
                getShelfList()
                ElMessage({
                    message: res.msg,
                    type: 'success'
                })
            }).catch(err => {
                ElMessage({
                    message: err.msg,
                    type: 'error'
                })
            })
        },
    })

}

onMounted(() => {
    getAreaList()
})
</script>
<style scoped></style>