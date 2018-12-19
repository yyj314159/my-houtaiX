<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="backtomoban">&nbsp;&nbsp;返回&nbsp;&nbsp;</el-button>
                    <!-- <Button type="success" @click="newadd" size="small">保存新增</Button> -->
                    <el-button type="success" size="small" @click="btn">&nbsp;&nbsp;保存修改&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 80vh;overflow:auto">
                          <div class="aaa">
                            <!-- 左边 -->
                             <div class="bbb">
                               <div class="tit">配置模板信息</div>
                               <div class="sou">
                                  <Input v-model="mname" placeholder="请输入模板名称" size="default"/> 
                                  <Select v-model="jiashi1" style="width:400px;margin-left:60px" placeholder="请选择项目类型" @on-change="jiashi" size="default">
                                        <Option v-for="item in productlei" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                               </div>
                               <el-input
                                  type="textarea"
                                  :autosize="{ minRows: 5, maxRows: 15}"
                                  placeholder="备注信息"
                                  v-model="beizhu">
                                </el-input>
                            
                             </div>
                             <!-- 右边 -->
                             <div class="bbb">
                               <div class="tit">app功能</div>
                               <div class="content">
                                  
                                  <CheckboxGroup  v-model="checked" @on-change="son">
                                     
                                      <Checkbox label="APP扫描"></Checkbox>
                                      <Checkbox label="扫描后填写价格"></Checkbox><br>
                                      <Checkbox label="app录音"></Checkbox>
                                      &nbsp;<Checkbox label="开始任务自动录音"></Checkbox>
                                      <Checkbox label="APP摄像"></Checkbox>
                                      
                                      <Checkbox label="拍照后手动定位自定义记录位置(实效)"></Checkbox>
                                      <Checkbox label="APP拍照"></Checkbox>
                                      
                                  </CheckboxGroup>

                                  <Select v-model="model2" size="small" style="width:150px;margin-top:15px" placeholder="请选择图片类型">
                                      <Option v-for="item in pictype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                               </div>
                             
                             </div>
                          </div>
                          <div class="table">
                               <div class="other">
                                   <span>app其他功能</span> 
                                   <!-- <Button type="success" @click="addtr" size="small">添加表格</Button> -->
                              </div>
                               
                               
                                <!-- 表格 -->
                            <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                            <Button @click="handleSelectAll(true)">Set all selected</Button>
                            <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
              
                             <table  border="1" width="100%"  cellspacing='0' id="tables" >
                                 
                                  <tr  style="height:20px;">
                                      <th>选择</th>                                    
                                      <th>显示名称</th>
                                      <th>选择题</th>
                                      <th>填空题</th>
                                      <th>选择值</th>
                                      <th>未选择值</th>                                     
                                  </tr>
                                
                                     <tr v-for="(item,index) in lists" :key="index">
                                        <td style="width:5%"><input type="checkbox" :value='item.apid' class="passw"/> {{item.apid}}</td>                                     
                                        <td style="width:30%"><input type="text" style="width:100%" v-model="item.apname"></td>
                                        <td style="width:5%"><input type="radio" :name="item.apid" value="1" v-model="item.optiona" class="radiocheck"/></td>
                                        <td style="width:5%"><input type="radio" :name="item.apid" value="2" v-model="item.optionb" class="radiocheck"/></td>
                                        <td style="width:10%"><input type="text" style="width:30%" v-model="item.select"></td>
                                        <td style="width:10%"><input type="text" style="width:30%" v-model="item.noval"></td>                                    
                                     </tr>
                                           
                              </table>
                            

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
import qs from 'qs'

