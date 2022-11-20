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
