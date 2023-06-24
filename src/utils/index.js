const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/*
* 数组对象根据key分组
* */

export function groupBy(array, f) {
  const groups = {}
  array.forEach(function(o) {
    var group = JSON.stringify(f(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function(group) {
    return groups[group]
  })
}

export function arrayGroupBy(list, groupId) {
  const sorted = groupBy(list, function(item) {
    return [item[groupId]]
  })
  return sorted
}

/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
export const getStyle = function(element, styleName) {
  if (!element || !styleName) return '0'
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

export const findChildrenByClassName = function(parentElement, className) {
  return parentElement.querySelectorAll('.' + className)
}

/**
 * 将数字保留两位小数，但只有当小数位数大于两位时才进行处理，小于两位时不做任何改变。
 * @param {number} number - 要处理的数字
 * @returns {number|string} - 处理后的结果，保留两位小数或原始数字
 */
function formatDecimal(number) {
  // 获取小数位数
  const decimalCount = number.toString().split('.')[1]?.length || 0

  // 如果小数位数大于2，则保留两位小数
  if (decimalCount > 2) {
    return number.toFixed(2)
  } else {
    // 小于等于2位小数时，返回原始数字
    return number
  }
}

/**
 * 计算缩放后的真实分辨率
 * @returns {{width: number, height: number}} - 宽, 高
 */
function screenRateSize() {
  const screenWidth = window.screen.width // 屏幕宽度
  const screenHeight = window.screen.height // 屏幕高度
  const screenPixelRatio = window.devicePixelRatio // 屏幕像素密度

  const realScreenWidth = screenWidth / screenPixelRatio
  const realScreenHeight = screenHeight / screenPixelRatio

  return {
    width: formatDecimal(realScreenWidth),
    height: formatDecimal(realScreenHeight)
  }
}

/**
 * 根据给定数组的顺序，对包含对象的数组进行排序。
 * @param {Object[]} obj - 包含对象的数组
 * @param {Array} arr - 用于排序的数组
 * @returns {Object[]} - 排序后的数组
 */
export const sortObjectsByArrayOrder = (obj, arr) => {
  // 创建一个新数组，根据给定的顺序进行排序
  // 返回排序后的数组
  return arr.map((item) => {
    // 使用 find() 方法在 obj 数组中查找与当前元素匹配的对象
    return obj.find((objItem) => objItem.name === item)
  })
}
