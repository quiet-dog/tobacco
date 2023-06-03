<template>
    <div>
        login
        <button @click="test">test</button>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function test(){
    router.push("/home/case")
}
</script>