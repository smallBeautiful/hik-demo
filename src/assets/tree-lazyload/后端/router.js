const express = require('express')
const route = express.Router() // 实例化一个路由对象

// 获取最外层tree数据结构
route.get('/getTreeData', (req, res) => {
  let obj = {
    code: 0,
    data: [
      {
        name: "西游记",
        id: "111",
        isLeaf: false
      },
      {
        name: "三国演义",
        id: "222",
        isLeaf: false
      },
    ]
  }
  res.send(obj)
})

// 根据id查询对应层级tree数据
route.get('/getTreeChildData', (req, res) => {
  // console.log('身份id', req.query.id);
  // 树结构最外层是 西游记 和 三国演义 这两个
  if (req.query.id == "111") { // 说明点击的是 西游记 ，就加载西游记点下一层的数据
    let obj = {
      code: 0,
      data: [
        {
          name: "孙悟空",
          id: "111-1",
          isLeaf: true, // isLeaf是用来判断是否是最内层的树节点，当有这个属性，且为true的时候，就说明已经到最内层了，若无，或者不写，就还有里层树
          home: "花果山水帘洞",
          status: "0"
        },
        {
          name: "猪八戒",
          id: "111-2",
          isLeaf: true,
          home: "高老庄",
          status: "0"
        },
        {
          name: "沙和尚",
          id: "111-3",
          isLeaf: true,
          home: "通天河",
          status: "0"
        },
      ]
    }
    res.send(obj)
  } else if (req.query.id == "222") { // 说明点击的是 三国演义 ，就加载三国演义下的数据
    let obj = {
      code: 0,
      data: [
        {
          name: "刘备",
          id: "222-1",
          isLeaf: false,
          home: "河北省涿州市",
          status: "0"
        },
        {
          name: "关羽",
          id: "222-2",
          isLeaf: true,
          home: "山西省运城市",
          status: "0"
        },
        {
          name: "张飞",
          id: "222-3",
          isLeaf: true,
          home: "河北省保定市",
          status: "0"
        },
      ]
    }
    res.send(obj)
  } else if (req.query.id == "222-1") {
    let obj = {
      code: 0,
      data: [
        {
          name: "刘备大儿子",
          id: "222-1-1",
          isLeaf: true,
          home: "蜀国",
          status: "0"
        },
        {
          name: "刘备小儿子",
          id: "222-1-2",
          isLeaf: true,
          home: "蜀国",
          status: "0"
        },
      ]
    }
    res.send(obj)
  }

})


module.exports = route // 暴露出去方便管理