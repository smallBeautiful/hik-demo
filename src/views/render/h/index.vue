<template>
  <div>
    <demoRender :some-attr="someAttr" level="1" class="main-title">主标题</demoRender>
    <demoRender level="2" style="color: gray;">副标题</demoRender>
    <input-render :form-data="formData" />
  </div>
</template>

<script>
import { demoRender, inputRender } from './render'

export default {
  components: {
    demoRender, inputRender
  },
  data() {
    return {
      someAttr: {
        test: 'test',
        number: 1
      },
      formData: {
        value: ''
      }
    }
  }
}
</script>
