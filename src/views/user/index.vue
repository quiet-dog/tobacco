<template>
    <div class="h-full">
        <ElContainer class="h-full">
            <ElHeader style="height: 50px;border-bottom: 5px whitesmoke solid;" class="mt-6">
                <div class="flex">
                    <div>
                        <ElButton type="primary" @click="dialog1 = true">新建用户</ElButton>
                    </div>
                    <!-- <div class="flex-grow"></div>
                    <div>
                        <ElInput v-model="searchInput" @change="changeSearch" placeholder="输入用户名进行过滤" />
                    </div> -->
                </div>
            </ElHeader>
            <ElMain style="height: calc(100% - 50px);">
                <div class="h-full">
                    <div style="height: calc(100% - 60px);">
                        <ElTable max-height="100%" height="100%" :header-cell-style="{ background: '#FAFAFA' }"
                            :data="tableData">
                            <ElTableColumn prop="id" label="编号" />
                            <ElTableColumn prop="name" label="名字" />
                            <ElTableColumn prop="username" label="用户名" />
                            <ElTableColumn prop="role" label="角色" />
                            <ElTableColumn prop="certificate_code" label="证书编号" />
                            <ElTableColumn prop="certificate_time" label="证书时间" />
                            <ElTableColumn prop="age" label="年龄" />
                            <ElTableColumn prop="unit" label="单位" />
                            <ElTableColumn prop="gender" label="性别" />
                            <ElTableColumn prop="created_at" label="创建时间" />
                            <ElTableColumn width="140" label="操作">
                                <template #default="scope">
                                    <ElButton text type="primary" class="button-pl button-pr" @click="editUser(scope.row)">
                                        编辑
                                    </ElButton>
                                    <ElButton text type="danger" class="button-pl" @click="deleteUser(scope.row.id)">删除
                                    </ElButton>
                                </template>
                            </ElTableColumn>
                        </ElTable>
                    </div>
                    <div class="flex py-4 mt-1" style="height: 60px;">
                        <div class="text-gray-400">共{{ total }}条</div>
                        <div class="flex-grow"></div>
                        <div>
                            <el-pagination v-model:currentPage="page" v-model:page-size="pageSize"
                                layout="prev, pager, next" :total="total" @current-change="handlePage"
                                @size-change="handeleSize" />
                        </div>
                    </div>
                </div>
            </ElMain>
        </ElContainer>
        <ElDialog width="25%" title=" 新建用户" v-model="dialog1" @closed="closed1">
            <ElForm class="px-12" ref="formRef" :model="form" label-width="70px">
                <el-form-item :rules="[{
                    required: true,
                    message: '请填写用户名',
                    trigger: ['blur', 'change'],
                }]" prop="username" label="用户名">
                    <el-input v-model="form.username" placeholder="请填写用户名"></el-input>
                </el-form-item>
                <el-form-item :rules="[{
                    required: true,
                    message: '请填写密码',
                    trigger: ['blur', 'change'],
                }]" prop="password" label="密码">
                    <el-input v-model="form.password" placeholder="请填写密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role" :rules="[{
                    required: true,
                    message: '请选择角色',
                    trigger: ['blur', 'change'],
                }]">
                    <el-select style="width: 100%;" v-model="form.role" placeholder="请选择角色">
                        <el-option label="管理员" value="admin" />
                        <el-option label="普通用户" value="user" />
                    </el-select>
                </el-form-item>
                <ElFormItem prop="name" label="名字">
                    <ElInput v-model="form.name" placeholder="请填写名字" />
                </ElFormItem>
                <ElFormItem prop="info" label="备注">
                    <ElInput v-model="form.info" placeholder="请填写备注" />
                </ElFormItem>
                <ElFormItem prop="certificate_code" label="证书编号">
                    <ElInput v-model="form.certificate_code" placeholder="请填写证书编号" />
                </ElFormItem>
                <ElFormItem prop="certificate_time" label="证书时间">
                    <el-date-picker  
    type="date"  
    :value="form.certificate_time"  
    format="yyyy-MM-dd" /> 
                </ElFormItem>
                <ElFormItem prop="age" label="年龄">
                    <ElInput v-model="form.age" placeholder="请填写年龄" />
                </ElFormItem>
                <ElFormItem prop="unit" label="单位">
                    <ElInput v-model="form.unit" placeholder="请填写单位" />
                </ElFormItem>
                <ElFormItem prop="gender" label="性别">
                    <ElInput v-model="form.age" placeholder="请填写性别" />
                </ElFormItem>
            </ElForm>
            <template #footer>
                <div class="flex">
                    <div class="flex-grow"></div>
                    <div class="flex">
                        <div class="pr-5">
                            <ElButton @click="dialog1 = false">取消</ElButton>
                        </div>
                        <div>
                            <ElButton type="primary" @click="submit">确定</ElButton>
                        </div>
                    </div>
                </div>
            </template>
        </ElDialog>

        <ElDialog width="25%" title="编辑用户" v-model="dialog2" @closed="close2">
            <ElForm class="px-12" ref="formRef2" :model="form2" label-width="70px">
                <el-form-item :rules="[{
                    required: true,
                    message: '请填写用户名',
                    trigger: ['blur', 'change'],
                }]" prop="username" label="用户名">
                    <el-input v-model="form2.username" placeholder="请填写用户名"></el-input>
                </el-form-item>
                <el-form-item :rules="[{
                    required: true,
                    message: '请填写密码',
                    trigger: ['blur', 'change'],
                }]" prop="password" label="密码">
                    <el-input v-model="form2.password" placeholder="请填写密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role" :rules="[{
                    required: true,
                    message: '请选择角色',
                    trigger: ['blur', 'change'],
                }]">
                    <el-select style="width: 100%;" v-model="form2.role" placeholder="请选择角色">
                        <el-option label="管理员" value="admin" />
                        <el-option label="普通用户" value="user" />
                    </el-select>
                </el-form-item>
                <ElFormItem prop="name" label="名字">
                    <ElInput v-model="form2.name" placeholder="请填写名字" />
                </ElFormItem>
                <ElFormItem prop="info" label="备注">
                    <ElInput v-model="form2.info" placeholder="请填写备注" />
                </ElFormItem>
                <ElFormItem prop="certificate_code" label="证书编号">
                    <ElInput v-model="form2.certificate_code" placeholder="请填写证书编号" />
                </ElFormItem>
                <ElFormItem prop="certificate_time" label="证书编号">
                    <el-date-picker  
    type="date"  
    :value="form2.certificate_time"  
    format="yyyy-MM-dd" />  
                </ElFormItem>
                <ElFormItem prop="age" label="年龄">
                    <ElInput v-model="form2.certificate_time" placeholder="请填写年龄" />
                </ElFormItem>
                <ElFormItem prop="unit" label="单位">
                    <ElInput v-model="form2.unit" placeholder="请填写单位" />
                </ElFormItem>
                <ElFormItem prop="gender" label="性别">
                    <ElInput v-model="form2.gender" placeholder="请填写性别" />
                </ElFormItem>
            </ElForm>
            <template #footer>
                <div class="flex">
                    <div class="flex-grow"></div>
                    <div class="flex">
                        <div class="pr-5">
                            <ElButton @click="dialog2 = false">取消</ElButton>
                        </div>
                        <div>
                            <ElButton type="primary" @click="submit2">确定</ElButton>
                        </div>
                    </div>
                </div>
            </template>
        </ElDialog>
    </div>
