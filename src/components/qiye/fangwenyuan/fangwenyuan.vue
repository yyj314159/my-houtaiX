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
                              
                                       <Select v-model="model1" style="width:100px" placeholder="省" @on-change="change1" size="default">
                                            <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="model2" style="width:100px" placeholder="市" @on-change="change2" size="default">
                                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="model3" style="width:100px" placeholder="县/区" @on-change="change3" size="default">
                                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>&nbsp;&nbsp;
                                       <Button type="success" @click="search()" size="default">搜索</Button>
                                        
                        </div>
                        <br/>
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" size="small" @click="outTable">导出表格</el-button>
                        </div>
                         <!-- 表格 -->
                         <!-- <Table border :columns="liststatus" :data="data1" ></Table> -->
                         <Table height="450" :columns="liststatus" :data="data1" border size="small"></Table>
                           
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
  name: 'Fangwenyuan',
  data () {
    return {
        cityList1: [],
         cityList2: [],
          cityList3: [],
        model1: '',       
        shi:[],
        model2: '',
        model3: '',
        model4: '',    
        city:city,
        liststatus: [
                    {
                        title: '序号',
                        key: 'id'
                    },
                    {
                        title: '省',
                        key: 'provinceid'
                    },
                    {
                        title: '市',
                        key: 'cityid'
                    },
                    {
                        title: '区',
                        key: 'district'
                    },
                     {
                        title: '用户名',
                        key: 'interviewer'
                    },
                     {
                        title: '手机号	',
                        key: 'telephone'
                    },
                     {
                        title: '性别	',
                        key: 'sex'
                    },
                     {
                        title: '已完成任务数',
                        align: 'taskcount',
                        // render: (h, params) => {
                        //     return h('div', [
                        //         h('Button', {
                        //             props: {
                        //                 type: 'primary',
                        //                 size: 'small'
                        //             },
                        //             style: {
                        //                 marginRight: '5px'
                        //             },
                        //             on: {
                        //                 click: () => {
                        //                     this.show(params.index)
                        //                 }
                        //             }
                        //         }, '编辑'),
                                
                        //     ]);
                        // }
                    },
                ],
                data1: [
                    {
                        id: 'John',
                        age: 18,
                        address: 'New ',
                        date: '2016-10-03'
                    },
                    
                    
                ],
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
                model1: '',
                textarea2: '',
                textarea3: '',
                value:"",
                value2:""      ,
  }
 },
 methods:{
     show (index) {
        this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
    },
    //搜索
    search(){
            var that = this	
            var params = {
                provinceid:that.model1,
                cityid:that.model2,
                district:that.model3
            }
            console.log(params)
            axios({               
                url:"http://106.14.173.50:8080/queryByInterviewer",
                params:params
            })
            .then(function(data){
                //  console.log(data.data)  
                 var arr = data.data;                   
                   for(var i in arr){              
                    //通过id找出对应的省市区名称
                     var city = that.city;  
                     arr[i].sex = arr[i].sex==1?"男":( arr[i].sex==2?"女":"人妖")
                        for(var j in city){
                            if(arr[i].provinceid == city[j].id){                          
                              arr[i].provinceid = city[j].name;
                                console.log(arr[i].provinceid)
                             var shi = city[j].child
                             for(var k in shi){
                                //   console.log(obj.ashi)
                               if(arr[i].cityid== shi[k].id){
                                    //  console.log(shi[k].name)
                                   arr[i].cityid = shi[k].name
                               }
                              var qu = shi[k].child
                                 for(var n in qu){
                                    if(arr[i].district== qu[n].id){
                                        // console.log(qu[n].name)
                                        arr[i].district = qu[n].name
                                    }
                                 }   
                             }
                            
                            }

                        }
                   }
                   that.data1 = arr;
                   console.log(arr)
            })
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

        //导出
        outTable(){
            let a = this.model1==""?null:this.model1;
            let b = this.model2==""?null:this.model2;
            let c = this.model3==""?null:this.model3;
        console.log(a,b,c)
            let url =
                "http://106.14.173.50:8080/InterviewersExprot?provinceid=" +
                a +
                "&cityid=" +
                b + 
                "&district=" +
                c;

               window.location.href = url;

        }
    
 },
 mounted(){
       //表格
        this.search()
        var city = this.city 
        // console.log(city)
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
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    table{text-align: center;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}
</style>