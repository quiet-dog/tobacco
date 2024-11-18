<template>
    <div class="h-full">
        <ScannerGun @change="getScangerCode" />

        <div class="px-3" style="height: 150px;border-bottom: 5px whitesmoke solid;">
            <el-row class="pb-2">
                <el-col :span="7">
                    <div>
                        <h5 class="border-solid border-l-4 border-blue-400 pl-2" style="font-size: 18px;">条码生成</h5>
                        <h6 style="color: gray;font-size: 14px;">可使用扫码枪扫描商品条码，系统将自动查询样品信息</h6>
                    </div>
                </el-col>
                <el-col :span="17" class="flex">
                    <div class="flex-grow">

                    </div>
                    <div class="pt-4 px-2">
                        <el-row>
                            <el-col :span="24">
                                <el-form ref="formRef1" :model="formPrint">
                                    <ElFormItem prop="selectPrint"
                                        :rules="[{ required: true, message: '选择打印机', trigger: ['blur', 'change'] }]"
                                        label="选择打印机">
                                        <ElSelect v-model="formPrint.selectPrint">
                                            <ElOption v-for="item in printList" :key="item.name" :label="item.name"
                                                :value="item.name" />
                                        </ElSelect>
                                    </ElFormItem>
                                </el-form>

                            </el-col>
                        </el-row>

                    </div>
                    <div class="pt-4 px-10" style="width: 400px;">
                        <el-row>
                            <el-col :span="24">
                                <el-form ref="formRef2" :model="tobaccoForm">
                                    <ElFormItem prop="code"
                                        :rules="[{ required: true, message: '请填写编号', trigger: ['blur', 'change'] }]"
                                        label="编号">
                                        <ElInput v-model="tobaccoForm.code" />
                                    </ElFormItem>
                                </el-form>

                            </el-col>
                        </el-row>
                    </div>
                    <div class="pt-4 px-8" style="width: 400px;">
                        <el-row>
                            <el-col :span="24">
                                <el-form ref="formRef3" :model="tobaccoForm">
                                    <ElFormItem prop="quantity"
                                        :rules="[{ required: true, message: '请填写样品数量', trigger: ['blur', 'change'] }]"
                                        label="样品数量">
                                        <ElInput v-model="tobaccoForm.quantity" />
                                    </ElFormItem>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="pt-4" style="width: 400px;">
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <el-form ref="formRef4" :model="tobaccoForm">
                                    <ElFormItem label="打印数量" prop="tobaccoNum"
                                        :rules="[{ required: true, message: '请填写打印数量', trigger: ['blur', 'change'] }]">
                                        <ElInput v-model="tobaccoForm.tobaccoNum" />
                                    </ElFormItem>
                                </el-form>
                            </el-col>
                            <el-col :span="6" class="pl-4">
                                <ElButton type="primary" class="ml-2" @click="createTobaccoDetail">生成</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="5">
                    <div class="w-3/4">
                        <el-form ref="formRef5" :model="tobaccoForm">
                            <ElFormItem label="商品名称" prop="tobaccoName"
                                :rules="[{ required: true, message: '请填写商品名称', trigger: ['blur', 'change'] }]">
                                <ElInput v-model="tobaccoForm.tobaccoName" />
                            </ElFormItem>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="w-3/4">
                        <el-form ref="formRef6" :model="tobaccoForm">
                            <ElFormItem label="厂商名称" prop="tobaccoFactory"
                                :rules="[{ required: true, message: '请填写厂商名称', trigger: ['blur', 'change'] }]">
                                <ElInput v-model="tobaccoForm.tobaccoFactory" />
                            </ElFormItem>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="w-3/4">
                        <el-form ref="formRef7" :model="tobaccoForm">
                            <ElFormItem prop="tobaccoCode" label="商品条码"
                                :rules="[{ required: true, message: '请填写商品条码', trigger: ['blur', 'change'] }]">
                                <ElInput v-model="tobaccoForm.tobaccoCode" />
                            </ElFormItem>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="5" class="flex">
                    <div class="flex-grow"></div>
                    <div class="w-3/4">
                        <el-form ref="formRef8" :model="tobaccoForm">
                            <ElFormItem label="包装规格" prop="tobaccoType"
                                :rules="[{ required: true, message: '请选择包装规格', trigger: ['blur', 'change'] }]">
                                <!-- <ElInput v-model="tobaccoForm.tobaccoType" /> -->
                                <ElSelect v-model="tobaccoForm.tobaccoType">
                                    <ElOption label="条" :value="'条'" />
                                    <ElOption label="盒" :value="'盒'" />
                                </ElSelect>
                            </ElFormItem>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="4" class="flex">
                    <div class="flex-grow"></div>
                    <div>
                        <el-form ref="formRef9">
                            <el-form-item
                                :rules="[{ required: true, message: '请填写打印机ip地址', trigger: ['blur', 'change'] }]"
                                label="打印机ip地址">
                                <ElInput v-model="ipAddr" placeholder="请按回车进行连接" @keyup.enter="changeIpAddr" />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="px-3 pt-4" style="height: calc(100% - 150px);">
            <h5 class="border-solid border-l-4 border-blue-400 pl-2" style="font-size: 18px;">样品列表</h5>
            <div style="height: calc(100% - 78px);" class="pt-2">
                <ElTable max-height="100%" height="100%" :data="tableData"
                    :default-sort="{ prop: 'date', order: 'descending' }" :header-cell-style="{ background: '#FAFAFA' }"
                    width="100%">
                    <ElTableColumn prop="name" label="样品名称"></ElTableColumn>
                    <ElTableColumn prop="code" label="编号"></ElTableColumn>
                    <ElTableColumn prop="manufacturer" label="厂商"></ElTableColumn>
                    <ElTableColumn prop="packing_spec" label="包装规格"></ElTableColumn>
                    <ElTableColumn prop="quantity" label="样品数量"></ElTableColumn>
                    <ElTableColumn prop="good_code" label="商品条码"></ElTableColumn>
                    <ElTableColumn prop="add_time" label="添加时间">
                        <template #default="scope">
                            {{ formatDate(scope.row.add_time) }}
                        </template>
                    </ElTableColumn>
                    <ElTableColumn width="100" prop="add_person" label="添加人"></ElTableColumn>
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
            <div class="flex py-3" style="height: 60px;">
                <div class="mt-1 pl-4">共{{ total }}条</div>
                <div>
                    <el-pagination v-model:currentPage="page" v-model:page-size="pageSize" layout="prev, pager, next"
                        :total="total" @current-change="handlePage" @size-change="handeleSize" />
                </div>
                <div class="flex-grow"></div>
                <div>
                    <div style="width: 200px;">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <ElButton @click="goPrev(0)">上一步</ElButton>
                            </el-col>
                            <el-col :span="12">
                                <ElButton type="primary" @click="goNext(2)">下一步</ElButton>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { createTiaoMa, getTobaccoListApi } from '@/api/tobacco';
