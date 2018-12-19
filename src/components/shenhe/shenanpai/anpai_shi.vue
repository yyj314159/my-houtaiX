<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
             <Content :style="{padding: '0 10px 10px'}">
                <Breadcrumb :style="{margin: '5px 0'}">
                    <router-link to="./shenhe" tag="span">
                       <Button type="warning" size="small">返回</Button>
                    </router-link>
                    
                    <!-- <Button type="success">保存</Button>
                    <Button type="error">删除</Button> -->
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 80vh;">
                          <div class="aaa">
                             
                             <div class="bbb">
                               <div class="tit">条件筛选</div>
                                   <div class="sheng">
                                        <Select v-model="model1" style="width:104px" placeholder="省" size="default" @on-change="change1">
                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>-
                                        <Select v-model="model2" style="width:104px" placeholder="市" size="default" @on-change="change2">
                                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>-
                                        <Select v-model="model3" style="width:104px" placeholder="县/区" size="default" @on-change="change3">
                                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Select v-model="daili" style="width:100px" placeholder="区域代理" size="default">
                                            <Option v-for="item in dailiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="dengji" style="width:100px" placeholder="门店等级" size="default">
                                            <Option v-for="item in dengjiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                   </div>

                                    <div class="data">
                                        
                                            <Row class="data1">
                                                    <DatePicker type="date" placeholder="开始统计日期" style="width: 150px;" size="default" @on-change="startdate"></DatePicker >  &nbsp;—&nbsp;
                                                    <DatePicker type="date" placeholder="结束统计日期" style="width: 150px" size="default"  @on-change="enddate"></DatePicker> &nbsp;&nbsp;&nbsp;&nbsp;
                                                   <Select v-model="range" style="width:100px" placeholder="分数范围" size="default">
                                                        <Option v-for="item in rangeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="task" style="width:100px" placeholder="任务状态" size="default">
                                                        <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                            </Row>   
                                    </div>

                                    <div>
                                         <Select v-model="anstatus" style="width:100px" placeholder="安排状态" size="default">
                                            <Option v-for="item in anstatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Input v-model="objproname" placeholder="调研对象" style="width: 300px"  size="default"/>&nbsp;&nbsp;
                                        <Button type="success" size="default" @click="search">搜索</Button>
                                    </div>

                                   
                               </div>
                              
                             
                             
                            
                          </div>


                          <!-- 下 -->
                          <div class="xia">
                              <!-- 表格左 -->
                            <div class="table">
                                <div class="other">
                                   <span>状态列表</span> 
                                   <Button class="biao" @click="outExcel">导出表格</Button>
                                </div>
                                <Table height="400" :columns="columns1" :data="dataArr" border size="small"></Table>
                               <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                    show-elevator  show-total placement="top" @on-change="handlePage" 
                                    >                                    
                              </Page>

                              <Modal
                                    title="安排"
                                    v-model="tan"
                                    width='340px'
                                    @on-ok="save"
                                    :styles="{top: '100px'}">
                                    <div class="wrop">
                                         <Select v-model="oneshen" style="width:300px" size="default" placeholder="选择一审" >
                                            <Option v-for="item in oneshenList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                         </Select>
                                         <Select v-model="twoshenbu" style="width:300px;margin:5px 0" size="default" placeholder="选择二审（部门）" @on-change="change22">
                                            <Option v-for="item in twoshenbuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                         </Select>
                                         <Select v-model="twoshenyuan" style="width:300px;margin-bottom:5px" size="default" placeholder="选择二审（员工）" >
                                            <Option v-for="item in twoshenyuanList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                         </Select>
                                         <Input v-model="beizhu" type="textarea" :rows="2" :cols="2" placeholder="编辑内容" />
                                    </div>
                                </Modal>
                              

                           </div>
                        
                          </div>
                          
                        


                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"
import city from"../../../../static/city.json"

