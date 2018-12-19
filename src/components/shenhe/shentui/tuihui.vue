

<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <!-- <el-button type="info" size="small">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;</el-button>
                    <el-button type="danger" size="small">&nbsp;&nbsp;删&nbsp;除&nbsp;&nbsp;</el-button> -->
                </Breadcrumb>
               <Card style="height: 85vh;">
                    <div style="height: 80vh;">
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
                                        </Select>&nbsp;

                                        <Select v-model="backstatus" style="width:100px" placeholder="退回状态" size="default">
                                            <Option v-for="item in backstatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                       
                                   </div>

                                   

                                    <div>
                                        
                                        <Input v-model="value" placeholder="调研对象" style="width: 300px"  size="default"/>&nbsp;&nbsp;
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
                                <Table ref="table" :height="tableHeight" :columns="columns1" :data="dataArr" border size="small"></Table>
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
import $ from "jquery"
import axios from "axios"
import city from"../../../../static/city.json"

export default {
  name: 'Tuihui',
  inject:["reload"],
  data () {
    return {
        tableHeight:550,
        backstatus:"",
        backstatusList:[
             {
                value: 0,
                label: '未退回'
             },
              {
                value: 1,
                label: '已退回'
             }
        ],
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
      columns1: [    
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
                    {
                        title: '项目类型',
                        key: 'pjtype'
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
                        title: '退回状态',
                        key: 'returnstate'
                    },
                    {
                        title: '二审人员',
                        key: 'sinstperson'
                    },
                    {
                        title: '退回次数',
                        key: 'returncount'
                    },
                    {
                        title: '操作',
                        align:'center',
                        width: 130,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
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
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '退回')
                            ]);
                        }
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
            
       input10: '',
       single: false,
       single1: false,
       single2: false,
       single3: false,
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                ],
        cityList2: [
                    {
                        value: '门头照',
                        label: '门头照'
                    },
                    {
                        value: '问题照片',
                        label: '问题照片'
                    },
                    {
                        value: '货架',
                        label: '货架'
                    }
                    
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
               window.location.href="http://106.14.173.50:8080/exportAuditreturn"               
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            show (index) {
                 console.log(this.data2[index].id)
               var listid = this.data2[index].id;
               localStorage.setItem("listid",listid)
               this.$router.push("/details_jia")
                console.log(this.data2[index])
                this.text == '解冻'
            },
            remove (index) {
                // this.data6.splice(index, 1);
                console.log("0000000")
                var that = this;
                axios({         
                    method:"post",     
                    url:"http://106.14.173.50:8080/returnstate",   
                    params:{ids:that.data2[index].id}                 
                })
                .then(function(data){
                     console.log(data.data)
                     if(data.data.code==1){
                         alert("退回成功")
                         that.reload()

                     }       
                
                })

            },
            //分页
            handlePage(val){
                   var that = this;
            var params = JSON.parse(JSON.stringify({
                  sortList:{
                     provinceid:that.model1,
                     cityid:that.model2,
                     districtid:that.model3,
                     returnstate:that.backstatus,
                     robj:that.value
                  },
                  currPage:val
            }))
            console.log(params)
            axios({
                method:"get",
                url:"http://106.14.173.50:8080/auditreturn", 
                params:params
            }).then(function(data){
                 console.log(data.data)
                 var arr = data.data.datas
                
                 for(var i in arr){
                     arr[i].returnstate=arr[i].returnstate==0?"未退回":(arr[i].returnstate==1?"已退回":"")    
                     arr[i].pjtype = arr[i].pjtype==1?"家化":"时效"
                    //  arr[i].returnstate =           
                  //通过id找出对应的省市区名称
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
                  that.data2 = arr  
                       that.pageTotal = data.data.count;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data2.slice(_start,_end);
            })
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
                //    console.log(city[i].child) ;
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
            //  console.log(val,val2)                   
            var city = this.city;  
             for(var i in city){
                            
                   var shi = city[i].child
                   for(var j in shi){
                        if(val2==shi[j].id){  
                            var qu = shi[j].child;
                            // console.log(qu)               
                          
                          
                            for(var k in qu){
                                 var obj = {
                                    value:qu[k].id,
                                    label:qu[k].name
                                 }    
                                 this.cityList3.push(obj)
                            }
                            // console.log(obj)
                        }
                       
                   }
                   
              }
        },
        change3(val){
            // console.log(val)
            this.model3 = val
        },
        //搜索
        search(){
            var that = this;
            var params = JSON.parse(JSON.stringify({
                  sortList:{
                     provinceid:that.model1,
                     cityid:that.model2,
                     districtid:that.model3,
                     returnstate:that.backstatus,
                     robj:that.value
                  },
                  currPage:1
            }))
            console.log(params)
            axios({
                method:"get",
                url:"http://106.14.173.50:8080/auditreturn", 
                params:params
            }).then(function(data){
                 console.log(data.data)
                 var arr = data.data.datas
                
                 for(var i in arr){
                     arr[i].returnstate=arr[i].returnstate==0?"未退回":(arr[i].returnstate==1?"已退回":"")    
                     arr[i].pjtype = arr[i].pjtype==1?"家化":"时效"
                    //  arr[i].returnstate =           
                  //通过id找出对应的省市区名称
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
                  that.data2 = arr  
                       that.pageTotal = data.data.count;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data2.slice(_start,_end);
            })
        }

       },
       mounted(){
        //    alert()
        //    console.log(this.$refs.table.$el.offsetTop)
           this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150 
           this.search()
           var city = this.city 
                for(var i in city){
                    var obj = {
                        value:city[i].id,
                        label:city[i].name
                    }
                   this.cityList1.push(obj)              
                   this.shi.push(city[i].child);
                   
                }
                //  console.log(city)
            // })
           document.title="审核退回" 


       }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
     .aaa{
      width: 100%;height: 120px;display:flex;justify-content:space-between;overflow: hidden;
      .bbb{
        width: 100%;height: 130px;background:#F5F7F9;
        .tit{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px;}
      }

    }

 
    .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}
    .xia{width: 100%;height:78%;
        .table{
            .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px;display: flex;justify-content: space-between;
            .biao{background: #C1C1C1;color: #fff;text-align: center;line-height: 50%}
        }

       }
    }
    

    .data{
        margin: 10px 0
    }
</style>