import { formatDate, baseUrl } from '@/utils';
import { ElMessage, dayjs } from 'element-plus';
import { codeStore } from '@/store/code'
import { disAutoConnect, hiprint } from 'vue-plugin-hiprint'
import template from '@/views/print/template'
// import { ElSelect } from 'element-plus/es/components/index.js';
// import { ElOption } from 'element-plus/es/components/index.js';

function changeIpAddr() {
    console.log('val', ipAddr)
    window.hiwebSocket.setHost(ipAddr)
    // window.hiwebSocket.start()
    hiprintTemplate.design("#hiprint-printTemplate");
    setTimeout(() => {
        printList = hiprintTemplate.getPrinterList()
        localStorage.setItem("printAddrss", printList)
        if (printList.length > 0) {
            localStorage.setItem("printAddr", ipAddr)
            console.log('printAddr', ipAddr)
        }
    }, 2000)
}

let aaa = $ref(template)
let ipAddr = $ref("")
let formRef1 = ref()
let formRef2 = ref()
let formRef3 = ref()
let formRef4 = ref()
let formRef5 = ref()
let formRef6 = ref()
let formRef7 = ref()
let formRef8 = ref()
let formRef9 = ref()
disAutoConnect();
let hiprintTemplate = new hiprint.PrintTemplate({
    template: aaa,
    settingContainer: "#PrintElementOptionSetting",

});
let printList = $ref([])
let selectPrint = $ref("")

let formPrint = $ref({
    selectPrint: ""
})

