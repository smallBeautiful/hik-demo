const sortObjectsByArrayOrder = (obj, arr) => {
  // 创建一个新数组，根据给定的顺序进行排序
  // 返回排序后的数组
  return arr.map((item) => {
    // 使用 find() 方法在 obj 数组中查找与当前元素匹配的对象
    return obj.find((objItem) => objItem.name === item)
  })
}

const obj = [{ name: 'b' }, { name: 'a' }]
const arr = ['a', 'b']

const sortedArray = sortObjectsByArrayOrder(obj, arr)
console.log(sortedArray) // 输出: [{ name: 'a' }, { name: 'b' }]
