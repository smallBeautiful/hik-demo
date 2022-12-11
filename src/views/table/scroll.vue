<template>
  <div>
    <vhb-table v-if="list.length" :data="list" max-height="400">
      <vhb-column type="seq" title="Seq" width="60" />
      <vhb-column field="name" title="Name" />
      <vhb-column field="sex" title="Sex" />
      <vhb-column field="address" title="Address" />
    </vhb-table>
  </div>
</template>

<script>
export default {
  created() {
    this.list = []
    this.init()
  },
  methods: {
    init() {
      for (let i = 0; i < 100000; i++) {
        const obj = { id: i, name: 'Test' + i, role: 'Develop' + i, sex: 'Man' + i, address: 'Shenzhen' + i }
        this.list.push(obj)
      }
      console.log(this.list)
    }
  }
}
</script>
