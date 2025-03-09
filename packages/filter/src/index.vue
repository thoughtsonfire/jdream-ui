<template>
    <div class="select-box">
        <div class="select-head">
            <div class="select-head-title">筛选条件</div>
            <div class="selected" v-for="(item,index) in selectedList" :key="index">
                {{ item.label }}
                <i class="el-icon-close" @click="checkedAgain(item)"></i>
            </div>
            <div class="clear" @click="clearChoosed">清空</div>
            <div class="close" @click="closeBody">
                {{ close?'展开':'收起' }}
                <i :class="close?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            </div>
        </div>
        <div class="select-body">
            <div class="getHeight" :class="'getHeight'+this.idName"></div>
            <div v-for="(p,i) in listUse" :key="i+idName" :class="'row'+idName" class="row">
                <div class="row-title">{{ p.label }}</div>
                <div class="row-content">
                    <div class="box">
                        <div class="btn"
                        v-for="(item,index) in p.list"
                        :key="index+'btn'+p.tId+idName"
                        :class="item.checked?'activeBtn':''"
                        @click="clickBtn(index,i)"
                        :style="{background:item.bgc}"
                        >
                            {{ item.label }}
                        </div>
                        <div class="query-item-custom" v-if="p.custom">
                            <div class="btn" :class="[{activeBtn:p.customFlag}]" @click="customClick(i,p.customFlag)">
                                自定义
                            </div>
                            <div class="item-custom-date-picker" v-if="p.customFlag">
                               <span class="demonstration"></span>
                                <el-date-picker
                                v-model="p.dateVal"
                                type="daterange"
                                size="mini"
                                ref="customTime"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @input="chooseTimeRange(p.dateVal,i)"
                                value-format="timestamp"
                                :default-time="['00:00:00','23:59:59']"
                                format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-close" v-if="p.closeShow" @click="rowClose(i)">
                    {{ p.close?'展开':'收起' }}
                    <i :class="p.close?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                </div>
                <div class="desc" v-if="p.descShow&&p.desc!=''">
                    <i class="el-icon-info" style="color: #3382ff;"></i>
                    <span>{{ p.desc }}</span>
                    <i class="el-icon-close" @click="p.descShow=!p.descShow"></i>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default{
    name:"jdFilter",
    props:{
        list:{
            type:Array,
            default:[]
        },
        idName:{
            type:String,
        }
    },
    data(){
        return{
            close:false,
            chooseArray:{},
            listUse:[],
            selected:[],
            selectedList:[],
            pickerOptions:{
                disabledDate(time){
                    return (
                        time.getTime() >
                        new Date(
                            new Date(new Date().toLocaleDateString()).getTime() +(24*60*60*1000 -1)
                        ).getTime()
                    )
                }
            }
        }
    },
    methods:{
        getFlag(){
            let i = 0
            this.listUse = []
            this.list.forEach(item=>{
                let temp0={}
                temp0.label = item.label
                temp0.tId = item.tId
                if(item.descShow==undefined){
                    temp0.descShow = false
                }else{
                    temp0.descShow = item.descShow
                }
                if(item.custom==undefined){
                    temp0.custom = false
                }else{
                    temp0.custom = item.custom
                }
                if(item.close==undefined){
                    temp0.close = false
                }else{
                    temp0.close = item.close
                }
                if(item.multiple){
                    temp0.multiple = true
                }else{
                    temp0.multiple = false
                }
                temp0.desc=''
                temp0.dateVal = []
                temp0.customFlag = false
                temp0.closeShow = false
                temp0.list = []
                item.list.forEach(p=>{
                    let temp1 = {}
                    temp1.label = p.label
                    temp1.value = p.value
                    if(p.bgc!=undefined){
                        temp1.bgc = p.bgc
                    }
                    if(p.tId!=undefined){
                        temp1.tId = p.tId
                    }
                    if(p.desc!=undefined){
                        temp1.desc = p.desc
                    }else{
                        temp1.desc = ''
                    }
                    if(p.checked){
                        temp1.checked = true
                        if(p.desc!=undefined){
                            temp0.desc = p.desc
                        }
                    }else{
                        temp1.checked = false
                    }
                    temp0.list.push(temp1)
                })
                this.listUse.push(temp0)
            })
        },
        customClick(i,flag){
            this.listUse[i].desc = ''
            this.listUse[i].list.forEach(item=>{
                if(flag){
                    if(item.label=='全部'){
                        item.checked = true
                    }else{
                        item.checked = false
                    }
                    this.listUse[i].dateVal = []
                    this.getChooseByTid(i)
                }else{
                    item.checked = false
                    if(item.label == '全部'){
                        let temp = JSON.parse(JSON.stringify(this.chooseArray))
                        let temp0 = [{}]
                        temp0[0] = JSON.parse(JSON.stringify(item))
                        this.chooseArray = {}
                        for(const key in temp){
                            if(key == this.listUse[i].tId){
                                temp[key] = JSON.parse(JSON.stringify(temp0))
                            }
                        }
                        this.chooseArray = JSON.parse(JSON.stringify(temp))
                    }
                }
            })
            this.listUse[i].customFlag =!flag
        },
        chooseTimeRange(val,i){
            this.$emit('setTime',[this.listUse[i].tId,val])
        },
        clickBtn(index,i){
            this.listUse[i].customFlag = false
            if(this.listUse[i].multiple){
                this.listUse[i].list[index].checked =!this.listUse[i].list[index].checked
                if(this.listUse[i].list[index].label =='全部'&&this.listUse[i].list[index].checked){
                    this.listUse[i].list.forEach(item=>{
                        if(item.label!='全部'){
                            item.checked = false
                        }
                    })
                }
                let flag = true
                let flag1 = false
                this.listUse[i].list.forEach(item=>{
                    if(item.label!='全部'&&!item.checked){
                        flag = false
                    }
                    if(item.label!='全部'&&item.checked){
                        flag1 = true
                        this.listUse[i].list.forEach(p=>{
                            if(p.label=='全部'){
                                p.checked = false
                            }
                        })
                    }
                    if(item.labe!='全部'){
                        flag1 = flag1 || flag
                    }
                })
                if(!flag1){
                    flag = true
                }
                if(flag){
                    this.listUse[i].list.forEach(item=>{
                        if(item.label == '全部'){
                            item.checked = true
                        }else{
                            item.checked = false
                        }
                    })
                }
            }else{
                if(this.listUse[i].list[index].checked){
                    this.listUse[i].list.forEach(item=>{
                        if(item.label == '全部'){
                            item.checked = true
                        }else{
                            item.checked = false
                        }
                    })
                }else{
                    this.listUse[i].list.forEach(item=>{
                        if(item.label == this.listUse[i].list[index].label){
                            item.checked = true
                        }else{
                            item.checked = false
                        }
                    })
                }
            }
            this.listUse[i].desc = ''
            this.listUse[i].list.forEach(item=>{
                if(item.checked){
                    this.listUse[i].desc = item.desc
                }
            })
            this.getChooseByTid(i)
        },
        getChoose(){
            this.chooseArray = {}
            this.listUse.forEach(item=>{
                this.chooseArray[item.tId]=[]
                item.list.forEach(p=>{
                    if(p.checked){
                        let temp = {}
                        temp = JSON.parse(JSON.stringify(p))
                        this.chooseArray[item.tId].push(temp)
                    }
                })
            })
        },
        getChooseByTid(i){
            let tId = this.listUse[i].tId
            let temp = JSON.parse(JSON.stringify(this.chooseArray))
            this.chooseArray = temp
            this.chooseArray[tId] = []
            this.listUse[i].dateVal = []
            this.listUse[i].list.forEach(item=>{
                if(item.checked){
                    let temp = {}
                    temp = JSON.parse(JSON.stringify(item))
                    this.chooseArray[tId].push(temp)
                }
            })
        },
        getHeight(){
            let rowName = 'row' + this.idName
            let heightName = 'getHeight' + this.idName
            let row = document.getElementsByClassName(rowName)
            let hgt = document.getElementsByClassName(heightName)[0]
            for(let i = 0;i<row.length;i++){
                if(row[i].clientHeight>hgt.clientHeight+1){
                    this.listUse[i].closeShow = true
                    if(this.listUse[i].close){
                        row[i].style.height = hgt.clientHeight+'px'
                    }
                }
            }
        },
        rowClose(i){
            let rowName = 'row' + this.idName
            let heightName = 'getHeight' + this.idName
            let row = document.getElementsByClassName(rowName)[i]
            let hgt = document.getElementsByClassName(heightName)[0]
            if(row.clientHeight == hgt.clientHeight){
                row.style.removeProperty('height')
                this.listUse[i].close = false
            }else{
                row.style.height = hgt.clientHeight+'px'
                this.listUse[i].close = true
            }
        },
        checkedAgain(data){
            if(data.index == undefined){
                this.customClick(data.i,this.listUse[data.i].customFlag)
            }else{
                this.clickBtn(data.index,data.i)
            }
        },
        clearChoosed(){
            this.selectedList.forEach(item=>{
                this.checkedAgain(item)
            })
        },
        closeBody(){
            this.close =!this.close
            let body = document.getElementsByClassName('select-body')[0]
            if(this.close){
                body.style.height = 0
            }else{
                body.style.removeProperty('height')
            }
        }
    },
    watch:{
        chooseArray:{
            handler(n,o){
                this.selected = JSON.parse(JSON.stringify(n))
                this.selectedList = []
                let i = 0
                for(const key in this.selected){
                    this.selected[key].forEach(item=>{
                        let temp = {}
                        if(!item.checked){
                            item.labe = "自定义"
                        }
                        temp = JSON.parse(JSON.stringify(item))
                        temp.i = i
                        let index = 0
                        this.listUse[i].list.forEach(item=>{
                            if(item.label == temp.label){
                                temp.index = index
                            }
                            index++
                        })
                        this.selectedList.push(temp)
                    })
                    i++
                }
                this.$emit('change',n)
            },
            deep:true
        },
        list:{
            handler(n,o){
                this.getFlag()
                this.$nextTick().then(()=>{
                    this.getHeight()
                })
                this.getChoose()
            },
            deep:true
        }
    },
    mounted(){
        this.getFlag()
        this.$nextTick().then(()=>{
            this.getHeight()
        })
        this.getChoose()
        window.addEventListener("resize",()=>{
            let rowName = 'row' + this.idName
            let heightName = 'getHeight' + this.idName
            let row = document.getElementsByClassName(rowName)
            let hgt = document.getElementsByClassName(heightName)[0]
            for(let i=0;i<row.length;i++){
                if(this.listUse[i].close){
                    row[i].style.height = hgt.clientHeight +'px'
                    console.log( row[i].style.height );
                    
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-range-editor.is-active, .el-range-editor.is-active:hover{
    border-color: rgb(51, 130, 255)
}
::v-deep .el-input__inner{
    height: 32px !important;
}
::v-deep .el-date-editor .el-range__icon{
    font-size: 14px !important;
    line-height: 14px !important;
}
::v-deep .el-range-input{
    font-size: 14px !important;
    line-height: 14px !important;
}
::v-deep .el-range-separator{
    font-size: 14px !important;
    line-height: 14px !important;
    padding: 0 5px !important;
    width: 6% !important;
}

.select-box{
    display: inline-block;
    width: 100%;
    position: relative;
    .select-head{
        width: 100%;
        border-bottom: 1px solid rgba(195,209,232,0.7);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        position: relative;
        margin-bottom: 20px;
        .select-head-title{
            font-family: PingFang SC;
            color: #172d4e;
            font-size:16px;
            width: 65px;
            margin-right:20px;
            line-height: 20px;
            margin-bottom: 4px;
        }
        .selected{
            margin-right: 20px;
            margin-bottom:4px;
            font-family: SourceHanSansCN-Normal;
            color: #172d4e;
            font-size: 14px;
            padding: 3px 12px;
            background-color: #f1f4f9;
            border-radius: 12px;
            line-height: 20px;
            .el-icon-close{
                font-size: 20px;
                margin-left: 6px;
            }
        }
        .clear{
            font-family: PingFan SC;
            color: #3382ff;
            font-size: 14px;
            margin-left: 20px;
            cursor: pointer;
            user-select: none;
        }
        .close{
            position: absolute;
            right: 40px;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            color:#3382ff;
            font-size: 14px;
            line-height: 20px;
            cursor: pointer;
            user-select: none;
            i{
                margin-left: 4px;
                color: #3382ff;
                font-size: 12px;
                line-height: 20px;
            }
        }
    }
    .select-body{
        overflow: hidden;
        .getHeight{
            width: 0;
            height: 42px;
            position: absolute;
            z-index: -10;
            opacity: 0;
        }
        .row{
            position: relative;
            overflow: hidden;
            .row-title{
                display: inline-block;
                width: 70px;
                margin-top: 4px;
                font-family: PingFang SC;
                color: #8e98a3;
                font-size: 14px;
            }
            .row-content{
                display: inline-block;
                width: 90%;
                .box{
                    display: flex;
                    flex-wrap: wrap;
                    .btn{
                        box-sizing: border-box;
                        background: rgba(255,255,255,0);
                        border: 1px solid;
                        border-color: #d4dee8;
                        border-radius: 3px;
                        font-family: PingFang SC;
                        color: #172d4e;
                        font-size: 14px;
                        line-height: 32px;
                        height: 32px;
                        padding: 0 10px;
                        margin-right: 10px;
                        cursor: pointer;
                        user-select: none;
                        margin-bottom: 10px;
                    }
                    .activeBtn{
                        color: #3382ff;
                        border-color: #3382ff;
                    }
                    .query-item-custom{
                        position: relative;
                        .item-custom-date-picker{
                            position: absolute;
                            top: 0;
                            left: 100%;
                        }
                    }
                }
            }
            .row-close{
                position: absolute;
                color: #3382ff;
                right: 20px;
                top: 3px;
                font-size: 14px;
                cursor: pointer;
                user-select: none;
                i{
                    margin-left: 4px;
                    font-size: 12px;
                }
            }
            .desc{
                display: inline-block;
                margin-left: 73px;
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
                background: #ebf3ff;
                font-size: 14px;
                margin-bottom: 10px;
                .el-icon-info{
                    margin-right:10px;
                }
                .el-icon-close{
                    margin-left: 30px;
                }
            }
        }
    }
}
</style>