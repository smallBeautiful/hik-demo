<template>
  <div class="app-container">
    <div class="message-section">
      <h3>Alert 提示</h3>
      <el-button @click="handleAlert('primary')">提示信息</el-button>
      <el-button type="success" @click="handleAlert('success')">成功提示</el-button>
      <el-button type="warning" @click="handleAlert('warning')">警告提示</el-button>
      <el-button type="danger" @click="handleAlert('danger')">错误提示</el-button>
    </div>

    <div class="message-section">
      <h3>Confirm 确认</h3>
      <el-button type="primary" @click="handleConfirm('info', '确定要执行此操作吗？')">普通确认</el-button>
      <el-button type="warning" @click="handleConfirm('warning', '请谨慎操作，确定继续吗？')">警告确认</el-button>
      <el-button type="danger" @click="handleDelete">删除确认</el-button>
    </div>

    <div class="message-section">
      <h3>并存测试</h3>
      <el-button type="primary" @click="handleMultiple">同时弹出两个</el-button>
    </div>

    <div class="message-section">
      <h3>操作结果</h3>
      <div class="result-box" v-if="lastResult">
        <el-tag :type="lastResult.tagType" size="medium">{{ lastResult.tagLabel }}</el-tag>
        <span class="result-msg">{{ lastResult.msg }}</span>
        <span class="result-time">{{ lastResult.time }}</span>
      </div>
      <p v-else class="result-empty">暂无操作，点击上方按钮测试</p>
    </div>
  </div>
</template>

<script>
import { alert, confirm, confirmDelete } from '@/utils/messageBox'

export default {
  name: 'Message',
  data() {
    return {
      lastResult: null
    }
  },
  methods: {
    recordResult(action, result) {
      this.lastResult = {
        action,
        result,
        tagType: result === '确定' ? 'success' : 'info',
        tagLabel: result === '确定' ? '点击了确定' : '点击了取消',
        msg: `触发操作：${action}`,
        time: new Date().toLocaleTimeString()
      }
    },
    handleAlert(type) {
      const label = this.typeLabel(type)
      alert(`这是一条${label}信息`, '提示', { type }).then(() => {
        this.recordResult(`Alert - ${label}`, '确定')
      })
    },
    async handleConfirm(type, msg) {
      try {
        await confirm(msg, '确认操作', { type })
        this.recordResult(`Confirm - ${msg.slice(0, 10)}...`, '确定')
      } catch {
        this.recordResult(`Confirm - ${msg.slice(0, 10)}...`, '取消')
      }
    },
    handleDelete() {
      confirmDelete().then(() => {
        this.recordResult('删除确认', '确定')
      }).catch(() => {
        this.recordResult('删除确认', '取消')
      })
    },
    handleMultiple() {
      alert('第一条信息', '弹窗1', { type: 'success' })
      alert('第二条信息', '弹窗2', { type: 'warning' })
    },
    typeLabel(type) {
      return { primary: '提示', success: '成功', warning: '警告', danger: '错误' }[type] || ''
    }
  }
}
</script>

<style scoped lang="scss">
.app-container { padding: 20px; }
.message-section {
  margin-bottom: 24px;
  h3 { margin-bottom: 12px; font-size: 16px; color: #333; }
  .el-button { margin-right: 10px; margin-bottom: 6px; }
}
.result-box {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; background: #f5f7fa; border-radius: 4px;
  .result-msg { color: #606266; }
  .result-time { color: #909399; font-size: 12px; margin-left: auto; }
}
.result-empty { color: #c0c4cc; font-size: 14px; }
</style>
