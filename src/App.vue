<template>
    <div class="h-full">
        <ScannerGun />
        <el-config-provider :locale="locale" :size="'large'">
            <RouterView v-slot="{ Component }">
                <component :is="Component"></component>
            </RouterView>
        </el-config-provider>
    </div>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = ref(zhCn)

onMounted(() => {
    // let code = ""
    // let lastTime: number | null = null;
    // let nextTime = null;
    // // let code = $ref("");
    // let lastCode: string | undefined, nextCode = undefined;

    // function getScannerCode(e: KeyboardEvent) {
    //     if (lastCode === undefined) {
    //         lastCode = String(e.key);
    //         lastTime = new Date().getTime();
    //         return;
    //     }
    //     nextCode = String(e.key);
    //     nextTime = new Date().getTime();
    //     if (lastCode != undefined && lastTime != null && nextTime - lastTime <= 20) {
    //         // 扫码枪输入
    //         if (nextCode === "Enter") {
    //             code += lastCode
    //             // getScangerCode(code)
    //             console.log("code", code)
    //             code = "";
    //             lastCode = undefined
    //             return;
    //         } else {
    //             code += lastCode
    //             lastCode = nextCode;
    //             lastTime = nextTime
    //         }
    //     }
    // }
    // window.document.onkeydown = function (e) {
    //     if (lastCode === undefined) {
    //         lastCode = String(e.key);
    //         lastTime = new Date().getTime();
    //         return;
    //     }
    //     nextCode = String(e.key);
    //     nextTime = new Date().getTime();
    //     console.log(lastCode, nextCode, lastTime, nextTime, lastTime, nextTime - lastTime)
    //     if (lastCode != undefined && lastTime != null && nextTime - lastTime <= 30) {
    //         // 扫码枪输入
    //         if (nextCode === "Enter") {
    //             code += lastCode
    //             // getScangerCode(code)
    //             console.log("code", code)
    //             code = "";
    //             lastCode = undefined
    //             return;
    //         } else {
    //             code += lastCode
    //             lastCode = nextCode;
    //             lastTime = nextTime
    //             console.log('lastTime', lastTime)
    //         }
    //     } else {
    //         code = ""
    //         lastCode = undefined
    //         lastTime = null
    //         nextTime = null
    //         nextCode = undefined
    //     }
    // }
})
</script>
