<script lang='ts' setup>
import SuccessSvg from "@/assets/success.svg";
import { dayjs } from 'element-plus';
const activeStep = inject("activeStep")
let { form = {
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
function goCreate() {
    form = {
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

    }
    form
    activeStep.setActiveStep(0)
}
const router = useRouter()
function goCase() {
    router.push({
        path: '/home/case/identification'
    })
    goCreate()
}
</script>

<template>
    <div class="h-full pt-56">
        <div class="flex">
            <div class="flex-grow">
            </div>

            <div>
                <img width="60" :src="SuccessSvg" alt="" srcset="">
            </div>
            <div class="flex-grow">
            </div>
        </div>
        <div class="flex pt-4">
            <div class="flex-grow">
            </div>
            <h1 style="font-size: 26px;">案件创建成功 </h1>
            <div class="flex-grow">
            </div>
        </div>

        <div class="flex pt-4">
            <div class="flex-grow">
            </div>

            <div class="flex">
                <div class="pr-4">
                    <ElButton @click="goCreate">再建一个</ElButton>
                </div>
                <div class="pl-4">
                    <ElButton type="primary" @click="goCase">查看案件</ElButton>
                </div>
            </div>
            <div class="flex-grow">

            </div>
        </div>
    </div>
</template>

<style scoped></style>
