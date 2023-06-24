<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-aside width="250px" class="border-right-my">
                <el-scrollbar height="100%">
                    <el-menu class="border-right-my-test" default-active="0">
                        <ElMenuItem class="my-main border-b-2" @click="selectId(0)" :index="'0'">
                            <span class="text-2xl pt-2">咸阳市烟草局</span>
                        </ElMenuItem>
                        <template v-for="item in treeMenu">
                            <ElSubMenu :index="String(item.id)" v-if="item.shelves.length > 0" :key="item">
                                <template #title>
                                    <span>{{ item.name }}</span>
                                </template>
                                <el-menu-item v-for="shelf in item.shelves" :key="shelf.id"
                                    :index="String(item.id + '-' + shelf.id)" @click="selectId(item.id)">
                                    <template #title>
                                        <span>{{ shelf.name }}</span>
                                    </template>
                                </el-menu-item>
                            </ElSubMenu>
                            <ElMenuItem @click="selectId(item.id)" :index="item.id" v-else>
                                {{ item.name }}
                            </ElMenuItem>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-main class="h-full">
                <div style="height: 110px;">
                    <div>
                        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                            <el-tab-pane label="库区管理" name="first">
                                <ElButton type="primary" @click="openAreaDialog('新建库区')">新建</ElButton>
                            </el-tab-pane>
                            <el-tab-pane label="架体管理" name="second">
                                <ElButton type="primary" @click="openSheveDialog('新建架体')">新建</ElButton>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div v-if="activeName === 'first'" style="height: calc(100% - 110px);">
                    <div style="height: calc(100% - 60px);">
                        <ElTable height="100%" max-height="100%" :data="tableData"
                            :header-cell-style="{ background: '#FAFAFA' }" @row-click="handleRowAreaDrawer">
                            <ElTableColumn prop="name" label="库区名称"></ElTableColumn>
                            <ElTableColumn prop="code" align="center" label="库区编号"></ElTableColumn>
                            <ElTableColumn prop="info" label="备注" align="center">
                                <template #default="scope">
                                    {{
                                        scope.row.info ? scope.row.info :
                                        '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;'
                                    }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="130" label="&nbsp;&nbsp;&nbsp;&nbsp;操作">
                                <template #default="scope">
                                    <ElButton type="primary" class="button-pr" text @click="editArea('编辑库区', scope.row)">编辑
                                    </ElButton>
                                    <ElButton type="danger" class="button-pl" text @click="deleteArea(scope.row.id)">删除
                                    </ElButton>
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div style="height: 60px;" class="flex py-4">
                        <div class="pt-1/2 text-gray-400">共{{ total }}区</div>
                        <div class="flex-grow"></div>
                        <div>
                            <el-pagination v-model:currentPage="page" @current-change="handlePage"
                                @size-change="handeleSize" v-model:page-size="pageSize" large layout="prev, pager, next"
                                :total="total" />
                        </div>
                    </div>
                </div>

                <div v-else style="height: calc(100% - 110px);">
                    <div style="height: calc(100% - 60px);">
                        <ElTable height="100%" max-height="100%" :data="tableShelf"
                            :header-cell-style="{ background: '#FAFAFA' }">
                            <ElTableColumn prop="code" label="列号" show-overflow-tooltip></ElTableColumn>
                            <ElTableColumn prop="name" label="架体名称" show-overflow-tooltip></ElTableColumn>
                            <ElTableColumn prop="area.name" label="所在库区" width="200" show-overflow-tooltip></ElTableColumn>
                            <ElTableColumn prop="max_column" label="节数" show-overflow-tooltip></ElTableColumn>
                            <ElTableColumn prop="max_row" label="层数" show-overflow-tooltip></ElTableColumn>
                            <ElTableColumn prop="inter_area_code" align="center" label="协议区号" show-overflow-tooltip>
                                <template #default="scope">
                                    {{ scope.row.inter_area_code ? scope.row.inter_area_code :
                                        '-'
                                    }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="inter_shelf_code" label="协议列号" show-overflow-tooltip>
                                <template #default="scope" align="center">
                                    {{ scope.row.inter_shelf_code ? scope.row.inter_shelf_code :
                                        '-'
                                    }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="com_address" label="服务地址" show-overflow-tooltip>
                                <template #default="scope">
                                    {{
                                        scope.row.com_address ? scope.row.com_address :
                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                    }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="type" align="center" label="架体类型" show-overflow-tooltip>
                                <template #default="scope">
                                    <el-tag v-if="scope.row.type === 'mobile'">移动列</el-tag>
                                    <el-tag type="success" v-else>固定列</el-tag>
                                </template>
                            </ElTableColumn>
                            <ElTableColumn prop="info" label="备注" show-overflow-tooltip>
                                <template #default="scope">
                                    {{
                                        scope.row.info ? scope.row.info :
                                        '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;'
                                    }}
                                </template>
                            </ElTableColumn>
                            <ElTableColumn width="130" label="&nbsp;&nbsp;&nbsp;&nbsp;操作">
                                <template #default="scope">
                                    <ElButton type="primary" class="button-pr" text @click="editShelf('编辑架体', scope.row)">编辑
                                    </ElButton>
                                    <ElButton type="danger" class="button-pl" text @click="deleteShelf(scope.row.id)">删除
                                    </ElButton>
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div style="height: 60px;" class="flex py-4">
                        <div class="pt-1/2 text-gray-400">共{{ totalShelf }}列</div>
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

        <ElDialog v-model="dialogArea" :title="title1" width="450" @closed="cancelArea" :before-close="closeArea">
            <div class="flex">
                <div class="flex-grow">

                </div>
                <div>
                    <ElForm ref="formAreaRef" :model="areaForm" label-position="right" label-width="80px">
                        <ElFormItem :rules="[{ message: '请填写库区名称', required: true, trigger: ['blur', 'change'], }]"
                            prop="name" label="库区名称" style="width: 300px;">
                            <ElInput v-model="areaForm.name" />
                        </ElFormItem>
                        <ElFormItem prop="info" label="备注" style="width: 300px;">
                            <ElInput v-model="areaForm.info" />
                        </ElFormItem>
                        <ElFormItem :rules="[{ message: '请填写库区编号', required: true, trigger: ['blur', 'change'], }]"
                            prop="code" label="编号" style="width: 300px;">
                            <ElInput v-model="areaForm.code" />
                        </ElFormItem>
                    </ElForm>
                </div>
                <div class="flex-grow">

                </div>
            </div>
            <template #footer>
                <div class="flex">
                    <div class="flex-grow"></div>
                    <div class="flex">
                        <div class="pr-5">
                            <ElButton @click="cancelArea">取消</ElButton>
                        </div>
                        <div>
                            <ElButton type="primary" @click="submitArea">确定</ElButton>
                        </div>
                    </div>
                </div>
            </template>
        </ElDialog>

        <ElDialog v-model="dialogSheve" :title="title2" width="450" @closed="cancelShelves" :before-close="closeShelf">
            <div class="flex">
                <div class="flex-grow">

                </div>
                <div>
                    <ElForm label-position="right" label-width="80px" ref="formShelfRef" :model="shelfForm">
                        <ElFormItem :rules="[{ message: '请填写架体名称', required: true, trigger: ['blur', 'change'], }]"
                            prop="name" label="架体名称" style="width: 300px;">
                            <ElInput v-model="shelfForm.name" />
                        </ElFormItem>
                        <ElFormItem :rules="[{ message: '请填写架体编号', required: true, trigger: ['blur', 'change'], }]"
                            prop="code" label="架体编号" style="width: 300px;">
                            <ElInput v-model="shelfForm.code" />
                        </ElFormItem>
                        <ElFormItem :rules="[{ message: '请填写架体位置', required: true, trigger: ['blur', 'change'], }]"
                            prop="area_id" label="架体位置" style="width: 300px;">
                            <ElSelect v-model="shelfForm.area_id" :key="shelfSelectRefresh">
                                <ElOption v-for="item in areaShelvesOptions" :key="item" :label="item.name"
                                    :value="item.id" />
                            </ElSelect>
                        </ElFormItem>

                        <ElFormItem :rules="[{ message: '请填写架体节数', required: true, trigger: ['blur', 'change'], }]"
                            prop="max_column" label="架体节数" style="width: 300px;">
                            <el-input-number v-model="shelfForm.max_column" :min="1" />
                        </ElFormItem>
                        <ElFormItem :rules="[{ message: '请填写架体层数', required: true, trigger: ['blur', 'change'], }]"
                            prop="max_row" label="架体层数" style="width: 300px;">
                            <el-input-number v-model="shelfForm.max_row" :min="1" />
                        </ElFormItem>
                        <ElFormItem :rules="[{ message: '请填写架体类型', required: true, trigger: ['blur', 'change'], }]"
                            prop="type" label="架体类型" style="width: 300px;">
                            <el-radio-group v-model="shelfForm.type" class="ml-4">
                                <el-radio label="mobile">移动列</el-radio>
                                <el-radio label="fixed">固定列</el-radio>
                            </el-radio-group>
                        </ElFormItem>
                        <ElFormItem prop="com_address" label="服务地址" style="width: 300px;">
                            <ElInput v-model="shelfForm.com_address" />
                        </ElFormItem>
                        <ElFormItem prop="inter_area_code" label="协议区号" style="width: 300px;">
                            <ElInput v-model="shelfForm.inter_area_code" />
                        </ElFormItem>
                        <ElFormItem prop="inter_shelf_code" label="协议列号" style="width: 300px;">
                            <ElInput v-model="shelfForm.inter_shelf_code" />
                        </ElFormItem>
                        <ElFormItem label="备注" style="width: 300px;">
                            <ElInput v-model="shelfForm.info" />
                        </ElFormItem>
                    </ElForm>
                </div>
                <div class="flex-grow"></div>
            </div>
            <template #footer>
                <div class="flex">
                    <div class="flex-grow"></div>
                    <div class="flex">
                        <div class="pr-5">
                            <ElButton @click="cancelShelves">取消</ElButton>
                        </div>
                        <div>
                            <ElButton type="primary" @click="submitShelves">确定</ElButton>
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
let treeMenu = $ref([])
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
let title1 = '新建库区'
function openAreaDialog(title) {
    dialogArea = true
    title1 = title1
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
    formAreaRef.value.resetFields()
}

function submitArea() {
    if (areaForm.id === 0) {
        formAreaRef.value.validate((valid) => {
            if (valid) {
                createAreaApi(areaForm).then(res => {
                    dialogArea = false
                    getAreaList()
                    getAreaMenuList()
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
                return false
            }
        })


    } else {
        formAreaRef.value.validate((valid) => {
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
        })

    }
}

function deleteArea(id) {
    ElMessageBox.confirm(
        '确认是否删除',
        '提醒',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
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
        })
        .catch(() => {
            //   ElMessage({
            //     type: 'info',
            //     message: 'Delete canceled',
            //   })
        })
    // ElMessageBox.alert("确认是否删除", "提醒!", {
    //     confirmButtonText: '确定',
    //     callback: (action: Action) => {
    //         deleteAreaApi(id).then(res => {
    //             getAreaList()
    //             ElMessage({
    //                 message: res.msg,
    //                 type: 'success'
    //             })
    //         }).catch(err => {
    //             ElMessage({
    //                 message: err.msg,
    //                 type: 'success'
    //             })
    //         })
    //     },
    // })
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
    info: "",
    com_address: "",
    inter_area_code: "",
    inter_shelf_code: ""
})
let areaShelvesOptions = $ref([])
let shelfSelectRefresh = $ref(Math.random())
let title2 = $ref('新建架体')
function openSheveDialog(title) {
    dialogSheve = true
    getAreaSelectorApi().then(res => {
        areaShelvesOptions = res.data
        if (res.data.length > 0 && shelfForm.area_id === 0) {
            shelfForm.area_id = res.data[0].id
        }
    })
    title2 = title
}

let page_index = $ref(1)
let page_size = $ref(10)
let tableShelf = $ref([])
let totalShelf = $ref(0)
function getShelfList() {
    getShelveListApi({
        page_index,
        page_size,
        area_id: area_id === 0 ? undefined : area_id
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
    shelfForm.inter_area_code = ""
    shelfForm.inter_shelf_code = ""
    shelfForm.com_address = ""
    formShelfRef.value.resetFields()
}
function closeShelf(done: () => void) {
    // formShelfRef.value.resetFields()
    done()
}

function closeArea(done: () => void) {
    // formAreaRef.value.resetFields()
    done()
}

let formShelfRef = ref()
let formAreaRef = ref()
function submitShelves() {
    if (shelfForm.id === 0) {
        formShelfRef.value.validate((valid) => {
            if (valid) {
                createShelveApi(shelfForm).then(res => {

                    ElMessage({
                        message: res.msg,
                        type: 'success'
                    })
                    cancelShelves()
                    getShelfList()
                    getAreaMenuList()
                }).catch(err => {
                    console.log("123123123", err)
                    ElMessage({
                        message: err.msg,
                        type: 'error'
                    })
                })
            } else {
                return false
            }
        })

    } else {
        formShelfRef.value.validate((valid) => {
            if (valid) {
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
            } else {
                return false
            }
        })

    }
}

function editShelf(title, data: any) {
    title2 = title
    shelfForm = JSON.parse(JSON.stringify(data))
    openSheveDialog(title2)
}
function editArea(title, data: any) {
    title1 = title
    areaForm = JSON.parse(JSON.stringify(data))
    openAreaDialog(title1)
}

function deleteShelf(id: number) {

    ElMessageBox.confirm(
        '确认是否删除',
        '提醒',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
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
        })
        .catch(() => {
            //   ElMessage({
            //     type: 'info',
            //     message: 'Delete canceled',
            //   })
        })


}

function getAreaMenuList() {
    getAreaSelectorApi().then(res => {
        treeMenu = res.data as any
        console.log('treeMenu', treeMenu)
    }).catch(err => {

    })
}

let area_id = $ref(0)
function selectId(val: number) {
    area_id = val
    if (activeName.value !== 'first') {
        getShelfList()
    }
}

onMounted(() => {
    getAreaMenuList()
    getAreaList()
})

onActivated(() => {
    getAreaMenuList()
    if (activeName.value !== 'first') {
        getShelfList()
    } else {
        getAreaList()
    }
})
</script>
<style scoped>
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

:deep(#tab-first) {
    font-size: 18px;
    padding-bottom: 10px;
}

:deep(#tab-second) {
    font-size: 18px;
    padding-bottom: 10px;
}
</style>