import myRequest from ".."
// 新建案件
export function createCaseApi(data: any) {
    return myRequest({
        url: '/api/admin/law_case',
        method: 'post',
        data
    })
}

// 获取案件列表
export function getCaseListApi(data: any) {
    return myRequest({
        url: "/api/admin/law_case/getlist",
        method: "post",
        data
    })
}

// 单独获取案件
export function getCaseApi(id: any) {
    return myRequest({
        url: `/api/admin/law_case/get`,
        method: "post",
        data: {
            id
        }
    })
}

// 保存案件
export function saveCaseApi(data: any) {
    return myRequest({
        url: '/api/admin/law_case/identify',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function importFileExeclApi(data: any) {
    return myRequest({
        url: '/api/admin/law_case/exportlist',
        method: 'post',
        data,
        responseType: 'blob'
    })
}