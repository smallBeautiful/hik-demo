<template>
  <div class="robot-demo-page">
    <div class="demo-content">
      <h2>悬浮机器人交互演示</h2>
      <p>右下角悬浮卡片支持拖拽，hover 可查看交互效果</p>
    </div>

    <!-- ===== 顶部小机器人入口（悬浮关闭后显示） ===== -->
    <transition name="top-robot">
      <div
        v-if="widgetState === 'hidden'"
        class="top-entrance"
        @mouseenter="showTopGreeting = true"
        @mouseleave="showTopGreeting = false"
        @mousedown.prevent="onHiddenRobotDown"
        @click="restoreWidget"
      >
        <div class="mini-robot" :class="{ 'is-peeking': isPeeking }">
          <div class="mini-head">
            <div class="mini-antenna"></div>
            <div class="mini-face">
              <span class="mini-eye left"></span>
              <span class="mini-eye right"></span>
              <span class="mini-mouth"></span>
            </div>
          </div>
          <div class="mini-body"></div>
        </div>
        <transition name="fade">
          <div v-if="showTopGreeting" class="greeting-bubble top-greeting">你好，有什么可以帮助你的？</div>
        </transition>
      </div>
    </transition>

    <!-- ===== 悬浮卡片主体 ===== -->
    <div
      v-show="widgetState !== 'hidden'"
      ref="widget"
      class="floating-widget"
      :class="{
        'is-collapsed': widgetState === 'collapsed',
        'is-dragging': isDragging,
        'is-peeking': isPeeking,
        'peek-untilt': peekType === 'untilt'
      }"
      :style="widgetStyle"
      @mousedown="onWidgetDown"
      @mouseenter="onWidgetEnter"
      @mouseleave="onWidgetLeave"
    >
      <!-- 关闭按钮 -->
      <transition name="fade">
        <div
          v-if="showCloseBtn && widgetState === 'visible'"
          class="close-btn"
          @mousedown.stop
          @click.stop="closeWidget"
        ></div>
      </transition>

      <!-- 机器人区域（正常展示） -->
      <div
        v-if="widgetState !== 'collapsed'"
        class="robot-area"
        @mouseenter="onRobotEnter"
        @mouseleave="onRobotLeave"
      >
        <div class="robot">
          <div class="robot-head">
            <div class="antenna"></div>
            <div class="face">
              <div class="eyes">
                <span class="eye left"></span>
                <span class="eye right"></span>
              </div>
              <span class="mouth"></span>
            </div>
          </div>
          <div class="robot-body"></div>
        </div>
      </div>

      <!-- 收起状态下机器人（独立的长按拖出交互） -->
      <div
        v-if="widgetState === 'collapsed'"
        class="robot-area collapsed-robot-area"
        @mousedown="onCollapsedRobotDown"
        @mouseenter="onRobotEnter"
        @mouseleave="onRobotLeave"
      >
        <div class="robot">
          <div class="robot-head">
            <div class="antenna"></div>
            <div class="face">
              <div class="eyes">
                <span class="eye left"></span>
                <span class="eye right"></span>
              </div>
              <span class="mouth"></span>
            </div>
          </div>
          <div class="robot-body"></div>
        </div>
      </div>

      <!-- 招呼语气泡 -->
      <transition name="fade">
        <div v-if="showGreeting && widgetState !== 'collapsed'" class="greeting-bubble">你好，有什么可以帮助你的？</div>
      </transition>

      <!-- 功能入口：智能客服 + 意见反馈 -->
      <transition name="entries">
        <div v-if="widgetState !== 'collapsed'" class="entries">
          <div
            class="entry-item"
            :class="{ 'is-hovered': hoveredEntry === 0 }"
            @mouseenter="hoveredEntry = 0"
            @mouseleave="hoveredEntry = -1"
            @click.stop="handleSmartService"
          >
            <span class="entry-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <span class="entry-label">智能客服</span>
          </div>
          <div
            class="entry-item"
            :class="{ 'is-hovered': hoveredEntry === 1 }"
            @mouseenter="hoveredEntry = 1"
            @mouseleave="hoveredEntry = -1"
            @click.stop="handleFeedback"
          >
            <span class="entry-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </span>
            <span class="entry-label">意见反馈</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RobotWidget',
  data() {
    return {
      // 状态: visible | hidden | collapsed
      widgetState: 'visible',

      // 位置
      widgetLeft: 0,
      widgetTop: 0,
      lastPosition: { left: 0, top: 0 },

      // 拖拽状态
      isDragging: false,
      dragStartMouseX: 0,
      dragStartMouseY: 0,
      dragStartLeft: 0,
      dragStartTop: 0,
      longPressTimer: null,
      dragFromHidden: false,

      // 招呼语
      showGreeting: false,
      greetingTimer: null,
      idleTimer: null,

      // 关闭按钮
      showCloseBtn: false,

      // 顶部入口招呼语
      showTopGreeting: false,

      // 探头动画
      isPeeking: false,
      peekType: '', // 'up' | 'untilt'

      // 入口 hover
      hoveredEntry: -1
    }
  },
  computed: {
    widgetStyle() {
      const style = { top: this.widgetTop + 'px' }
      if (this.widgetState === 'collapsed') {
        style.left = (window.innerWidth - 56) + 'px'
      } else {
        style.left = this.widgetLeft + 'px'
      }
      return style
    }
  },
  mounted() {
    this.initPosition()
    this.startIdleTimer()
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy() {
    this.clearAllTimers()
    window.removeEventListener('resize', this.onWindowResize)
    this.removeDragListeners()
  },
  methods: {
    // ==================== 位置初始化 ====================
    initPosition() {
      const widgetW = 172
      const widgetH = 220
      this.widgetLeft = window.innerWidth - widgetW - 24
      this.widgetTop = window.innerHeight - widgetH - 100
      this.lastPosition = { left: this.widgetLeft, top: this.widgetTop }
    },

    // ==================== 悬浮卡片拖拽 ====================
    onWidgetDown(e) {
      if (e.button !== 0) return
      if (e.target.closest('.close-btn')) return
      if (e.target.closest('.entry-item')) return

      this.dragStartMouseX = e.clientX
      this.dragStartMouseY = e.clientY
      this.dragStartLeft = this.widgetLeft
      this.dragStartTop = this.widgetTop
      this.isDragging = false
      this.dragFromHidden = false
      this.clearLongPress()

      document.addEventListener('mousemove', this.onDragMove)
      document.addEventListener('mouseup', this.onDragEnd)
      e.preventDefault()
    },

    onDragMove(e) {
      this._pendingClientX = e.clientX
      this._pendingClientY = e.clientY
      if (this._rafId) return
      this._rafId = requestAnimationFrame(() => {
        this._rafId = null
        const dx = this._pendingClientX - this.dragStartMouseX
        const dy = this._pendingClientY - this.dragStartMouseY

        if (!this.isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
          this.isDragging = true
        }

        if (this.isDragging) {
          let left = this.dragStartLeft + dx
          let top = this.dragStartTop + dy
          left = Math.max(-20, Math.min(window.innerWidth - 40, left))
          top = Math.max(0, Math.min(window.innerHeight - 40, top))
          this.widgetLeft = left
          this.widgetTop = top
        }
      })
    },

    onDragEnd() {
      this.removeDragListeners()
      if (this.isDragging) {
        this.isDragging = false
        if (this.widgetLeft > window.innerWidth - 80) {
          this.collapseToEdge()
        } else {
          this.lastPosition = { left: this.widgetLeft, top: this.widgetTop }
        }
      }
    },

    // ==================== 隐藏态长按拖出 ====================
    onHiddenRobotDown(e) {
      if (e.button !== 0) return
      const mouseX = e.clientX
      const mouseY = e.clientY
      this.longPressTimer = setTimeout(() => {
        this.widgetState = 'visible'
        this.isPeeking = false
        const widgetW = 172
        const widgetH = 200
        this.widgetLeft = mouseX - widgetW / 2
        this.widgetTop = mouseY - widgetH / 2
        this.isDragging = true
        this.dragFromHidden = true
        this.dragStartMouseX = mouseX
        this.dragStartMouseY = mouseY
        this.dragStartLeft = this.widgetLeft
        this.dragStartTop = this.widgetTop
        this.showTopGreeting = false
        document.addEventListener('mousemove', this.onDragMove)
        document.addEventListener('mouseup', this.onHiddenDragEnd)
      }, 400)
      document.addEventListener('mouseup', this.onHiddenUp)
    },

    onHiddenUp() {
      document.removeEventListener('mouseup', this.onHiddenUp)
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer)
        this.longPressTimer = null
      }
    },

    onHiddenDragEnd() {
      this.removeDragListeners()
      this.isDragging = false
      this.dragFromHidden = false
      const widgetW = 172
      this.widgetLeft = Math.max(0, Math.min(window.innerWidth - widgetW, this.widgetLeft))
      this.widgetTop = Math.max(0, Math.min(window.innerHeight - 80, this.widgetTop))
      this.lastPosition = { left: this.widgetLeft, top: this.widgetTop }
      this.triggerPeekAnimation()
    },

    // ==================== 收起态（边缘）长按拖出 ====================
    onCollapsedRobotDown(e) {
      if (e.button !== 0) return
      const mouseX = e.clientX
      const mouseY = e.clientY
      e.preventDefault()
      e.stopPropagation()
      this.longPressTimer = setTimeout(() => {
        this.widgetState = 'visible'
        this.isPeeking = false
        const widgetW = 172
        const widgetH = 200
        this.widgetLeft = mouseX - widgetW / 2
        this.widgetTop = mouseY - widgetH / 2
        this.isDragging = true
        this.dragFromHidden = true
        this.dragStartMouseX = mouseX
        this.dragStartMouseY = mouseY
        this.dragStartLeft = this.widgetLeft
        this.dragStartTop = this.widgetTop
        document.addEventListener('mousemove', this.onDragMove)
        document.addEventListener('mouseup', this.onCollapsedDragEnd)
      }, 400)
      document.addEventListener('mouseup', this.onCollapsedUp)
    },

    onCollapsedUp() {
      document.removeEventListener('mouseup', this.onCollapsedUp)
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer)
        this.longPressTimer = null
      }
    },

    onCollapsedDragEnd() {
      this.removeDragListeners()
      this.isDragging = false
      this.dragFromHidden = false
      const widgetW = 172
      this.widgetLeft = Math.max(0, Math.min(window.innerWidth - widgetW, this.widgetLeft))
      this.widgetTop = Math.max(0, Math.min(window.innerHeight - 80, this.widgetTop))
      if (this.widgetLeft > window.innerWidth - 80) {
        this.collapseToEdge()
      } else {
        this.lastPosition = { left: this.widgetLeft, top: this.widgetTop }
        this.triggerPeekAnimation('untilt')
      }
    },

    // ==================== 状态切换 ====================
    closeWidget() {
      this.widgetState = 'hidden'
      this.showCloseBtn = false
      this.showGreeting = false
      this.clearIdleTimer()
    },

    restoreWidget() {
      if (this.longPressTimer) return // 正在长按，不触发 click
      this.widgetState = 'visible'
      this.widgetLeft = this.lastPosition.left
      this.widgetTop = this.lastPosition.top
      this.showTopGreeting = false
      this.$nextTick(() => {
        this.triggerPeekAnimation()
      })
      this.startIdleTimer()
    },

    collapseToEdge() {
      this.widgetState = 'collapsed'
      this.showCloseBtn = false
      this.showGreeting = false
      this.clearIdleTimer()
      this.$nextTick(() => {
        this.isPeeking = true
        setTimeout(() => {
          this.isPeeking = false
        }, 650)
      })
    },

    // ==================== 招呼语 ====================
    onRobotEnter() {
      this.clearGreetingTimer()
      this.showGreeting = true
    },

    onRobotLeave() {
      this.greetingTimer = setTimeout(() => {
        this.showGreeting = false
      }, 400)
    },

    startIdleTimer() {
      this.clearIdleTimer()
      this.idleTimer = setTimeout(() => {
        if (this.widgetState === 'visible') {
          this.showGreeting = true
        }
      }, 2000)
    },

    // ==================== Widget hover ====================
    onWidgetEnter() {
      this.showCloseBtn = true
      this.clearIdleTimer()
    },

    onWidgetLeave() {
      this.showCloseBtn = false
      if (this.widgetState === 'visible') {
        this.startIdleTimer()
      }
    },

    // ==================== 功能入口 ====================
    handleSmartService() {
      this.$message.info('智能客服')
    },

    handleFeedback() {
      this.$message.info('意见反馈')
    },

    // ==================== 工具方法 ====================
    triggerPeekAnimation(type = 'up') {
      this.peekType = type
      this.isPeeking = false
      this.$nextTick(() => {
        this.isPeeking = true
        setTimeout(() => {
          this.isPeeking = false
          this.peekType = ''
        }, 650)
      })
    },

    removeDragListeners() {
      if (this._rafId) {
        cancelAnimationFrame(this._rafId)
        this._rafId = null
      }
      document.removeEventListener('mousemove', this.onDragMove)
      document.removeEventListener('mouseup', this.onDragEnd)
      document.removeEventListener('mouseup', this.onHiddenDragEnd)
      document.removeEventListener('mouseup', this.onCollapsedDragEnd)
    },

    clearLongPress() {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer)
        this.longPressTimer = null
      }
    },

    clearGreetingTimer() {
      if (this.greetingTimer) {
        clearTimeout(this.greetingTimer)
        this.greetingTimer = null
      }
    },

    clearIdleTimer() {
      if (this.idleTimer) {
        clearTimeout(this.idleTimer)
        this.idleTimer = null
      }
    },

    clearAllTimers() {
      this.clearLongPress()
      this.clearGreetingTimer()
      this.clearIdleTimer()
    },

    onWindowResize() {
      const widgetW = this.widgetState === 'collapsed' ? 56 : 172
      this.widgetLeft = Math.min(this.widgetLeft, window.innerWidth - widgetW)
      this.widgetTop = Math.min(this.widgetTop, window.innerHeight - 60)
    }
  }
}
</script>

