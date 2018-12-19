<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;选择产品&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 500px">
                        <div class="suan">
                            <div class="select1">
                                <Select v-model="model1" style="width:200px" placeholder="选择算分模板" @on-change="change">
                                   <Option v-for="item in suanfen" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <!-- <Button type="success">确定</Button> -->
                            </div>
                        <div class="select1">
                            <!-- <Select v-model="model2" style="width:200px" placeholder="选择必备品牌" @on-change="change2">
                                <Option v-for="item in bibei" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> -->
                                <!-- <Checkbox v-model="single" style="margin-left:10px">必备</Checkbox> -->
                        </div>
                            
                        </div>
                        <div class="btn1 btn2">
                                <!-- <Button type="error" size="small">取消</Button> -->
                                <Button type="success" @click="tobmess()" size="small">上一步</Button>
                                <Button type="success" @click="end" size="small">完成</Button>
                                
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
  name: 'Addjia',
  data () {
    return {
        portA: ports.a,
        portB: ports.b, 
        select:"",
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
        suanfen: [
                   
                ],
                model1: '',
         bibei: [
                  
                ],
                model2: '',        
      
        fileList: []
  }
 },
  methods: {
   
      //头部导航
      
       tobmess(){
          this.$router.push("/mess")
      },
      //选择框1
       change(val){
          console.log(val)
           this.model1=val    
       },
         //选择框2
       change2(val){
          console.log(val)
           this.model2=val    
       },
       //完成
       end(){
           var that = this;
          axios({
                 method:"post",   
                 url:"http://106.14.173.50:8080/scoreCount",
                 params:{id:that.model1}
                })
                .then(function(data){
                  console.log(data.data)
                  if(data.data.code==1){
                      alert("保存成功")
                      that.$router.phsh("/base")
                  }
                //    this.$Message.success('资料保存成功');
                })    
       },
     
  },
  mounted(){
    //   that.portA+
       var that = this;
           axios({ 
                 url:"http://106.14.173.50:8080/scoreList",
                })
                .then(function(data){
                  console.log(data.data)
                  var arr = data.data
                  for(var i in arr){
                      var obj={value:arr[i].id,label:arr[i].name}
                       that.suanfen.push(obj)
                     }
                });

            
           document.title="编辑算法"

  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .suan{background: #F5F7F9;padding: 10px }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;}
    .select1{margin: 20px}
    .btn2{width: 150px;padding: 0 15px;display: flex;justify-content: space-between}
    .btn1{margin-top:10px}
</style>