import { AxiosResponse } from "@/@types/httpType";
import http from "@/http";
import { AxiosRequestConfig } from "axios";
// 封装响应的类型
// 创建异步请求
export const baseURL = "https://tobacco-bk.singzer.cn";
// 判断当前环境是nwjs还是浏览器
async function myRequest<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
        // 判断res是不是Blob类型


        const res = (await http(options)).data as AxiosResponse<T>;

        // 判断res是不Blob类型
        if (res instanceof Blob) {
            console.log('123131', res)
            return Promise.resolve<AxiosResponse<T>>(res)
        }

        if (res.status === 500) {
            res.msg = "服务器错误";
        }
        return Promise.resolve<AxiosResponse<T>>(res)
    } catch (err) {
        // if (err.status === 500) {
        //     err.msg = "服务器错误";
        // }
        return Promise.reject(err as AxiosResponse<T>)
    }
}

export default myRequest