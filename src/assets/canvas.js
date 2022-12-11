function roundRect (x, y, w, h, r, ctx) {
  var min_size = Math.min(w, h);
  if (r > min_size / 2) r = min_size / 2;
  // 开始绘制
  ctx.beginPath();
  ctx.fillStyle = 'rgba(245, 245, 245, .9)'
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.fill()
  ctx.closePath();
}
function getData(i) {
  var ctx = _this.ctx;
  var csXOneLen = cs.csXOneLen;
  const len = _this.series[0].data.length
  if (!len) return []
  const colorList = _this.series.map(item => item.color[0])
  const title = _this.xAxis[i]
  const nameList = _this.series.map(item => item.name)
  const res = []
  for (let j = 0; j < len; j++) {
    res[j] = []
    _this.series.map((item, index) => {
      res[j].push(item.data[j])
    })
  }
  let height = 0
  for (let j = 0; j < res[i].length; j++) {
    height += 26
  }
  if (!height) return
  height += 26
  // 0 获取最大宽度
  let maxWith = -1
  for (let j = 0; j < res[i].length; j++) {
    const text = `${nameList[j]}: ${res[i][j]}`
    const length = ctx.measureText(text).width;
    if (length > maxWith) {
      maxWith = length
    }
  }
  // 1. 矩形和边框
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, .9)';  // 着重显示时的颜色
  // x y width height
  // ctx.fillRect(cs.csLeft + i*csXOneLen,
  // 	cs.csTop + 80,
  // 	maxWith + 40,
  // 	height)
  // ctx.strokeStyle = "#666";
  // ctx.strokeRect(cs.csLeft + i*csXOneLen,
  // 	cs.csTop + 80,
  // 	maxWith + 40,
  // 	height)
  const rect = {
    x: cs.csLeft + i*csXOneLen,
    y: cs.csTop + 80,
    w: maxWith + 40,
    h: height
  }
  ctx.beginPath()
  // drawRoundedRect(rect, 25, ctx)
  roundRect(cs.csLeft + i*csXOneLen,cs.csTop + 80,maxWith + 40,height, 10, ctx)
  ctx.closePath()
  // 2. titile
  ctx.beginPath()
  const text = title
  ctx.font="14px Georgia bold";
  ctx.fillStyle="#666";
  // ctx.fontWeight="blod";
  const length = ctx.measureText(text).width;
  ctx.fillText(text, cs.csLeft + i*csXOneLen + length + 10, cs.csTop + 80 + 24);
  ctx.closePath()
  console.log('开始绘制')
  // 3. 具体内容
  for (let j = 0; j < res[i].length; j++) {
    ctx.beginPath()
    const text = `${nameList[j]}: ${res[i][j]}`
    ctx.font="12px normal";
    ctx.fillStyle="#000";
    const length = ctx.measureText(text).width;
    ctx.fillText(text, cs.csLeft + i*csXOneLen + length + 30, cs.csTop + 105 + 20 + j * 24);
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.fillStyle=colorList[j];
    ctx.arc(cs.csLeft + i*csXOneLen + 15, cs.csTop + 105 + 16 + j * 24, 4, 0, 2 * Math.PI);
    ctx.fill()
    console.log(_this)
    ctx.closePath()

  }
}
