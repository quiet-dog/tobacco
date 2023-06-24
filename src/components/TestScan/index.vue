<script lang='ts' setup>
let a = $ref('')
function testInput(e) {

}
</script>

<template>
    <div class="parent" contenteditable="true" @input="testInput">
    </div>
</template>

<style scoped>
.parent {
    position: relative;
    /* 其他样式属性 */
    color: transparent;
}

.parent::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 2;
}
</style>
