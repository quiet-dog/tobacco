<template>
    <div>
        <div class="pt-24 flex">
            <div class="flex-grow">

            </div>
            <div>
                <ElForm ref="formRef" :model="form" label-position="right" label-width="100">
                    <ElFormItem :rules="[{ required: true, message: '请填写案件名称', trigger: ['blur', 'change'] }]" prop="name"
                        label="案件名称" class="w-72">
                        <ElInput v-model="form.name" placeholder="请输入案件名称"></ElInput>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写当事人', trigger: ['blur', 'change'], }]" prop="party"
                        label="当事人" class="w-72">
                        <ElInput v-model="form.party" placeholder="请输入当事人姓名"></ElInput>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写委托单位', trigger: ['blur', 'change'], }]"
                        prop="entrust_unit" label="委托单位" class="w-72">
                        <el-select v-model="form.entrust_unit" placeholder="请选择">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写查扣原因', trigger: ['blur', 'change'], }]"
                        prop="reason" label="查扣原因" class="w-72">
                        <el-select v-model="form.reason" placeholder="请选择">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写案值（元）', trigger: ['blur', 'change'], }]"
                        prop="value" label="案值（元）" class="w-72">
                        <ElInput v-model="form.value" placeholder="请输入案值"></ElInput>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写发货地点', trigger: ['blur', 'change'], }]"
                        prop="delivery_location" label="发货地点">
                        <el-row>
                            <el-col :span="12">
                                <el-cascader placeholder="请选择地区" size="large" :options="regionData"
                                    @change="handleDeliveryChange">
                                </el-cascader>
                            </el-col>
                            <el-col :span="12">
                                <ElInput v-model="delivery_location" @input="delivery_location_input" placeholder="请输入发货地点">
                                </ElInput>
                            </el-col>
                        </el-row>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写查扣地址', trigger: ['blur', 'change'], }]"
                        prop="seized_site" label="查扣地址">
                        <el-row>
                            <el-col :span="12">
                                <el-cascader placeholder="请选择地区" size="large" :options="regionData"
                                    @change="handleSeizedChange">
                                </el-cascader>
                            </el-col>
                            <el-col :span="12">
                                <ElInput v-model="seized_site" @input="seized_site_input" placeholder="请输入查扣地址"></ElInput>
                            </el-col>
                        </el-row>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写抽样地址', trigger: ['blur', 'change'], }]"
                        prop="sampling_site" label="抽样地址">
                        <el-row>
                            <el-col :span="12">
                                <el-cascader placeholder="请选择地区" size="large" :options="regionData"
                                    @change="handleSamplingChange">
                                </el-cascader>
                            </el-col>
                            <el-col :span="12">
                                <ElInput v-model="sampling_site" @input="sampling_site_input" placeholder="请输入抽样地址">
                                </ElInput>
                            </el-col>
                        </el-row>
                    </ElFormItem>
                    <ElFormItem :rules="[{ required: true, message: '请填写抽样人', trigger: ['blur', 'change'], }]"
                        prop="sampler" label="抽样人" class="w-72">
                        <ElInput v-model="form.sampler" placeholder="请输入姓名"></ElInput>
                    </ElFormItem>
                    <ElFormItem prop="sampling_time" label="抽样时间" class="w-72">
                        <el-date-picker type="date" v-model="sampling_time" placeholder="Pick a day"
                            :disabled-date="disabledDate" :shortcuts="shortcuts" :size="'large'" @change="changeDatePicker"
                            value-format="" />
                    </ElFormItem>
                </ElForm>
            </div>
            <div class="flex-grow"></div>
        </div>
        <div class="mt-24 flex">
            <div class="flex-grow"></div>
            <div class="pr-12">
                <a-row :gutter="200">
                    <a-col :span="12">
                        <ElButton>取消</ElButton>
                    </a-col>
                    <a-col :span="12">
                        <ElButton @click="goNext(2)">下一步</ElButton>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { regionData } from 'element-china-area-data'
import { dayjs } from 'element-plus';
import { ElMessage } from 'element-plus';
const { form = {
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
    samples: []

} } = defineProps<{
    form: {
        name: string,
        party: string,
        entrust_unit: string,
        reason: string,
        value: string,
        report_code: string,
        delivery_location: string,
        seized_site: string,
        sampling_site: string,
        sampler: string,
        sampling_time: number,
        samples: any[]
    }
}>()
const formRef = ref()

const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '一周后',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            return date
        },
    },
    {
        text: '一月后',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
            return date
        },
    },
]
const disabledDate = (time: Date) => {
    return time.getTime() < Date.now()
}
const activeStep = inject("activeStep")


let delivery_location = $ref('')
let delivery_location_addr = $ref("")
function handleDeliveryChange(value) {
    delivery_location_addr = getAddrLabel(value)
    form.delivery_location = delivery_location_addr + delivery_location
}

function delivery_location_input(value) {
    form.delivery_location = delivery_location_addr + value
}

let seized_site_addr = $ref("")
let seized_site = $ref("")
function handleSeizedChange(value) {
    seized_site_addr = getAddrLabel(value)
    form.seized_site = seized_site_addr + seized_site
}
function seized_site_input(val) {
    form.seized_site = seized_site_addr + val
}

let sampling_site = $ref("")
let sampling_site_addr = $ref("")
function handleSamplingChange(val) {
    sampling_site_addr = getAddrLabel(val)
    form.sampling_site = sampling_site_addr + sampling_site
}
function sampling_site_input(val) {
    form.sampling_site = sampling_site_addr + val
}

function getAddrLabel(value) {
    let result = ""
    regionData.forEach(item => {
        if (item.value === value[0]) {
            result += item.label
            item.children.forEach(item2 => {
                if (item2.value === value[1]) {
                    result += item2.label
                    item2.children.forEach(item3 => {
                        if (item3.value === value[2]) {
                            result += item3.label
                        }
                    })
                }
            })
        }
    })
    return result
}

let sampling_time = $ref(dayjs(new Date).valueOf())
function changeDatePicker(val) {
    form.sampling_time = dayjs(val).valueOf()
}

function goNext(val: number) {
    console.log("222", formRef)
    if (!formRef) return
    formRef.value.validate((valid) => {
        if (valid) {
            activeStep.setActiveStep(val)
        } else {
            ElMessage({
                message: "请完整填写表单信息",
                type: 'warn'
            })
            return false
        }
    })
}
onMounted(() => {
})
</script>
<style scoped></style>