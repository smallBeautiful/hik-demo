<template>
  <div class="robot-widget-root">
    <!-- 悬浮模块主体 -->
    <div
    class="floating-widget"
    v-show="visible"
    ref="widget"
    :class="{
      collapsed,
      dragging: isDragging,
    }"
    :style="widgetStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
  >
    <!-- 机器人头部 -->
    <div
      class="mascot-container"
      :class="{
        tilted: (collapsed || dragFromCollapsed) && !peekingIn,
        'peek-in': peekingIn,
      }"
    >
      <!-- 招呼语气泡 -->
      <div class="greeting-bubble" v-show="showGreeting">
        <span class="greeting-inner" :class="{ tilted: collapsed || dragFromCollapsed }">
          <span class="greeting-text">HI,需要帮助吗？</span>
        </span>
      </div>
      <img src="./robot2.png" alt="robot" class="mascot-img" draggable="false" @dragstart.prevent />
    </div>

    <!-- 白色功能卡片：收起时隐藏 -->
    <div class="widget-card" v-show="!collapsed" :style="cardRevealStyle">
      <!-- 关闭按钮：hover 时显示在卡片右上角 -->
      <div
        class="close-btn"
        v-show="isHovering && !isDragging"
        @click.stop="hideWidget"
      >
        ✕
      </div>
      <div class="widget-item" @click="onWidgetItemClick($event, 'customerService')">
        <div class="icon-wrapper customer-service">
          <i class="icon-chat">💬</i>
        </div>
        <span class="widget-text">智能客服</span>
      </div>

      <div class="widget-item" @click="onWidgetItemClick($event, 'feedback')">
        <div class="icon-wrapper feedback">
          <i class="icon-pen">✏️</i>
        </div>
        <span class="widget-text">意见反馈</span>
      </div>
    </div>

    <!-- 侧边栏白条：仅收起时显示（类似 iPhone 底部 home indicator） -->
    <div class="collapse-strip" v-show="collapsed"></div>
  </div>
  </div>
</template>

<script>
const DRAG_THRESHOLD = 3;    // 移动超过 3px 触发拖拽
const EDGE_THRESHOLD = 20;   // 距右边缘 20px 内触发收起
const STORAGE_KEY = 'floating-robot-state';

