<template>
  <div class="app-container">
    <div class="item" v-for="item in list" :key="item.text">
      <tooltip :text="item.text" :width="150" />
    </div>
  </div>
</template>

<script>
import { measureTextWidth } from '@/utils/dom'
import tooltip from './components/tooltip'
export default {
  name: 'Index',
  components: {
    tooltip
  },
  data() {
    return {
      list: [
        { text: '收到的手机号加快速' },
        { text: '导弹发射地点发士大夫方法发的四个地方' },
        { text: '士大夫发射点发 非法手段 广泛大概 的官方的杜甫反对反对' },
        { text: '豆腐干反对豆腐干反对发放购房的非官方的杜甫地方法规杜甫' },
        { text: '反对广泛的地方杜甫杜甫发法国发发法国发过防抖' },
        { text: '黄金时代可接受的能看见士大夫艰苦南非的数据库酒囊饭袋数据库的发送附件是的可能就是的你' }
      ]
    }
  },
  mounted() {
    const width = measureTextWidth('hllo 122')
    console.log(width)
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.item {
  width: 150px;
  margin-top: 10px;
}
</style>
