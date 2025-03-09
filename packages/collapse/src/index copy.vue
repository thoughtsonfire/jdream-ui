<template>
  <div>
  <transition name="height-transition">
    <div class="content" v-if="show" :style="{ height: isOpen ? contentHeight + 'px' : 0 }">
      <!-- 这里是内容 -->
      <div ref="content">
        <slot></slot>
      </div>
    </div>
  </transition>
  <button @click="toggle">Toggle</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      show: true,
      contentHeight: 0
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.show = true;
        this.updateHeight();
      }
    },
    updateHeight() {
      this.$nextTick(() => {
        this.contentHeight = this.$refs.content.scrollHeight;
      });
    }
  },
  mounted() {
    this.updateHeight(); // 初始渲染时更新高度
    window.addEventListener('resize', this.updateHeight); // 监听内容变化并更新高度
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateHeight);
  }
};
</script>

<style>
.height-transition-enter-active,
.height-transition-leave-active {
  transition: height 0.5s;
}

.height-transition-enter,
.height-transition-leave-to {
  height: 0;
  overflow: hidden;
}
</style>