export default {
  name: 'Anpai_shi',
  inject:["reload"],
  data () {
    return {
        oneshen:"",
        twoshenbu:"",
        twoshenyuan:"",
        oneshenList:[],
        twoshenbuList:[],
        twoshenyuanList:[],
        beizhu:"",
        tan:false,
        pageTotal: 1,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 10,  //每页条数
        dataArr :[],   //页面显示的数组

        objproname:"",
        task:"",
        cityList: [
                   
                ],
                model1: '',
        taskList:[
           {
                value: 1,
                label: '已完成'
            },
            {
                value: 0,
                label: "未完成"
            },
            
        ],
         anstatus:"",
        anstatusList:[
           {
                value: 1,
                label: '已安排'
            },
            {
                value: 0,
                label: "未安排"
            },
            
        ],
        range:"",
        rangeList:[
           {
                value: '0-20',
                label: '0-20'
            },
            {
                value: '21-40',
                label: "21-40"
            },
             {
                value: "41-60",
                label: "41-60"
            },
             {
                value: "61-80",
                label: "61-80"
            },
            {
                value: "81-100",
                label: "81-100"
            },
        ],
        dengji:"",
        starttime:"",
        endtime:"",
         daili:"",
         dailiList:[],
         cityList1:[],
         cityList2:[],       
         cityList3:[],  
         model1:"",   
         model2:"",
         model3:"",  
         model1: '',
         sheng:[],
         shi:[],
         qu:[],
         city:city,
         proid:"",
        dengjiList:[
            {
                value: 1,
                label: 'A级'
            },
            {
                value: 2,
                label: 'B级'
            },
             {
                value: 3,
                label: 'C级'
            },
             {
                value: 4,
                label: 'D级'
            },
        ],        // 全选
        columns1: [
                    
                //    {
                //         type: 'selection',
                //         width: 50,
                //         align: 'center'
                //     },
                    {
                        title: 'DSR编号',
                        key: 'ragency'
                    },
                    {
                        title: '调研对象',
                        key: 'dsr'
                    },
                    {
                        title: '调研编号',
                        key: 'dsrnum'
                    },
                    {
                        title: '任务状态 ',
                        key: 'robj'
                    },
                    {
                        title: '一审负责人',
                        key: 'rnum'
                    },
                    {
                        title: '二审负责人',
                        key: 'storelevel'
                    },
                    {
                        title: '原始得分 ',
                        key: 'tstate'
                    },
                    {
                        title: '一审负责人 ',
                        key: 'finstperson'
                    },
                    {
                        title: '二审负责人 ',
                        key: 'sinstperson'
                    },
                    {
                        title: '开始时间 ',
                        key: 'origscore'
                    },
                    {
                        title: '结束时间 ',
                        key: 'starttime'
                    },
                    // {
                    //     title: '开始时间 ',
                    //     key: 'endtime'
                    // },
                    {
                        title: '操作 ',
                       render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '安排'),
                                
                            ]);
                        }

                    }
                ],
                data2: [
                   
                ],
                columns4: [
                            
                            ],
                    data1: [
                                
                            ],
                input10: '',
                single: false,
                single1: false,
                single2: false,
                single3: false,
                cityList: [
                   
                ],
        cityList2: [
                  
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         textarea2: '',
         textarea3: '',
         anid:'',
         value:"",
         value2:""      ,
          social: ['facebook', 'github'],
          fruit: ['苹果']  
    }
  },

