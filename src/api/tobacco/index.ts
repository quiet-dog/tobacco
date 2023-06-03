import myRequest from ".."
// 获取商品信息列表
export function getTobaccoListApi(code: number) {
    return myRequest({
        url: 'https://bff.gds.org.cn/gds/searching-api/ProductService/ProductListByGTIN',
        method: 'get',
        params: {
            PageSize: 30,
            PageIndex: 1,
            SearchItem: code
        }
    })
}