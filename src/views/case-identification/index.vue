<template>
    <div class="h-full">
        <!-- header -->
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
                            <el-select v-model="timeValue" placeholder="时间筛选条件" size="large">
                                <el-option v-for="item in timeOption" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="pr-2">
                            <el-date-picker style="width: 250px;" size="large" v-model="datePickerValue" type="daterange"
                                :shortcuts="timeValue === '1' ? datePickerShortcuts : datePickerShortcuts"
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
                <ElTable @row-click="handleRowDrawer" :data="tableData" :header-cell-style="{ background: '#FAFAFA' }">
                    <el-table-column prop="date" label="流水号" />
                    <el-table-column prop="date" label="案件名称" />
                    <el-table-column prop="date" label="查扣地点" />
                    <el-table-column prop="date" label="当事人" />
                    <el-table-column prop="date" label="案值（元）" />
                    <el-table-column prop="date" label="查扣原因" />
                    <el-table-column prop="date" label="抽样时间" />
                    <el-table-column prop="date" label="抽样人" />
                    <el-table-column prop="date" label="抽样地点" />
                    <el-table-column prop="date" label="委托单位" />
                    <el-table-column width="150">
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
        <ElDrawer v-model="drawer" title="案件概述">
            <div>
                <el-card shadow="hover" class="title-card-my">
                    <template #header>
                        <div class="flex">
                            <div class="border-l-4 border-blue-400 pl-2 text-3xl">概述</div>
                            <div class="flex-grow">
                            </div>
                        </div>

                    </template>
                    <div class="flex-col px-5">
                        <div class="grid grid-cols-14 gap-10">
                            <el-descriptions title="" :column="2">
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
                                <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }"
                                    :header-cell-style="{ background: '#FAFAFA' }" width="100%">
                                    <el-table-column prop="code" label="编号" width="150"></el-table-column>

                                    <el-table-column prop="name" label="样品名称" width="150" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="direction" label="厂商">
                                    </el-table-column>
                                    <el-table-column prop="clean_status" label="包装形式" width="100">
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
<script lang="ts" setup>

const router = useRouter()
function goCreatTask(path: string) {
    router.push(path)
}
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
let tableData = $ref([{
    date: "222"
}])
let total1 = $ref(50)
let total2 = $ref(50)
let drawer = $ref(false)
let setActive = $ref(0)
let page1 = $ref(1)
let pageSize1 = $ref(10)
let page2 = $ref(1)
let pageSize2 = $ref(10)

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

const handlePage1 = (val: number) => {

}

const handeleSize1 = (val: number) => {

}

const handlePage2 = (val: number) => {

}

const handeleSize2 = (val: number) => {

}


const handleRowDrawer = (row: any, _column: any, _event: any) => {
    drawer = true
    console.log(row)
}
</script>
<style scoped>
div.title-card-my :deep(>div.el-card__header) {
    padding: 10px;
}

/* 当屏幕高度小于900px时 */
/* .table-height{
    min-height: 400px;
}
@media screen and (max-height: 900px) {
    .table-height {
        min-height: 400px;
    }
}

@media screen  and (max-height: 1500px)  {
    .table-height {
        min-height: 800px;
    }
} */
</style>