<template>
  <div class="box">
    <div class="leftBox">
      <el-tree ref="myTree" :props="props" :load="loadNode" lazy node-key="id">
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        isLeaf: "isLeaf",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      console.log('node节点数据记录了很多信息',node);
      console.log('resolve高阶函数给树组件赋值',resolve);
      //如果展开第一级节点，从后台加载一级节点列表（固定的）
      if (node.level == 0) {
        this.loadfirstnode(resolve);
      }
      //如果展开其他级节点，动态从后台加载下一级节点列表（可变的）
      if (node.level >= 1) {
        this.loadchildnode(node, resolve);
      }
    },
    //加载第一级节点
    async loadfirstnode(resolve) {
      let params = {
        level: 0,
      };
      const res = await this.$api.getTreeData(params);
      return resolve(res.data);
    },
    //加载节点的子节点集合
    async loadchildnode(node, resolve) {
      // console.log("超过二级的", node, node.level);
      let params = {
        id: node.key,
      };
      const res = await this.$api.getTreeChildData(params);
      return resolve(res.data);
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  padding: 20px 0 0 10px;
  border: 1px solid #e9e9e9;
  display: flex;
  .leftBox {
    width: 40%;
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
  }
  .rightBox {
    width: 60%;
    box-sizing: border-box;
    padding-right: 10px;
  }
}
</style>
