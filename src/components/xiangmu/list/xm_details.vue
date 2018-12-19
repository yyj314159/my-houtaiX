<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 5px 5px'}">
                <Breadcrumb :style="{margin: '8px 0'}">
                    
                    <Button style="background:gray;color:#fff" size="small" @click="tolistjia">返&nbsp;回</Button>
                   
                    <Button type="error" size="small">删除任务</Button>
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 90vh;">
                        <div id="top">
                          <div class="title"><span>访问员进度</span><Button style="background:gray;color:#fff" size="default" @click="OutExcel1">&nbsp;&nbsp;导出表格&nbsp;&nbsp;</Button></div>
                          <div class="tab1">
                               <!-- <Table height="200" border :columns="columns1" :data="data1" ></Table> -->
                               <Table height="130" border :columns="columns1" :data="visiter" size="small"></Table>
                          </div>
                        </div>

                        <div id="bot">

                         <div class="title"><span>调研情况</span><Button style="background:gray;color:#fff" size="default" @click="OutExcel2">&nbsp;&nbsp;导出表格&nbsp;&nbsp;</Button></div>
                            <div class="ipt">
                              <Select v-model="model1" style="width:100px" placeholder="省" size="default" @on-change="change1">
                                    <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                               <Select v-model="model2" style="width:100px" placeholder="市" size="default" @on-change="change2">
                                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                               <Select v-model="model3" style="width:100px" placeholder="区" size="default" @on-change="change3">
                                    <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Select v-model="visiters" style="width:100px" placeholder="区域代理" size="default" @on-change="change4">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                               <Select v-model="status" style="width:100px" placeholder="状态" size="default" @on-change="change5">
                                    <Option v-for="item in zhuangtai" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Input v-model="numbian" placeholder="调研编号" style="width: 100px" size="default"/>
                              <Button type="success" size="default" @click="search">搜索</Button>
                          </div> 

                          <!-- 表格 -->
                          <div class="tab2">
                               <Table height="360" border :columns="columns2" :data="diaoyan" size="small"></Table>

                                <Modal
                                    title="修改信息"
                                    header="111"
                                    v-model="modal9"
                                    @on-ok = "editsave"
                                    width="490px"
                                    :styles="{top: '100px'}">
                                   <div class="wrop">
                                       <div class="left">
                                           <div class="title">修改访问员</div>
                                           <div class="xia">
                                                <Select v-model="xiu1" style="width:200px" size="default" placeholder="选择代理" @on-change="xiuvisit1">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Select v-model="xiu2" style="width:200px;margin:5px 0" size="default" placeholder="选择访问员" @on-change="xiuvisit2">
                                                    <Option v-for="item in fangwen" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Input v-model="edit1" type="textarea" :rows="3" placeholder="编辑内容" />
                                           </div>
                                       </div>
                                       <div class="right">
                                           <div class="title">修改审核人员</div>
                                           <div class="xia">
                                                <Select v-model="shen1" style="width:200px" size="default" placeholder="选择一审" @on-change="xiushen1">
                                                    <Option v-for="item in shenList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Select v-model="shen2" style="width:200px;margin:5px 0" size="default" placeholder="选择二审" @on-change="xiushen2">
                                                    <Option v-for="item in shenList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Input v-model="edit2" type="textarea" :rows="3" placeholder="编辑内容" />
                                           </div>
                                       </div>
                                   </div>
                                </Modal>        

                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <!-- <Page :total="100" :current="1" @on-change="changePage"></Page> -->
                                    </div>
                                </div>
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
  name: 'xm_details',
  data () {
    return {
        robjnum:"",
        pdtype:"",
        shenList1:[],
        shenList2:[],
        shen1:"",
        shen2:"",
        edit1:"",
        edit2:"",
        xiu1:"",
        xiu2:"",
        daili:[],
        fangwen:[],
        value6: '',
        modal9: false,
        city:city,
        visiters:"",
        status:"",
        numbian:"",
        zhuangtai:[
                     {
                        value: 1,
                        label: '已完成'
                    },
                    {
                        value: 0,
                        label: '未完成'
                    },
        ],
        columns1: [
                    {
                        title: '代理',
                        key: 'agentname'
                    },
                    {
                        title: 'DSR进度',
                        key: 'dsr'
                    },
                    {
                        title: '审核进度',
                        key: 'shen'
                    }
                ],
                visiter: [
                    // {
                    //     name: 'John Brown',
                    //     age: 18,
                    //     address: 'New York No. 1 Lake Park',
                    //     date: '2016-10-03'
                    // },
                                       
                ],
            columns2: [
                {
                    title: '区域代理',
                    key: 'ragency'
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
                    title: '当前执行者',
                    key: 'currexecutor'
                },
                {
                    title: '状态',
                    key: 'tstate'
                },
                {
                    title: '得分',
                    key: 'score'
                },
                {
                    title: '上传图片',
                    key: 'upphoto'
                },
                {
                    title: '上传录音',
                    key: 'uprecord'
                },
                {
                    title: '上传视频',
                    key: 'upvideo'
                },
                {
                    title: '操作',
                    key: 'shen',
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
                                }, '编辑'),
                               
                            ]);
                        }
                },
               
            ],
         diaoyan:[
                
         ],       
        value:"",
       cityList: [
                    // {
                    //     value: '1',
                    //     label: '家化'
                    // },
                    // {
                    //     value: '2',
                    //     label: '时效'
                    // },
                   
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
         visiters:"",
         xiuid:""



  }
  
 },
    methods: {
          show (index) {
                // this.$Modal.info({
                //     title: 'User Info',
                //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                // })
                this.modal9=true;
                this.xiuid = this.diaoyan[index].id
                this.xiu1 = this.diaoyan[index].ragency
                 console.log(this.diaoyan[index])
            },
            tolistjia(){
               this.$router.go(-1)
            },
            //弹出框修改
            xiuvisit1(val){
               this.xiu1 = val
            },
             xiuvisit2(val){
               this.xiu2 = val
            },
             xiushen1(val){
               this.shen1 = val
            },
             xiushen2(val){
               this.shen2 = val
            },
            
         //搜索
            search(){
               var that = this;
               var params = JSON.parse(JSON.stringify(
                    {
                        sortList:{ provinceid:that.model1,cityid:that.model2,districtid:that.model3,aname:that.visiters,tstate:that.status,robjnum:that.numbian},
                        currPage:1
                    }
                   ))
                   console.log(params)
                axios({ 
                        url:"http://106.14.173.50:8080/projectListDetail", 
                        params:params
                      })
                        .then(function(data){
                            console.log(data.data)
                        var arr = data.data.datas;
                          that.diaoyan=arr
                        });
            },
            OutExcel1(){
                var pdtype = this.pdtype;
                console.log(pdtype)
                window.location.href="http://106.14.173.50:8080/exportAgentProgress?id=" + pdtype;
            },
            OutExcel2(){
                var robjnum = this.robjnum;
                console.log(robjnum)
                window.location.href="http://106.14.173.50:8080/exportProjectListDetail?id=" + robjnum;
            },
        change1(val){
            // console.log(val,this.city) 
            
            this.cityList2=[]
            this.model2 = "",
            this.model3 = ""
            this.sheng = val                    
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
              this.model1 = val
        },
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
              this.model2 = val2

        },
        change3(val){
            // console.log(val)
            this.model3 = val
        },
        change4(val){
           this.visiters = val
        },
        change5(val){
           this.status = val
        },
        //修改保存
        editsave(){
            var that = this;
            var params = {
                id:that.xiuid,
                ragency:that.xiu1,
                interviewer:that.xiu2,
                interremark:that.edit1,

                finstperson:that.shen1,
                sinstperson:that.shen2,
                instremark :that.edit2              
            }
            console.log(params)
            axios({ 
                 method:"post",
                 url:"http://106.14.173.50:8080/modifyAccessor", 
                 params:params
                })
                .then(function(data){
                  console.log(data.data)
                  if(data.data.code==1){
                      alert("修改成功")
                      window.location.reload()
                  }
                });
        }
           
    },
    mounted(){
           var that = this;
           var pid = localStorage.getItem('xmpid')
           var pdtype = localStorage.getItem('xmpdtype')
           var robjnum = localStorage.getItem('xmrobjnum')
           that.pdtype = pdtype;
           that.robjnum = robjnum
           console.log(pid,pdtype)
           axios({ 
                 url:"http://106.14.173.50:8080/agentProgress", 
                 params:{pid:pid}
                })
                .then(function(data){
                //   console.log(data.data)
                  var arr = data.data.datas;
                  for(var i in arr){  
                   
                      var dsr1 = arr[i].robjcount==undefined?"0":arr[i].robjcount;
                      var dsr2 = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                      var dsr3 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;
                
                      arr[i].dsr = dsr1 +" / "+dsr2+" / "+dsr3;

                      var one1 = arr[i].instcount==undefined?"0":arr[i].instcount;
                      var one2 = arr[i].cptinstcount==undefined?"0":arr[i].cptinstcount;

                      arr[i].shen = one2+" / "+one1;  
                      
                      that.visiter = arr
                 }
                });

                //省市区
                var city = this.city 
                //  console.log(city)
                for(var i in city){
                    var obj = {
                        value:city[i].id,
                        label:city[i].name
                    }
                    this.cityList1.push(obj)              
                    this.shi.push(city[i].child);
                    
                }

            // 区域代理             
              axios({ 
                 url:"http://106.14.173.50:8080/agency", 
                })
                .then(function(data){
                //   console.log(data.data)
                  var arr = data.data
                    for(var i in arr){
                        var obj = {
                            value:arr[i],
                            label:arr[i]
                        }
                        that.cityList.push(obj)
                    }
                    // console.log(that.cityList)
                });
                 // 访问员            
              axios({ 
                 url:"http://106.14.173.50:8080/interviewer", 
                })
                .then(function(data){
                //   console.log(data.data)
                  var arr = data.data
                    for(var i in arr){
                        var obj = {
                            value:arr[i],
                            label:arr[i]
                        }
                        that.fangwen.push(obj)
                    }
                });
                 // 一审            
              axios({ 
                 url:"http://106.14.173.50:8080/finstinfo", 
                })
                .then(function(data){
                  console.log(data.data)
                  var arr = data.data
                    for(var i in arr){
                        var obj = {
                            value:arr[i],
                            label:arr[i]
                        }
                        that.shenList1.push(obj)
                    }
                });
                 // 二审           
              axios({ 
                 url:"http://106.14.173.50:8080/sinstinfo", 
                })
                .then(function(data){
                  console.log(data.data)
                  var arr = data.data
                    for(var i in arr){
                        var obj = {
                            value:arr[i],
                            label:arr[i]
                        }
                        that.shenList2.push(obj)
                    }
                });
            //表格默认
             var that = this;
               var params = JSON.parse(JSON.stringify(
                    {
                        sortList:{ provinceid:that.model1,cityid:that.model2,districtid:that.model3,aname:that.visiters,tstate:that.status,robjnum:that.numbian},
                        currPage:1
                    }
                   ))
                //    console.log(params)
                axios({ 
                        url:"http://106.14.173.50:8080/projectListDetail", 
                        params:params
                      })
                        .then(function(data){
                            console.log(data.data)
                        var arr = data.data.datas;
                          that.diaoyan=arr
                    });
           document.title="项目列表详情"

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
     #top{height: 140px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;
        .tab1{width: 100%;height: 120px;}
     
     }
     #bot{height:70%;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;margin-top: 10px;
        .tab2{width: 100%;height:100%;overflow: auto}
        .ipt{width: 100%;height: 30px;margin: 5px 0}
     
     }

     .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    .wrop{width: 458px;height: 183px;display: flex;justify-content: space-between;
          .left{width: 49%;height: 200px;border: 1px dotted red;
              .title{width: 100%;height: 26px;background: #999999}
              .xia{width: 100%;height: 170px;background: #FFFCED;padding: 10px;}
              }
          .right{width: 49%;height: 200px;border: 1px dotted red;
              .title{width: 100%;height: 26px;background: #999999}
              .xia{width: 100%;height: 170px;background: #FFFCED;padding: 10px;}
          }
      }

</style>