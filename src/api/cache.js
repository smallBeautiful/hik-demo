import request from '@/utils/request'

export function getData(data) {
  return request({
    url: '/vue-admin-template/cache/list',
    method: 'post',
    data
  })
}
