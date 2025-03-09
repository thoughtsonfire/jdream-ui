<template>
  <div id="app">
    <jd-collapse >
        <div style="height: 200px;width: 100px;background-color: red; overflow: scroll;">
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
          <p>1111111111111111</p>
        </div>
        <div>aaa</div>
    </jd-collapse>
    <jd-filter @change="change" @setTime="setTime" :list="list" :idName="'filter1'"></jd-filter>
  </div>
</template>
 
<script>
import jdCollapse from '../packages/collapse/src/index copy.vue';
import jdFilter from '../packages/filter/src/index.vue';
 
export default {
  components: {
    jdCollapse,
    jdFilter
  },
  data() {
    return {
      list:[
        {
          label:'筛选条件1',
          tId:'sx1',
          list:[
            {label:'全部',value:'',desc:'全部',checked:true},
            {label:'条件1',value:1,desc:'条件1'},
            {label:'条件2',value:2,desc:'条件2'},
            {label:'条件3',value:3,desc:'条件3'},
          ]
        },
        {
          label:'筛选条件2',
          tId:'sx2',
          descShow:true,
          close:true,
          list:[
            {label:'全部',value:'',desc:'全部',checked:true},
            {label:'条件1',value:1,desc:'条件1'},
            {label:'条件2',value:2,desc:'条件2'},
            {label:'条件3',value:3,desc:'条件3'},
            {label:'条件4',value:4,desc:'条件4'},
            {label:'条件5',value:5,desc:'条件5'},
            {label:'条件6',value:6,desc:'条件6'},
            {label:'条件7',value:7,desc:'条件7'},
            {label:'条件8',value:8,desc:'条件8'},
            {label:'条件9',value:9,desc:'条件9'},
            {label:'条件10',value:10,desc:'条件10'},
          ]
        },
        {
          label:'时间',
          custom:true,
          tId:'time',
          list:[
            {label:'全部',value:'',checked:true},
            {label:"近三天",value:1},
            {label:"近一周",value:2},
            {label:"近一个月",value:3},
            {label:"近三个月",value:4},
          ]
        }
      ]
    }
  },
  methods:{
    change(data){
      console.log(data,'change');
    },
    setTime(data){
      console.log(data,'setTime')
    }
  }
}
</script>