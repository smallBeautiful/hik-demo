import Vue from 'vue'

// ---- 类型 → 图标映射 ----
const iconMap = {
  primary: 'el-icon-info',
  success: 'el-icon-success',
  warning: 'el-icon-warning',
  info: 'el-icon-info',
  danger: 'el-icon-error',
  error: 'el-icon-error'
}

// ---- 注入全局样式（仅一次） ----
const STYLE_ID = 'custom-messagebox-style'
if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
.custom-mb-dialog .el-dialog__title { line-height: 17px; height: 17px }
.custom-mb-dialog .el-dialog__headerbtn { top: 15px; }
.custom-mb-dialog .el-dialog__header { padding: 15px 15px 10px; }
.custom-mb-dialog .el-dialog__body { padding: 10px 15px; }
.custom-mb-dialog .el-dialog__footer { padding: 10px 20px 10px; }
.custom-mb-body { display: flex; align-items: flex-start; }
.custom-mb-icon { font-size: 24px; margin-right: 14px; flex-shrink: 0; }
.custom-mb-icon.primary,
.custom-mb-icon.info    { color: #409EFF; }
.custom-mb-icon.success { color: #67C23A; }
.custom-mb-icon.warning { color: #E6A23C; }
.custom-mb-icon.danger,
.custom-mb-icon.error   { color: #F56C6C; }
.custom-mb-text { margin: 0; font-size: 14px; color: #606266; line-height: 24px; word-break: break-all; }
`
  document.head.appendChild(style)
}

// ---- 弹窗构建 ----

function createDialog(options) {
  let resolve
  let reject

  const promise = new Promise((res, rej) => { resolve = res; reject = rej })

  const el = document.createElement('div')
  document.body.appendChild(el)

  const DialogCtor = Vue.extend({
    data: () => ({
      visible: true,
      opts: options
    }),
    methods: {
      handleConfirm() { this.visible = false; resolve() },
      handleCancel() { this.visible = false; reject(new Error('cancel')) },
      destroy() {
        this.$nextTick(() => { this.$destroy(); if (el.parentNode) el.parentNode.removeChild(el) })
      }
    },
    render(h) {
      const { opts, visible } = this
      const iconCls = iconMap[opts.type] || 'el-icon-info'

      // body: 图标 + 文字
      const body = h('div', { class: 'custom-mb-body' }, [
        h('i', { class: ['custom-mb-icon', iconCls, opts.type] }),
        h('p', { class: 'custom-mb-text' }, opts.message)
      ])

      // footer
      const footerBtns = []
      if (opts.showCancelButton) {
        footerBtns.push(h('el-button', { props: { size: 'mini' }, on: { click: this.handleCancel }}, opts.cancelButtonText))
      }
      footerBtns.push(
        h('el-button', { props: { type: opts.type, size: 'mini' }, on: { click: this.handleConfirm }}, opts.confirmButtonText)
      )

      return h('el-dialog', {
        class: 'custom-mb-dialog',
        props: {
          visible,
          title: opts.title,
          closeOnClickModal: false,
          appendToBody: true,
          width: opts.width || '420px'
        },
        on: {
          'update:visible': (v) => { this.visible = v },
          closed: this.destroy
        }
      }, [body, h('span', { slot: 'footer', class: 'dialog-footer' }, footerBtns)])
    }
  })

  new DialogCtor().$mount(el)
  return promise
}

// ---- 公开方法 ----

const defaultOptions = {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}

/**
 * 通用 alert 提示框（仅确认按钮），多个可并存
 * @returns {Promise}
 */
export function alert(message, title = '提示', options = {}) {
  return createDialog({ message, title, showCancelButton: false, confirmButtonText: '确定', type: 'primary', ...options })
}

/**
 * 通用 confirm 确认框（确认 + 取消），多个可并存
 * @returns {Promise} 确认 resolve / 取消 reject
 */
export function confirm(message, title = '提示', options = {}) {
  return createDialog({ message, title, showCancelButton: true, ...defaultOptions, ...options })
}

/**
 * 删除确认框（红色图标 + 红色确认按钮）
 * @returns {Promise}
 */
export function confirmDelete(message = '确定要删除吗?', title = '提示') {
  return confirm(message, title, { type: 'danger' })
}