<style lang="scss" scoped>
// ==================== 页面 ====================
.robot-demo-page {
  min-height: 100vh;
  background: #f0f2f5;
}

.demo-content {
  padding: 40px;
  h2 { margin-bottom: 12px; color: #303133; }
  p { color: #909399; font-size: 14px; }
}

// ==================== 变量 ====================
$robot-head-size: 52px;
$robot-head-color: #fff;
$robot-head-border: #e8ecf1;
$primary-blue: #4a90e2;
$widget-width: 168px;

// ==================== 顶部入口 ====================
.top-entrance {
  position: fixed;
  top: 12px;
  right: 100px;
  z-index: 2001;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  .mini-robot {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;

    &.is-peeking {
      animation: peek-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  }

  .mini-head {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #e0e4e8;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .mini-antenna {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 6px;
    background: #c0c4cc;
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -2px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $primary-blue;
    }
  }

  .mini-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .mini-eye {
    display: inline-block;
    width: 7px;
    height: 7px;
    background: #303133;
    border-radius: 50%;
    margin: 0 2px;
    animation: blink 3s infinite;
  }

  .mini-mouth {
    display: block;
    width: 8px;
    height: 4px;
    border-bottom: 2px solid #909399;
    border-radius: 0 0 6px 6px;
  }

  .mini-body {
    width: 26px;
    height: 18px;
    background: $primary-blue;
    border-radius: 6px 6px 3px 3px;
    margin-top: -2px;
  }

  .top-greeting {
    white-space: nowrap;
  }
}

.top-robot-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.top-robot-leave-active {
  transition: all 0.2s ease;
}
.top-robot-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.top-robot-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// ==================== 悬浮卡片 ====================
.floating-widget {
  position: fixed;
  width: $widget-width;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 16px 14px 14px;
  z-index: 2000;
  user-select: none;
  transition: left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.2),
    box-shadow 0.3s ease, border-radius 0.35s ease,
    width 0.35s ease, padding 0.35s ease;

  &.is-dragging {
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: grabbing;
    transition: left 0s, box-shadow 0.3s ease;
  }

  &.is-peeking:not(.is-collapsed) .robot {
    animation: peek-up 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &.peek-untilt.is-peeking:not(.is-collapsed) .robot {
    animation: peek-untilt 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  // 边缘收起状态
  &.is-collapsed {
    width: 56px;
    padding: 10px 6px;
    border-radius: 16px 0 0 16px;
    cursor: pointer;

    &.is-peeking .robot {
      animation: peek-right 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .robot-head {
      will-change: transform;
    }
  }
}

// ==================== 关闭按钮 ====================
.close-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background 0.2s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 1.5px;
    background: #909399;
    border-radius: 1px;
    transition: background 0.2s ease;
  }
  &::before { transform: rotate(45deg); }
  &::after { transform: rotate(-45deg); }

  &:hover {
    background: #f56c6c;
    transform: scale(1.1);
    &::before,
    &::after { background: #fff; }
  }
}

// ==================== 机器人 ====================
.robot-area {
  display: flex;
  justify-content: center;
  padding: 4px 0 8px;
  cursor: grab;

  &.collapsed-robot-area {
    padding: 4px 0;
    cursor: pointer;

    .robot-head {
      transform: rotate(-45deg);
      transition: transform 0.3s ease;
    }
  }
}

.robot {
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transform;
}

.robot-head {
  width: $robot-head-size;
  height: $robot-head-size;
  border-radius: 50%;
  background: $robot-head-color;
  border: 2px solid $robot-head-border;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .antenna {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 8px;
    background: #c0c4cc;

    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: -3px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $primary-blue;
    }
  }

  .face {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin-top: 4px;
  }

  .eyes {
    display: flex;
    gap: 8px;
  }

  .eye {
    display: block;
    width: 12px;
    height: 12px;
    background: #303133;
    border-radius: 50%;
    animation: blink 3s infinite;

    &.left { animation-delay: 0s; }
    &.right { animation-delay: 0s; }
  }

  .mouth {
    display: block;
    width: 14px;
    height: 6px;
    border-bottom: 2px solid #909399;
    border-radius: 0 0 10px 10px;
  }
}

.robot-body {
  width: 34px;
  height: 22px;
  background: $primary-blue;
  border-radius: 8px 8px 4px 4px;
  margin-top: -3px;
}

// ==================== 招呼语 ====================
.greeting-bubble {
  position: relative;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: #606266;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  margin: 4px auto 0;
  width: fit-content;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: #fff;
    border-left: 1px solid #e4e7ed;
    border-top: 1px solid #e4e7ed;
  }
}

// ==================== 功能入口 ====================
.entries {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}

.entry-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f7f8fa;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ecf5ff;
  }

  .entry-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: $primary-blue;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &.is-hovered .entry-icon {
    transform: scale(1.42); // 24px → ~34px，放大约10px
  }

  .entry-label {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
  }
}

