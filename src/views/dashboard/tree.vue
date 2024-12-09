<template>
    <div>
        {{ treeValue2 }}
        <el-select @visible-change="handleVisibleChange" collapse-tags multiple v-model="treeValue" placeholder="请选择">
            <el-option v-model="value">
                <el-tree
                    ref="tree"
                    :props="props"
                    :load="loadNode"
                    lazy
                    :data="data"
                    show-checkbox
                    node-key="id"
                    @check="handleCheck">
                </el-tree>
            </el-option>
        </el-select>
    </div>
  </template>
  
  <script>
import { log } from '@antv/g2plot/lib/utils';

  export default {
    computed: {
      treeValue: {
        get() {
          return this.$store.state.settings.treeValue;
        },
        set(value) {
        //   this.$store.dispatch('settings/changeSetting', { key: 'treeValue', value });
        }
      },
      treeValue2: {
        get() {
          return this.$store.state.settings.treeValue2;
        },
        set(value) {
        //   this.$store.dispatch('settings/changeSetting', { key: 'treeValue', value });
        }
      }
    },
    methods: {
      handleVisibleChange(value) {
        console.log('value', value);
        console.log(this.treeValue2)
        this.$refs.tree.setCheckedKeys(this.treeValue2);
      },
      handleCheck(data) {
        // 获取选中节点
        const checkedData = this.$refs.tree.getCheckedNodes();
        console.log(checkedData)
        if (!checkedData.length) {
            this.$store.dispatch('settings/changeSetting', { key: 'treeValue', value: [] });
            this.$store.dispatch('settings/changeSetting', { key: 'treeValue2', value: [] });
        } else {
            this.$store.dispatch('settings/changeSetting', { key: 'treeValue', value: checkedData.map(item => item.name) });
            this.$store.dispatch('settings/changeSetting', { key: 'treeValue2', value: checkedData.map(item => item.id) });
        }
        console.log('所有选中的节点:', checkedData);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 懒加载数据方法
      loadNode(node, resolve) {
        console.log('loadNode');
        if (node.level > 3) return resolve([]);
        
        // 模拟异步加载数据
        setTimeout(() => {
          const data = [
            { name: `子节点1`, id: node.level * 10 },
            { name: `子节点2`, id: node.level * 10 + 1 }
          ];
          resolve(data);
        }, 100);
      },
      // 更新完整树数据
    updateFullTreeData(parentId, childrenData) {
      const updateNode = (nodes) => {
        for (let node of nodes) {
          if (node.id === parentId) {
            node.children = childrenData;
            return true;
          }
          if (node.children) {
            if (updateNode(node.children)) return true;
          }
        }
        return false;
      };
      
      updateNode(this.fullTreeData);
    },
    },
    data() {
      return {
        data: [
            { name: '一级节点1', id: 1 },
            { name: '一级节点2', id: 2 }
        ],
        value: '',
        value2: [],
        value3: '111',
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        }
      }
    }
  }
  </script>
  <style lang="scss">
    .el-select-dropdown__item {
        height: auto;
    }
  </style>   
