import myRequest from ".."
// 获取用户列表
export function getUserListApi(data: any) {
    return myRequest({
        url: '/api/admin/user/getlist',
        method: 'POST',
        data
    })
}
// 创建用户
export function createUserApi(data: any) {
    return myRequest({
        url: '/api/admin/user',
        method: 'POST',
        data
    })
}
// 编辑用户
export function editUserApi(data: any) {
    return myRequest({
        url: '/api/admin/user/' + data.id,
        method: 'PUT',
        data: {
            username: data.username,
            password: data.password,
            role: data.role,
            info: data.info,
            certificate_code: data.certificate_code,
            name:data.name,
            age:data.age,
            unit:data.unit,
            gender:data.gender,
        }
    })
}

// 删除用户
export function deleteUserApi(id: number) {
    return myRequest({
        url: '/api/admin/user/' + id,
        method: 'DELETE',
    })
}