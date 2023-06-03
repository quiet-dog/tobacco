<template>
    <div>

    </div>
</template>
<script lang="ts" setup>
const emit = defineEmits<{
    change: [code: string]
}>()
let lastTime: number | null = $ref(null);
let nextTime = $ref(null);
let code = $ref("");
let lastCode: string | undefined, nextCode = $ref(undefined);
function getScannerCode(e: KeyboardEvent) {
    // console.log(e)
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
            emit("change", code)
            code = "";
            lastCode = undefined
            return;
        } else {
            code += lastCode
            lastCode = nextCode;
            lastTime = nextTime
        }
    }
}
onMounted(() => {
    // 监听是不是扫码枪输入的内容,获取扫码枪的数据
    window.document.addEventListener('keydown', getScannerCode, true)
})
onUnmounted(() => {
    window.document.removeEventListener('keydown', getScannerCode, true)
})
</script>
<style scoped></style>