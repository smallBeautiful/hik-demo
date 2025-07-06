<template>
    <div class="filter-panel">
      <div v-for="group in groups" :key="group.key" class="filter-group">
        <div class="group-header">
          <span class="group-title">{{ group.title }}</span>
          <span class="multi-select-btn" v-if="group.multiSelect" @click="toggleMultiSelect(group.key)">
            {{ multiSelectState[group.key] ? '取消' : '多选' }}
          </span>
        </div>
        <div class="group-options">
          <template v-if="multiSelectState[group.key]">
            <div v-for="opt in group.options" :key="opt.value" class="option">
              <input
                type="checkbox"
                :checked="selected[group.key] && selected[group.key].includes(opt.value)"
                @change="onSelect(group.key, opt.value, $event.target.checked)"
              />
              <span :class="{ selected: selected[group.key] && selected[group.key].includes(opt.value) }">{{ opt.label }}</span>
              <span class="count">({{ opt.count }})</span>
            </div>
            <div class="action-btns">
              <button @click="confirm(group.key)">确定</button>
              <button @click="cancel(group.key)">取消</button>
            </div>
          </template>
          <template v-else>
            <div v-for="opt in group.options" :key="opt.value" class="option" @click="singleSelect(group.key, opt.value)">
              <span :class="{ selected: selected[group.key] && selected[group.key].includes(opt.value) }">{{ opt.label }}</span>
              <span class="count">({{ opt.count }})</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterPanel',
    props: {
      groups: {
        type: Array,
        required: true
      }
    },
    data() {
      const multiSelectState = {};
      const selected = {};
      (this.groups || []).forEach(group => {
        multiSelectState[group.key] = false;
        selected[group.key] = [];
      });
      return {
        multiSelectState,
        selected
      };
    },
    methods: {
      toggleMultiSelect(key) {
        this.$set(this.multiSelectState, key, !this.multiSelectState[key]);
      },
      onSelect(key, value, checked) {
        if (checked) {
          if (!this.selected[key].includes(value)) {
            this.selected[key].push(value);
          }
        } else {
          this.selected[key] = this.selected[key].filter(v => v !== value);
        }
      },
      singleSelect(key, value) {
        this.selected[key] = [value];
        this.$emit('update:selected', { ...this.selected });
      },
      confirm(key) {
        this.multiSelectState[key] = false;
        this.$emit('update:selected', { ...this.selected });
      },
      cancel(key) {
        this.multiSelectState[key] = false;
        // 可根据需求重置选项
      }
    }
  };
  </script>
  
  <style scoped>
  .filter-panel { width: 300px; background: #fff; border-radius: 8px; padding: 16px; }
  .filter-group { margin-bottom: 24px; }
  .group-header { display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
  .multi-select-btn { color: #409EFF; cursor: pointer; font-size: 14px; }
  .group-options { margin-top: 8px; }
  .option { display: flex; align-items: center; margin-bottom: 8px; cursor: pointer; }
  .option .selected { color: #d0021b; font-weight: bold; }
  .count { margin-left: 4px; color: #888; font-size: 12px; }
  .action-btns { margin-top: 8px; }
  .action-btns button { margin-right: 8px; background: #d0021b; color: #fff; border: none; border-radius: 4px; padding: 4px 12px; cursor: pointer; }
  .action-btns button:last-child { background: #eee; color: #333; }
  </style>