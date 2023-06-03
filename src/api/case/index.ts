import myRequest from ".."
// 新建案件
export function createCaseApi(data: any) {
    return myRequest({
        url: '/api/admin/law_case',
        method: 'post',
        data
    })
}