export default {
  name: 'FloatingWidget',

  data() {
    return {
      // ---- 核心状态 ----
      visible: true,
      collapsed: false,
      isHovering: false,
      isDragging: false,
      peekingIn: false,
      position: { x: 0, y: 0 },
      useCustomPosition: false,
      cardClipRight: 0,        // 拖出时卡片右侧裁剪量 (px)
      dragFromCollapsed: false, // 是否正在从收起状态拖出（保持头部倾斜）
      showGreeting: false,     // 招呼语气泡显隐
      greetingInterval: 1,    // 间隔 N 秒后出现下一次
      greetingDuration: 3,    // 每次持续 N 秒
      greetingGap: 3,         // 消失后的停滞期 N 秒
      featureEnabled: true,    // 是否记录状态（关闭则每次进入默认展开）
    };
  },

  watch: {
    visible(val) {
      this._saveState();
      this.$root.$emit('robot-visible-change', val);
    },
    collapsed() { this._saveState(); },
    featureEnabled(val) {
      if (!val) {
        // 关闭开关 → 重置为默认展开状态
        this.showWidget();
        this._startGreetingCycle();
      }
      this._saveState();
      this.$root.$emit('robot-visible-change', this.visible);
    },
  },

  computed: {
    widgetStyle() {
      // 未拖拽过且未收起 → CSS 默认定位
      if (!this.useCustomPosition && !this.collapsed) {
        return {};
      }

      const style = {};

      if (this.collapsed) {
        style.right = '-24px';
        style.top = this.position.y + 'px';
        style.bottom = 'auto';
        style.left = 'auto';
      } else {
        style.left = this.position.x + 'px';
        style.top = this.position.y + 'px';
        style.right = 'auto';
        style.bottom = 'auto';
      }

      if (this.isDragging) {
        style.transition = 'none';
      }

      return style;
    },

    /* 从收起状态拖出时，用透明度 + 轻微位移控制卡片逐渐露出 */
    cardRevealStyle() {
      if (this.cardClipRight <= 0) return {};
      const progress = 1 - this.cardClipRight / 76; // 0 → 1
      return {
        opacity: progress,
        transform: `translateX(${(1 - progress) * 16}px)`,
        transition: 'none',
      };
    },
  },

  methods: {
    // ==================== 悬浮 / 离开 ====================
    onMouseEnter() {
      this.isHovering = true;
    },
    onMouseLeave() {
      this.isHovering = false;
    },

    // ==================== 招呼语循环 ====================
    _startGreetingCycle() {
      this._stopGreetingCycle();
      this._scheduleGreetingShow();
    },
    _stopGreetingCycle() {
      clearTimeout(this._greetingShowTimer);
      clearTimeout(this._greetingHideTimer);
      clearTimeout(this._greetingGapTimer);
      this.showGreeting = false;
    },
    _scheduleGreetingShow() {
      clearTimeout(this._greetingHideTimer);
      this.showGreeting = false;
      this._greetingShowTimer = setTimeout(() => {
        this.showGreeting = true;
        this._scheduleGreetingHide();
      }, this.greetingInterval * 1000);
    },
    _scheduleGreetingHide() {
      clearTimeout(this._greetingShowTimer);
      this._greetingHideTimer = setTimeout(() => {
        this.showGreeting = false;
        // 停滞期结束后再进入"间隔 → 显示"循环
        this._greetingGapTimer = setTimeout(() => {
          this._scheduleGreetingShow();
        }, this.greetingGap * 1000);
      }, this.greetingDuration * 1000);
    },

    // ==================== 关闭 / 打开 ====================
    hideWidget() {
      this.visible = false;
      this._stopGreetingCycle();
    },
    showWidget() {
      this.visible = true;
      this.useCustomPosition = false;
      this.collapsed = false;
      this.position = { x: 0, y: 0 };
      this._startGreetingCycle();
    },

    // ==================== 拖拽 ====================
    onMouseDown(e) {
      // 初始化内部状态
      this._dragOccurred = false;
      this._hasMoved = false;

      const rect = this.$refs.widget.getBoundingClientRect();

      // 从 CSS 默认定位 / 收起状态计算出实际 left/top
      if (!this.useCustomPosition || this.collapsed) {
        this.position = { x: rect.left, y: rect.top };
      }

      this._dragStartX = e.clientX;
      this._dragStartY = e.clientY;
      this._offsetX = e.clientX - rect.left;
      this._offsetY = e.clientY - rect.top;

      // 绑定 document 事件（在 mousedown 时绑定，mouseup 时解绑）
      this._onMove = (ev) => this._handleMove(ev);
      this._onUp = (ev) => this._handleUp(ev);
      document.addEventListener('mousemove', this._onMove);
      document.addEventListener('mouseup', this._onUp);
    },

    _handleMove(e) {
      // 尚未拖拽 → 检测是否移动超过阈值
      if (!this.isDragging) {
        const dx = e.clientX - this._dragStartX;
        const dy = e.clientY - this._dragStartY;
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) {
          return;
        }
        // 超过阈值 → 进入拖拽模式
        this.isDragging = true;
        this.useCustomPosition = true;
        this._hasMoved = true;
        // 记录拖拽起点是否处于收起状态
        this._wasCollapsedStart = this.collapsed;
        if (this.collapsed) {
          this.collapsed = false; // 展开卡片，通过 clip 控制露出范围
          this.dragFromCollapsed = true; // 保持头部倾斜，松手后再摆正
          this._collapsedStartX = this.position.x; // 记录拖拽起始 x，用于计算移动距离
        }
      }

      // 跟手更新位置
      this.position = {
        x: e.clientX - this._offsetX,
        y: e.clientY - this._offsetY,
      };

      // 从收起拖出：根据实际拖拽移动距离，逐 px 露出卡片
      if (this._wasCollapsedStart) {
        const CARD_W = 76;
        const movedLeft = this._collapsedStartX - this.position.x;
        this.cardClipRight = Math.max(0, Math.min(CARD_W, CARD_W - movedLeft));
      }
    },

    _handleUp() {
      // 解绑事件
      document.removeEventListener('mousemove', this._onMove);
      document.removeEventListener('mouseup', this._onUp);
      this._onMove = null;
      this._onUp = null;

      if (!this.isDragging) {
        return; // 没有拖拽，是普通点击
      }

      // 拖拽结束，重置 clip
      this._dragOccurred = true;
      this.isDragging = false;
      this.cardClipRight = 0;
      this.dragFromCollapsed = false;
      this._wasCollapsedStart = false;

      const el = this.$refs.widget;
      const w = el ? el.offsetWidth : 76;
      const h = el ? el.offsetHeight : 200;
      const rightEdge = this.position.x + w;
      const wasCollapsed = this.collapsed;

      if (rightEdge >= window.innerWidth - EDGE_THRESHOLD) {
        // 拖到右边缘 → 收起
        this.collapsed = true;
      } else {
        // 正常放置 → 边界保护
        this.collapsed = false;
        this.position.x = Math.max(0, Math.min(this.position.x, window.innerWidth - w));
        this.position.y = Math.max(0, Math.min(this.position.y, window.innerHeight - h));

        // 从收起拖出 → 探头动画
        if (wasCollapsed) {
          this.peekingIn = true;
          setTimeout(() => {
            this.peekingIn = false;
          }, 500);
        }
      }
      this._saveState();
    },

    // ==================== 功能项点击 ====================
    onWidgetItemClick(_e, type) {
      if (this._dragOccurred) return;
      if (type === 'customerService') this.handleCustomerService();
      else if (type === 'feedback') this.handleFeedback();
    },

    // ==================== 持久化 ====================
    _loadState() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved) {
          this.featureEnabled = saved.featureEnabled !== false;
          // 只有开关打开时才恢复三种状态
          if (this.featureEnabled) {
            this.visible = saved.visible !== false;
            this.collapsed = saved.collapsed || false;
            if (saved.position && (saved.useCustomPosition || saved.collapsed)) {
              this.position = saved.position;
            }
            this.useCustomPosition = saved.useCustomPosition || false;
            if (saved.collapsed) {
              this.useCustomPosition = true;
            }
          }
        }
      } catch (e) { /* ignore */ }
    },
    _saveState() {
      // 开关关闭时不保存
      if (!this.featureEnabled) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          visible: this.visible,
          collapsed: this.collapsed,
          position: this.position,
          useCustomPosition: this.useCustomPosition,
          featureEnabled: this.featureEnabled,
        }));
      } catch (e) { /* ignore */ }
    },

    handleCustomerService() {
      this.$emit('customer-service-click');
      console.log('点击了智能客服');
    },
    handleFeedback() {
      this.$emit('feedback-click');
      console.log('点击了意见反馈');
    },
  },

  mounted() {
    this._loadState();
    // 启动招呼语循环
    if (this.visible) {
      this._startGreetingCycle();
    }
    // 通知 Navbar 初始状态
    this.$root.$emit('robot-visible-change', this.visible);
    // 监听 Navbar 入口点击
    this.$root.$on('robot-show', this.showWidget);
  },

  beforeDestroy() {
    this._stopGreetingCycle();
    this.$root.$off('robot-show', this.showWidget);
    if (this._onMove) {
      document.removeEventListener('mousemove', this._onMove);
      document.removeEventListener('mouseup', this._onUp);
    }
  },
};
</script>

