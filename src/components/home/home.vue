<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}" style="background:#fff;">
                <Breadcrumb :style="{margin: '16px 0'}" >
                    
                    <!-- <div class="back">返回</div> -->
                    
                </Breadcrumb>
                 
                <Card style="height: 85vh;">
                            <div style="height: 80vh;overflow:auto">
                      <!-- 个人信息 -->
                        <div id="top">

                          <div class="title"><span>个人信息</span></div>
                           <p>所属部门： <span class="bm"></span> </p> 
                           <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：  <span class="zw"></span></p>
                           <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：  <span class="mc"></span></p>
                           <!-- <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{this.$store.state.count}}</p>
                           <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{this.$store.state.name}}</p> -->

                          <!-- <input type="text" v-model="user">
                          <button @click="login1()">看看</button>
                          <button @click="add()">jia</button> -->
                        </div>

                        <!-- 更新报告 -->
                        <div id="update">
                             <div class="title"><span>状态列表</span></div>
                             <div class="data"> 
                                <p>
                                    <Row>
                                        <Col span="8" >
                                            <DatePicker type="date" v-model="startdate" placeholder="开始统计日期" style="width: 120px;" size="default" @on-change="changedate" ></DatePicker>
                                        </Col>
                                        
                                    </Row>
                                    &nbsp;—&nbsp;
                                    
                                    <Row>
                                        <Col span="8" style="margin-right:50px">
                                            <DatePicker type="date" v-model="enddate" placeholder="结束统计日期" style="width: 120px" size="default" @on-change="changedate2"></DatePicker>
                                        </Col>
                                        
                                    </Row>
                                    <Select v-model="modelptype" style="width:150px" size="default" placeholder="项目类型" @on-change = "ptypechange">
                                        <Option v-for="item in ptype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    &nbsp;
                                    <Input v-model="proname" placeholder="输入项目名称" style="width: 150px" size="default"/>&nbsp;&nbsp;
                                
                                    <Input v-model="pronum" placeholder="请输入调研编号" style="width: 150px" size="default"/> 
                                    <Button type="success" @click="search" size="default" style="margin-left:5px">搜索</Button>
                                    <Button type="success" @click="reset" size="default" style="margin-left:5px">重置</Button>

                                </p>
                               
                               
                             </div>
             
                           
                              <Table border :columns="tabval" :data="dataa" size="small" ref="table" :height="tableHeight"></Table>
                               <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                    show-elevator  show-total placement="top" @on-change="handlePage" style="margin:8px"></Page>

                        </div>

                       
                        



                    </div>
                </Card>
            </Content>
        </Layout>

  
     
    
  </div> 
</template>

<script>
  import {mapGetters,mapActions} from "vuex"
  import $ from "jquery"
  import axios from "axios"
	
