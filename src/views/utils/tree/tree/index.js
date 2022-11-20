var objectAssignFns = Object.assign
var isArray = Array.isArray || helperCreateInInObjectString('Array')
var objectToString = Object.prototype.toString
var assign = function(target) {
  if (target) {
    var args = arguments
    if (target === true) {
      if (args.length > 1) {
        target = isArray(target[1]) ? [] : {}
        return handleAssign(target, args, true)
      }
    } else {
      return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args)
    }
  }
  return target
}
function helperCreateTreeFunc(handle) {
  return function(obj, iterate, options, context) {
    var opts = options || {}
    var optChildren = opts.children || 'children'
    return handle(null, obj, iterate, context, [], [], optChildren, opts)
  }
}
function arrayEach(list, iterate, context) {
  if (list) {
    if (list.forEach) {
      list.forEach(iterate, context)
    } else {
      for (var index = 0, len = list.length; index < len; index++) {
        iterate.call(context, list[index], index, list)
      }
    }
  }
}
function handleAssign(destination, args, isClone) {
  var len = args.length
  for (var source, index = 1; index < len; index++) {
    source = args[index]
    arrayEach(keys(args[index]), isClone ? function(key) {
      destination[key] = clone(source[key], isClone)
    } : function(key) {
      destination[key] = source[key]
    })
  }
  return destination
}
function helperCreateInInObjectString(type) {
  return function(obj) {
    return '[object ' + type + ']' === objectToString.call(obj)
  }
}

/**
 * 将一个或多个源对象复制到目标对象中
 *
 * @param {Object} target 目标对象
 * @param {...Object}
 * @return {Boolean}
 */
var keys = helperCreateGetObjects('keys', 1)
function helperCreateGetObjects(name, getIndex) {
  var proMethod = Object[name]
  return function(obj) {
    var result = []
    if (obj) {
      if (proMethod) {
        return proMethod(obj)
      }
      each(obj, getIndex > 1 ? function(key) {
        result.push(['' + key, obj[key]])
      } : function() {
        result.push(arguments[getIndex])
      })
    }
    return result
  }
}
function each(obj, iterate, context) {
  if (obj) {
    return (isArray(obj) ? arrayEach : objectEach)(obj, iterate, context)
  }
  return obj
}
function objectEach(obj, iterate, context) {
  if (obj) {
    for (var key in obj) {
      if (hasOwnProp(obj, key)) {
        iterate.call(context, obj[key], key, obj)
      }
    }
  }
}
function getCativeCtor(val, args) {
  // eslint-disable-next-line no-proto
  var Ctor = val.__proto__.constructor
  return args ? new Ctor(args) : new Ctor()
}

function handleValueClone(item, isDeep) {
  return isDeep ? copyValue(item, isDeep) : item
}

function copyValue(val, isDeep) {
  if (val) {
    switch (objectToString.call(val)) {
      case '[object Object]': {
        // eslint-disable-next-line no-proto
        var restObj = Object.create(val.__proto__)
        objectEach(val, function(item, key) {
          restObj[key] = handleValueClone(item, isDeep)
        })
        return restObj
      }
      case '[object Date]':
      case '[object RegExp]': {
        return getCativeCtor(val, val.valueOf())
      }
      case '[object Array]':
      case '[object Arguments]': {
        var restArr = []
        arrayEach(val, function(item) {
          restArr.push(handleValueClone(item, isDeep))
        })
        return restArr
      }
      case '[object Set]': {
        var restSet = getCativeCtor(val)
        restSet.forEach(function(item) {
          restSet.add(handleValueClone(item, isDeep))
        })
        return restSet
      }
      case '[object Map]': {
        var restMap = getCativeCtor(val)
        restMap.forEach(function(item, key) {
          restMap.set(handleValueClone(item, isDeep))
        })
        return restMap
      }
    }
  }
  return val
}

/**
 * 浅拷贝/深拷贝
 *
 * @param {Object} obj 对象/数组
 * @param {Boolean} deep 是否深拷贝
 * @return {Object}
 */
function clone(obj, deep) {
  if (obj) {
    return copyValue(obj, deep)
  }
  return obj
}

/**
 * 判断对象自身属性中是否具有指定的属性
 *
 * @param {Object} obj 对象
 * @param {String/Number} key 键值
 * @return {Boolean}
 */
function hasOwnProp(obj, key) {
  // eslint-disable-next-line no-prototype-builtins
  return obj && obj.hasOwnProperty ? obj.hasOwnProperty(key) : false
}

function searchTreeItem(parentAllow, parent, obj, iterate, context, path, node, parseChildren, opts) {
  var paths, nodes, rest, isAllow, hasChild
  var rests = []
  var hasOriginal = opts.original
  var sourceData = opts.data
  var mapChildren = opts.mapChildren || parseChildren
  arrayEach(obj, function(item, index) {
    paths = path.concat(['' + index])
    nodes = node.concat([item])
    isAllow = parentAllow || iterate.call(context, item, index, obj, paths, parent, nodes)
    hasChild = parseChildren && item[parseChildren]
    if (isAllow || hasChild) {
      if (hasOriginal) {
        rest = item
      } else {
        rest = assign({}, item)
        if (sourceData) {
          rest[sourceData] = item
        }
      }
      rest[mapChildren] = searchTreeItem(isAllow, item, item[parseChildren], iterate, context, paths, nodes, parseChildren, opts)
      if (isAllow || rest[mapChildren].length) {
        rests.push(rest)
      }
    } else if (isAllow) {
      rests.push(rest)
    }
  })
  return rests
}

/**
 * 从树结构中根据回调查找数据
 *
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
 * @param {Object} options {children: 'children'}
 * @param {Object} context 上下文
 * @return {Array}
 */
export const searchTree = helperCreateTreeFunc(function(parent, obj, iterate, context, path, nodes, parseChildren, opts) {
  return searchTreeItem(0, parent, obj, iterate, context, path, nodes, parseChildren, opts)
})

