import axios from 'axios'

// const baseURL = import.meta.env.DEV ? "/api" : "http://192.168.0.130:8080";
const baseURL = location.protocol + "://" + location.hostname + ":8091";
const http = axios.create({
    // baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 禁止缓存
        'Cache-Control': 'no-cache'
    }
})
// 设置拦截器
http.interceptors.request.use(config => {

    // 判断请求的地址

    // 将请求的origin换成location.origin
    // config.baseURL = "http://" + location.hostname + ":8091"
    // config.baseURL = "http://192.168.0.193:8091"
    if (config.url?.includes('/barcode2/query')) {
        return config
    }
    if (config.url?.includes('/login')) {
        return config
    } else {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
    }

    return config
}
    , error => {
        return Promise.reject(error)
    }
)
http.interceptors.response.use(response => {
    // if (response.headers['content-disposition']) {//此判断主要是要取到content-disposition的值
    //     return response
    // }
    return response
}
    , error => {
        console.log("res error", error)

        let res = {}
        if (error['response'] === undefined) {
            res = {
                data: null,
                status: 500,
                msg: '服务器错误',
                err: '服务器错误'
            }
            return Promise.reject(res)
        }

        if (error.response['data'] === undefined) {
            res = {
                data: null,
                status: error.response.status,
                msg: error.response.statusText,
                err: error.response.statusText
            }
            return Promise.reject(res)
        }
        if (typeof error.response['data'] === 'string' && error.response['data'].length > 0) {
            res = {
                data: error.response['data'],
                status: error.response.status,
                msg: error.response.statusText,
                err: error.response.statusText
            }
            // console.log('22')
            return Promise.reject(res)
        }
        // console.log('222')
        if (error.response.data !== "") {
            res = {
                data: error.response.data.data,
                status: error.response.data.status,
                msg: error.response.data.msg,
                err: error.response.data.err
            }
        } else {
            res = {
                data: null,
                status: error.response.status,
                msg: error.response.statusText,
                err: error.response.statusText
            }
        }

        return Promise.reject(res)
    }
)
export default http