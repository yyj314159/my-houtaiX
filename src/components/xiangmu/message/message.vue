<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 消息反馈 -->
                        <el-tab-pane label="消息反馈" name="first">
                             <Card style="height: 85vh;">
                                <div style="height: 80vh;">
                                    <div class="top">
                                            <div class="ipt">
                                                 <div>
                                                    <Col span="12" style="width: 130px">
                                                        <DatePicker type="date" placeholder="开始日期" @on-change="handleChange1" size="default"></DatePicker>
                                                    </Col>
                                                    <Col span="12" style="width: 130px">
                                                        <DatePicker type="date" placeholder="结束日期" @on-change="handleChange2" size="default"></DatePicker>
                                                    </Col>&nbsp;&nbsp;
                                                    <Select v-model="model1" style="width:100px" placeholder="项目名称" @on-change="change" size="default">
                                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>&nbsp;
                                                    <Button type="success" @click="search" size="default">搜索</Button>
                                                  </div>    
                                                    <Button type="info" size="small" style="margin-left:90px" @click="outexcel1">导出表格</Button>
                                                  
                                            </div>
                                            <div class="tab">
                                                <Table border :columns="columns6" :data="dataArr" size="small" ref="table" :height="tableHeight" ></Table>
                                                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator  show-total placement="top" 
                                                    @on-change="handlePage" style="margin:10px"></Page>

                                            </div>
                                    </div>
                                </div>
                            </Card>
                        </el-tab-pane>


                <!--======================================== 账户异常============================================= -->
                        <el-tab-pane label="账户异常" name="second">
                            <Card style="height: 85vh;">
                                <div style="height: 80vh;">
                                    <div class="top">
                                        <div class="ipt">
                                            <div>
                                                    <Col span="12" style="width: 130px">
                                                        <DatePicker type="date" placeholder="开始日期" @on-change="handleChange3" size="default"></DatePicker>
                                                    </Col>
                                                    <Col span="12" style="width: 130px">
                                                        <DatePicker type="date" placeholder="结束日期" @on-change="handleChange4" size="default"></DatePicker>
                                                    </Col>&nbsp;&nbsp;
                                                    <Select v-model="model1" style="width:100px" placeholder="项目名称" @on-change="change2" size="default">
                                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>&nbsp;
                                                    <Button type="success" @click="sousuo2" size="default">搜索</Button>
                                            </div>    
                                        <Button type="info" size="small" style="margin-left:90px" @click="outexcel2">导出表格</Button>
                                        </div>
                                        <div class="tab">
                                            <Table border :columns="columns7" :data="dataArr2" size="small" ref="table" :height="tableHeight"></Table>
                                            <Page :total="pageTotal2" :current="pageNum2" :page-size="pageSize2" show-elevator  show-total placement="top" 
                                                @on-change="handlePage2" style="margin:10px"></Page>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </el-tab-pane>
                        
                    </el-tabs>
                </Breadcrumb>
               
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"


