<template>
    <div class="h-full">
        <!-- header -->
        <div class="px-3" style="height: 60px;border-bottom: 5px whitesmoke solid;">
            <!-- 插槽 -->
            <slot name="header"></slot>
        </div>
        <!-- main -->
        <div class="px-3" style="height: calc(100% - 120px);">
            <div class="table-height h-full pt-4">
                <slot name="table"></slot>
            </div>
        </div>
        <div style="height: 55px;" class="flex mt-4 px-3">
            <slot name="page"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style scoped></style>