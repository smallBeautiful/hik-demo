const state = {
    treeData: new Map(),
    checkedKeys: [],
    checkedNodes: [],
    halfCheckedKeys: [],
    expandedKeys: [],
    selectedValues: [],
    selectedOptions: [],
    loadedNodes: new Set()
  }
  
  const mutations = {
    SET_TREE_DATA: (state, { parentId, children }) => {
      state.treeData.set(parentId, children)
    },
    SET_CHECKED_STATE: (state, { checkedKeys, checkedNodes, halfCheckedKeys }) => {
      state.checkedKeys = checkedKeys || []
      state.checkedNodes = checkedNodes || []
      state.halfCheckedKeys = halfCheckedKeys || []
    },
    SET_EXPANDED_KEYS: (state, keys) => {
      state.expandedKeys = keys || []
    },
    SET_SELECTED_OPTIONS: (state, { selectedValues, selectedOptions }) => {
      state.selectedValues = selectedValues || []
      state.selectedOptions = selectedOptions || []
    },
    ADD_LOADED_NODE: (state, nodeId) => {
      state.loadedNodes.add(nodeId)
    }
  }
  
  const actions = {
    async loadNodeData({ commit, state }, { parentId, level }) {
      if (state.loadedNodes.has(parentId)) {
        return state.treeData.get(parentId)
      }
  
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
  
    updateCheckedState({ commit }, { checkedKeys, checkedNodes, halfCheckedKeys }) {
      commit('SET_CHECKED_STATE', { checkedKeys, checkedNodes, halfCheckedKeys })
    },
  
    updateExpandedKeys({ commit }, keys) {
      commit('SET_EXPANDED_KEYS', keys)
    },
  
    updateSelectedOptions({ commit }, { selectedValues, selectedOptions }) {
      commit('SET_SELECTED_OPTIONS', { selectedValues, selectedOptions })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }