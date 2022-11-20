const treeData = [
  {
    id: '1',
    name: '测试1',
    pIds: '0',
    childrens: [
      {
        id: '11',
        name: '测试11',
        pIds: '1',
        childrens: [
          {
            id: '111',
            name: '测试111',
            pIds: '11',
            childrens: [
              {
                id: '1111',
                name: '测试1111',
                pIds: '111'
              },
              {
                id: '1112',
                name: '测试1112',
                pIds: '111'
              }
            ]
          },
          {
            id: '112',
            name: '测试112',
            pIds: '11',
            childrens: [
              {
                id: '1121',
                name: '测试1121',
                pIds: '112'
              }
            ]
          },
          {
            id: '113',
            name: '测试113',
            pIds: '11'
          }
        ]
      },
      {
        id: '12',
        name: '测试12',
        pIds: '1',
        childrens: [
          {
            id: '121',
            name: '测试121',
            pIds: '12'
          }
        ]
      },
      {
        id: '13',
        name: '测试13',
        pIds: '1'
      },
      {
        id: '14',
        name: '测试14',
        pIds: '1'
      }
    ]
  },
  {
    id: '2',
    name: '测试2',
    pIds: '0',
    childrens: [
      {
        id: '21',
        name: '测试21',
        pIds: '2',
        childrens: [
          {
            id: '211',
            name: '测试211',
            pIds: '21'
          },
          {
            id: '212',
            name: '测试212',
            pIds: '21'
          }
        ]
      },
      {
        id: '22',
        name: '测试22',
        pIds: '2'
      }
    ]
  }
]

module.exports = [
  {
    url: '/vue-admin-template/treeList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          treeData
        }
      }
    }
  }
]
