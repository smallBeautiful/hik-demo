<template>
  <div class="app-container">
    <!--  动态字体大小  -->
    <h2 :style="{fontSize: fontSize + 'px'}">v-bind绑定style</h2>
    <el-button @click="add">add</el-button>
    <el-button @click="sub">sub</el-button>
    <!--  message 默认mini  -->
    <h2>Message Box</h2>
    <el-button @click="confirm">Message Box</el-button>
    <el-button size="small">确定</el-button>
    <el-button>确定</el-button>
    <div class="text">吃饭</div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'Index',
  data() {
    return {
      fontSize: 20
    }
  },
  methods: {
    add() {
      this.fontSize++
    },
    sub() {
      this.fontSize--
    },
    confirm() {
      MessageBox.confirm('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          console.log(1111)
        }
      })
    }
  }
}
</script>

<style>
.c-c {
  position: fixed;
  inset: 0px;
  z-index: 203;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden auto;
}
/* 等于小于 1600 */
@media (max-width: 1599px) {
  .el-message-box__btns .el-button--small {
    font-size: 12px!important;
  }
  .el-message-box__btns .el-button--primary {
    background-color: #409EFF;
  }
}
/* 大于等于 1600 */
@media (min-width: 1600px) {
  .el-message-box__btns .el-button--small {
    padding: 12px 20px!important;
    font-size: 14px!important;
  }
  .el-message-box__btns .el-button--primary {
    background-color: #409EFF;
  }

}
</style>
