<template>
    <!-- 样式完全自定义 -->

    <div>
        <div id="hiprint-printTemplate">


        </div>
        <div id="PrintElementOptionSetting">

        </div>
        <ElButton @click="test22">proasdasd</ElButton>

    </div>
</template>
<script setup lang="ts">
import { disAutoConnect, hiprint } from 'vue-plugin-hiprint'
import template from './template'

let aaa = $ref(template)

disAutoConnect();
let hiprintTemplate = new hiprint.PrintTemplate({
    template: aaa,
    settingContainer: "#PrintElementOptionSetting",

});

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
    console.log("list", hiprintTemplate.getPrinterList())

    let list = hiprintTemplate.getPrinterList()
    hiprintTemplate.getHtml(data);

    hiprintTemplate.print2(data, {
        printer: list[2].name,
    });

}
onMounted(() => {
    // hiprint.init()
    // window.hiwebSocket.stop()
    window.hiwebSocket.setHost('192.168.0.54:17521')
    // window.hiwebSocket.start()
    hiprintTemplate.design("#hiprint-printTemplate");


})
</script>
<style scoped></style>