<template>
  <div class="image-cropper-container">
    <!-- 选择图片按钮 -->
    <el-upload
      :action="action"
      class="upload-btn"
      :show-file-list="false"
      :before-upload="beforeUpload"
      accept="image/*"
    >
      <el-button type="primary">选择图片</el-button>
    </el-upload>

    <!-- 裁剪弹窗 -->
    <el-dialog
      title="图片裁剪"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <div class="cropper-dialog-body">
        <!-- 左侧裁剪区 -->
        <div class="cropper-left">
          <vue-cropper
            ref="cropper"
            :fixed="true"
            :fixed-number="[1, 1]"
            :img="cropperImage"
            :output-size="1"
            :output-type="'png'"
            :info="true"
            :full="true"
            :can-move="true"
            :can-scale="true"
            :auto-crop="true"
            :center-box="true"
            :info-true="true"
            :high="true"
            :rotatable="true"
            :zoomable="true"
            :scalable="true"
            :crop-box-movable="true"
            :crop-box-resizable="true"
            :preview="'.cropper-preview'"
            style="height: 350px; width: 350px;"
            @realTime="realTime"
          />
        </div>
        <!-- 右侧实时预览区 -->
        <div class="cropper-right">
          <div class="cropper-preview-title">实时预览</div>
          <div class="cropper-preview">
            <div v-html="html" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cropImage">确 定</el-button>
      </span>
    </el-dialog>
    <div class="preview-wrapper">
      <img :src="previewImage" class="preview-image">
      <div class="preview-mask">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="removeImage"
        />
      </div>
    </div>
    <div v-if="uploadStatus" class="upload-status">
      <el-tag :type="uploadStatus.type">{{ uploadStatus.message }}</el-tag>
    </div>
  </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'ImageCropper',
  components: {
    VueCropper
  },
  data() {
    return {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      dialogVisible: false,
      cropperImage: '',
      croppedImage: '',
      croppedBlob: null,
      uploadStatus: null,
      previewImage: '',
      html: ''
    }
  },
  methods: {
    realTime(data) {
      console.log('realTime', data)
      this.previewImage = data.url
      this.html = data.html
    },
    // 移除图片
    removeImage() {
      this.croppedImage = ''
      this.croppedBlob = null
      this.uploadStatus = null
      this.$message.success('图片已移除')
    },

    // 上传前检查文件大小
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('图片大小不能超过 10MB!')
        return false
      }

      // 创建文件预览URL
      this.cropperImage = URL.createObjectURL(file)
      this.dialogVisible = true
      return false // 阻止自动上传
    },

    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
      this.cropperImage = ''
    },

    // 裁剪图片
    cropImage() {
      this.$refs.cropper.getCropData((data) => {
        this.croppedImage = data
        // 将base64转换为Blob
        this.base64ToBlob(data, (blob) => {
          this.croppedBlob = blob
          // 裁剪完成后自动上传
          this.uploadImage()
        })
        this.dialogVisible = false
      })
    },

    // base64转Blob
    base64ToBlob(base64, callback) {
      const arr = base64.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      callback(new Blob([u8arr], { type: mime }))
    },

    // 上传图片
    uploadImage() {
      if (!this.croppedBlob) {
        this.$message.error('请先裁剪图片')
        return
      }

      // 显示上传中状态
      this.uploadStatus = {
        type: 'info',
        message: '上传中...'
      }

      const formData = new FormData()
      formData.append('file', this.croppedBlob, 'cropped.png')

      // 这里替换成你的上传接口
      this.$axios.post('/your-upload-api', formData)
        .then(response => {
          this.uploadStatus = {
            type: 'success',
            message: '上传成功'
          }
          this.$message.success('上传成功')
          // 这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          this.uploadStatus = {
            type: 'danger',
            message: '上传失败'
          }
          this.$message.error('上传失败')
          console.error('上传失败:', error)
        })
    }
  }
}
</script>

  <style scoped>
  .image-cropper-container {
    padding: 20px;
  }

  .cropper-dialog-body {
    display: flex;
    height: 400px;
  }

  .cropper-left {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cropper-right {
    flex: 1;
    min-width: 0;
    padding-left: 24px;
    display: block;
  }

  .cropper-preview-title {
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .cropper-preview {
    /* width: 200px;
    height: 200px;
    border: 1px solid #eee;
    background: #fafafa;
    overflow: hidden;
    margin: 0 auto; */
  }

  .preview-container {
    margin-top: 20px;
    text-align: center;
  }

  .preview-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
  }

  .preview-image {
    max-width: 300px;
    max-height: 300px;
    display: block;
  }

  .preview-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .preview-wrapper:hover .preview-mask {
    opacity: 1;
  }

  .upload-btn {
    margin-bottom: 20px;
  }

  .upload-status {
    margin-top: 10px;
  }
  </style>
