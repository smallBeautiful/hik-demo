<template>
  <el-upload
    ref="upload"
    action=""
    :auto-upload="false"
    :on-change="handleChange"
    :file-list="fileList"
  >
    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
    <el-button size="small" type="success" @click="downloadFile">下载文件</el-button>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      // 更新 fileList，当文件被选择或移除时
      this.fileList = fileList
    },
    downloadFile() {
      // 假设你只想下载 fileList 中的第一个文件
      const file = this.fileList[0]

      if (file) {
        const blob = file.raw // 获取文件的原始 Blob 对象
        const url = URL.createObjectURL(blob) // 创建临时 URL
        const a = document.createElement('a') // 创建一个下载链接
        a.href = url // 设置下载链接
        a.download = file.name // 设置下载文件名
        a.click() // 触发下载
        URL.revokeObjectURL(url) // 释放 URL 对象
      }
    }
  }
}
</script>
