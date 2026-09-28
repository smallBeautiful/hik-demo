/**
 * v-table-merge 指令
 * 跨容器内多个 el-table，纵向合并指定的一列，使其看起来像一个合并单元格。
 *
 * 用法：
 *   <div v-table-merge="{ columnIndex: 3, value: 合并值 }">
 *     <el-table v-for="...">...</el-table>
 *   </div>
 *
 * 参数：
 * - columnIndex: 要合并的列下标（从 0 开始，即第 columnIndex + 1 列）
 * - value: 合并单元格显示的内容（随数据变化自动更新）
 *
 * 行为：
 * - 自动测量：取第一个表格第一行该列的位置，最后一个表格最后一行该列的底部，
 *   覆盖层覆盖这一整列，跨所有表格、所有行，无需关心每个表格有几行、表格之间怎么对齐。
 * - 自动跟随：通过 ResizeObserver 监听容器与表格尺寸（行数增减、列宽、窗口变化），
 *   配合指令的 update / componentUpdated 钩子响应数据变化。
 * - 局限：合并单元格是绝对定位的覆盖层，不跟随行 hover 高亮；边框颜色写死为 element-ui 默认。
 */

const OVERLAY = '__vm_tableMerge_overlay'
const BINDING = '__vm_tableMerge_binding'
const RO = '__vm_tableMerge_ro'

// 收集容器内的所有 el-table（取根节点 .el-table）
function collectTables(container) {
  return Array.from(container.querySelectorAll('.el-table'))
}

// 取指定表格、指定行、指定列的 td 元素
function getTd(table, rowIndex, columnIndex) {
  const rows = table.querySelectorAll('.el-table__body tbody tr')
  const row = rows[rowIndex]
  if (!row) return null
  return row.querySelectorAll('td')[columnIndex] || null
}

// 创建（或复用）覆盖层
function ensureOverlay(container) {
  let overlay = container[OVERLAY]
  if (!overlay) {
    overlay = document.createElement('div')
    const style = overlay.style
    style.position = 'absolute'
    style.boxSizing = 'border-box'
    style.display = 'flex'
    style.alignItems = 'center'
    style.justifyContent = 'center'
    style.background = '#fff'
    style.border = '1px solid #ebeef5'
    style.zIndex = '3'
    container.appendChild(overlay)
    container[OVERLAY] = overlay
  }
  return overlay
}

function refresh(container, binding) {
  const conf = (binding && binding.value) || {}
  const columnIndex = conf.columnIndex
  if (columnIndex == null) return

  const tables = collectTables(container)
  if (!tables.length) return

  // 覆盖层绝对定位，容器需作为定位参考
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative'
  }

  const firstTable = tables[0]
  const lastTable = tables[tables.length - 1]

  // 起始单元格：第一个表格的第一行该列
  const tdFirst = getTd(firstTable, 0, columnIndex)
  // 结束单元格：最后一个表格的最后一行该列
  const lastRows = lastTable.querySelectorAll('.el-table__body tbody tr')
  const tdLast = getTd(lastTable, lastRows.length - 1, columnIndex)
  if (!tdFirst || !tdLast) return

  const cRect = container.getBoundingClientRect()
  const fRect = tdFirst.getBoundingClientRect()
  const lRect = tdLast.getBoundingClientRect()

  const overlay = ensureOverlay(container)
  overlay.style.left = (fRect.left - cRect.left) + 'px'
  overlay.style.top = (fRect.top - cRect.top) + 'px'
  overlay.style.width = fRect.width + 'px'
  overlay.style.height = (lRect.bottom - fRect.top) + 'px'
  overlay.textContent = conf.value == null ? '' : conf.value

  // 若表格数量发生变化，把新增的表格也纳入尺寸监听
  const ro = container[RO]
  if (ro) tables.forEach((t) => ro.observe(t))
}

function startObserver(container) {
  if (!window.ResizeObserver) return
  const ro = new ResizeObserver(() => {
    // 始终用最新绑定值，避免闭包捕获到旧值
    refresh(container, container[BINDING])
  })
  ro.observe(container)
  container[RO] = ro
}

export default {
  inserted(el, binding) {
    el[BINDING] = binding
    refresh(el, binding)
    startObserver(el)
  },
  update(el, binding) {
    el[BINDING] = binding
    refresh(el, binding)
  },
  componentUpdated(el, binding) {
    el[BINDING] = binding
    refresh(el, binding)
  },
  unbind(el) {
    const ro = el[RO]
    if (ro) ro.disconnect()
    const overlay = el[OVERLAY]
    if (overlay) overlay.remove()
  }
}
