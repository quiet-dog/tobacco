<script lang='ts' setup>
import Plyr from 'plyr';
import "plyr/dist/plyr.css";

const { video = {
    path: '',
    mime_type: ''
}, width = '800px' } = defineProps<{
    video: {
        path: string,
        mime_type: string
    },
    width: string
}>()
let player = $ref<Plyr>()
const emit = defineEmits<{
    close: []
}>()
const testBodyRef = ref()
onMounted(() => {
    player = new Plyr("#player", {
        seekTime: 5
    })
    // document.querySelector("body").appendChild(testBodyRef.value)
})
onUnmounted(() => {
    player.destroy()
})
</script>

<template>
    <div ref="testBodyRef" class="viewer-container viewer-backdrop viewer-fixed viewer-fade viewer-transition viewer-in"
        style="z-index: 999999;" @click="$emit('close')">
        <div class="absolute flex items-center justify-center h-full w-full">
            <div class="flex-grow">

            </div>
            <div @click.stop="">
                <div :style="{
                    width: width
                }">
                    <video controls id="player" playsinline>
                        <source :src="video.path" :type="video.mime_type" />
                    </video>
                </div>

            </div>
            <div class="flex-grow">

            </div>
        </div>
    </div>
</template>

<style scoped></style>
