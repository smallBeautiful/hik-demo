<template>
  <div class="app-container">
    <el-alert title="scrollIntoView 使用示例" type="info" :closable="false" style="margin-bottom:20px" />

    <!-- ===== 控制面板 ===== -->
    <el-card shadow="hover" style="margin-bottom:20px">
      <div slot="header"><span>控制面板</span></div>
      <el-row :gutter="12">
        <el-col :span="6">
          <span style="line-height:32px;color:#606266">block:</span>
          <el-select v-model="block" size="small" style="width:110px;margin-left:8px">
            <el-option label="start" value="start" />
            <el-option label="center" value="center" />
            <el-option label="end" value="end" />
            <el-option label="nearest" value="nearest" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <span style="line-height:32px;color:#606266">inline:</span>
          <el-select v-model="inline" size="small" style="width:110px;margin-left:8px">
            <el-option label="start" value="start" />
            <el-option label="center" value="center" />
            <el-option label="end" value="end" />
            <el-option label="nearest" value="nearest" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <span style="line-height:32px;color:#606266">behavior:</span>
          <el-select v-model="behavior" size="small" style="width:110px;margin-left:8px">
            <el-option label="smooth" value="smooth" />
            <el-option label="instant" value="instant" />
            <el-option label="auto" value="auto" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="scrollDemo">滚动到目标元素</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- ===== 快捷定位按钮 ===== -->
    <el-card shadow="hover" style="margin-bottom:20px">
      <div slot="header"><span>快捷跳转</span></div>
      <el-button-group>
        <el-button v-for="t in targets" :key="t.id" size="small" @click="scrollToTarget(t.id)">
          定位第 {{ t.id }} 项
        </el-button>
      </el-button-group>
    </el-card>

    <!-- ===== 可滚动演示区域 ===== -->
    <el-card shadow="hover" style="margin-bottom:20px">
      <div slot="header">
        <span>水平滚动演示</span>
        <el-tag size="mini" style="margin-left:8px">inline 参数效果</el-tag>
      </div>
      <div ref="hScrollBox" class="h-scroll-box">
        <div
          v-for="n in 12"
          :key="'h' + n"
          :ref="'hItem' + n"
          class="h-scroll-item"
          :class="{ 'is-target': hTarget === n }"
          @click="scrollToHItem(n)"
        >
          {{ n }}
        </div>
      </div>
      <el-slider v-model="hTarget" :min="1" :max="12" style="margin-top:12px" @change="scrollToHItem" />
    </el-card>

    <!-- ===== 垂直滚动演示区域 ===== -->
    <el-card ref="cardBox" shadow="hover" class="v-scroll-card">
      <div slot="header">
        <span>垂直滚动演示</span>
        <el-tag size="mini" style="margin-left:8px" type="success">block 参数效果</el-tag>
      </div>

      <div class="v-scroll-box">
        <div
          v-for="n in 20"
          :key="'v' + n"
          :ref="'vItem' + n"
          class="v-scroll-item"
          :class="{ 'is-target': n === targetIndex }"
        >
          <span class="item-num">{{ n }}</span>
          <span class="item-label">{{ items[n - 1] }}</span>
        </div>
      </div>
    </el-card>

    <!-- ===== 代码说明 ===== -->
    <el-card shadow="hover">
      <div slot="header"><span>核心 API</span></div>
      <pre class="code-block"><code>// 基础用法
element.scrollIntoView({ behavior: 'smooth', block: 'start' })

// 完整参数
element.scrollIntoView({
  behavior: 'smooth',  // 动画: 'smooth' | 'instant' | 'auto'
  block: 'start',      // 垂直对齐: 'start' | 'center' | 'end' | 'nearest'
  inline: 'nearest'    // 水平对齐: 'start' | 'center' | 'end' | 'nearest'
})

// 简写（等同于 behavior:'auto', block:'start'）
element.scrollIntoView()</code></pre>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ScrollIntoViewDemo',
  data() {
    return {
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
      targetIndex: 10,
      hTarget: 6,
      items: [
        '引言概述', '项目背景', '技术选型', '架构设计', '数据模型',
        '接口定义', '前端实现', '后端实现', '测试策略', '部署方案',
        '性能优化', '安全防护', '监控告警', '日志方案', '容灾备份',
        '运维手册', '版本管理', '发布流程', '回滚预案', 'FAQ'
      ]
    }
  },
  computed: {
    targets() {
      return [1, 5, 10, 15, 20].map(i => ({ id: i }))
    }
  },
  methods: {
    // 滚动到目标演示元素
    scrollDemo() {
      const el = this.$refs['vItem' + this.targetIndex]
      if (el && el[0]) {
        el[0].scrollIntoView({
          behavior: this.behavior,
          block: this.block,
          inline: this.inline
        })
      }
    },
    // 快捷跳转
    scrollToTarget(id) {
      this.targetIndex = id
      this.$nextTick(() => {
        const el = this.$refs['vItem' + id]
        if (el && el[0]) {
          el[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    },
    // 水平滚动
    scrollToHItem(n) {
      this.hTarget = n
      this.$nextTick(() => {
        const el = this.$refs['hItem' + n]
        if (el && el[0]) {
          el[0].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        }
      })
    }
  }
}
</script>

<style scoped>
/* 水平滚动 */
.h-scroll-box {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 4px;
  white-space: nowrap;
}
.h-scroll-item {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f0f2f5;
  font-size: 20px;
  font-weight: 600;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s ease;
}
.h-scroll-item:hover {
  background: #ecf5ff;
  color: #409eff;
}
.h-scroll-item.is-target {
  background: #409eff;
  color: #fff;
  box-shadow: 0 2px 10px rgba(64, 158, 255, 0.4);
}

/* 垂直滚动 */
.v-scroll-card {
  margin-bottom: 20px;
}
.v-scroll-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}
.v-scroll-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  border-bottom: 1px solid #f2f2f2;
  transition: background 0.3s ease;
}
.v-scroll-item:last-child {
  border-bottom: none;
}
.v-scroll-item.is-target {
  background: #ecf5ff;
}
.item-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f0f2f5;
  font-size: 13px;
  font-weight: 600;
  color: #909399;
  flex-shrink: 0;
  transition: all 0.3s ease;
}
.is-target .item-num {
  background: #409eff;
  color: #fff;
}
.item-label {
  font-size: 14px;
  color: #303133;
}

/* 代码块 */
.code-block {
  margin: 0;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.8;
  color: #303133;
  overflow-x: auto;
}
</style>
