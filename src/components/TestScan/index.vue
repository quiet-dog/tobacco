<script lang='ts' setup>
let a = $ref('')
</script>

<template>
    <div class="parent" contenteditable="true" v-model="a">
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
