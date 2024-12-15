function processTemplate(str, variables) {
  // 处理条件块
  let result = str.replace(/<!---\s*\[#if\s+(\w+)\?\?\]\s*--->([\s\S]*?)<!---\s*\[\/\#if\]\s*--->/g, (match, variableName, content) => {
    // 检查变量是否存在且不为空
    if (variables[variableName]) {
      // 如果变量有值，保留内容但移除条件标签
      return content;
    } else {
      // 如果变量为空，移除整个条件块
      return '';
    }
  });

  // 处理变量替换
  // 处理 ${\'variableName\'} 格式
  result = result.replace(/\$\{\'(\w+)\'\}/g, (match, variableName) => {
    return variables[variableName] || '';
  });

  // 处理 ${variableName??} 格式
  result = result.replace(/\$\{(\w+)\?\?\}/g, (match, variableName) => {
    return variables[variableName] || '';
  });

  return result;
}

// 测试
const str = '1211212<!--- [#if contentTwo??] --->' +
  '<div>' +
  '<p style="margin-bottom: 0; margin-top: 4px; font-weight: 600; font-size: 11pt;">三、注意事项</p>' +
  '<p style="margin-left: 2em; margin-bottom: 0; margin-top: 4px; white-space: pre;">${\'contentTwo\'} ${contentTwo??}</p>' +
  '</div>' +
  '<!--- [/#if] --->21122112<!--- [#if contentOne??] --->' +
  '<div>' +
  '<p style="margin-bottom: 0; margin-top: 4px; font-weight: 600; font-size: 11pt;">三、注意事项</p>' +
  '<p style="margin-left: 2em; margin-bottom: 0; margin-top: 4px; white-space: pre;">${\'contentOne\'} ${contentOne??}</p>' +
  '</div>' +
  '<!--- [/#if] ---><div>测试</div>';

// 测试用例1: 两个变量都有值
const data1 = {
  contentOne: '1211212',
  contentTwo: '1211212'
};
console.log(processTemplate(str, data1));

// 测试用例2: contentTwo为空
const data2 = {
  contentOne: '1211212',
  contentTwo: ''
};
console.log(processTemplate(str, data2));

// 测试用例3: 两个变量都为空
const data3 = {
  contentOne: '',
  contentTwo: ''
};
console.log(processTemplate(str, data3));