export default {
  name: 'Message',
  data () {
    return {
        tableHeight:500,
         //分页1
        pageTotal: 1,
        pageNum: 1,
        pageSize: 10,
        //分页2
        pageTotal2: 10,
        pageNum2: 1,
        pageSize2: 10,

       activeName: 'first',
        cityList1: [
                    // {
                    //     value: '家化',
                    //     label: '家化'
                    // },
                    // {
                    //     value: '时效',
                    //     label: '时效'
                    // },
                   
                ],
         model1: "",
         model2: "",
         datastart:"",
         dataend:"",
         datastart2:"",
         dataend2:"",

       cityList2: [
                    {
                        value: '1',
                        label: '家化'
                    },
                    {
                        value: '2',
                        label: '时效'
                    },
                   
                ],
         model2: '',
         //表格1
         columns6: [
                    {
                        title: '项目名称',
                        key: 'hpobj',
                    },
                    {
                        title: '地区',
                        key: 'districtid'
                    },
                    {
                        title: '调研对象',
                        key: 'robj',
                        
                    },
                    {
                        title: '调研编号',
                        key: 'rnum',
                        
                    },
                     {
                        title: '区域代理人',
                        key: 'regionalper'
                    },
                    {
                        title: '访问员',
                        key: 'msgsdper'
                    },
                    {
                        title: '访问员联系方式',
                        key: 'contact',
                        
                    },
                    {
                        title: '反馈类型',
                        key: 'fdbacktype',
                        
                    },
                     {
                        title: '时间',
                        key: 'time',
                        
                    }
                ],
                data5: [
                    // {
                    //     proname: '电视广告',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // },
                    // {
                    //      proname: '电视广告2',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // },
                    // {
                    //     proname: '电视广告3',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // },
                    // {
                    //      proname: '电视广告4',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // }
                ],
        dataArr:[],
        dataArr2:[],
        //表格2
         columns7: [
                    {
                        title: '项目名称',
                        key: 'hpobj',
                    },
                    {
                        title: '地区',
                        key: 'districtid'
                    },
                    {
                        title: '调研对象',
                        key: 'robj',
                        
                    },
                    {
                        title: '调研编号',
                        key: 'rnum',
                        
                    },
                     {
                        title: '区域代理人',
                        key: 'regionalper'
                    },
                    {
                        title: '访问员',
                        key: 'msgsdper'
                    },
                    {
                        title: '访问员联系方式',
                        key: 'contact',
                        
                    },
                    {
                        title: '反馈类型',
                        key: 'fdbacktype',
                        
                    },
                ],
                data7: [
                    {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                     {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                    {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                     {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                ],
                dataArr2:[]
    }
 },
 methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
        //日期改变的函数1
      handleChange1(daterange) {
            
            var date = new Date(daterange);
            var time1 = date.getTime();
            this.datastart = time1;
            console.log(time1)

      },
      handleChange2(daterange) {
           
            var date = new Date(daterange);
            var time1 = date.getTime();
             this.dataend = time1;
            console.log(time1)
      },
       //日期改变的函数2
      handleChange3(daterange) {
            var date = new Date(daterange);
            var time1 = date.getTime();
             this.datastart2 = time1;
            
            console.log(time1)
      },
      handleChange4(daterange) {
           var date = new Date(daterange);
           var time1 = date.getTime();
            this.dataend2 = time1;

            console.log(time1)
      },
      change(val){
        console.log(val)
        this.model1 = val

      },
       change2(val){
        console.log(val)
        this.model1 = val
      },
      //搜索1
      search(){
           var that = this;  
           var params = JSON.parse(JSON.stringify( 
                   {
                    sortList:{  starttime:that.datastart==null?"":that.datastart,
                                endtime:that.dataend==null?"":that.dataend,
                                hpobj:that.model1,                               
                            },
                    currPage:1
                   }
                   ))
              

            // console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/msgfdback",
                params:params
            })
            .then(function(data){
                console.log(data.data.count)       
                var arr = data.data;
                that.data5 = arr.datas;
                
                that.pageTotal = arr.count;
                var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum * that.pageSize;
                that.dataArr = that.data5.slice(_start,_end);
                       
            })
      },
      //分页1
         handlePage(value){
           console.log(value)

           var that = this;  
           var params = JSON.parse(JSON.stringify( 
                   {
                    sortList:{  starttime:that.datastart==null?"":that.datastart,
                                endtime:that.dataend==null?"":that.dataend,
                                hpobj:that.model1,                               
                            },
                    currPage:value
                   }
                   ))        
            // console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/msgfdback",
                params:params
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data
                that.data5 = arr.datas;
                that.pageTotal = arr.count;
                var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum * that.pageSize;
                that.dataArr = that.data5.slice(_start,_end);
                       
            })

        },
         //导出表格
         outexcel1(){
            var starttime = this.datastart;
            var endtime = this.dataend;
            var hpobj = this.model1;
            console.log(starttime,endtime,hpobj,"000")
            window.location.href="http://106.14.173.50:8080/exportMsgfdback?starttime="+starttime+"&endtime="+endtime+"&hpobj="+hpobj;
         },
          //导出表格
         outexcel2(){
            var starttime = this.datastart;
            var endtime = this.dataend;
            var hpobj = this.model1;
            console.log("000")
            window.location.href="http://106.14.173.50:8080/exportAccountexcep?starttime="+starttime+"&endtime="+endtime+"&hpobj="+hpobj;
         },
       //搜索2
        sousuo2(){
            var that = this;  
           var params = JSON.parse(JSON.stringify( 
                   {
                    sortList:{  starttime:that.datastart2==null?"":that.datastart2,
                                endtime:that.dataend2==null?"":that.dataend2,
                                hpobj:that.model1,                               
                            },
                    currPage:1
                   }
                   ))
              

            // console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/accountexcep",
                params:params
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                that.data7 = arr.datas;
                
                that.pageTotal2 = arr.count;
                var _start = ( that.pageNum2 - 1 ) * that.pageSize2;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum2 * that.pageSize2;
                that.dataArr2 = that.data7.slice(_start,_end);
                       
            })
        },
        //分页2
         handlePage2(value){
           console.log(value)
           var that = this;  
           var params = JSON.parse(JSON.stringify(

                   {
                    sortList:{  starttime:that.datastart2==null?"":that.datastart2,
                                endtime:that.dataend2==null?"":that.dataend2,
                                hpobj:that.model1,                               
                            },
                    currPage:value
                   }
                   ))
              

            // console.log(params)
            axios({ 
                url:"http://106.14.173.50:8080/accountexcep",
                params:params
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                that.data7 = arr.datas;
                
                that.pageTotal2 = arr.count;
                var _start = ( that.pageNum2 - 1 ) * that.pageSize2;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum2 * that.pageSize2;
                that.dataArr2 = that.data7.slice(_start,_end);
                       
            })
         },
        
  
  },
    mounted(){
         this.search();
         this.sousuo2();
         this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 160
        //项目名称
          var that = this;
           axios({               
                 url:"http://106.14.173.50:8080/projName",                
                })
                .then(function(data){
                   console.log(data.data)
                  var arr = data.data
                  for(var i in arr){
                      var obj={value:arr[i],label:arr[i]}
                       that.cityList1.push(obj)
                     }
                });
                
           document.title="消息反馈"
            

    }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .top{width: 100%;height:100% ;
        .ipt{min-width: 100%;height: 30px;display: flex;justify-content: space-between;display: flex;justify-content: space-between;
        
        }
        .tab{width: 100%;height:90%;margin-top: 10px;overflow: auto}

    }
</style>