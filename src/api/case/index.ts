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

// 统计数量
export function getCaseCountApi() {
    return myRequest({
        url: '/api/admin/law_case/count',
        method: 'get',
    })
}
// 结束案件
export function endCaseApi(data) {
    return myRequest({
        url: '/api/admin/law_case/archive',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 案件出库详情
export function getCaseOutDetailApi(data) {
    return myRequest({
        url: '/api/admin/law_case/out_storage_result',
        method: 'post',
        data: data,
    })
}

// 取消案件
export function cancelCaseApi(data) {
    return myRequest({
        url: '/api/admin/law_case/cancel',
        method: 'post',
        data: data,
    })
}