</template>
<script lang="ts" setup>
import { createUserApi, getUserListApi, editUserApi, deleteUserApi } from '@/api/user';
import { ElMessage, ElMessageBox } from 'element-plus';

let dialog1 = $ref(false)
let dialog2 = $ref(false)
let page = $ref(1)
let pageSize = $ref(10)
let total = $ref(0)
let tableData = $ref([])
let form = $ref({
    username: '',
    password: '',
    info: '',
    role: 'user',
    certificate_code:'',
    certificate_time:'',
    name:'',
    age:'',
    unit:'',
    gender:'',
})
let searchInput = $ref('')
/**
 *  "id": 1,
                "created_at": 1685626716688,
                "updated_at": 1685626716688,
                "name": "",
                "username": "admin",
                "role": "admin",
                "info": "",
                "is_init": false

                 <ElTableColumn prop="certificate_code" label="证书编号" />
                            <ElTableColumn prop="certificate_time" label="证书时间" />
                            <ElTableColumn prop="age" label="年龄" />
                            <ElTableColumn prop="unit" label="单位" />
                            <ElTableColumn prop="gender" label="性别" />
 */
let form2 = $ref({
    username: '',
    password: '',
    info: '',
    id: 0,
    role: '',
    name:'',
    certificate_code:'',
    certificate_time:'',
    age:'',
    unit:'',
    gender:''
})
const formRef = ref()
const formRef2 = ref()
function handlePage(val: number) {
    getUserList()
}
function handeleSize(val: number) {
    getUserList()
}
function changeSearch(val) {
    getUserList()
}

