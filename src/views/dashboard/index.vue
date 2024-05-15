<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}111</div>
    <div v-zoom-fix style="zoom: 1.5">
      <!--    <div v-zoom-fix style="zoom: 1.5">-->
      <el-tooltip v-zoom-fix placement="top" popper-class="hello123">
        <div slot="content">多行信息<br>第二行信息</div>
        <el-button>Top center</el-button>
      </el-tooltip>
    </div>
    <button @click="click(1)">1</button>
    <button @click="click(2)">2</button>
    <button @click="click(3)">3</button>
    <button @click="click(4)">4</button>
    <button @click="click(5)">5</button>
    <button @click="click(6)">6</button>
    <button @click="click(7)">7</button>
    <button @click="click(8)">8</button>
    <button @click="click(9)">9</button>
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import zoomFix from '@/utils/directives/zoomFix'
import { scrollToElement } from '@/utils/index'

export default {
  name: 'Dashboard',
  directives: { zoomFix },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    click(id) {
      scrollToElement('item-' + id)
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
body {
}
.hello123 {
  background: cyan!important;
  color: red;
  zoom: 1.5;
}
.item {
  height: 500px;
}
</style>
