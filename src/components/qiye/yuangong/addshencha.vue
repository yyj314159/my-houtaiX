
<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <router-link to="./ygrecheck" tag="span">
                       <el-button type="info" size="small">返回</el-button>                   
                    </router-link>
                     <Button type="success" @click="save" size="default" >保存</Button>
                     <!-- <Button type="warning" size="default">删除</Button> -->
                     
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                          <div class="aaa">
                            
                             <div class="bbb">
                               <div class="tit">基本信息</div>
                               
                                <!-- <Table border :columns="columns1" :data="data1"></Table> -->
                                <!-- <Input v-model="visiter" placeholder="访问员账户" style="width: 200px" />
                                <Input v-model="visiterpassword" placeholder="访问员密码" style="width: 200px" /> -->
                                <!-- <Table border :columns="columns1" :data="data1"></Table> -->
                                <table border='1' width="100%" cellpadding='0' cellspacing='0'>
                                  <tr class="header">
                                      <td>访问员账户</td>
                                      <td>访问员密码</td>
                                      <td>已绑定手机号</td>
                                      <td>姓名</td>
                                      <td>性别</td>                                                                       
                                  </tr>
                                  <tr>
                                      <td >{{root1}}</td>
                                      <td><input v-model="password" class="passw"/></td>
                                      <td>{{iphone}}</td>
                                      <td><input v-model="name" class="name"/></td>
                                      <td><input v-model="sex" class="sex"/></td>                                                                                                       
                                  </tr>   
                              </table>
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

