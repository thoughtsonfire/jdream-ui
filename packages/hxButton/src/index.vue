<template>
  <button class="hxButton">
    {{ title }}
  </button>   
</template>
  
  <script>
  export default {
    name: "hxButton",
    inject: {},
    props: {
      title:{
        type:String,
        default:"这是一个按钮"
      }
    },
    methods:{
    }
  }
  </script>
  
  <style scoped lang="less">
 .hxButton{
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid greenyellow;
 }
  </style>
  


  