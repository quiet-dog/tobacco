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
// import $ from 'jquery'
import template from './template'

let aaa = $ref(template)

disAutoConnect();
let hiprintTemplate = new hiprint.PrintTemplate({
    template: aaa,
    settingContainer: "#PrintElementOptionSetting",

});


// 设置连接的地址


// function test() {
//     hiprint.PrintTemplate({
//         test.panels[0]
//     })
// }
function test22() {
    let data = {
        all1: '2',
        all2: '222',
        all3: '333',
        qrcode: '121'
    }
    console.log("list", hiprintTemplate.getPrinterList())

    let list = hiprintTemplate.getPrinterList()
    hiprintTemplate.getHtml(data);

    hiprintTemplate.print2(data, {
        printer: list[4].name,
    });

}
onMounted(() => {
    // hiprint.init()
    // window.hiwebSocket.stop()
    window.hiwebSocket.setHost('192.168.0.64:17521')
    // window.hiwebSocket.start()
    hiprintTemplate.design("#hiprint-printTemplate");


})
</script>
<style scoped></style>