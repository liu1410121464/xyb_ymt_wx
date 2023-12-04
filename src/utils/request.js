import axios from 'axios'
import { getTokenUrl } from '@/utils/auth'
// vue3.0如何引入vant
import { showLoadingToast } from 'vant'
import { initKey, encryptText, decryptText, encryptRsa } from '@/utils/Encrypt'
const rsaKeyA = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPMasWaSl604E-PSoddS-tqPd7bjvGwqzb7b90NIyq7v58dokpsp15chk5qJEZKHfOhwgPmdmfi2u37NeGzlcUVcAGY3DYYhINmFn_B2a5MLp7GWGNN0pbLvjiLLsOLpRTiWK3W-utTeqiE5HjrUkVjMQF3SLTv6prAtguGkBdqwIDAQAB'
// 初始化密钥
const aesKeyC = initKey()
// 入参
const rsaD = encryptRsa(aesKeyC, rsaKeyA)
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers['x-ek'] = rsaD
        // do something before request is sent
        if (getTokenUrl()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] ='Bearer ' + getTokenUrl()
        }
        // post请求映射data参数,如果是文件上传，则不需要加密
  if ((config.method === 'post' || config.method === 'put')) {
      config.data = typeof config.data === 'object' ? { '_encData_': encryptText(JSON.stringify(config.data), aesKeyC) } : config.data
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
        let responseData = response.data
  if (res.headers['x-ec'] === 'true') {
    const resp_encData_ = responseData['_encData_']
    const decryptTexts = decryptText(resp_encData_, aesKeyC) || ''
    try {
      if (decryptTexts.startsWith('{') || decryptTexts.startsWith('[')) {
        responseData = JSON.parse(decryptTexts)
      } else {
        responseData = decryptTexts
      }
    } catch (e) {
      responseData = decryptTexts
    }
  }
        return responseData
    },
    error => {
        // Toast.clear()
        // Dialog({ message: ((error.response || {}).data || {}).message || '服务器异常，请重试' })
        return Promise.reject(error)
    }
)

export default service