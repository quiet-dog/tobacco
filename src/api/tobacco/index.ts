import myRequest from ".."
// 获取商品信息列表
export function getTobaccoListApi(code: number) {
    return myRequest({
        url: 'https://jisutxmcx.market.alicloudapi.com/barcode2/query',
        method: 'get',
        params: {
            barcode: code
        },
        headers: {
            Authorization: "APPCODE df18cb4ac86c4d5291339e659767c924"
        }
    })
}