methods:{
        outExcel(){
            console.log("000")
               window.location.href="http://106.14.173.50:8080/exportAuditArrangeDetail"                           
        },
        show (index) {                  
            console.log(this.data2[index])
           this.anid = this.data2[index].id;
           this.oneshen = this.data2[index].finstperson;
           this.twoshenyuan = this.data2[index].sinstperson;
            //    this.oneshen="",
            //    this.twoshenbu="",
            //    this.twoshenyuan="",
            //    this.beizhu=""
               this.tan=true;
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
    //点击省得到id找出对应的市
        change1(val){
            // console.log(val,this.city) 
            this.cityList2=[]
            this.model2 = "",//清空
            this.model3 = ""//清空
            this.sheng = val //为得到县储存值
                              
            var city = this.city;  
             for(var i in city){
                if(val == city[i].id){                 
                   console.log(city[i].child) ;
                   var shi = city[i].child
                   for(var j in shi){
                       var obj = {
                           value:shi[j].id,
                           label:shi[j].name
                       }
                       
                        this.cityList2.push(obj)
                   }
                   
                }
              }
 
        },
//改变市获取区县
        change2(val2){
            this.cityList3=[]          
            var val = this.sheng;
             console.log(val,val2)                   
            var city = this.city;  
             for(var i in city){
                            
                   var shi = city[i].child
                   for(var j in shi){
                        if(val2==shi[j].id){  
                            var qu = shi[j].child;
                            console.log(qu)               
                          
                          
                            for(var k in qu){
                                 var obj = {
                                    value:qu[k].id,
                                    label:qu[k].name
                                 }    
                                 this.cityList3.push(obj)
                            }
                            console.log(obj)
                        }
                       
                   }
                   
              }
        },
        change3(val){
            console.log(val)
            this.model3 = val
        },
        //开始时间
       startdate(time){
            var date = new Date(time);
            var time1 = date.getTime();
            this.starttime = time1;
          console.log(time1)
       },
        //结束时间
       enddate(time){
            var date = new Date(time);
            var time1 = date.getTime();
            this.endtime = time1;
            console.log(time1)
       },

       //搜索
       search(){
           var that = this;   
           var params = JSON.parse(JSON.stringify( 
                   {
                    sortList:{  
                                pid:that.proid,
                                provinceid:that.model1,
                                cityid:that.model2,
                                districtid:that.model3,
                                ragency:that.daili,
                                storelevel:that.dengji,

                                starttime:that.starttime,
                                endtime:that.endtime,
                                scorerange:that.range,
                                tstate:that.task,

                                arrangestate:that.anstatus,
                                robj:that.objproname,

                            },
                    currPage:1
                   }
                   ))
           console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/auditArrangeDetail", 
                params:params
            })
            .then(function(data){
                console.log(data.data)
                var arr = data.data.datas;
                that.data2 = arr
               for(var i in arr){
                      var dsr1 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;
                      var dsr2 = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                      var dsr3 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;                     
                      arr[i].dsr = dsr1 +" / "+dsr2+" / "+dsr3;  
                      //时间转换  
                        var newDate = new Date();
                        
                        var starttime = String(arr[i].starttime).substring(0,10);                        
                        newDate.setTime(starttime * 1000);
                        arr[i].starttime = newDate.toLocaleDateString()

                        var endtime = String(arr[i].endtime).substring(0,10);
                        newDate.setTime(endtime * 1000);      
                        arr[i].endtime = newDate.toLocaleDateString()
                        //门店登记
                         arr[i].storelevel = arr[i].storelevel==1?"A级":(arr[i].storelevel==2?"B级":(arr[i].storelevel==3?"C级":"D级"))
                         arr[i].tstate = arr[i].tstate==0?"未完成":"已完成"
               }
                       that.pageTotal = data.data.count;
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data2.slice(_start,_end);
                        
            });
       },
       handlePage(val){
           var that = this;   
           var params = JSON.parse(JSON.stringify( 
                   {
                    sortList:{  
                                pid:that.proid,
                                provinceid:that.model1,
                                cityid:that.model2,
                                districtid:that.model3,
                                ragency:that.daili,
                                storelevel:that.dengji,

                                starttime:that.starttime,
                                endtime:that.endtime,
                                scorerange:that.range,
                                tstate:that.task,

                                arrangestate:that.anstatus,
                                robj:that.objproname,

                            },
                    currPage:val
                   }
                   ))
        //    console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/auditArrangeDetail", 
                params:params
            })
            .then(function(data){
                console.log(data.data)
                var arr = data.data.datas;
                that.data2 = arr
               for(var i in arr){
                      var dsr1 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;
                      var dsr2 = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                      var dsr3 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;
                
                      arr[i].dsr = dsr1 +" / "+dsr2+" / "+dsr3;                          
               }
                       that.pageTotal = data.data.count;
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data2.slice(_start,_end);
                        
            });
       },
       //弹出保存
       save(){
           var that = this;      
           var params = JSON.parse(JSON.stringify({sortList:{
                id:this.anid,
                finstperson:that.oneshen,
                sinstperson:that.twoshenbu,
                sinstperson:that.twoshenyuan,
                arrangeremark:that.beizhu
           }}))
           console.log(params)
            axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/arrange", 
                params:params
            })
            .then(function(data){
              console.log(data.data)
              if(data.data.code==1){
                  alert("安排成功")
                 that.reload()
              }
               
            });
       },
       change22(val){
        //    console.log(val)
           var that = this;      
            axios({ 
                url:"http://106.14.173.50:8080/employee", 
                params:{did:val}
            })
            .then(function(data){
              console.log(data.data)
              that.twoshenyuanList=[]
                var arr = data.data
                for(var i in arr){
                    var obj = {
                        value:arr[i],
                        label:arr[i]
                    }
                 that.twoshenyuanList.push(obj)
                }
                // console.log(that.cityList)
            });          
       }

       },
mounted(){
    var proid  = localStorage.getItem("proid")
    this.proid = proid;
    var city = this.city 
                for(var i in city){
                    var obj = {
                        value:city[i].id,
                        label:city[i].name
                    }
                   this.cityList1.push(obj)              
                   this.shi.push(city[i].child);
                   
                }

        // 区域代理       
           var that = this;      
            axios({ 
                url:"http://106.14.173.50:8080/agency", 
            })
            .then(function(data){
              console.log(data.data)
                var arr = data.data
                for(var i in arr){
                    var obj = {
                        value:arr[i],
                        label:arr[i]
                    }
                    that.dailiList.push(obj)
                }
                // console.log(that.cityList)
            });
         //弹出框下拉接口
            axios({ 
                url:"http://106.14.173.50:8080/finstperson", 
            })
            .then(function(data){
              console.log(data.data)
                var arr = data.data
                for(var i in arr){
                    var obj = {
                        value:arr[i],
                        label:arr[i]
                    }
                    that.oneshenList.push(obj)
                }
                // console.log(that.cityList)
            });
            axios({ 
                url:"http://106.14.173.50:8080/department", 
            })
            .then(function(data){
              console.log(data.data)
                var arr = data.data
                for(var i in arr){
                    var obj = {
                       value:arr[i].did,
                        label:arr[i].dname
                    }
                    that.twoshenbuList.push(obj)
                }
                console.log(that.cityList)
            });     
            //搜索列表默认
            this.search()
                
           document.title="查看安排"
}       

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .aaa{
      width: 100%;height: 155px;display:flex;justify-content:space-between;overflow: hidden;
      .bbb{
        width: 100%;height: 155px;
        .tit{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
      }

    }

 
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.xia{width: 100%;height:70%;;margin-top:10px;overflow: auto;
   .table{
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px;display: flex;justify-content: space-between;
       .biao{background: #C1C1C1;color: #fff;text-align: center;line-height: 50%}
    }
  }
}

.wrop{
    height: 175px;width: 310px;border: 1px dotted red;background: #FFFCED;padding: 5px;
}
 .data{
    margin: 10px 0
 }


</style>
