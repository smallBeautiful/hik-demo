/**
 * 按照首字母排序，并在首字母相同的情况下按照后续字符依次比较
 * @param {Object} a - 第一个对象
 * @param {Object} b - 第二个对象
 * @returns {number} - 返回值小于 0 表示 a 在排序中应排在 b 前面，返回值大于 0 表示 a 在排序中应排在 b 后面，返回值等于 0 表示 a 和 b 的排序位置相同
 */
function compareObjects(a, b) {
  const nameA = a.pinyin.toLowerCase()
  const nameB = b.pinyin.toLowerCase()

  for (let i = 0; i < nameA.length; i++) {
    if (i === nameB.length) {
      // b 较短，b 排在前面
      return 1
    }

    if (nameA[i] < nameB[i]) {
      return -1
    } else if (nameA[i] > nameB[i]) {
      return 1
    }
  }

  if (nameB.length > nameA.length) {
    // a 较短，a 排在前面
    return -1
  }

  return 0
}

const names = [
  { name: '张三', pinyin: 'zhangsan' },
  { name: '李四', pinyin: 'lisi' },
  { name: '王五', pinyin: 'wangwu' },
  { name: '赵六', pinyin: 'zhaoliu' },
  { name: '陈七', pinyin: 'chenqi' },
  { name: '刘八', pinyin: 'liuba' },
  { name: '孙九', pinyin: 'sunjiu' },
  { name: '周十', pinyin: 'zhoushi' },
  { name: '吴十一', pinyin: 'wushiyi' },
  { name: '郑十二', pinyin: 'zheng shi er' }
]

names.sort(compareObjects)

console.log(names)
