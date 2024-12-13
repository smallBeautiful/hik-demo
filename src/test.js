function processTemplate(str, variables) {
  // 修正正则表达式
  const ifMatch = str.match(/<!---\s*\[#if\s+(\w+)\?\?\]\s*--->([\s\S]*?)<!---\s*\[\/\#if\]\s*--->/)
  if (ifMatch) {
    const [fullMatch, variableName, content] = ifMatch
    // 检查变量是否存在且不为空
    if (variables[variableName]) {
      // 替换变量
      return content.replace(/\$\{\'(\w+)\'\}/g, (match, name) => {
        return variables[name] || ''
      })
    } else {
      // 如果变量为空，返回空字符串
      return ''
    }
  }
  return str
}

// 测试代码
const str = '<!--- [#if contentTwo??] --->' +
  '<div>' +
  '<p style="margin-bottom: 0; margin-top: 4px; font-weight: 600; font-size: 11pt;">三、注意事项</p>' +
  '<p style="margin-left: 2em; margin-bottom: 0; margin-top: 4px; white-space: pre;">${\'contentTwo\'}</p>' +
  '</div>' +
  '<!--- [/#if] --->'

// 测试用例1：有内容
console.log(processTemplate(str, { contentTwo: '222' }))

// 测试用例2：空内容
// console.log(processTemplate(str, { contentTwo: '' }));
