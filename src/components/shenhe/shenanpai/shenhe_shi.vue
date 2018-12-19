<template>
  <div class="hello">
     <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 5px 5px'}">
                <Breadcrumb :style="{margin: '5px 0'}">
                    
                    
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 80vh;">
                        <div class="shang">
                           <div class="sou1">
                               <div class="sou11">
                                    <Select v-model="jia" style="width:150px" placeholder="项目类型" size="default" @on-change="selectjia">
                                        <Option v-for="item in family" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>

                                    <Select v-model="status" style="width:150px" placeholder="安排状态" size="default" @on-change="selectstatus">
                                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input v-model="proname" placeholder="调研对象" style="width: 200px" size="default"/>
                                    <Button type="success" size="default" @click="search1">搜索</Button>
                               </div>
                               <div>
                                    <Button class="biao" size="default" @click="outExcel">导出表格</Button>
                               </div>
                               
                           </div>
                           <!-- <div class="sou2">
                               <Input v-model="value" placeholder="调研对象" style="width: 300px" size="default"/>
                               <Button type="success" size="default" @click="search2">搜索</Button>
                           </div> -->
                        </div>
                        <!-- 下 -->
                        <div class="xia">
                            <Table :height="tableHeight" :columns="columns1" border :data="dataArr" size="small" ref="table"></Table>
                            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                show-elevator  show-total placement="top" @on-change="handlePage" 
                                >
                            
                            </Page>

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

    export default {
      name: 'Shenhe_shi',

        data () {
            return {
            tableHeight:500,
            pageTotal: 1,  //数据总数
            pageNum: 1,  //初始页
            pageSize: 10,  //每页条数
            dataArr :[],   //页面显示的数组

                proname:"",
                jia:"",
                status:"",
                name: 'Shenhe',
                family:[
                    {
                        value: 1,
                        label: '家化'
                    },{
                        value: 2,
                        label: '时效'
                    },
                ],
                statusList: [
                    {
                        value: 1,
                        label: '已安排'
                    },
                     {
                        value: 0,
                        label: '未安排'
                    },                
                    
                ],
                model1: '000',
                value:"",
                columns1: [
                    {
                        title: '项目名称',
                        key: 'pjname',
                    },
                    {
                        title: '进度',
                        key: 'dsr'
                    },
                    {
                        title: '调研对象数量',
                        key: 'cpttaskcount'
                    },
                    {
                        title: '安排状态',
                        key: 'arrangestate'
                    },
                    {
                        title: '操作',
                        key: 'age',
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
                                }, '查看'),
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
                    },
                ],
                data2: [
                    
                    
                ]
            
            }
        },
        methods: {
            outExcel(){
               window.location.href="http://106.14.173.50:8080/exportAuditArrange"
            },
           show (index) {
                // this.$Modal.info({
                //     title: 'User Info',
                //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                // })
            console.log(this.data2[index].id) 
               var proid = this.data2[index].id;
               localStorage.setItem("proid",proid)
               this.$router.push("/anpai_shi")
            },
            // remove (index) {
            //     this.data6.splice(index, 1);
            // }
            selectjia(val){
               this.jia = val;
               if(val==1){
                   this.$router.push("/shenhe")
               }else{
                   this.$router.push("/shenhe_shi")
               }
            },
            selectstatus(val){
               this.status = val;
            },
            search1(){
               var that = this;
               var params = JSON.parse(JSON.stringify( 
                   {
                    sortList:{  pjtype:that.jia,
                                auditarrangestate:that.status,
                                pjname:that.proname,                               
                            },
                    currPage:1
                   }
                   ))
                   console.log(params)
               axios({ 
                 url:"http://106.14.173.50:8080/auditArrange",
                 params:params 
                })
                .then(function(data){
                    console.log(data.data)
                    var arr = data.data.datas
                    for(var i in arr){
                        var a = arr[i].cpttaskcount=arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;
                        var b = arr[i].taskcount = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                        var c = arr[i].robjcount = arr[i].robjcount==undefined?"0":arr[i].robjcount;
                        arr[i].dsr= a+" / "+ b +" / "+ c
                        arr[i].arrangestate =  arr[i].arrangestate==0?"未安排":"已安排"
                    }
                    // console.log( arr)
                    that.data2 = arr
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
                    sortList:{  pjtype:that.jia,
                                auditarrangestate:that.status,
                                pjname:that.proname,                               
                            },
                    currPage:val
                   }
                   ))
                //    console.log(params)
               axios({ 
                 url:"http://106.14.173.50:8080/auditArrange",
                 params:params 
                })
                .then(function(data){
                //    console.log(data.data)
                 var arr = data.data.datas
                 for(var i in arr){
                        var a = arr[i].cpttaskcount=arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;
                        var b = arr[i].taskcount = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                        var c = arr[i].robjcount = arr[i].robjcount==undefined?"0":arr[i].robjcount;
                        arr[i].dsr= a+" / "+ b +" / "+ c
                        arr[i].arrangestate =  arr[i].arrangestate==0?"未安排":"已安排"

                    }
                   var arr = data.data.datas
                   that.data2 = arr
                    that.pageTotal = data.data.count;              
                    var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                    var _end = that.pageNum * that.pageSize;
                    that.dataArr = that.data2.slice(_start,_end);
                });
            },
        },
        mounted(){
            this.jia=2;
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 160
            //表格默认展示
             this.search1()
           document.title="审核安排（家化）"

        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{width: 100%;height: 50px;
        .sou1{width: 100%; margin:10px 0;display: flex;justify-content: space-between;
           .sou11{width: 600px;display: flex;justify-content: space-between}
           .biao{background: #C1C1C1;color: #fff}
         }
        // .sou2{width: 400px;display: flex;justify-content: space-between}
    
    
    }
    .xia{width: 100%;height: 90%;overflow: auto}
    
</style>
