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