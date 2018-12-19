<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <router-link to="./ygrecheck" tag="span">
                       <el-button type="info" size="small">返回</el-button>
                       
                    </router-link>
                    
                    <Button type="success" @click="save" size="default">保存新增</Button>
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                          <div class="aaa">
                            
                             <div class="bbb">
                               <div class="tit">基本信息</div>
                               
                              <!-- <Table border :columns="columns1" :data="data1"></Table> -->
                                <Input v-model="visiter" placeholder="访问员账户" style="width: 200px" size="default"/>
                                <Input v-model="visiterpassword" placeholder="访问员密码" style="width: 200px" size="default"/>

                             </div>
                            
                            
                          </div>

                          <!-- 下 -->
                          <div class="xia">
                              <!-- 表格左 -->
                            <div class="table">
                               <div class="other">添加调研对象</div>
                              
                               <div>
                              
                                        <Select v-model="model1" style="width:80px" placeholder="省" @on-change="change1" size="default">
                                            <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="model2" style="width:80px" placeholder="市" @on-change="change2" size="default">
                                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="model3" style="width:80px" placeholder="县/区" @on-change="change3" size="default">
                                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="modelptype" style="width:100px" size="default" placeholder="项目类型" @on-change = "ptypechange">
                                          <Option v-for="item in ptype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Input v-model="proname" placeholder="项目名称" style="width: 100px" size="default"/>
                                        <Input v-model="pronum" placeholder="调研编号" style="width: 100px" size="default"/>
                                        <Button type="success" @click="search" style="margin:8px" size="default">搜索</Button>
                                </div>
                                <!-- 批量操作 -->
                                
                                
                            <!-- <Button @click="handleSelectAll(true)">全选</Button> -->
                            <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                            <!-- <Button type="success">批量添加</Button>  -->
                           
                           <Table border ref="selection" :columns="columns4" :data="dataArr" @on-select-all="selectAbb" @on-select="selectone" style="margin-top:5px" size="small"></Table>
                            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                show-elevator  show-total placement="top" @on-change="handlePage" style="margin-top:8px">
                            </Page>

                           </div>
                        <!-- 表格右 -->
                           <div class="table2">
                               <div class="other">可见调研对象</div>
                               <Table border :columns="col" :data="dataArr1" size="small"></Table>
                               <Page :total="pageTotal1" :current="pageNum1" :page-size="pageSize1" 
                                   placement="top" @on-change="handlePage2" style="margin-top:8px">
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
  name: 'Addrecheck',
  data () {
    return {
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
                        label: '家化'
                    },
                    {
                        value: '4',
                        label: '道路'
                    },
                   
                ],
                modelptype: '',
        uid:"",
        sheng:"",
        shi:"",
        city:city,
        shi:[],
        ptypeid:"",
        visiter:"",
        visiterpassword:"",
        proname:"",
        pronum:"",

        pageTotal1:1,  //数据总数
        pageNum1: 1,  //初始页
        pageSize1: 8,  //每页条数
        dataArr1 :[],   //页面显示的数组

        pageTotal: 1,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 1,  //每页条数
        dataArr :[],   //页面显示的数组

            col: [
                    {
                        title: '调研对象',
                        key: 'obj'
                    },
                    {
                        title: '详细地址',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'do',
                        render: (h, params) => {
                            return h('div', [
                                
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
                                }, '删除')
                            ]);
                        }
                    }
                ],
                shows: [
                    // {
                    //     obj: 'sssss',
                    //     address: "xxxxxxx",                      
                    // },
                    //  {
                    //     obj: 'ddddd',
                    //     address: "ggggggg",                      
                    // },
                    
                ],
        columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '省',
                        key: 'province'
                    },
                    {
                        title: '市',
                        key: 'shi'
                    },
                    {
                        title: '区',
                        key: 'qu'
                    },
                    {
                        title: '项目名称',
                        key: 'proname'
                    },
                    {
                        title: '调研对象',
                        key: 'obj'
                    },
                    {
                        title: '调研编号',
                        key: 'num'
                    },
                    {
                        title: '详细地址',
                        key: 'address'
                    },
                   
                ],
                message: [
                    {   pid:1,
                        province: '河南',
                        shi: '郑州',
                        qu: '二七区',
                        proname: '呵呵呵',
                        obj: '111',
                        num: '111',
                        address:"222",                
                    },
                    {   pid:2,
                        province: '河南1',
                        shi: '郑州1',
                        qu: '二七区1',
                        proname: '呵呵呵1',
                        obj: '222',
                        num: '1111',
                        address:"2222",                
                    },
                     {  pid:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '444',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                    {  pid:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '555',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                    {  pid:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '666',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                    {  pid:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '777',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                   
                ],
                resivedata:[],
        // columns1: [
        //             {
        //                 title: '访问员账户',
        //                 key: 'username',
        //                 width:"200px",
                       
        //             },
        //             {
        //                 title: '访问员密码',
        //                 key: 'password',
        //                 width:"200px"
        //             },
                   
        //         ],
        //         data1: [
        //             {
        //                 username: 'John Brown',
        //                 password: 18000000,
                       
        //             },
                    
        //         ],
        // 全选
         indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜'],

       input10: '',
       single: false,
       single1: false,
       single2: false,
       single3: false,
       cityList: [
                    // {
                    //     value: 'New York',
                    //     label: 'New York'
                    // },
                    // {
                    //     value: 'London',
                    //     label: 'London'
                    // },
                    // {
                    //     value: 'Sydney',
                    //     label: 'Sydney'
                    // },
                ],
                cityList1: [
                   
                    
                ],
                 cityList2: [
                   
                    
                ],
                 cityList3: [
                   
                    
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         model2: '',
         model3: '',

         textarea2: '',
         textarea3: '',
         value:"",
         value2:""      ,
          social: ['facebook', 'github'],
          fruit: ['苹果']  
    }
  },

methods: {
            
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.message[index].province}<br>Age：${this.message[index].province}<br>Address：${this.message[index].province}`
                })
            },
            
            // handleSelectAll (status) {
            //     this.$refs.selection.selectAll(status);
            // },

            //全选
            selectAbb(value){
                //  this.shows=[]
            //    console.log(value)
               var objj=value
               for(var i in value){
                   var obj1 = {
                       obj:value[i].obj,
                       address:value[i].address,
                       pid:value[i].pid
                   }
                  this.shows.push(obj1)                   
               }              
                  
                  var arr=this.dataArr1.concat(this.shows)
                //    console.log(arr)

              //数组去重
                var hash = {};
                var result = [];
                for(var i = 0, len = arr.length; i < len; i++){
                    if(!hash[arr[i].pid+arr[i].obj+arr[i].address]){
                        result.push(arr[i]);
                        hash[arr[i].pid+arr[i].obj+arr[i].address] = true;
                    }
                }            
                    //    console.log(result)
                       this.pageTotal1 =result.length;
                    //    console.log(this.pageTotal1)
                       var _start = ( this.pageNum1 - 1 ) * this.pageSize1;
                       var _end = this.pageNum1 * this.pageSize1;
                       this.dataArr1 = result.slice(_start,_end);
                    //    this.dataArr1 = result;
            },
            //单选
            selectone(value){
                //   this.shows=[]
            //    console.log(value);
               var newarr1 = []
               for(var i in value){
                   var obj1 = {
                       obj:value[i].obj,
                       address:value[i].address,
                       pid:value[i].pid
                   }
                
                  this.shows.push(obj1)
               }
                var arr=this.dataArr1.concat(this.shows)
              //数组去重
                var hash = {};
                var result = [];
                for(var i = 0, len = arr.length; i < len; i++){
                    if(!hash[arr[i].pid+arr[i].obj+arr[i].address]){
                        result.push(arr[i]);
                        hash[arr[i].pid+arr[i].obj+arr[i].address] = true;
                    }
                }            
                    //    console.log(result.length)  
                       this.pageTotal1 = result.length;
                       var _start = ( this.pageNum1 - 1 ) * this.pageSize1;
                       var _end = this.pageNum1 * this.pageSize1;
                       this.dataArr1 = result .slice(_start,_end);
                           
            },

            //删除
            remove (index) {
                this.dataArr1.splice(index, 1);
                // console.log(this.dataArr1)
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
        //类型
        ptypechange(val){
                    this.modelptype = val
                    console.log(this.modelptype)
        },
        //搜索
         search(){
             var that = this;   
             that.pronum =  $.trim(that.pronum)       
            //  console.log("00")
            //  console.log(that.model1,that.model2,that.model3,that.proname,that.pronum)
            // that.pageTotal
            // console.log(that.modelptype)
            axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/queryByResearchobjectId",
                params:{
                   
                        provinceid:that.model1,
                        cityid:that.model2,
                        districtid:that.model3,
                        projectname:that.proname,
                        researchobjtype:that.modelptype,
                        researchnum:that.pronum,              
                        page:that.pageNum
                }
            })
            .then(function(data){
                // console.log(data.data)       
                 var arr = data.data
                 that.message=[]
                 var newarr = arr.list;
                 that.pageTotal = arr.totalCount;//总页数
                 that.pageNum = arr.page;//当前页
                 that.pageSize = arr.limit;//每页显示
                //  that.pageTotal = arr.totalCount; //数据总树

                 for(var i in newarr){                      
                     var obj={
                            province:newarr[i].provinceid==null?"无":newarr[i].provinceid,
                            shi:newarr[i].cityid==null?"无":newarr[i].cityid,
                            qu:newarr[i].districtid==null?"无":newarr[i].districtid,
                            proname:newarr[i].projectname,
                            obj:newarr[i].researchobject,
                            num:newarr[i].researchnum,
                            address:newarr[i].address==null?"无":newarr[i].address,
                            pid:newarr[i].pid
                      }    

                       that.message.push(obj) 

                 }
                   
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.message.slice(_start,_end);
                       
            })

        },
        //分页1
         handlePage(value){
            // console.log(value)
            // this.pageNum = value;
          
            var that = this; 
            that.pageTotal
            axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/queryByResearchobjectId",
                params:{ 
                 researchobject:{
                        provinceid:that.model1,
                        cityid:that.model2,
                        districtid:that.model3,
                        projectname:that.proname,
                        researchnum:that.pronum
                    },
                    page:value}
            })
            .then(function(data){
                that.message=[]
                  var arr = data.data
                  var newarr = arr.list;
                //    console.log(arr.list)
                 for(var i in newarr){                      
                     var obj={
                            province:newarr[i].provinceid==null?"无":newarr[i].provinceid,
                            shi:newarr[i].cityid==null?"无":newarr[i].cityid,
                            qu:newarr[i].districtid==null?"无":newarr[i].districtid,
                            proname:newarr[i].projectname,
                            obj:newarr[i].researchobject,
                            num:newarr[i].researchnum,
                            address:newarr[i].address==null?"无":newarr[i].address,
                            pid:newarr[i].pid
                      }    
                    //   console.log(obj)                 
                     that.message.push(obj)                                           
                                         
                 }       
                 
                //   var _start = ( value - 1 ) * that.pageSize;
                //   var _end = value * that.pageSize;
                //   that.dataArr = that.message .slice(_start,_end);

                    that.dataArr = that.message;
                  
            })
        },
        //分页2
         handlePage2(value){
            // console.log(value)
            this.pageNum1 = value;
            var _start = ( value - 1 ) * this.pageSize1;
            var _end = value * this.pageSize1;
            this.dataArr1 = this.shows .slice(_start,_end);
        },

        instance (type) {
                const title = '注意';
                const content = '<p>输入框值不能为空</p>';
                switch (type) {
                   
                   case 'info':
                        this.$Modal.info({
                            title: title,
                            content: "<p>部门/职位/账户名称不能重复</p>"
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
                            content: '<p>输入框不能为空</p>'
                        });
                        break;
                    case 'warning':
                        this.$Modal.confirm({
                            title: title,
                            content: '<p>保存失败</p>'
                        });
                        break;   
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: "<p>账户名已存在</p>"
                        });
                        break;
                }
            },
           confirm () {
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>添加失败</p>',                
                });
            },
        //保存
        save(){
            if(this.visiter=="" || this.visiterpassword==null){
               this.instance('warning')
            }else{
                this.visiter =  $.trim(this.visiter)       
                this.visiterpassword =  $.trim(this.visiterpassword)       
                var that = this;
                var zhanghao = that.visiter
                var arr = that.dataArr1;
                // 去重
                var names = arr
                var uniqueNames = [];
                $.each(names, function(i, el){
                   if($.inArray(el, uniqueNames) === -1)//没有匹配
                    uniqueNames.push(el);
                });
                
                // console.log(that.shows)
                var newarr = []
                for(var i in uniqueNames){
                    var pidd = uniqueNames[i].pid
                    newarr.push(pidd)
                }
                 
               
                // console.log(uniqueNames);

                 var str = newarr.toString()
                    
                // console.log(that.ptypeid,that.visiter,that.visiterpassword, str,that.uid)
                    axios({ 
                        method:"post",
                        url:"http://106.14.173.50:8080/savaByInterviewProject",
                        params:{
                            //  reviewInterview:{}, 
                            uid:that.uid,
                            root:that.visiter,
                            password:that.visiterpassword,                                     
                            pid:str,
                            columu1:that.ptypeid
                        }
                    })
                    .then(function(data){
                        //  console.log(data.data)       
                        if(data.data.msg=="添加成功"){
                           that.instance('success')
                        }else if(data.data.msg=="账号已存在"){
                           that.instance('error')
                        }else if(data.data.msg=="添加失败"){
                           that.confirm()
                        }
                   })
            }
            

           }
 

       },
       mounted(){
       
          var ptypeid =  localStorage.getItem('ptypeid')
          this.uid = localStorage.getItem('uid')
          this.ptypeid = ptypeid;
        //   console.log(ptypeid)
   
          //省市区
        //   var that = this;
        //   axios({
        //     method:'get',
        //     url:"./city.json"
        //     }).then(function(data){
        //          console.log(data.data)       
                var city = this.city 
                for(var i in city){
                    var obj = {
                        value:city[i].id,
                        label:city[i].name
                    }
                   this.cityList1.push(obj)              
                   this.shi.push(city[i].child);
                   
                }
                // console.log(that.shi)
            // })
           document.title="员工管理" 
                
       },
      

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .aaa{
      width: 100%;height: 90px;display:flex;justify-content:space-between;
      .bbb{
        width: 100%;height: 150px;
        .tit{
           width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 10px;
        }
      }

    }

 
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.table{width: 68%;height:520px;overflow:auto;border:1px solid #ccc;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
.table2{width: 31%;height:520px;overflow:auto;border:1px solid #ccc;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:5px;margin:5px 0 0 0;padding:0;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}

.xia{display: flex;justify-content: space-between}


</style>
