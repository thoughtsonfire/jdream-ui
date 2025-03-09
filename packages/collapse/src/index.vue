<template>
    <div class="container" ref="container" :style="{transition:transition}">
      <slot></slot>
    </div>
  </template>
   
  <script>
  export default {
    name:'jdCollapse',
    props: {
      show: {
        type: Boolean,
        default: true,
      },
      transition:{
        type:String,
        default:'height .5s linear'
      }
    },
    data() {
      return {
        height: 0,
      };
    },
    mounted() {
      this.$nextTick().then(() => {
        this.height = this.$refs.container.offsetHeight;
        this.$refs.container.style.height = this.show ? `${this.height}px` : 0;
      });
    },
    watch: {
      show(newVal) {
        this.$refs.container.style.height = newVal ? `${this.height}px` : 0;
      },
    },
  };
  </script>
   
  <style scoped>
  .container {
    overflow: hidden;
  }
  </style>