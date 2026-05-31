<template>
  <div id="app">
    <router-view />
    <FloatingRobot />
  </div>
</template>

<script>
import FloatingRobot from '@/components/FloatingRobot/index.vue'

export default {
  name: 'App',
  components: { FloatingRobot }
}
</script>
