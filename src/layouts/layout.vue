<template>
    <div class="h-full">
        <el-container class="h-full">
            <el-header class="full-header" style="height: 60px;">
                <MenuHeader />
            </el-header>
            <el-container style="height: calc(100% - 60px);">
                <el-aside width="200px" id="aside-menu">
                    <AsideMenu />
                </el-aside>
                <el-main id="layout-main" class="h-full" style="overflow-y: hidden;">
                    <!-- <div>
                        <el-tabs id="my-tabs" v-model="editableTabsValue" :addable="false" type="card" class="demo-tabs"
                            @edit="handleTabsEdit" @tab-click="clickTab">
                            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title"
                                :name="item.name">
                            </el-tab-pane>
                        </el-tabs>
                    </div> -->
                    <div style="height: calc(100%);">
                        <RouterView v-slot="{ Component }">
                            <KeepAlive>
                                <component :is="Component"></component>
                            </KeepAlive>
                        </RouterView>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
const editableTabsValue = ref('2')
const route = useRoute()
const router = useRouter()
const editableTabs = ref([
    {
        title: '案件中心',
        name: 'case',
        content: '/home/case/identification',
    },
])
let include = $ref(['case'])
const handleTabsEdit = (
    targetName: any,
    action: 'remove' | 'add'
) => {
    // if (action === 'add') {
    //     const newTabName = `${++tabIndex}`
    //     editableTabs.value.push({
    //         title: 'New Tab',
    //         name: newTabName,
    //         content: 'New Tab content',
    //     })
    //     editableTabsValue.value = newTabName
    // } else 
    if (action === 'remove') {
        // console.log(targetName)
        if (targetName.search('case') !== -1) return
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }
        include = include.filter(item => item !== targetName)
        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
        editableTabs.value.forEach(item => {
            if (item.name === editableTabsValue.value) {
                router.push(item.content)
            }
        })
    }
}
function clickTab(pane: any, ev: Event) {
    // console.log(pane)
    editableTabs.value.forEach(item => {
        if (item.name === pane.props.name) {
            router.push(item.content)
        }
    })
}
watch(() => route.path, (a, old) => {
    // 获取/home/后面的内容
    const val = a.split("/")[2]
    if (val.search("case") === 0 && include.find(item => item === "case") !== undefined) {
        editableTabsValue.value = "case"
        editableTabs.value.forEach(item => {
            if (item.name === "case") {
                item.content = a
            }
        })
        return
    } else if (val.search("case") === 0 && include.find(item => item === "case") === undefined) {
        include.push("case")
        editableTabs.value.push({
            title: "案件中心",
            name: "case",
            content: a
        })
        editableTabsValue.value = "case"
        return
    }
    if (include.find(item => item === val) !== undefined) {
        editableTabsValue.value = route.name as string
        return
    } else {
        include.push(route.name)
        editableTabs.value.push({
            title: route.meta.title as string,
            name: route.name as string,
            content: a
        })
        editableTabsValue.value = route.name as string
        return
    }
}, {
    deep: true,
    immediate: true
})
</script>
<style scoped>
#layout-main :deep(> div.el-page-header.el-page-header--has-breadcrumb > div.el-page-header__header) {
    display: none;
}

#aside :deep() {}

div.aside-menu-my:deep(>div>ul) {
    border-right: 0 !important;
}

#aside-menu :deep(> div > ul) {
    border-right: 0;
    overflow-y: hidden;
}

#aside-menu :deep() {
    /* background-color: white; */
}

#my-tabs:deep(> div.el-tabs__header.is-top) {
    margin-bottom: 3px;
}

#my-tabs:deep(> div.el-tabs__header.is-top) {
    border-bottom: 10px solid whitesmoke;
}

#layout-main {
    padding-left: 0 !important;
    border-left: 5px solid whitesmoke;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
}
</style>