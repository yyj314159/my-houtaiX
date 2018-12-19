<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <Button type="success" size="default">基本信息</Button>
                  
                    <Button style="background:gray;color:#fff" size="default">&nbsp;&nbsp;导入信息&nbsp;&nbsp;</Button>
                    <Button style="background:gray;color:#fff" size="default">&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</Button>
                </Breadcrumb>

                <Card style="height: 85vh;">
                            <div style="height: 80vh;overflow:auto">
                                  <div class="shang">
                                      <div class="left">
                                          <div class="ipt">
                                               <Select v-model="model" style="width:250px" placeholder="项目类别" @on-change="change" size="default">
                                                    <Option v-for="item in xmlb" :value="item.value"  label-in-value='true' :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                               <Select v-model="model2" style="width:250px" placeholder="产品类别" @on-change="changeleibie" size="default">
                                                    <Option v-for="item in product" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                          <div class="ipt">
                                              <Input v-model="value" placeholder="项目名称" style="width: 250px" size="default"/>
                                              <Input v-model="bianhao" placeholder="项目编号" style="width: 250px" size="default"/>
                                          </div>
                                          <div class="ipt ipt1">
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="调查日期" @on-change="startdate" size="default" ></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="截止日期" size="default" @on-change="handleChange2"></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="预警日期" size="default" @on-change="handleChange3"></DatePicker>
                                              </Col>
                                          </div>
                                          <div class="ipt">
                                              <Select v-model="dname" style="width:250px" placeholder="调研产品类别" size="default" @on-change="protype">
                                                    <Option v-for="item in diaoyan" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                               <Select v-model="sname" style="width:250px" placeholder="选择项目模板" size="default" @on-change="selmoban">
                                                    <Option v-for="item in select" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                      </div>
                                      <div class="right">
                                          <div class="title"><span>调用以往项目信息</span></div>
                                          <div class="center">
                                              <div class="center2">
                                                  <Input v-model="proname" placeholder="项目名称" style="width: 200px" size="default"/>
                                                   <Input v-model="pronum" placeholder="项目编号" style="width: 200px;margin:10px 0"  size="default"/>
                                                   <Button class="btn"  @click="jiance">检测</Button>
                                              </div>
                                              
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="xia">
                                       <div class="title"><span>以往项目信息</span></div>
                                             <Button type="primary" @click="handleSelectAll(true);" size="small">全选</Button>
                                             <Button type="primary" @click="handleSelectAll(false)" size="small">取消</Button>
                                             <Button type="success" size="small" @click="kejian">可见</Button>
                                       <div class="tab">                                       
                                           
                                             <Table height="330" border ref="selection" :columns="columns4" :data="data1" size="small" @on-select="selects" @on-select-all="selectall"></Table>
                                             
                                       </div>
                                       <div class="but">                                         
                                                    <div class="btncen">
                                                        <!-- <Button type="error" size="small">取消</Button>&nbsp;&nbsp; -->
                                                        <!-- <Button type="success" size="small" @click="save1">保存</Button>&nbsp;&nbsp; -->
                                                        <Button type="success"  @click="save1" size="small">下一步</Button>  
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
import ports from "../../../../assets/js/ports"

