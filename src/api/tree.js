import request from '@/utils/request'

export function getTreeList() {
  return request({
    url: '/vue-admin-template/treeList',
    method: 'get'
  })
}