function getUserList() {
    getUserListApi({
        page_index: page,
        page_size: pageSize,
        name_filter: searchInput
    }).then(res => {
        total = res.data.total
        tableData = res.data.list
    }).catch(err => {
        ElMessage({
            message: err.msg,
            type: 'error'
        })
    })
}

function editUser(row) {
    form2.id = row.id
    form2.username = row.username
    form2.info = row.info
    form2.role = row.role
    form2.certificate_code = row.certificate_code
    form2.certificate_time = row.certificate_time
    form2.age = row.age
    form2.unit = row.unit
    form2.gender =row.gender
    form2.name = row.name
    dialog2 = true
}

function submit() {
    formRef.value.validate((valid: boolean) => {
        console.log(valid)
        if (valid) {
            createUserApi(form).then(res => {
                ElMessage({
                    message: res.msg,
                    type: 'success'
                })
                dialog1 = false
                getUserList()
            }).catch(err => {
                ElMessage({
                    message: err.msg,
                    type: 'error'
                })
            })
        } else {
            ElMessage({
                message: '请填写必填项',
                type: 'error'
            })
        }
    })
}

function submit2() {
    formRef2.value.validate((valid: boolean) => {
        if (valid) {
            editUserApi(form2).then(res => {
                ElMessage({
                    message: res.msg,
                    type: 'success'
                })
                dialog2 = false
                getUserList()
            }).catch(err => {
                ElMessage({
                    message: err.msg,
                    type: 'error'
                })
            })
        } else {
            ElMessage({
                message: '请填写必填项',
                type: 'error'
            })
        }
    })
}

function deleteUser(id: number) {
    ElMessageBox.confirm(
        '确定要删除该用户吗?',
        '提醒',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteUserApi(id).then(res => {
                ElMessage({
                    type: 'success',
                    message: res.msg,
                })
                getUserList()
            }).catch(err => {
                ElMessage({
                    type: 'error',
                    message: err.msg,
                })
            })

        })
        .catch(() => {
        })
}

function closed1() {
    form.info = ''
    form.password = ''
    form.username = ''
    form.role = 'user'
    form.certificate_code = ''
    form.certificate_time = ''
    form.age = ''
    form.unit = ''
    form.gender = ''
    form.name = ''
    formRef.value.resetFields()
}

function close2() {
    form2.id = 0
    form2.info = ''
    form2.password = ''
    form2.username = ''
    form2.role = ''
    form2.certificate_code = ''
    form2.certificate_time = ''
    form2.age = ''
    form2.unit = ''
    form2.gender = ''
    formRef2.value.resetFields()
}
onMounted(() => {
    getUserList()
})

</script>