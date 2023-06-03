import myRequest from ".."
// 创建架体
export function createShelveApi(data:any){
    return myRequest({
        url:'/api/admin/shelf',
        method:'post',
        data
    })
}

// 删除架体
export function deleteShelveApi(id:number){
    return myRequest({
        url:'/api/admin/shelf/'+id,
        method:'delete',
    })
}

// 获取架体积列表
export function getShelveListApi(data:any){
    return myRequest({
        url:'/api/admin/shelf/getlist',
        method:'post',
        data
    })
}

// 编辑架体
export function editShelveApi(data:any){
    return myRequest({
        url:'/api/admin/shelf/'+data.id,
        method:'put',
        data
    })
}