export default {
  name: 'appedit',
  data () {
    return {
        lists:[
        //      {
        //    apid:1, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //    {
        //    apid:2, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //   {
        //    apid:3, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //    {
        //    apid:4, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //    {
        //    apid:5, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //   {
        //    apid:6, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },       
        //    {
        //    apid:7, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //    {
        //    apid:8, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //    {
        //    apid:9, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
        //    {
        //    apid:10, apname:"",select:"",noval:"",optiona:"",optionb:""                 
        //   },
          
        ],
        afid:"",
        apid:"",
        atid:"",
        animal: '',
         dan:false,
         mname:"",
         jiashi1:"",
         beizhu:"",
        productlei: [
            {
                value: 2,
                label: '实效'
            },
            {
                value: 1,
                label: '家化'
            },  
        ],
       input10: '',
       single: false,
       single1: false,
       single2: false,
       single3: false,
       pictype: [
                    {
                        value: '1',
                        label: '门头照'
                    },
                    {
                        value: '2',
                        label: '问题照片'
                    },
                    {
                        value: '3',
                        label: '货架'
                    },
                   
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         textarea2: '',
         value2:""      ,
          social: ['facebook', 'github'],
          checked: []  ,
          j:7,
    }
  },
  methods:{

       jiashi(val){
           this.jiashi1=val
           console.log(this.jiashi1)
       },
       handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
       },
       addtr(){
        //  var i = this.j++
           
        //   var str = `<tr>
        //                 <td style="width:5%"><input type="checkbox" :value='item.apid'/> ${i}</td>                                     
        //                 <td style="width:30%"><input type="text" style="width:100%" v-model="item.name"></td>
        //                 <td style="width:5%"><input type="radio" :name="item.apid" value="1" v-model="item.optiona" class="radiocheck"/></td>
        //                 <td style="width:5%"><input type="radio" :name="item.apid" value="2" v-model="item.optionb" class="radiocheck"/></td>
        //                 <td style="width:10%"><input type="text" style="width:30%" v-model="item.select"></td>
        //                 <td style="width:10%"><input type="text" style="width:30%" v-model="item.noval"></td>        
        //             </tr>`
        //   $("#tables").append(str);
      },
    //   新增
    //  newadd(){
        
    //  },
      //保存修改
      btn(){
        //表格数据
          var arr = this.lists;    
          var newarr = [];
        
          for(var i in arr){ 

                 var aa=arr[i].optiona
                 var bb=arr[i].optionb
                 var cc;             
                cc= aa==""?bb:aa
                //  console.log(cc)
              var obj = {
                  apid:arr[i].apid,   
                  apname:arr[i].apname,
                  aptype:cc,
                  optiona:arr[i].select,
                  optionb:arr[i].noval
               }
               //空值去值
              for(var k in obj){
                  if(obj[k]===""){
                     delete obj[k]
                  }
              }
              newarr.push(obj) 
              //{}截取去除
              var array = []
              for(var h in newarr){
                  if(JSON.stringify(newarr[h]) == "{}"){
                     newarr.splice(h,1)                  
                  }                  
              }
          }
           console.log(newarr)  
        
         //配置模板  
           var pname = this.mname
           var sele = this.jiashi1
           var bz = this.beizhu
         //app功能  
           var phototype = this.model2;
           this.checked.push(phototype)
           var ck = this.checked.toString()

            var str = "";
            for (let i=0;i<newarr.length;i++) {
                let a = newarr[i];
                str += JSON.stringify(a);
                if (i < newarr.length - 1)
                str += ",";
            }
             var apptemplate = JSON.stringify({atid:this.atid,atname:pname,attype:sele,atmark:bz})
             var appfunction = JSON.stringify({afid:this.afid,atmark:ck})
             var that = this;
             var params={ 
         
                    late:apptemplate,
                    tion:appfunction,
                    plist:str
                } 
                
            console.log(params)

            axios({    
                method:"post",     
                url:"http://106.14.173.50:8080/uptateAppTemplate",
                params:params
            
            })
                .then(function(data){
                    console.log(data.data)
                    if(data.data.code===10000){
                        alert("修改成功")
                        window.location.reload()
                    }
                   
                });

      },




    // 集合
      son(data){
            // console.log(data)
            if (data.length >1 || data.length===1) {                
                // this.single3 = true;
                this.checked=data
              console.log(this.checked)
            } 
            else {
                // this.single3 = false;
            }
      },
      backtomoban(){
          this.$router.push("./moban")
      },
      
       //jiashi1,
  },
  mounted(){
        var atid = localStorage.getItem('atid')
        this.atid = atid;
       console.log(atid)
        var that = this
           axios({           
                url: "http://106.14.173.50:8080/queryByDetails",
                params: {
                     atid:atid
                    }
              }).then(function(data) {
                   console.log(data.data)
                   var obj = data.data;
                   var appfunction = obj.appfunction;
                   that.afid = appfunction.afid
                   var apptemplate = obj.apptemplate;
                   var list = obj.plist
                   for(var kk in list){
                       var str = list[kk].apid
                       
                   }
                   //配置
                   that.mname = apptemplate.atname
                   that.jiashi1 = apptemplate.attype
                   that.beizhu = apptemplate.atmark

                   //app功能                  
                   var atmark = appfunction.atmark
                   var checked = atmark.split(",")
                   var arr = [];
                    checked.map(function(val, index) {
                        //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
                        if (val !== "" && val != undefined) {
                            arr.push(val);
                        }
                    });
                    // console.log(arr)
                   that.checked = arr
                   //表格
                //    console.log(list)
                   var newarr=[]
                   for(var i in list){
                       
                      var aaa =  list[i]
                      var list2 = {
                         apid:aaa.apid,
                         apname:aaa.apname,
                         select:aaa.aptype===true?"是":"否",
                         noval:aaa.aptype===false?"否":"是",
                         optiona:aaa.aptype===1?"1":"",
                         optionb:aaa.aptype===2?"2":""
                      }
                   
                  
                      newarr.push(list2)
                   }
                   
                   that.lists = newarr
                   console.log(newarr)
              });

           document.title="编辑信息"

  }
//   apid:1, apname:"",select:"",noval:"",optiona:"",optionb:""        
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    // .radio{display:flex;align-items:center;justify-content:center;
    //     input{width:15px;height:15px;}
    //  }
    .aaa{
      width: 100%;height: 230px;display:flex;justify-content:space-between;
      .bbb{
        width: 49%;height: 260px;background: #F5F7F9;
        .tit{
           width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box
        }
      }

    }

 .sou{width: 100%;height: 36px;display: flex;justify-content: space-around;margin: 15px 0;}
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.table{width: 100%;height:320px;margin-top:0px;overflow: auto;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px;display: flex;justify-content: space-between;padding: 0 10px;
          p{background: gray;padding: 0 20px;cursor: pointer;border-radius: 10px}
    }
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:5px;margin:5px 0 0 0;padding:0;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}
#tables{height: 100%;
   .passw{text-align: center;}
}

</style>
