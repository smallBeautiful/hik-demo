<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 机器人入口：关闭后显示在头像左侧 -->
      <span
        class="robot-nav-entry"
        :class="{ visible: !robotVisible }"
        @click="showRobot"
        title="打开机器人助手"
      >
        <img src="@/components/FloatingRobot/robot2.png" alt="robot" class="robot-nav-img" draggable="false" />
      </span>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      robotVisible: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted() {
    // 从 localStorage 读取初始可见状态
    try {
      const saved = JSON.parse(localStorage.getItem('floating-robot-state'));
      if (saved) {
        this.robotVisible = saved.visible !== false;
      }
    } catch (e) { /* ignore */ }

    this.$root.$on('robot-visible-change', (val) => {
      this.robotVisible = val
    })
  },
  beforeDestroy() {
    this.$root.$off('robot-visible-change')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    showRobot() {
      this.$root.$emit('robot-show')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .robot-nav-entry {
      display: none;
      vertical-align: top;
      cursor: pointer;
      margin-right: 12px;

      &.visible {
        display: inline-block;
      }

      .robot-nav-img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
        transition: transform 0.2s ease;
      }

      &:hover .robot-nav-img {
        transform: scale(1.15);
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
