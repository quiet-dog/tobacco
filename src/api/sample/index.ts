import myRequest from ".."
// 获取样本列表
export function getSampleListApi(data: any) {
    return myRequest({
        url: '/api/admin/sample/getlist',
        method: 'POST',
        data
    })
}

// 通过code获取单个样本
export function getSampleByCodeApi(data: any) {
    return myRequest({
        url: '/api/admin/sample/getbycode',
        method: 'POST',
        data
    })
}

// 样本鉴定
export function sampleIdentifyApi(data: any) {
    return myRequest({
        url: '/api/admin/sample/identify',
        method: 'POST',
        data
    })
}

// 设置剩余样品状态
export function setSampleStatusApi(data: any) {
    return myRequest({
        url: '/api/admin/law_case/identify/patch',
        method: 'POST',
        data
    })
}

// 获取鉴定结果
export function getSampleResultApi(data: any) {
    return myRequest({
        url: '/api/admin/law_case/identify_result',
        method: 'POST',
        data: data
    })
}


// 获取单个样品信息
export function getSampleInfoApi(data: any) {
    return myRequest({
        url: '/api/admin/sample/get',
        method: 'POST',
        data: data
    })
}

// 导出excel
export function exportSampleApi(data: any) {
    return myRequest({
        url: '/api/admin/sample/exportlist',
        method: 'POST',
        data: data,
        responseType: 'blob'
    })
}