// ==================== 动画 ====================
@keyframes blink {
  0%, 44%, 56%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
}

@keyframes peek-up {
  0%   { transform: translateY(40px) scale(0.85); opacity: 0; }
  40%  { transform: translateY(-6px) scale(1.02); opacity: 1; }
  65%  { transform: translateY(3px) scale(0.99); }
  85%  { transform: translateY(-1px) scale(1); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

@keyframes peek-untilt {
  0%   { transform: translateY(36px) rotate(-45deg) scale(0.8); opacity: 0; }
  35%  { transform: translateY(-6px) rotate(3deg) scale(1.03); opacity: 1; }
  55%  { transform: translateY(3px) rotate(-1deg) scale(0.98); }
  75%  { transform: translateY(-1px) rotate(0.5deg) scale(1); }
  100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
}

@keyframes peek-right {
  0%   { transform: translateX(36px) scale(0.8); opacity: 0; }
  50%  { transform: translateX(-8px) scale(1.05); opacity: 1; }
  75%  { transform: translateX(3px) scale(0.98); }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}

// ==================== 过渡 ====================
.fade-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter { opacity: 0; transform: translateY(-4px); }
.fade-leave-to { opacity: 0; }

.entries-enter-active { transition: all 0.3s ease; }
.entries-leave-active { transition: all 0.2s ease; }
.entries-enter,
.entries-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
