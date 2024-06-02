export const measureTextWidth = (text, font = '14px') => {
  // 创建一个隐藏的DOM元素
  const element = document.createElement('span')
  element.style.visibility = 'hidden'
  element.style.fontSize = font // 获取字体大小
  element.innerHTML = text
  document.body.appendChild(element)

  // 获取文本宽度
  const width = element.offsetWidth + 0.5

  // 移除隐藏的DOM元素
  document.body.removeChild(element)

  return width
}
