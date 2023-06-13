<template>
    <div>

    </div>
</template>
<script lang="ts" setup>
const emit = defineEmits<{
    change: [code: string]
}>()
let code = $ref("")
let lastTime: number | null = (null);
let nextTime = (null);
// let code = $ref("");
let lastCode: string | undefined, nextCode = (undefined);

function getScannerCode(e: KeyboardEvent) {
    if (lastCode === undefined) {
        lastCode = String(e.key);
        lastTime = new Date().getTime();
        return;
    }
    nextCode = String(e.key);
    nextTime = new Date().getTime();
    if (lastCode != undefined && lastTime != null && nextTime - lastTime <= 30) {
        // 扫码枪输入
        if (nextCode === "Enter") {
            console.log("jinru ")
            code += lastCode
            console.log("codeS.code", code)

            emit("change", code)
            code = ""
            lastCode = undefined
            lastTime = null
            nextTime = null
            nextCode = undefined
            return;
        } else {
            code += lastCode
            lastCode = nextCode;
            lastTime = nextTime
        }
    } else {
        code = ""
        lastCode = undefined
        lastTime = null
        nextTime = null
        nextCode = undefined
    }
}

onMounted(() => {
    // 监听是不是扫码枪输入的内容,获取扫码枪的数据
    document.addEventListener('keydown', getScannerCode, true)
})
onUnmounted(() => {
    document.removeEventListener('keydown', getScannerCode, true)
})
</script>
<style scoped></style>