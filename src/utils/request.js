import axios from 'axios'
import { getTokenUrl } from '@/utils/auth'
// vue3.0如何引入vant
import { showLoadingToast } from 'vant'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (getTokenUrl()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] ='Bearer ' + getTokenUrl()
    }
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 2000
    })
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // Toast.clear()
        return response.data
    },
    error => {
        // Toast.clear()
        // Dialog({ message: ((error.response || {}).data || {}).message || '服务器异常，请重试' })
        return Promise.reject(error)
    }
)

export default service