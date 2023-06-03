import axios from 'axios'

// const baseURL = import.meta.env.DEV ? "/api" : "http://192.168.0.130:8080";
const baseURL = "http://192.168.0.81:8080";
const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 禁止缓存
        'Cache-Control': 'no-cache'
    }
})
// 设置拦截器
http.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + '12345678abc'
    return config
}
    , error => {
        return Promise.reject(error)
    }
)
http.interceptors.response.use(response => {

    return response
}
    , error => {
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