export default {
  name: 'Addrecheck',
  data () {
    return {
        sheng:"",
        shi:"",
        city:[],
        shi:[],
        sex:"",
        name:"",
        iphone:"",
        password:"",
        username:"",
        id:"",
        root1:'',
        visiter:"",
        visiterpassword:"",
        columns1: [
                    {
                        title: '访问员账户',
                        key: 'username'
                    },
                    {
                        title: '访问员密码',
                        key: 'password'
                    },
                    {
                        title: '已绑定手机号',
                        key: 'phone'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    }
                ],
                data1: [
                    // {
                    //     username: 'John Brown',
                    //     password: 18,
                    //     phone: 'New York ',
                    //     name: '2016-10-03',
                    //     sex:""
                    // },
                   
                ],
        proname:"",
        pronum:"",
        pageTotal1:1,  //数据总数
        pageNum1: 1,  //初始页
        pageSize1: 8,  //每页条数
        dataArr1 :[],   //页面显示的数组

        pageTotal: 1,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
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
                resivedata:[],
                message: [
                    // {   id:1,
                    //     province: '河南',
                    //     shi: '郑州',
                    //     qu: '二七区',
                    //     proname: '呵呵呵',
                    //     obj: '111',
                    //     num: '111',
                    //     address:"222",                
                    // },
                    // {   id:2,
                    //     province: '河南1',
                    //     shi: '郑州1',
                    //     qu: '二七区1',
                    //     proname: '呵呵呵1',
                    //     obj: '222',
                    //     num: '1111',
                    //     address:"2222",                
                    // },
                    //  {  id:3,
                    //     province: '河北',
                    //     shi: '石家庄',
                    //     qu: '解放区',
                    //     proname: '的方式规范呵1',
                    //     obj: '333',
                    //     num: '十多个',
                    //     address:"三个地方好地方",                
                    // },
                    // {  id:3,
                    //     province: '河北',
                    //     shi: '石家庄',
                    //     qu: '解放区',
                    //     proname: '的方式规范呵1',
                    //     obj: '333',
                    //     num: '十多个',
                    //     address:"三个地方好地方",                
                    // },
                    // {  id:3,
                    //     province: '河北',
                    //     shi: '石家庄',
                    //     qu: '解放区',
                    //     proname: '的方式规范呵1',
                    //     obj: '333',
                    //     num: '十多个',
                    //     address:"三个地方好地方",                
                    // },
                    // {  id:3,
                    //     province: '河北',
                    //     shi: '石家庄',
                    //     qu: '解放区',
                    //     proname: '的方式规范呵1',
                    //     obj: '333',
                    //     num: '十多个',
                    //     address:"三个地方好地方",                
                    // },
                   
                ],
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
            cityList1: [
                    // {
                    //     value: '门头照',
                    //     label: '门头照'
                    // },
                    // {
                    //     value: '问题照片',
                    //     label: '问题照片'
                    // },
                    // {
                    //     value: '货架',
                    //     label: '货架'
                    // }
                    
                ],
                 cityList2: [
                    // {
                    //     value: '门头照',
                    //     label: '门头照'
                    // },
                    // {
                    //     value: '问题照片',
                    //     label: '问题照片'
                    // },
                    // {
                    //     value: '货架',
                    //     label: '货架'
                    // }
                    
                ],
                 cityList3: [
                    // {
                    //     value: '门头照',
                    //     label: '门头照'
                    // },
                    // {
                    //     value: '问题照片',
                    //     label: '问题照片'
                    // },
                    // {
                    //     value: '货架',
                    //     label: '货架'
                    // }
                    
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
          fruit: ['苹果']  ,
          msg1:""
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
           
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
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
        },
        change3(val){
            // console.log(val)
            this.model3 = val
        },
        //搜索
        search(){
             var that = this; 
             that.message=[]
             that.pronum =  $.trim(that.pronum)       
            //  console.log("00")
            //  console.log(that.model1,that.model2,that.model3,that.proname,that.pronum)
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
                    page:that.pageNum
                }
            })
            .then(function(data){
                 console.log(data.data)       
                 var arr = data.data
                 var newarr=[]
                  newarr = arr.list;
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
                     var sheng = newarr[i].provinceid==null?"无":newarr[i].provinceid
                     console.log(sheng)
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
        //弹出
            instance (type) {
                const title = '提示';
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
                            content: '<p>操作成功</p>'
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: '<p>内容不能为空</p>'
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: '<p>操作失败</p>'
                        });
                        break;
                }
            },
       
      //保存
        save(){
            var that = this; 
            var arr = that.dataArr1;
            var idMap = {};
            var idArr = [];
            arr.forEach(element => {
                if (idMap[element.pid] == null) {
                    idMap[element.pid] = "";
                    idArr.push(element.pid);
                }
            });


              
            var str = idArr.toString()
            console.log(str,that.password,that.name,that.sex,that.id)

            axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/updateByInterviewProject",
                params:{
                    //  reviewInterview:{}, 
                     id:that.id,
                     pid:str,
                     root:that.root1,        
                     password:that.password,
                     name:that.name,
                     sex:that.sex                 
                }
            })
            .then(function(data){
                // console.log(data.data)       
               if(data.data.msg=="修改成功"){
                   that.instance('success')
               }
            })
        }
           
        
       
       },
       mounted(){
            //省市区
          var that = this;
          axios({
            method:'get',
            url:"../../static/city.json"
            }).then(function(data){
                //  console.log(data.data)       
                var city = that.city = data.data;
                for(var i in city){
                    var obj = {
                        value:city[i].id,
                        label:city[i].name
                    }
                   that.cityList1.push(obj)              
                   that.shi.push(city[i].child);
                   
                }
                //  console.log(that.shi)
            })


           //路由传值
           var obj = this.$route.params.id  ;   
           this.id = obj.id;
           this.root1 = obj.root;
           this.iphone = obj.iphone
           this.name = obj.name
           this.password = obj.password
           this.sex = obj.sex

                var newobj = {
                    password: obj.password,
                    phone: obj.iphone,
                    name: obj.name,
                    sex:obj.sex
                }    
             
            var zhanghao = obj.root;
            //  console.log(newobj)

          //可见调研对象
             var that = this;
            axios({ 
                url:"http://106.14.173.50:8080/queryByInterviewProjectXid",
                params:{ id:zhanghao }
            })
            .then(function(data){
             console.log(data.data)   
                var arr = data.data;
                for(var i in arr){
                    var obj = {
                        pid:arr[i].pid,
                        obj:arr[i].researchobject,
                        address:arr[i].researchobject
                    }
                  that.shows.push(obj)                
                }
                   that.resivedata = that.shows;
                  that.pageTotal1 = that.shows.length;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum1 - 1 ) * that.pageSize1;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum1 * that.pageSize1;
                        that.dataArr1 = that.shows.slice(_start,_end);
                        
                // console.log(that.shows)
            })

           

          document.title="员工管理"           
           
       },
     
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .aaa{
      width: 100%;height: 120px;display:flex;justify-content:space-between;
      .bbb{
        width: 100%;height: 250px;
        .tit{
           width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 10px;
        }
      }

    }

 
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.table{width: 68%;height:490px;overflow:auto;border:1px solid #ccc;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
.table2{width: 31%;height:490px;overflow:auto;border:1px solid #ccc;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:5px;margin:5px 0 0 0;padding:0;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}

.xia{display: flex;justify-content: space-between}
.passw{text-align: center;width: 100%;height: 100%}
.name{text-align: center;width: 100%;height: 100%}
.sex{text-align: center;width: 100%;height: 100%}
table tr{height: 30px;}

</style>
