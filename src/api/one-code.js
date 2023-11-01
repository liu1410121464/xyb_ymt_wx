import request from '@/utils/request'

export function getService (data) {
  return request({
    url: '/api/ymt/service/V1/list/byUser',
    method: 'post',
    data
  })
}