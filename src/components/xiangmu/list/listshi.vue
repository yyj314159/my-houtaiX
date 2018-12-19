<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 80vh;">
                        <div class="shang">
                           <div class="ipt">
                                <Select v-model="model1" style="width:180px" placeholder="项目类别" @on-change="change" size="default">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                &nbsp; &nbsp; &nbsp;
                                 <Select v-model="leibie" style="width:180px" placeholder="产品类别" @on-change="change2" size="default">
                                    <Option v-for="item in productclass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                 &nbsp; &nbsp;
                                <!-- <Button type="success">搜索</Button>&nbsp; &nbsp;&nbsp; &nbsp; -->
                                <Button type="warning" style="float:right" @click="outtable" size="default">导出表格</Button>
                           </div>
                           <div class="ipt">
                               <Input v-model="bianhao" placeholder="调研编号" style="width: 300px" size="default"/> &nbsp; &nbsp;
                               <Button type="success" @click="search" size="default">搜索</Button>
                           </div>
                        </div>
                        <!-- 表格 -->
                        <div class="xia">                                                      
                            <Table border :columns="columns1" :data="dataArr" size="small" ref="table" :height="tableHeight" ></Table>
                            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator  show-total placement="top" @on-change="handlePage" style="margin:10px"></Page>
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
  name: 'Listjia',
  data () {
    return {
        pjtype:"",
        tableHeight:450,
        //分页
        pageTotal: 10,
        pageNum: 1,
        pageSize: 5,
        //表格
        columns1: [
                    {
                        title: '项目类别',
                        key: 'pjtype'
                    },
                    {
                        title: '产品类型',
                        key: 'pdtype'
                    },
                    {
                        title: '项目名称',
                        key: 'pjname'
                    },
                     {
                        title: 'DSR进度',
                        key: 'dsr'
                    },
                     {
                        title: '一审进度',
                        key: 'one'
                    },
                     {
                        title: '二审进度',
                        key: 'two'
                    },
                     {
                        title: '预警日期',
                        key: 'warningdate'
                    },
                     {
                        title: '操作',
                        key: 'do',
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
                                }, '查看详情'),
                               
                            ]);
                        }    
                    }

                ],
                data1: [], 
                pronamelist: [],                                   
         dataArr:[],       

        bianhao: '',
       cityList: [
                    {
                        value: 1,
                        label: '家化'
                    },
                    {
                        value: 2,
                        label: '时效'
                    },
                   
                ],
                model1: '家化',
        productclass:[
                //  {
                //         value: '家化',
                //         label: '家化'
                //     },
                //     {
                //         value: '时效',
                //         label: '时效'
                //     },
                 ],
                 leibie: '',        
     }
   },
    methods:{
        change(val){
           console.log(val)
           this.pjtype = val
           if(val===1){
               this.$router.push("/listjia")
           }else{
              this.$router.push("/listshi")
           }
        },
        //产品类别
        change2(val){
           console.log(val)
           this.leibie=val
        },
        //查看详情
        show (index) {
            //   console.log(this.data1[index].pid)  
              localStorage.setItem("xmpid",this.data1[index].pid)
              this.$router.push("/xm_details")
              
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            // var h = date.getHours() + ':';
            // var m = date.getMinutes() + ':';
            // var s = date.getSeconds();
            return Y+M+D;
        },
        search(){
            var that = this;
            var params = JSON.parse(JSON.stringify(
                   {
                    sortList:{ pjtype:that.model1,pdtype:that.leibie,robjnum:that.bianhao},
                    currPage:1
                   }
                   ))                                     
                 console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/projectList",
                params:params
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data.datas
                
                 for(var i in arr){  
                     for(var j in that.pronamelist){
                         if(arr[i].pdtype==that.pronamelist[j].pid){
                               arr[i].pdtype = that.pronamelist[j].pname
                         }
                     }  
                      var dsr1 = arr[i].robjcount==undefined?"0":arr[i].robjcount;
                      var dsr2 = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                      var dsr3 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;

                      arr[i].pjtype = arr[i].pjtype==1?"家化":"时效"                    
                      arr[i].dsr = dsr1 +" / "+dsr2+" / "+dsr3;

                      var one1 = arr[i].finstcount==undefined?"0":arr[i].finstcount;
                      var one2 = arr[i].cptfinstcount==undefined?"0":arr[i].cptfinstcount;

                      arr[i].one = one1+" / "+one2;

                      var two1 = arr[i].sinstcount==undefined?"0":arr[i].sinstcount;
                      var two2 = arr[i].cptsinstcount==undefined?"0":arr[i].cptsinstcount;

                      arr[i].two = two1+" / "+two2;  

                      var time = arr[i].wdate.toString().substring(0,10)
                      var newDate = new Date();
                      var warningdate =  newDate.setTime(time * 1000);
                      arr[i].warningdate = newDate.toLocaleDateString();                                                   
                 }
                   that.data1 = arr
                    that.pageTotal = that.data1.length;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data1.slice(_start,_end);
                       
            })
        },
         //分页
         handlePage(value){
           console.log(value)
           this.pageNum = value;
           var _start = ( value - 1 ) * this.pageSize;
           var _end = value * this.pageSize;
           this.dataArr = this.data1 .slice(_start,_end);
       },
       //导出表格
       outtable(){
           var pjtype = this.pjtype;
           console.log(pjtype)
           window.location.href="http://106.14.173.50:8080/exportProjectList?pjtype=" + pjtype;       
       }
    },
    mounted(){
        this.model1=1
           var that = this;
           axios({ 
                 url:"http://106.14.173.50:8080/pdinfo", 
                })
                .then(function(data){
                  console.log(data.data)
                  var arr = data.data
                  that.pronamelist = arr
                  for(var i in arr){
                      var obj={value:arr[i].pid,label:arr[i].pname}
                       that.productclass.push(obj)
                     }
                });
          //表格默认
          
          
          var that = this;
            var params = JSON.parse(JSON.stringify(
                   {
                    sortList:{ pjtype:that.model1,pdtype:that.leibie,robjnum:that.bianhao},
                    currPage:1
                   }
                   ))
                   
                   
                
            axios({ 
                url:"http://106.14.173.50:8080/projectList",
                params:params
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data.datas
                
                 for(var i in arr){  
                     for(var j in that.pronamelist){
                         if(arr[i].pdtype==that.pronamelist[j].pid){
                               arr[i].pdtype = that.pronamelist[j].pname
                         }
                     }  
                      var dsr1 = arr[i].robjcount==undefined?"0":arr[i].robjcount;
                      var dsr2 = arr[i].taskcount==undefined?"0":arr[i].taskcount;
                      var dsr3 = arr[i].cpttaskcount==undefined?"0":arr[i].cpttaskcount;

                      arr[i].pjtype = arr[i].pjtype==1?"家化":"时效"                    
                      arr[i].dsr = dsr1 +" / "+dsr2+" / "+dsr3;

                      var one1 = arr[i].finstcount==undefined?"0":arr[i].finstcount;
                      var one2 = arr[i].cptfinstcount==undefined?"0":arr[i].cptfinstcount;

                      arr[i].one = one1+" / "+one2;

                      var two1 = arr[i].sinstcount==undefined?"0":arr[i].sinstcount;
                      var two2 = arr[i].cptsinstcount==undefined?"0":arr[i].cptsinstcount;

                      arr[i].two = two1+" / "+two2;  

                      var time = arr[i].wdate.toString().substring(0,10)
                      var newDate = new Date();
                      var warningdate =  newDate.setTime(time * 1000);
                      arr[i].warningdate = newDate.toLocaleDateString();                                                   
                 }
                   that.data1 = arr
                    that.pageTotal = that.data1.length;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data1.slice(_start,_end);
                       
            })

           document.title="项目列表（家化）"
           this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 160
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{width: 100%;height: 100px;background: #F5F7F9;padding: 5px;box-sizing: border-box;
       .ipt{width: 100%;height: 46px;}
    }
    .xia{width: 100%;height: 80%;margin-top: 10px;overflow: auto}
</style>