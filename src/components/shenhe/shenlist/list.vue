
<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 80vh;overflow:auto">
                        <div class="aaa">
                             
                             <div class="bbb">
                               <div class="tit">条件筛选</div>
                                   <div class="sheng data">
                                        <Select v-model="model1" style="width:104px" placeholder="省" size="default" @on-change="change1">
                                              <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>-
                                        <Select v-model="model2" style="width:104px" placeholder="市" size="default" @on-change="change2">
                                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>-
                                        <Select v-model="model3" style="width:104px" placeholder="县/区" size="default" @on-change="change3">
                                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>

                                        <Select v-model="oneshen" style="width:100px" placeholder="一审状态" size="default">
                                            <Option v-for="item in oneshenList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="twoshen" style="width:100px" placeholder="二审状态" size="default">
                                            <Option v-for="item in twoshenList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                   </div>
                                  
                                    <div>
                                        <Select v-model="listjia" style="width:100px" placeholder="项目类型" size="default">
                                            <Option v-for="item in protype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="pname" style="width:100px" placeholder="项目名称" size="default">
                                            <Option v-for="item in proname" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Input v-model="pobj" placeholder="调研对象" style="width: 300px"  size="default"/>&nbsp;&nbsp;
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
                               <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table> -->
                               <Table :height="tableHeight" :columns="columns4" :data="dataArr" size="small" border ref="table"></Table>
                                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" size="small"
                                    show-elevator  show-total placement="top" @on-change="handlePage">
                                </Page>

                           </div>
                        
                          </div>
                          
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import city from"../../../../static/city.json"
import $ from "jquery"
import axios from "axios"

export default {
  name: 'List',
  data () {
    return {
        tableHeight:450,
        oneshen:"",
        listjia:"",
        pname:"",
        pobj:"",
        twoshen:"",
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

        pageTotal: 1,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 10,  //每页条数
        dataArr :[],   //页面显示的数组

        // 全选
       columns4: [
                   
                    {
                        title: '项目类型',
                        key: 'pjtype1'
                    },
                    {
                        title: '项目名称',
                        key: 'pjname'
                    },
                    {
                        title: '地区',
                        key: 'area'
                    },
                    {
                        title: '调研对象',
                        key: 'robj'
                    },
                    {
                        title: '调研编号',
                        key: 'rnum'
                    },
                    {
                        title: '原始得分',
                        key: 'origscore'
                    },
                    {
                        title: '一审负责人',
                        key: 'finstperson'
                    },
                    {
                        title: '一审状态',
                        key: 'finststate'
                    },
                    {
                        title: '一审时间',
                        key: 'finststime'
                    },
                    {
                        title: '一审得分',
                        key: 'finstscore'
                    },
                    {
                        title: '二审负责人',
                        key: 'sinstperson'
                    },
                    {
                        title: '二审状态',
                        key: 'sinststate'
                    },
                     {
                        title: '二审时间',
                        key: 'sinststime'
                    },
                     {
                        title: '二审得分',
                        key: 'sinstscore'
                    },
                    {
                        title: '操作 ',
                        align:"center",
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
                                }, '详情'),
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.index)
                                //         }
                                //     }
                                // }, 'Delete')
                            ]);
                        }
                    }
                ],
                data1: [
                    
                ],
       input10: '',
       single: false,
       single1: false,
       single2: false,
       single3: false,
       proname:[],
       protype:[    {
                        value: 1,
                        label: '家化'
                    },
                    {
                        value: 2,
                        label: '时效'
                    },],
       oneshenList: [
                    {
                        value: 0,
                        label: '已审核'
                    },
                    {
                        value: 1,
                        label: '未审核'
                    },
                   
                ],
        twoshenList: [
                   {
                        value: 0,
                        label: '已审核'
                    },
                    {
                        value: 1,
                        label: '未审核'
                    },
                    
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         textarea2: '',
         textarea3: '',
         value:"",
         value2:""      ,
          social: ['facebook', 'github'],
          fruit: ['苹果']  
    }
  },

