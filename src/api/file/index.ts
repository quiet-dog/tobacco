import myRequest from ".."
// 获取文件列表
export function getFileListApi(data: any) {
    return myRequest({
        url: "/api/admin/file/getlist",
        method: "post",
        data
    })
}