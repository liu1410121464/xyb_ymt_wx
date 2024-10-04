import request from '@/utils/request'
// 通过获取服务信息判断是否已经注册
export function getService (data) {
  return request({
    url: '/api/ymt/service/V1/list/byUser',
    method: 'post',
    data
  })
}
export function getUserInfo (data) {
  return request({
    url: '/getUserInfo',
    method: 'post',
    data
  })
}
export function getToken (data) {
  return request({
    url: '/getToken',
    method: 'post',
    data
  })
}
// 创建二维码（居民码）
export function getResidentCode () {
  return request({
    url: '/api/ymt/residentCode/V1/createCode',
    method: 'get'
  })
}
// 住宿登记随机码（居民码）
export function getAccommodation () {
  return request({
    url: '/api/ymt/residentCode/V1/stayRandomCode',
    method: 'get'
  })
}
// 网吧登记随机码（居民码）
export function getInternet () {
  return request({
    url: '/api/ymt/residentCode/V1/internetRandomCode',
    method: 'get'
  })
}
// 获取登记码配置列表
export function getRegisterCode (data) {
  return request({
    url: `/api/ymt/residentCode/V1/getFunctionInfo?identifying=${data.identifying}&cityCode=${data.cityCode}&serviceId=${data.serviceId}`,
    method: 'get',
    data
  })
}