export default {
  name: 'Addshi',
  inject:["reload"],
  data () {
    return {
        portA: ports.a,
        portB: ports.b,    
         str:"",
         str1:"",
        arr:[],
        dname:"",
        sname:"",
        srarttime:"",
        endtime:"",
        waringtime:"",
        bianhao:"110", //项目编号
        pageTotal: 10,
        pageNum: 1,
        pageSize: 3,

        //检测
        proname:"上海调研",
        pronum:"",
        columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                       
                    },
                    {
                        title: '区',
                        key: 'region',
                        align: 'center',
                    },
                    {
                        title: '调研对象',
                        key: 'hpobj',
                        align: 'center',
                    },
                    {
                        title: '照片类型',
                        key: 'questionphoto',
                        align: 'center',
                    },
                     {
                        title: '是否可见',
                        key: 'iswatch',
                        align: 'center',
                    },
                     {
                        title: '操作',
                        key: 'action',
                        align: 'center',
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
                                }, '是否可见'),
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
                                // }, '不可见')
                            ]);
                        }
                    
                    }
                ],
                data1: [
                   
                    //  {
                    //     name: 'John Brown',
                    //     diaoyan: 18,
                    //     pic: 'New York ',
                       
                    //     Action:""
                    // },
                    // {
                    //     name: 'Jim Green',
                    //     diaoyan: 24,
                    //     pic: 'London ',
                        
                    //     Action:""
                    // },
                    
                   
                ],
                dataArr : [],
       
       dataValue: null,
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
        xmlb: [
                    {
                        value: 1,
                        label: '家化'
                    },
                     {
                        value: 2,
                        label: '时效'
                    },
                    
                ],

        product:[   ],  

        diaoyan:[

        ] ,      
        select:[],       
          model: '',
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                     {
                        value: 'New k',
                        label: 'New York2'
                    },
                    
                ],

        model1: '',
        model2: '',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  }
 },
  methods: {
      
      //产品类别选择
      changeleibie(val){
           this.model2 = val
           var that = this;
        //    console.log(val)
        //    axios({               
        //         url:"that.portA+pdtype",
        //         params: {pid:val}                        
        //     })
        //     .then(function(data){
        //         // console.log(data.data)  
        //          var arr = data.data;
        //          var newarr=[]
        //         for(var i in arr){
        //             // console.log(i,arr[i])
        //             var obj = {
        //                 value:i,
        //                 label:arr[i]
        //             }
        //             newarr.push(obj)
        //         }
        //         that.diaoyan=newarr;
        //         // console.log(that.diaoyan)
        //     })      
      },
      show (index) {
               
                var id= this.data1[index].id;
                console.log(id)
                var visible= this.data1[index].visible                             
                var isnum = visible===0?1:0;              
            //    alert(isnum)
                var that = this;
                axios({      
                    method:"post",             
                    url:that.portA+"visible",
                    params: {rids:id,type:isnum}                        
                })
                .then(function(data){
                    console.log(data.data)  
                    if(data.data.code==1){
                        // alert("修改成功")
                        that.reload()
                    }
                })      
            },
        //可见批量
        kejian(){
              
                var that = this;
                axios({      
                    method:"post",             
                    url:that.portA+"visible",
                    params: {rids:this.str,type:1}                        
                })
                .then(function(data){
                    console.log(data.data)  
                    if(data.data.code==1){
                        // alert("修改成功")
                        that.reload()
                    }
                })      
        },

      //单选
        selects(a,b){
           
           var arr = []
           var arr1 = []
           for(var i in a){
               var str = a[i].id;
               var str1 = a[i].visible;
                arr.push(str)  
                arr1.push(str1)                          
               console.log(str1)
           }

          this.str = String(arr.join(','))
          this.str1 = String(arr1.join(','))

          console.log(this.str,this.str1)
        },
      //全选
        selectall(a,b){
           console.log(a)
           var arr = []
           var arr1 = []
           for(var i in a){
               var str = a[i].id;
               var str1 = a[i].visible;
                arr.push(str)  
                arr1.push(str1)                          
               console.log(str1)
           }

          this.str = String(arr.join(','))
          this.str1 = String(arr1.join(','))
        },
       handleSelectAll(status){
                var aaa = this.$refs.selection.selectAll(status);
                // console.log(status,aaa)
        },
       change(val){
          console.log(val)
          this.model = val
          if(val===2){
              this.$router.push("/base1")
          }else{
              this.$router.push("/base")
          }        
       },
       //选择项目模板
       selmoban(val){
          this.sname = val;
       },
     
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //头部导航
      
       toselect(){
           
      },
      //日期改变的函数
         startdate(daterange) {
            this.srarttime = daterange;
            console.log(daterange)
        },
         handleChange2(daterange) {
            this.endtime = daterange;
            console.log(daterange)
        },
         handleChange3(daterange) {
            this.waringtime = daterange;
            console.log(daterange)
        },
        //调研产品类别  
        protype(val){
           this.dname = val
        //    console.log(val)
        },

     //检测
        jiance(){
            var that = this;
            var params = {pjname:that.proname,pjnum:that.pronum}
            // console.log(params)
            axios({ 
                url:that.portA+"pastProj",
                params:params
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data
                var productmessage = arr.hprj;
                var list = arr.robj;
             
                that.model = productmessage.pjtype;
                that.model2 = productmessage.pdtype;
                that.changeleibie(productmessage.pdtype)
                
                that.value = productmessage.pjname;
                that.bianhao = productmessage.pjnum;
              
                that.protype(String(productmessage.rpdtype))
               
                that.sname = String(productmessage.ptmp);
                // console.log(list)
                //表格
                for(var i in list){
                    // console.log(list[i].visible==0)
                    var str=list[i].visible?"是":"否"
                
                    list[i].iswatch=str;
                }
                // console.log(list)
                that.data1=list;

                
                       
            })
        },
        save1(){
             this.$router.push("/Dao")
            
            var that = this;
            if(that.model&&that.model2&&that.value&&that.bianhao&&that.srarttime&&that.endtime&&that.waringtime&&that.dname&&that.sname){        
                // 也很简单
                var strtime = that.srarttime;
                var endtime = that.endtime;
                var waringtime = that.waringtime;
                var date1 = new Date(strtime);
                var date2 = new Date(endtime); 
                var date3 = new Date(waringtime);  
                //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
                // 可以这样做
                var date1 = new Date(strtime.replace(/-/g, '/'));
                var date2 = new Date(endtime.replace(/-/g, '/'));
                var date3 = new Date(waringtime.replace(/-/g, '/'));
                
                // 有三种方式获取，在后面会讲到三种方式的区别
                var time1 = date1.getTime();
                var time2 = date2.valueOf();
                var time3 = Date.parse(date3);
                // console.log(time1,time2,time3)
                var params= {
                    pjtype:that.model,
                    pdtype:that.model2,
                    pjname:that.value,
                    pjnum:that.bianhao,
                    sdate:time1,
                    edate:time2,
                    wdate:time3,
                    rpdtype:that.dname,
                    ptmp:that.sname,                 
                }
                // that.portA+
                console.log(params)
                axios({
                    method:"post",
                    url:"http://106.14.173.50:8080/addProj",
                    params:params
                })
                .then(function(data){            
                    var arr = data.data;
                    console.log(data.data)
                    if(data.data.code==1){
                        //  alert("保存成功")
                        that.$router.push("/Dao")
                    }else{
                        alert("保存失败")
                        
                    }
                    
                })
             }else{
                 alert("请把信息填写完整再进行下一步")
                 

             }
        },
        //分页
         handlePage(value){
           console.log(value)
           this.pageNum = value;
           var _start = ( value - 1 ) * this.pageSize;
           var _end = value * this.pageSize;
           this.dataArr = this.data1 .slice(_start,_end);
       },
      
   
  },
  mounted(){
        this.model = 2
        //  this.jiance()
         //产品类别下拉
         var that = this;           
            axios({               
                url:that.portA+"pdinfo"                          
            })
            .then(function(data){
                // console.log(data.data)  
                var arr = data.data;
                var newarr=[]
                for(var i in arr){
                    var obj = {
                        value:arr[i].pid,
                        label:arr[i].pname
                    }
                    newarr.push(obj)
                }
                that.product=newarr
            //    console.log(that.product)
            })      
        //项目目版
        axios({               
                url:that.portA+"apptemplate"                          
            })
            .then(function(data){
                // console.log(data.data)  
                var arr = data.data;
                var newarr=[]
                for(var i in arr){
                    var obj = {
                        value:i,
                        label:arr[i]
                    }
                    newarr.push(obj)
                }
                that.select=newarr
            //    console.log(that.select)
            })      
        //调研产品类别
            	 
            let url = that.portA+'QueryByTypes'
            this.httpClient.get(url).then((data)=>{

               console.log(data.data)
               var arr = data.data;
                for(var i in arr){
                      var obj={value:arr[i].tid,label:arr[i].tname}
                       that.diaoyan.push(obj)
                }
            });      


           document.title="基本信息"

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{
        width: 100%;height: 200px;display: flex;
        .left{width: 50%;height: 200px;background:#F5F7F9;margin-right: 20px;padding:0 10px;
            .ipt{width: 100%;height: 50px;display: flex;align-items: center;justify-content: space-between;;          
            }
        }
        .right{width: 37%;height: 200px;background:#F5F7F9;
        
        .center{width: 100%;height: 170px;display:flex;justify-content: center;align-items:center;
            .center2{width: 200px;height: 150px;
               .btn{width: 100px;height: 30px;background: #39435B;float: right;border: 0;color: #fff}
            }
         }
        }
    }
    .xia{width: 100%;height:45%;
       .tab{
       
       }
       .but{width: 100%;height: 35px;display: flex;justify-content: center;flex-direction:column;align-items: center;
        .fen{width: 100%;height: 0px;display: flex;justify-content: center;}
        .btncen{width: 140px;height: 25px;display: flex;justify-content: space-between;}
        }
      
    }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;margin: 5px 0}
</style>