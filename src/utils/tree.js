/*
* 遍历树形数据
* */

/*
* 树形数据转换为一维数组
* */
export const flatToTree = function(data, props = { id: 'id', children: 'children', pId: 'pId' }) {
  const result = []
  const fn = (arr, cArr, pId = '0') => {
    for (let i = 0; i < arr.length; i++) {
      const item = { ...arr[i], [props.children]: [] }
      if (arr[i][props.pId] === pId) {
        cArr.push(item)
        fn(arr, item[props.children], arr[i][props.id])
      }
    }
  }
  fn(data, result)
  return result
}

/*
* 树形数据扁平化
* */
export const treeToFlat = function(data, props = { children: 'children' }) {
  let queue = []
  const result = []
  queue = queue.concat(JSON.parse(JSON.stringify(data)))
  while (queue.length) {
    const firstItem = queue.shift()
    if (firstItem[props.children]) {
      queue = queue.concat(firstItem[props.children])
      Reflect.deleteProperty(firstItem, [props.children])
    }
    result.push(firstItem)
  }
  return result
}

/*
* 树形数据查找数据
* */
export const rebuildData = (value, arr, props = { name: 'name', children: 'children' }) => {
  const newArr = []
  arr.forEach(element => {
    if (element[props.children] && element[props.children].length) {
      const ab = rebuildData(value, element[props.children])
      const obj = {
        ...element,
        [props.children]: ab
      }
      console.log(obj[props.name])
      if (obj[props.name].indexOf(value) > -1 || (ab && ab.length)) {
        newArr.push(obj)
      }
    } else {
      console.log(element[props.name])
      console.log(element[props.name].indexOf(value))
      if (element[props.name].indexOf(value) > -1) {
        newArr.push(element)
      }
    }
  })
  return newArr
}

export const findCurNode = (tree, curKey, keyField, node = null) => {
  tree.forEach((item) => {
    if (item[keyField] === curKey) {
      node = item
    }
    if (item.childrens && item.childrens.length) {
      const findChildren = findCurNode(item.childrens, curKey, keyField, node)
      if (findChildren) {
        node = findChildren
      }
    }
  })
  return node
}

/**
 * @description 查找包含自身节点的父代节点
 * @param tree 需要查找的树数据
 * @param curKey 当前节点key
 * @param keyField 自定义 key 字段
 * @param node 找到的node 可以不传
 */
export const findCurNode2 = (tree, curKey, keyField, node = null) => {
  console.log(tree, curKey, keyField)
  const stack = []
  for (const item of tree) {
    if (item) {
      stack.push(item)
      while (stack.length) {
        const temp = stack.pop()

        if (temp[keyField] === curKey) {
          node = temp
          break
        }

        const childrens = temp.childrens || []
        for (let i = childrens.length - 1; i >= 0; i--) {
          stack.push(childrens[i])
        }
      }
    }
  }
  return node
}
