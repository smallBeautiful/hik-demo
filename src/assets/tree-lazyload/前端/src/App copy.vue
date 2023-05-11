<template>
  <div class="box">
    <!-- 左侧树部分 -->
    <div class="leftBox">
      <el-tree ref="myTree" :props="props" :load="loadNode" lazy node-key="id">
        <span slot-scope="{ node, data }">
          <i
            class="el-icon-folder-opened"
            style="color: #448ff7"
            v-show="node.isLeaf !== true"
          ></i>
          <!-- <span style="padding-left: 8px">{{ node.label }}</span> -->
          <span style="padding-left: 8px">{{ data.name }}</span>
          <el-button
            style="margin-left: 12px"
            size="small"
            type="text"
            v-show="node.isLeaf === true"
            @click="() => changeStatus(node, data)"
          >
            <span :class="{ highLightTree: data.status == '0' }">{{
              data.status == "0" ? "未添加" : "已添加"
            }}</span>
          </el-button>
        </span>
      </el-tree>
    </div>
    <!-- 右侧表格部分 -->
    <div class="rightBox">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{
          height: '48px',
          background: '#FAFAFA',
          color: '#333333',
          fontWeight: 'bold',
        }"
      >
        <el-table-column prop="id" label="id编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="home" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="removeRow(scope.row)"
              type="danger"
              plain
              size="small"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
      tableData: [],
    };
  },
  methods: {
    loadNode(node, resolve) {
      //如果展开第一级节点，从后台加载一级节点列表
      if (node.level == 0) {
        this.loadfirstnode(resolve);
      }
      //如果展开其他级节点，动态从后台加载下一级节点列表
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
    // 点击树组件节点上的添加或未添加按钮，更改树的添加未添加的状态，同时追加或删除右侧表格中对应的行的数据
    changeStatus(node, data) {
      console.log("data是点击的这个树节点所绑定的数据", data);
      if (data.status == "0") {
        data.status = "1"; // 这里我们可以直接更改树节点上的对应数据，便会生效，未添加变成已添加
        this.tableData.push(data); // 追加进右侧表格
      } else if (data.status == "1") {
        data.status = "0"; // 已添加变成未添加
        this.tableData.forEach((item, index) => {
          // 同时，根据id去删除掉右侧的数据
          if (item.id == data.id) {
            this.tableData.splice(index, 1);
          }
        });
      }
    },
    // 移除表格中的这一行
    removeRow(row) {
      // console.log("行数据", row.id);

      // 获取tree的所有的node节点数组（DOM节点），这里是两个数组，对应的就是西游记和三国演义的最外层的数组（）
      let allNodesDom = this.$refs.myTree.root.childNodes;
      // console.log("node节点", allNodesDom);

      function bianli(checkedData) {
        for (const i in checkedData) {
          // 说明到最内层了
          if (checkedData[i].childNodes.length == 0) {
            // 到最内层以后，就看看对应的id，是否与移除行的id一致
            if (checkedData[i].data.id == row.id) {
              // 若id一致，就更改树组件的最内层节点的数据即可
              checkedData[i].data.status = "0";
              break;
            }
          } else if (checkedData[i].childNodes.length > 0) {
            // 说明没到最内层，那就继续递归调用自己，继续找
            bianli(checkedData[i].childNodes);
          }
        }
        return;
      }

      bianli(allNodesDom); // 递归调用，更改数据

      this.tableData.forEach((item, index) => {
        // 同时根据id删除右侧的表格对应的行
        if (item.id == row.id) {
          this.tableData.splice(index, 1);
        }
      });

      
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
// 高亮颜色
/deep/ .highLightTree {
  color: #b0b0b2;
}
</style>
