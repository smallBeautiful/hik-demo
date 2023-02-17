const Mock = require('mockjs')
// const data =
function mock() {
  return Mock.mock({
    'items|20': [{
      id: '@increment()',
      title: '@sentence(15, 21)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name1',
      display_time: '@datetime',
      pageviews: '@integer(4100, 5000)'
    }]
  })
}

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = mock().items
      return {
        code: 20000,
        data: {
          total: 300,
          items: items
        }
      }
    }
  }
]
