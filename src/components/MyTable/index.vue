<template>
    <div class="h-full">
        <!-- header -->
        <div style="height: 60px;">
            <!-- 插槽 -->
            <slot name="header"></slot>
        </div>
        <!-- main -->
        <div style="height: calc(100% - 120px);">
            <div class="table-height">
                <slot name="table"></slot>
            </div>
        </div>
        <div style="height: 60px;" class="flex">
            <slot name="page"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style scoped>

</style>