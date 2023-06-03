import myRequest from ".."
export function createAreaApi(data: {
  name: string,
  info: string,
  code: string
}) {
  return myRequest({
    url: '/api/admin/area',
    method: 'post',
    data
  })
}

// 获取库区列表
export function getAreaListApi(data: {
  page_index: number,
  page_size: number
}) {
  return myRequest({
    url: '/api/admin/area/getlist',
    method: 'post',
    data
  })
}

// 编辑库区列表
export function editAreaApi(data: any) {
  return myRequest({
    url: '/api/admin/area/' + data.id,
    method: 'put',
    data
  })
}
// 删除库区
export function deleteAreaApi(id: number) {
  return myRequest({
    url: '/api/admin/area/' + id,
    method: 'delete',
  })
}

// 获取库区架体选择器
export function getAreaSelectorApi() {
  return myRequest({
    url: '/api/admin/area/shelves',
    method: 'get',
  })
}