methods: {
            outExcel(){
               window.location.href="http://106.14.173.50:8080/exportAuditlist"                                           
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
        //分页
         handlePage(value){
            console.log(value)
           var that = this;
            var params = JSON.parse(JSON.stringify(
                {
                    sortList:{
                        provinceid:that.model1,//省
                        cityid:that.model2,//市
                        districtid:that.model3,//区
                        finststate:that.oneshen,//一审状态
                        sinststate:that.twoshen,//二审状态
                        pjtype:that.listjia,//项目类型
                        pjname:that.pname,//项目名称
                        robj:that.pobj//调研对象
                    },
                    currPage:value
                }
                
            ))
            // console.log(params)
             axios({               
                 url:"http://106.14.173.50:8080/auditlist",
                 params:params                
                })
                .then(function(data){
                   console.log(data.data)
                    var arr = data.data.datas
                    for(var i in arr){
                        arr[i].pjtype = arr[i].pjtype==1?"家化":"时效";
                        arr[i].finststate = arr[i].finststate==1?"已审核":"未审核"
                        arr[i].sinststate = arr[i].sinststate==1?"已审核":"未审核"

                        var timestamp3 = String(arr[i].finststime).substring(0,10);
                        var newDate = new Date();
                        newDate.setTime(timestamp3 * 1000);
                        arr[i].finststime = newDate.toLocaleDateString()
 
                        var timestamp4 = String(arr[i].sinststime).substring(0,10);
                        newDate.setTime(timestamp4 * 1000);
                        arr[i].sinststime = newDate.toLocaleDateString()

                        var city = that.city;  
                        for(var j in city){
                            if(arr[i].provinceid == city[j].id){                          
                              arr[i].provinceid = city[j].name
                            //    console.log(arr[i].provinceid)
                             var shi = city[j].child
                             for(var k in shi){
                                //   console.log(obj.ashi)
                               if(arr[i].cityid== shi[k].id){
                                    //  console.log(shi[k].name)
                                   arr[i].cityid = shi[k].name
                               }
                              var qu = shi[k].child
                                 for(var n in qu){
                                    if(arr[i].districtid== qu[n].id){
                                        // console.log(qu[n].name)
                                        arr[i].districtid = qu[n].name
                                    }
                                 }   
                             }
                            
                            }

                        }

                      arr[i].area = arr[i].provinceid==undefined?"无": arr[i].provinceid +"-"+ arr[i].cityid+"-"+ arr[i].districtid;
                       
                    }
                        that.data1 = arr;
                        that.pageTotal = data.data.count;
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data1.slice(_start,_end);

                });
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
            this.model3 = ""//清空
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

         //表格按钮详情
        show (index) {
               console.log(this.data1[index].id)
               var listid = this.data1[index].id;
               localStorage.setItem("listid",listid)
               var pjtype = this.data1[index].pjtype
               if(pjtype==1){
                    this.$router.push("/details_jia")
               }else{
                    this.$router.push("/details_shi")
               }
              
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
        search(){
            var that = this;
            var params = JSON.parse(JSON.stringify(
                {
                    sortList:{
                        provinceid:that.model1,//省
                        cityid:that.model2,//市
                        districtid:that.model3,//区
                        finststate:that.oneshen,//一审状态
                        sinststate:that.twoshen,//二审状态
                        pjtype:that.listjia,//项目类型
                        pjname:that.pname,//项目名称
                        robj:that.pobj//调研对象
                    },
                    currPage:1
                }
                
            ))
            console.log(params)
             axios({               
                 url:"http://106.14.173.50:8080/auditlist",
                 params:params                
                })
                .then(function(data){
                   console.log(data.data)
                    var arr = data.data.datas
                    for(var i in arr){
                        arr[i].pjtype1 = arr[i].pjtype==1?"家化":"时效";
                        arr[i].finststate = arr[i].finststate==1?"已审核":"未审核"
                        arr[i].sinststate = arr[i].sinststate==1?"已审核":"未审核"

                        var timestamp3 = String(arr[i].finststime).substring(0,10);
                        var newDate = new Date();
                        newDate.setTime(timestamp3 * 1000);
                        arr[i].finststime = newDate.toLocaleDateString()=='Invalid Date'?"无":newDate.toLocaleDateString()
 
                        var timestamp4 = String(arr[i].sinststime).substring(0,10);
                        newDate.setTime(timestamp4 * 1000);
                        arr[i].sinststime = newDate.toLocaleDateString()=='Invalid Date'?"无":newDate.toLocaleDateString()

                        var city = that.city;  
                        for(var j in city){
                            if(arr[i].provinceid == city[j].id){                          
                              arr[i].provinceid = city[j].name
                            //    console.log(arr[i].provinceid)
                             var shi = city[j].child
                             for(var k in shi){
                                //   console.log(obj.ashi)
                               if(arr[i].cityid== shi[k].id){
                                    //  console.log(shi[k].name)
                                   arr[i].cityid = shi[k].name
                               }
                              var qu = shi[k].child
                                 for(var n in qu){
                                    if(arr[i].districtid== qu[n].id){
                                        // console.log(qu[n].name)
                                        arr[i].districtid = qu[n].name
                                    }
                                 }   
                             }
                            
                            }

                        }

                      arr[i].area = arr[i].provinceid==undefined?"无": arr[i].provinceid +"-"+ arr[i].cityid+"-"+ arr[i].districtid;
                       
                    }
                        that.data1 = arr;
                        that.pageTotal = data.data.count;
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data1.slice(_start,_end);

                });
        }


    },
    mounted(){
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 10
        this.search()
        //省市区
        var city = this.city 
                for(var i in city){
                    var obj = {
                        value:city[i].id,
                        label:city[i].name
                    }
                   this.cityList1.push(obj)              
                   this.shi.push(city[i].child);
                   
                }
       //项目名称
       var that = this;
           axios({               
                 url:"http://106.14.173.50:8080/projName",                
                })
                .then(function(data){
                //   console.log(data.data)
                  var arr = data.data
                  for(var i in arr){
                      var obj={value:arr[i],label:arr[i]}
                       that.proname.push(obj)
                     }
                });
           document.title="审核列表"

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
     .aaa{
      width: 100%;height: 120px;display:flex;justify-content:space-between;overflow: hidden;
      .bbb{
        width: 100%;height: 130px;background:#F5F7F9;;
        .tit{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
      }

    }

 
    .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.xia{width: 100%;height:80%;
    .table{
            .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;display: flex;justify-content: space-between;
            .biao{background: #C1C1C1;color: #fff;text-align: center;line-height: 50%}
            }

    }

}
    
    .data{
        margin: 10px 0
    }
</style>