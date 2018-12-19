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
                    <div style="height: 80vh;overflow:auto">
                        <div class="title"><span>条件筛选</span></div>
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
                                        
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Select v-model="daili" style="width:100px" placeholder="代理状态" size="default">
                                            <Option v-for="item in dailistatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>&nbsp;&nbsp;
                                        <Button type="success" size="default" @click="search">搜索</Button>
                                        <Button type="success" size="default" @click="addperson">添加代理人</Button>

                                       <!-- 添加代理人 -->
                                        <Modal
                                            title="填写代理人信息"
                                            v-model="modal9"
                                            @on-ok="saveadd" 
                                            width="600"
                                            :styles="{top: '100px'}">
                                            <div id="wrop">
                                                <div class="left">
                                                    <Select v-model="model1" style="width:200px;" placeholder="省" @on-change="change1" size="default">
                                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="model2" style="width:200px;margin:10px 0" placeholder="市" @on-change="change2" size="default">
                                                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="model3" style="width:200px" placeholder="县/区" @on-change="change3" size="default">
                                                        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="daili" style="width:200px;margin:10px 0" placeholder="代理状态" size="default" @on-change="changeStatus"> 
                                                        <Option v-for="item in dailistatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Col span="12">
                                                        <DatePicker type="date" placeholder="入职时间" style="width: 200px" size="default" @on-change="changeDate"></DatePicker>
                                                    </Col>
                                                    <Input v-model="email" placeholder="邮箱" style="width: 200px;margin-top:10px" size="default"/>
                                                </div>
                                                <div class="right">
                                                    <Input v-model="name" placeholder="姓名" style="width: 200px;" size="default"/>
                                                    <Input v-model="price" placeholder="单价" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="componentname" placeholder="公司名称" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="telephone" placeholder="联系方式" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="zhanghao" placeholder="后台账户" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="password" placeholder="初始密码" style="width: 200px;margin-top:10px" size="default"/>
                                                </div>
                                            </div>
                                            
                                        </Modal>
                                         <!-- 编辑信息 -->
                                        <Modal
                                            title="填写代理人信息"
                                            v-model="dailiedit"
                                            @on-ok="saveedit" 
                                            width="600"
                                            :styles="{top: '100px'}">
                                            <div id="wrop">
                                                <div class="left">
                                                    <Select v-model="model1" style="width:200px;" placeholder="省" @on-change="change1" size="default">
                                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="model2" style="width:200px;margin:10px 0" placeholder="市" @on-change="change2" size="default">
                                                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="model3" style="width:200px" placeholder="县/区" @on-change="change3" size="default">
                                                        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Select v-model="daili" style="width:200px;margin:10px 0" placeholder="代理状态" size="default" @on-change="changeStatus"> 
                                                        <Option v-for="item in dailistatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                    </Select>
                                                    <Col span="12">
                                                        <DatePicker type="date" placeholder="入职时间" style="width: 200px" v-model="datetime" size="default" @on-change="changeDate"></DatePicker>
                                                    </Col>
                                                    <Input v-model="email" placeholder="邮箱" style="width: 200px;margin-top:10px" size="default"/>
                                                </div>
                                                <div class="right">
                                                    <Input v-model="name" placeholder="姓名" style="width: 200px;" size="default"/>
                                                    <Input v-model="price" placeholder="单价" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="componentname" placeholder="公司名称" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="telephone" placeholder="联系方式" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="zhanghao" placeholder="后台账户" style="width: 200px;margin-top:10px" size="default"/>
                                                    <Input v-model="password" placeholder="初始密码" style="width: 200px;margin-top:10px" size="default"/>
                                                </div>
                                            </div>
                                            
                                        </Modal>
                        </div>
                        
                        <br/>
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" size="small">导出表格</el-button>
                        </div>
                         <!-- 表格 -->
                         <!-- <Table border :columns="columnsa" :data="listStatus" size="small" ></Table> -->
                             <Table height="450" :columns="columnsa" :data="listStatus" border size="small"></Table>
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
  name: 'Jiahua',
  data () {
    return {
        datetime:"",
        dailiedit:false,
        password:"",
        zhanghao:"",
        telephone:"",
        componentname:"",
        price:"",
        name:"",
        email:"",
        modal9:false,
        daili:"",
        city:city,
        columnsa: [
                    {
                        title: '大区',
                        key: 'name'
                    },
                    {
                        title: '省市区',
                        key: 'area',
                        align:'center'
                    },
                    {
                        title: '代理姓名',
                        key: 'aname',
                        align:'center'
                    },
                     {
                        title: '代理编号',
                        key: 'address',
                        align:'center'
                    },
                     {
                        title: '后台账户',
                        key: 'aroot',
                        align:'center'
                    },
                     {
                        title: '代理状态',
                        key: 'atype',
                        align:'center'
                    },
                    {
                        title: '手机号',
                        key: 'aiphone',
                        align:'center'
                    },
                    {
                        title: '操作',
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
                    }
                    
                    
                ],
                listStatus: [
                    // {
                    //     name: 'John Brown',
                    //     age: 18,
                    //     address: 'New York No. 1 Lake Park',
                    //     date: '2016-10-03'
                    // },
                   
                ],
                 cityList1: [
                   
                    
                ],
                 cityList2: [
                   
                    
                ],
                 cityList3: [
                   
                    
                ],
       dailistatus: [
                    {
                        value: 1,
                        label: '在职'
                    },
                    {
                        value: 2,
                        label: '离职'
                    },
                    {
                        value: 3,
                        label: '全部'
                    },
                   
                ],
                model1: '',
             
                shi:[],
                model2: '',
                model3: '',
                model4: '',    
                textarea2: '',
                textarea3: '',
                value:"",
                value2:"" ,
                searcharr:[]
  }
 },
 methods:{
    instance(type) {
      const title = "注意";
      const content = "<p>输入框值不能为空</p>";
      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: "<p>请把信息填写完整</p>"
          });
          break;
        case "success":
          this.$Modal.success({
            title: "ok",
            content: "<p>操作成功</p>"
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: "<p>内容不能为空</p>"
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: "<p>修改失败</p>"
          });
          break;
      }
    },
     show (index) {
            this.dailiedit = true
            // console.log(this.searcharr[index])
            var searchstr = this.searcharr[index]
            this.name = searchstr.aname;
            this.price = searchstr.aprice;
            this.componentname = searchstr.companyname;
            this.telephone = searchstr.aiphone;
            this.zhanghao = searchstr.aroot;
            this.password = searchstr.apassword;
            this.email = searchstr.aemail;

            //省市区状态时间
            // this.datetime = searchstr.time         
            this.daili = searchstr.atype;
            this.model1 = searchstr.asheng;
            this.change1(searchstr.asheng)
            this.change2(searchstr.ashi)
            this.change3(searchstr.aqu)
         
      },
      //状态
      changeStatus(val){
           this.daili = val;
           console.log(val)
      },
      //修改时间
      changeDate(date,time){
         console.log(date,time)
      },

    //搜索
     search(){  
       var that = this
        axios({       
                url:"http://106.14.173.50:8080/QueryByAgencyId",
                params:{}       
            })
            .then(function(data){
                that.listStatus=[]
                console.log(data.data)
               that.searcharr = data.data
                var arr = data.data;
                 for(var i in arr){
                     var arrlist = arr[i]
                     
                     var obj = {
                        aname:arrlist.aname,
                        asheng:arrlist.asheng,
                        ashi:arrlist.ashi,
                        aqu:arrlist.aqu,
                        aroot:arrlist.aroot,
                        atype:arrlist.atype==1?"在职":(arrlist.atype==2?"离职":"全部"),
                        aiphone:arrlist.aiphone,                  
                     }
                    //  console.log(obj.asheng,obj.ashi,obj.aqu)
                     //通过id找出对应的省市区名称
                     var city = that.city;  
                        for(var j in city){
                            if(obj.asheng == city[j].id){   

                            //  console.log(city[j].name)
                              obj.asheng=city[j].name
                             var shi = city[j].child
                             for(var k in shi){
                                //   console.log(obj.ashi)
                               if(obj.ashi== shi[k].id){
                                //    console.log(shi[k].name)
                                   obj.ashi = shi[k].name
                               }
                              var qu = shi[k].child
                                 for(var n in qu){
                                    if(obj.aqu== qu[n].id){
                                        // console.log(qu[n].name)
                                        obj.aqu = qu[n].name
                                    }
                                 }   
                             }
                            
                            }
                        }

                      obj.area = obj.asheng+"-"+obj.ashi+"-"+obj.aqu
                       
                     that.listStatus.push(obj)                 
                     
                 } 
                 
                //  console.log(that.listStatus)
            });
     },
     //保存修改
     saveedit(){
        var params = {
            //   apid:,
              asheng:this.model1,
              ashi:this.model2,
              aqu:this.model3,
              atype:this.daili,
              
              aemail:this.email,
              aname:this.name,
              aprice:this.price,
              companyname:this.componentname,
              aiphone:this.telephone,
              aroot:this.zhanghao,
              apassword:this.password
         }
         console.log(params)
         var that = this
        axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/updateAgency",
                params:params       
            })
            .then(function(data){
                console.log(data.data)
                if(data.data.code===1){
                     alert("修改成功")
                     window.location.reload()
                 }else{
                     alert("修改失败")
                 }              
            });
     },
     //添加代理人
     saveadd(){
         //判断为空时不能添加
         if(
             this.model1==""||
             this.model2==""||
             this.model3==""||
             this.daili==""||
             this.email==""||
             this.name==""||
             this.price==""||
             this.componentname==""|| 
             this.telephone==""||
             this.zhanghao==""||
             this.password==""           
         ){
          this.instance("info");           
         }else{
              var params = {
            //   apid:,
              asheng:this.model1,
              ashi:this.model2,
              aqu:this.model3,
              atype:this.daili,
              
              aemail:this.email,
              aname:this.name,
              aprice:this.price,
              companyname:this.componentname,
              aiphone:this.telephone,
              aroot:this.zhanghao,
              apassword:this.password
         }
         console.log(params)
         var that = this
        axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/addAgency",
                params:params       
            })
            .then(function(data){
                console.log(data.data)
                if(data.data.code===1){
                     alert("添加成功")
                     window.location.reload()
                 }              
            });
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

        //添加代理人
        addperson(){
            this.modal9=true
        }
 },
 mounted(){
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
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    table{text-align: center;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}

#wrop{
    height: 290px;width:570px;display: flex;justify-content: space-between;
    .right{width: 49%;height: 300px;border:1px dotted red;padding: 30px;background: #FFFCED;border-radius: 5px}
    .left{width: 49%;height: 300px;border:1px dotted red;padding: 30px;background: #FFFCED;border-radius: 5px
       
    }
    
}
</style>