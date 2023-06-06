import { defineStore } from 'pinia'
export const codeStore = defineStore('code', () => {
    let code = $ref("")
    return { code }
})