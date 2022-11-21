<template>
  <div class="app-container">
    <div class="father-one">
      <div class="title">1</div>
      <div>
        <i :class="{transform180: hidden}" class="el-icon-arrow-down" @click="hiddenHandle" />
      </div>
    </div>
    <transition name="slide-fade">
      <div v-show="!hidden" class="content">
        111
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TabHidden',
  data() {
    return {
      hidden: false
    }
  },
  methods: {
    hiddenHandle() {
      this.hidden = !this.hidden
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  //background: #20a0ff;
  height: 800px;
}
.father-one {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  display:flex;
  justify-content:space-between;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .el-icon-arrow-down,
  .el-icon-arrow-up {
    font-weight: bold;
    cursor: pointer;
    transition: all .5s;
  }
  .transform180 {
    transform: rotate(180deg);
  }
}
.content {
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #eee;
  height: 300px;
  width: 100%;
  transition: all .5s;
}
.slide-fade-enter-active {transition: all .2s ease;}
.slide-fade-leave-active {transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);opacity: 0;
}
</style>
