function retry(params, times, interval = 100) {
  if (!params) {
    console.log('false')
    setTimeout(() => {
      retry(true)
    }, interval)
  } else {
    console.log(111)
  }
}

retry(false)