<style scoped>
/* ==================== 悬浮模块主体 ==================== */
.floating-widget {
  position: fixed;
  right: 24px;
  bottom: 60px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  user-select: none;
  /* 位置切换时的平滑过渡（拖拽时通过 inline style 移除） */
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              top 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 收起状态：右侧藏入屏幕边缘，仅露白条和一小部分机器人 */
.floating-widget.collapsed {
  right: -24px;
  cursor: grab;
}

/* 拖拽中：无过渡、抓取光标 */
.floating-widget.dragging {
  cursor: grabbing;
  z-index: 1001;
}

/* ==================== 关闭按钮 ==================== */
.close-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  z-index: 1010;
  animation: close-fade-in 0.2s ease;
  transition: background 0.15s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

@keyframes close-fade-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ==================== 吉祥物（机器人头部） ==================== */
.mascot-container {
  width: 54px;
  height: 54px;
  margin-bottom: -12px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ==================== 招呼语气泡 ==================== */
.greeting-bubble {
  position: absolute;
  bottom: 100%;
  right: -4px;
  margin-bottom: 4px;
  z-index: 20;
  animation: bubble-in 0.2s ease;
}

.greeting-inner {
  display: block;
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  padding: 6px 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

/* 收起状态时反向旋转，让背景和文字同时摆正 */
.greeting-inner.tilted {
  transform: rotate(45deg);
}

/* 收起状态气泡往上移 */
.floating-widget.collapsed .greeting-bubble {
  margin-bottom: 28px;
}

.greeting-text {
  font-size: 13px;
  color: #333;
  letter-spacing: 0.3px;
}


@keyframes bubble-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 收起时向左倾斜 45° */
.mascot-container.tilted {
  transform: rotate(-45deg);
}

/* 探头升起动画：从倾斜+下沉 → 摆正+升起 */
.mascot-container.peek-in {
  animation: peek-in-rise 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes peek-in-rise {
  0% {
    transform: rotate(-45deg) translateY(12px);
    opacity: 0.7;
  }
  100% {
    transform: rotate(0deg) translateY(0);
    opacity: 1;
  }
}

.mascot-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  -webkit-user-drag: none;
  user-drag: none;
}

/* 收起状态时调整头部间距 */
.floating-widget.collapsed .mascot-container {
  margin-bottom: 4px;
}

/* ==================== 白色功能卡片 ==================== */
.widget-card {
  position: relative;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px 12px 16px 12px;
  width: 76px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.widget-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  width: 100%;
}

.widget-item:hover {
  transform: translateY(-2px);
}
.widget-item:active {
  opacity: 0.8;
}

.icon-wrapper {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  font-size: 18px;
}

.customer-service {
  background-color: #5ba3f8;
  box-shadow: 0 3px 8px rgba(91, 163, 248, 0.2);
}

.feedback {
  background-color: #f7af65;
  box-shadow: 0 3px 8px rgba(247, 175, 101, 0.2);
}

.widget-text {
  font-size: 12px;
  color: #333333;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* ==================== 侧边栏白条（收起指示器） ==================== */
.collapse-strip {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 54px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.95) 100%);
  border-radius: 3px 0 0 3px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.4);
  transition: opacity 0.3s ease;
  cursor: grab;
}

.collapse-strip::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 30px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
}
</style>
