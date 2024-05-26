<template>
  <div class="app-container">
    <div style="width: 300px; height: 30px">
      <p class="multi-line">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
/* 单行文本溢出 */
.single-line {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出的部分 */
  text-overflow: ellipsis; /* 在溢出时显示省略号 */
}

/* 多行文本溢出 */
.multi-line {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 指定行数 */
  -webkit-box-orient: vertical;
  overflow: hidden; /* 隐藏溢出的部分 */
}
</style>