watch(() => printList.length, (val, old) => {
    console.log('printList', val)
    if (old == 0 && (val !== old && val > 0)) {
        ElMessage({
            message: '打印机连接成功',
            type: 'success'
        })
    }
})
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
    tobaccoType: "条",
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
    tobaccoForm.tobaccoCode = code
    if (tobaccoForm.tobaccoCode.length !== 13) {
        ElMessage({
            type: "error",
            message: "条码长度不正确,请重新扫描核对!"
        })
        return
    }
    getTobaccoListApi(code).then(res => {
        tobaccoForm.tobaccoCode = res.result.barcode
        tobaccoForm.tobaccoName = res.result.name
        tobaccoForm.tobaccoFactory = res.result.supplier
        // tobaccoForm.tobaccoType = res.result.uint
        tobaccoForm.code = ""
        tobaccoForm.tobaccoNum = ""
        tobaccoForm.quantity = ""
        // console.log("getTobaccoListApi", res)
        ElMessage({
            type: "success",
            message: "获取成功"
        })
    }).catch(err => {
        // tobaccoForm.tobaccoCode = code
        // tobaccoForm.tobaccoCode = "" 
        tobaccoForm.tobaccoName = ""
        tobaccoForm.tobaccoFactory = ""
        tobaccoForm.tobaccoType = "条"
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

    if (formPrint.selectPrint === "") {
        ElMessage({
            type: "error",
            message: "请选择打印机"
        })
        return
    }
    // for (let i = 0; i < Number(tobaccoForm.tobaccoNum); i++) {
    let userInfo = JSON.parse(sessionStorage.getItem("user"))
    console.log("userinfo,", userInfo)
    samples.push({
        name: tobaccoForm.tobaccoName,
        code: tobaccoForm.code,
        manufacturer: tobaccoForm.tobaccoFactory,
        quantity: tobaccoForm.quantity,
        add_time: new Date().getTime(),
        good_code: tobaccoForm.tobaccoCode,
        packing_spec: tobaccoForm.tobaccoType,
        add_person: userInfo.username,
    })
    getTobaccoListApi(tobaccoForm.tobaccoCode).then(res => {

    }).catch(err => {

    })
    /**
     *     "barcode": "98",
    "name": "表按上青单",
    "spec": "mollit elit cillum do",
    "uint": "Ut",
    "price": "92",
    "brand": "mollit consequat ut amet",
    "supplier": "do esse ullamco et consectetur",
    "made_in": "aliquip laboris velit elit sunt"
     */
    createTiaoMa({
        barcode: tobaccoForm.tobaccoCode,
        name: tobaccoForm.tobaccoName,
        supplier: tobaccoForm.tobaccoFactory
    }).then(res => {
    }).catch(err => {
        ElMessage({
            type: "error",
            message: err.msg
        })
    })
    // }
    let printData = []
    for (let i = 0; i < Number(tobaccoForm.tobaccoNum); i++) {
        printData.push({
            sample_name: tobaccoForm.tobaccoName,
            code: tobaccoForm.code,
            case_name: formF.name,
            danwei: formF.entrust_unit,
            person: formF.sampler,
            reason: formF.reason,
            money: formF.value,
            link: tobaccoForm.code
        })
    }


    // hiprintTemplate.getHtml(printData);
    hiprintTemplate.print2(printData, {
        printer: formPrint.selectPrint,
    });
    tobaccoForm.code = ''
    tobaccoForm.quantity = ''
    tobaccoForm.tobaccoCode = ''
    tobaccoForm.tobaccoFactory = ''
    tobaccoForm.tobaccoName = ''
    tobaccoForm.tobaccoNum = ''
    tobaccoForm.tobaccoType = '条'
    // formRef1.value.resetFields()
    formRef2.value.resetFields()
    formRef3.value.resetFields()
    formRef4.value.resetFields()
    formRef5.value.resetFields()
    formRef6.value.resetFields()
    formRef7.value.resetFields()
    formRef8.value.resetFields()
    formRef9.value.resetFields()
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

    formRef1.value.resetFields()
    formRef2.value.resetFields()
    formRef3.value.resetFields()
    formRef4.value.resetFields()
    formRef5.value.resetFields()
    formRef6.value.resetFields()
    formRef7.value.resetFields()
    formRef8.value.resetFields()
    formRef9.value.resetFields()
}

defineExpose({ clearData })
onMounted(() => {
    // hiprint.init()
    // window.hiwebSocket.stop()
    const printAddr = localStorage.getItem("printAddr")

    if (printAddr !== null && printAddr.length > 0) {
        window.hiwebSocket.setHost(printAddr)
        ipAddr = printAddr
        // window.hiwebSocket.start()
        hiprintTemplate.design("#hiprint-printTemplate");
        setTimeout(() => {
            printList = hiprintTemplate.getPrinterList()
        }, 2000)
    }


})
</script>
<style scoped></style>