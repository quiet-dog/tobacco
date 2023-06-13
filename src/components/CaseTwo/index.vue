<template>
    <div class="h-full">
        <ScannerGun @change="getScangerCode" />

        <div style="height: 150px;">
            <el-row>
                <el-col :span="12">
                    <div>
                        <h1 class="text-2xl">条码生成</h1>
                        <h4>可使用扫码枪扫描商品条码，系统将自动查询样品信息</h4>
                    </div>
                </el-col>
                <el-col :span="12" class="flex">
                    <div class="flex-grow">

                    </div>
                    <div class="pt-4 pr-2">
                        <el-row>
                            <el-col :span="24">
                                <ElFormItem label="选择打印机">
                                    <ElSelect v-model="selectPrint">
                                        <ElOption v-for="item in printList" :key="item.name" :label="item.name"
                                            :value="item.name" />
                                    </ElSelect>
                                </ElFormItem>

                            </el-col>
                        </el-row>

                    </div>
                    <div class="pt-4 pr-2" style="width: 400px;">
                        <el-row>
                            <el-col :span="24">
                                <ElFormItem label="编号">
                                    <ElInput v-model="tobaccoForm.code" />
                                </ElFormItem>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="pt-4 pr-2" style="width: 400px;">
                        <el-row>
                            <el-col :span="24">
                                <ElFormItem label="样品数量">
                                    <ElInput v-model="tobaccoForm.quantity" />
                                </ElFormItem>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="pt-4" style="width: 400px;">
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <ElFormItem label="生成数量">
                                    <ElInput v-model="tobaccoForm.tobaccoNum" />
                                </ElFormItem>
                            </el-col>
                            <el-col :span="6">
                                <ElButton @click="createTobaccoDetail">生成</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="w-2/3">
                        <ElFormItem label="商品名称">
                            <ElInput v-model="tobaccoForm.tobaccoName" />
                        </ElFormItem>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="w-2/3">
                        <ElFormItem label="厂商名称">
                            <ElInput v-model="tobaccoForm.tobaccoFactory" />
                        </ElFormItem>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="w-2/3">
                        <ElFormItem label="商品条码">
                            <ElInput v-model="tobaccoForm.tobaccoCode" />
                        </ElFormItem>
                    </div>
                </el-col>
                <el-col :span="6" class="flex">
                    <div class="flex-grow"></div>
                    <div class="w-2/3">
                        <ElFormItem label="包装规格">
                            <ElSelect v-model="tobaccoForm.tobaccoType">
                                <ElOption>13123</ElOption>
                            </ElSelect>
                        </ElFormItem>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="height: calc(100% - 150px);">
            <div style="height: calc(100% - 60px);">
                <ElTable max-height="100%" height="100%" :data="tableData"
                    :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ background: '#FAFAFA' }"
                    width="100%">
                    <ElTableColumn prop="name" label="样品名称"></ElTableColumn>
                    <ElTableColumn prop="code" label="编号"></ElTableColumn>
                    <ElTableColumn prop="manufacturer" label="厂商"></ElTableColumn>
                    <ElTableColumn label="包装规格"></ElTableColumn>
                    <ElTableColumn prop="quantity" label="样品数量"></ElTableColumn>
                    <ElTableColumn prop="good_code" label="商品条码"></ElTableColumn>
                    <ElTableColumn prop="add_time" label="添加时间"></ElTableColumn>
                    <ElTableColumn label="添加人"></ElTableColumn>
                    <!-- <ElTableColumn label="是否扫描"></ElTableColumn>
                    <ElTableColumn>
                        <template #default="scope">
                            <ElButton text>
                                移除
                            </ElButton>
                        </template>
                    </ElTableColumn> -->
                </ElTable>
            </div>
            <div class="flex" style="height: 60px;">
                <div class="mt-2 pl-4">共{{ total }}条</div>
                <div>
                    <el-pagination v-model:currentPage="page" v-model:page-size="pageSize" layout="prev, pager, next"
                        :total="total" @current-change="handlePage" @size-change="handeleSize" />
                </div>
                <div class="flex-grow"></div>
                <div>
                    <div style="width: 200px;">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <ElButton @click="goPrev(1)">上一步</ElButton>
                            </el-col>
                            <el-col :span="12">
                                <ElButton @click="goNext(3)">下一步</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getTobaccoListApi } from '@/api/tobacco';
import { uuid } from '@/utils';
import { ElMessage, dayjs } from 'element-plus';
import { codeStore } from '@/store/code'
import { disAutoConnect, hiprint } from 'vue-plugin-hiprint'
import template from '@/views/print/template'
// import { ElSelect } from 'element-plus/es/components/index.js';
// import { ElOption } from 'element-plus/es/components/index.js';

let aaa = $ref(template)

disAutoConnect();
let hiprintTemplate = new hiprint.PrintTemplate({
    template: aaa,
    settingContainer: "#PrintElementOptionSetting",

});
let printList = $ref([])
let selectPrint = $ref("")
function test22() {
    let data = {
        sample_name: "黄金叶红旗渠烟红旗渠烟",
        code: "ZWD61230600077",
        case_name: '测试的案件名称件名称',
        danwei: "飞度智能科技有限责任公司",
        person: "测试人",
        reason: "测试原因",
        money: "1000",
        link: "https://www.bilibili.com/?spm_id_from=444.41.0.0"
    }

    hiprintTemplate.getHtml(data);

    hiprintTemplate.print2(data, {
        printer: list[4].name,
    });

}