export default {

  name: 'Home',
   data() {
      return {
          tableHeight:300,
          visitDate1:"",
          ptype: [
                    {
                        value: '1',
                        label: '小区'
                    },
                    {
                        value: '2',
                        label: '店招'
                    },
                    {
                        value: '3',
                        label: '道路'
                    },
                   
                ],
                modelptype: '',
         
         pronum:"",
         proname:"",
        startdate:"",
        enddate:"",   

        pageTotal: 1,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 10,  //每页条数
        dataArr :[],   //页面显示的数组

                parindex: false,
                checkany: false,
                quanxuan: [],
                tabval: [
                    {
                        title: '项目名称',
                        key: 'projectname',
                        align:"center"
                    },
                    {
                        title: '调研对象',
                        key: 'researchobject',
                        align:"center"
                    },
                    {
                        title: '调研编号',
                        key: 'researchnum',
                        align:"center"
                    },
                    {
                        title: '详细地址',
                        key: 'address',
                        align:"center"
                    },
                    {
                        title: '访问员',
                        key: 'name',
                        align:"center"
                    },
                    {
                        title: '上传时间',
                        minWidth:15,
                        key: 'uploadtime',
                        align:"center"
                    },
                    {
                        title: '认证员',
                        key: 'uname',
                        align:"center"
                    },
                    {
                        title: '确认时间',
                        minWidth:15,
                        key: 'confirmtime',
                        align:"center"
                    },
                    {
                        title: '查看详情',
                        key: 'pro9',
                        align:'center',
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
                               
                            ]);
                        }
                    },
                ],
        dataa: [   ],
        user:"",
        options: [
            {
                value: '选项1',
                label: '黄金糕'
            }, 
        
        ],
        value: '',
        input: ''
      }
    },

     computed:mapGetters([]),

      methods:{
          instance (type) {
                const title = '提示';
                const content = '<p>输入框值不能为空</p>';
                switch (type) {
                   
                   case 'info':
                        this.$Modal.info({
                            title: title,
                            content: "<p>注意：开始时间不能大于结束时间，且开始与结束时间须填写完整！</p>"
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: "ok",
                            content: '<p>添加成功</p>'
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: '<p>输入框不能为空！</p>'
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
          //转换时间格式
             parserDate(date) {  
                    var t = Date.parse(date);  
                    if (!isNaN(t)) {  
                        return new Date(Date.parse(date.replace(/-/g, "/")));  
                    } else {  
                        return new Date();  
                    }  
              },          
                // ...mapActions(["login","add","jian","username"]), //mapActions（[]）为store里的函数名

                show(index) {
                        // this.$Modal.info({
                        //     title: 'User Info',
                        //     content: `Name：${this.dataa[index].pid}<br>`
                        // })
                        var pid = this.dataa[index].pid
                        var address = this.dataa[index].address
                        var confirmtime = this.dataa[index].confirmtime
                        var name = this.dataa[index].name
                        var projectname = this.dataa[index].projectname
                        var researchnum = this.dataa[index].researchnum
                        var researchobject = this.dataa[index].researchobject
                        var uname = this.dataa[index].uname
                        var uploadtime = this.dataa[index].uploadtime

                       localStorage.setItem('apid',pid) //详情id
                    //    console.log(pid,address)
                          this.$router.push({
                            name: 'homeDetail',
                            params: {
                             id: {
                                 pid:pid,
                                 address:address,
                                 confirmtime:confirmtime,
                                 name:name,
                                 projectname:projectname,
                                 researchnum:researchnum,
                                 researchobject:researchobject,
                                 uname:uname,
                                 uploadtime:uploadtime
                              }
                            }
                         })

                },
                login1(){
                    this.login(this.user) //把this.user传参到store里的login
                },
                changedate(time,data){
                     
                   this.startdate=time;
                   console.log( this.startdate)
                 
                },
                changedate2(time){
                    this.enddate = time
                    console.log( this.enddate)
                },
                ptypechange(val){
                    this.modelptype = val
                    // console.log(this.modelptype)
                },
                //  ''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //分页
                 handlePage(value){
                    var beginDate = this.startdate;
                     var endDate = this.enddate;
                    var that = this;
                             that.proname =  $.trim(that.proname)
                             that.pronum =  $.trim(that.pronum) 

                              var aaa = {
                                startime:beginDate,
                                endtime:endDate,
                                projectname:that.proname,
                                researchnum:that.pronum,
                                researchobjtype:that.modelptype,
                                page:value
                            }

                            // console.log(beginDate,endDate)
                                axios({
                                    url:"http://106.14.173.50:8080/queryByDetailsAll",
                                    params:aaa
                                })
                                .then(function(data){
                                     console.log(data.data) 
                                        that.dataa=[]
                                    that.pageTotal = data.data.totalCount;
                                    that.pageNum =data.data.page;
                                    that.pageSize = data.data.limit;
                                    // console.log( that.pageTotal)
                                    var arr = data.data.list
                                    for(var i in arr){
                                        var obj = {
                                            pid:arr[i].pid,
                                            address:arr[i].address,
                                            confirmtime:arr[i].confirmtime,
                                            name:arr[i].name,
                                            projectname:arr[i].projectname,
                                            researchnum:arr[i].researchnum,
                                            researchobject:arr[i].researchobject,
                                            uname:arr[i].uname,
                                            uploadtime:arr[i].uploadtime
                                        }
                                            //开始时间
                                            var confirmtime = obj.confirmtime;
                                            var d = new Date(confirmtime);
                                            var times1=d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate() ; 
                                            // console.log(times1)
                                            obj.confirmtime = times1
                                            //结束时间  
                                            var uploadtime = obj.uploadtime;
                                            var d = new Date(uploadtime);
                                            var times=d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate() ; 
                                            obj.uploadtime = times         
                                        
                                        that.dataa.push(obj) 
                                    }
                                        console.log(that.dataa) 
                                        that.pageTotal = data.data.totalCount;              
                                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                                        var _end = that.pageNum * that.pageSize;
                                        that.dataArr = that.dataa.slice(_start,_end);

                                    // var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                                    // var _end = that.pageNum * that.pageSize;
                                    // that.dataArr = that.dataa.slice(_start,_end);

                                })
                },

               //搜索"D:\qrcode\img\2018-11-17\2018-11-17-11-5-27-780.png"

                search(){
                     var beginDate = this.startdate;
                     var endDate = this.enddate;
                     console.log(endDate)

                     var d1 = new Date(beginDate.replace(/\-/g, "\/"));  
                     var d2 = new Date(endDate.replace(/\-/g, "\/"));  
                    
                        
                        if(beginDate!=""&&endDate==""){  
                            // alert("开始时间不能大于结束时间、开始与结束时间必须填写！");    
                              this.instance('info')
                        }else if(beginDate==""&&endDate!=""){
                              this.instance('info')
                        }else if(d1 >=d2){
                              this.instance('info')
                        }else{
                             var that = this;
                             that.proname =  $.trim(that.proname)
                             that.pronum =  $.trim(that.pronum) 

                              var aaa = {
                                startime:beginDate,
                                endtime:endDate,
                                projectname:that.proname,
                                researchnum:that.pronum,
                                researchobjtype:that.modelptype,
                                page:1
                            }

                            // console.log(beginDate,endDate)
                                axios({
                                    url:"http://106.14.173.50:8080/queryByDetailsAll",
                                    params:aaa
                                })
                                .then(function(data){
                                     console.log(data.data) 
                                        that.dataa=[]
                                    that.pageTotal = data.data.totalCount;
                                    that.pageNum =data.data.page;
                                    that.pageSize = data.data.limit;
                                    // console.log( that.pageTotal)
                                    var arr = data.data.list
                                    for(var i in arr){
                                        var obj = {
                                            pid:arr[i].pid,
                                            address:arr[i].address,
                                            confirmtime:arr[i].confirmtime,
                                            name:arr[i].name,
                                            projectname:arr[i].projectname,
                                            researchnum:arr[i].researchnum,
                                            researchobject:arr[i].researchobject,
                                            uname:arr[i].uname,
                                            uploadtime:arr[i].uploadtime
                                        }
                                            //开始时间
                                            var confirmtime = obj.confirmtime;
                                            var d = new Date(confirmtime);
                                            var times1=d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate() ; 
                                            // console.log(times1)
                                            obj.confirmtime = times1
                                            //结束时间  
                                            var uploadtime = obj.uploadtime;
                                            var d = new Date(uploadtime);
                                            var times=d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate() ; 
                                            obj.uploadtime = times         
                                        
                                        that.dataa.push(obj) 
                                    }
                                        console.log(that.dataa) 
                                        that.pageTotal = data.data.totalCount;              
                                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                                        var _end = that.pageNum * that.pageSize;
                                        that.dataArr = that.dataa.slice(_start,_end);

                                      

                                })
                             
                        }
                      
                        
                },
                //重置
                reset(){
                    console.log(this.startdate)
                     this.startdate="";
                     this.enddate="";
                     this.modelptype="";
                     this.proname="";
                     this.pronum=""
                    console.log(this.startdate)

                }
        
        },
      
     mounted(){
         this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    //    const loading = this.$loading({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, .9)'
    //     });
    //    loading.close();

       $(".bm").text("【"+localStorage.getItem('dname')+"】")
       $(".zw").text("【"+localStorage.getItem('job')+"】")
       $(".mc").text("【"+localStorage.getItem('username')+"】")


        this.search()
                   
       document.title="首页"               
     } 

      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .back{width:80px;height:30px;background:#39435B;color: #fff;text-align: center;line-height: 30px;border-radius: 5px}
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }


     #top{height: 130px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;
        
        p{
          width: 100%;height: 30px;line-height: 30px;font-size: 12px;font-weight: bold;padding-left: 10px
        }
     }
     #update{
        width: 100%;height: 465px;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);margin-top: 8px;border-radius: 5px;
        .data{width: 100%;height: 30px;display: flex;justify-content:space-between;margin:10px 0;
             p{height: 30px}
             p:nth-child(1){
                width: 730px;display: flex;align-items: center;font-weight:bold;
                input{border-radius: 4px;width: 130px;height: 30px;}
             }
            //  p:nth-child(2){
            //     width: 330px;display: flex;align-items: center;font-weight:bold;
            //     select{border-radius: 4px;width: 150px;height: 30px}
            //  }
            //  p:nth-child(3){
            //     width: 430px;display: flex;align-items: center;font-weight:bold;margin-left:10px;
            //     input{border-radius: 4px;width: 150px;height: 30px}
            //     .search{display: block;width: 100px;height: 36px;background: #5BB85D;color: #fff;text-align: center;line-height: 36px;border-radius: 5px;margin-left: 10px;cursor: pointer}
            //  }
         }
     }
table{text-align: center;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}


</style>
