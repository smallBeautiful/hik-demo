function getCacheItem(key) {
  const cache = window.localStorage.getItem(options.storageKey)
  const { data, storageExpire } = JSON.parse(cache)
  return (data && data[key]) || null
}
function setCacheItem(key, value) {
  const cache = window.localStorage.getItem(options.storageKey)
  const { data, storageExpire } = JSON.parse(cache)
  data[key] = value
  window.localStorage.setItem(options.storageKey, JSON.stringify({ data, storageExpire }))
}
const _CACHES = {}
// 使用Proxy代理
const cacheHandler = {
  get: function(target, key) {
    let value = target[key]
    console.log(`${key} 被读取`, value)
    if (options.storage && !value) {
      value = getCacheItem(key)
    }
    return value
  },
  set: function(target, key, value) {
    console.log(`${key} 被设置为 ${value}`)
    target[key] = value
    if (options.storage) {
      setCacheItem(key, value)
    }

    return true
  }
}
const CACHES = new Proxy(_CACHES, cacheHandler)

export function requestInterceptor(config, axios) {
  // 开启缓存则保存请求结果和cancel 函数
  if (config.cache) {
    const data = CACHES[`${generateReqKey(config)}`]
    // 这里用于存储是默认时间还是用户传递过来的时间
    let setExpireTime
    config.setExpireTime ? (setExpireTime = config.setExpireTime) : (setExpireTime = options.expire)
    // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
    if (data && getNowTime() - data.expire < setExpireTime) {
      config.cancelToken = new Axios.CancelToken(cancel => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(data)
      }) // 传递结果到catch中
    }
  }
}

export function responseInterceptor(response) {
  // 返回的code === 200 时候才会缓存下来
  if (response && response.config.cache && response.data.code === 200) {
    const data = {
      expire: getNowTime(),
      data: response
    }

    CACHES[`${generateReqKey(response.config)}`] = data
  }
}

// 获取当前时间戳
function getNowTime() {
  return new Date().getTime()
}

// generateReqKey ：用于根据当前请求的信息，生成请求 Key；
const function generateReqKey(config) {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data);
  }
  const { method, url, params, data } = config; // 请求方式，参数，请求地址，
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&'); // 拼接
}

// 判断一个字符串是否为JSON字符串
const isJsonStr = str => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
};