const { samples = [], formF = {
    name: '',
    party: '',
    entrust_unit: '',
    reason: '',
    value: '',
    report_code: '',
    delivery_location: '',
    seized_site: '',
    sampling_site: '',
    sampler: '',
    sampling_time: dayjs(new Date).valueOf(),
    express_company: "",
    express_number: "",
    samples: []
} } = defineProps<{
    samples: any[],
    formF: any
}>()

const codeS = codeStore()
const activeStep = inject("activeStep")
let tobaccoForm = $ref({
    tobaccoName: "",
    tobaccoFactory: "",
    tobaccoCode: "",
    tobaccoType: "",
    tobaccoNum: "",
    code: "",
    quantity: ""
})
let page = $ref(1)
let pageSize = $ref(20)
const route = useRoute()
const total = $computed(() => {
    return samples.length
})
const tableData = $computed(() => {
    // 分页samples
    const copy_samples = JSON.parse(JSON.stringify(samples))
    return copy_samples.splice((page - 1) * pageSize, pageSize)
})
const handlePage = (val: number) => {

}

const handeleSize = (val: number) => {

}

function getScangerCode(code: any) {
    console.log('12312312312')
    if (route.path.search("create") === -1) return
    getTobaccoListApi(code).then(res => {
        tobaccoForm.tobaccoCode = res.result.barcode
        tobaccoForm.tobaccoName = res.result.name
        tobaccoForm.tobaccoFactory = res.result.company
        tobaccoForm.tobaccoType = res.result.type
        tobaccoForm.code = ""
        tobaccoForm.tobaccoNum = ""
        tobaccoForm.quantity = ""
        console.log("getTobaccoListApi", res)
    }).catch(err => {
        tobaccoForm.tobaccoCode = ""
        tobaccoForm.tobaccoName = ""
        tobaccoForm.tobaccoFactory = ""
        tobaccoForm.tobaccoType = ""
        tobaccoForm.code = ""
        tobaccoForm.tobaccoNum = ""
        tobaccoForm.quantity = ""
        ElMessage({
            type: "error",
            message: err.msg
        })
    })
}

watch(() => codeS.code, (val) => {
    console.log('code change')
})

function createTobaccoDetail() {
    if (tobaccoForm.code === "") {
        ElMessage({
            type: "error",
            message: "请先填写条码编号"
        })
        return
    }
    if (tobaccoForm.quantity === "") {
        ElMessage({
            type: "error",
            message: "请先填写数量"
        })
        return
    }
    if (Number(tobaccoForm.tobaccoNum) == 0) {
        ElMessage({
            type: "error",
            message: "请先填写数量"
        })
        return
    }
    if (tobaccoForm.tobaccoNum === "" || tobaccoForm.tobaccoName === "" || tobaccoForm.tobaccoFactory === "" || tobaccoForm.tobaccoType === "") {
        ElMessage({
            type: "error",
            message: "请先扫描条码"
        })
        return
    }
    for (let i = 0; i < Number(tobaccoForm.tobaccoNum); i++) {
        samples.push({
            name: tobaccoForm.tobaccoName,
            code: tobaccoForm.code,
            manufacturer: tobaccoForm.tobaccoFactory,
            quantity: tobaccoForm.quantity,
            add_time: new Date().getTime(),
            good_code: tobaccoForm.tobaccoCode,
        })
    }
    let printData = []
    for (let i = 0; i < Number(tobaccoForm.tobaccoNum); i++) {
        printData.push({
            sample_name: tobaccoForm.tobaccoName,
            code: tobaccoForm.code,
            case_name: formF.name,
            danwei: formF.entrust_unit,
            person: formF.reason,
            reason: formF.sampler,
            money: formF.value,
            link: "http://192.168.0.81:8081/r/" + tobaccoForm.code
        })
    }

    if (selectPrint === "") {
        ElMessage({
            type: "error",
            message: "请选择打印机"
        })
        return
    }

    hiprintTemplate.getHtml(printData);
    hiprintTemplate.print2(printData, {
        printer: selectPrint,
    });
}

function goNext(val: number) {
    activeStep.setActiveStep(val)
}
function goPrev(val: number) {
    activeStep.setActiveStep(val)
}

function clearData() {
    tobaccoForm.tobaccoCode = ""
    tobaccoForm.tobaccoName = ""
    tobaccoForm.tobaccoFactory = ""
    tobaccoForm.tobaccoType = ""
    tobaccoForm.code = ""
    tobaccoForm.tobaccoNum = ""
    tobaccoForm.quantity = ""
}

defineExpose({ clearData })
onMounted(() => {
    // hiprint.init()
    // window.hiwebSocket.stop()
    window.hiwebSocket.setHost('192.168.0.64:17521')
    // window.hiwebSocket.start()
    hiprintTemplate.design("#hiprint-printTemplate");
    setTimeout(() => {
        printList = hiprintTemplate.getPrinterList()
        console.log("222", printList)
    }, 2000)
})
</script>
<style scoped></style>