const state = {
    treeData: new Map(), // 存储树节点数据
    checkedKeys: [], // 存储选中的节点key
    checkedNodes: [], // 存储选中的节点数据
    loadedNodes: new Set() // 记录已加载的节点
  }
  
  const mutations = {
    SET_TREE_DATA: (state, { parentId, children }) => {
      state.treeData.set(parentId, children)
    },
    SET_CHECKED_KEYS: (state, keys) => {
      state.checkedKeys = keys
    },
    SET_CHECKED_NODES: (state, nodes) => {
      state.checkedNodes = nodes
    },
    ADD_LOADED_NODE: (state, nodeId) => {
      state.loadedNodes.add(nodeId)
    }
  }
  
  const actions = {
    // 加载节点数据
    async loadNodeData({ commit, state }, { parentId, level }) {
      // 如果已经加载过，直接返回缓存数据
      if (state.loadedNodes.has(parentId)) {
        return state.treeData.get(parentId)
      }
  
      // 模拟异步请求
      const data = await new Promise(resolve => {
        setTimeout(() => {
          if (level === 0) {
            resolve([
              { id: '1', label: '一级节点1' },
              { id: '2', label: '一级节点2' }
            ])
          } else {
            resolve([
              { id: `${parentId}-1`, label: `子节点${parentId}-1` },
              { id: `${parentId}-2`, label: `子节点${parentId}-2` }
            ])
          }
        }, 500)
      })
  
      commit('SET_TREE_DATA', { parentId, children: data })
      commit('ADD_LOADED_NODE', parentId)
      return data
    },
  
    // 更新选中状态
    updateCheckedKeys({ commit }, keys) {
      commit('SET_CHECKED_KEYS', keys)
    },
  
    // 更新选中的节点数据
    updateCheckedNodes({ commit }, nodes) {
      commit('SET_CHECKED_NODES', nodes)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }