<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">               
                    <Button type="success" size="default" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</Button>
                    <Button type="success" size="default" >&nbsp;&nbsp;选择产品&nbsp;&nbsp;</Button>
                    <Button style="background:gray;color:#fff" size="default"  >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</Button>
                    <Button style="background:gray;color:#fff" size="default"  >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</Button>
                </Breadcrumb>
                
               <Card style="height: 85vh;border:1px solid green">
                    <div style="height: 80vh;border:1px solid blue;overflow:auto">
                        <div class="select">
                            <Select v-model="model1" style="width:200px" :label-in-value="true" @on-change="v=>{ setOption(v,'type')}" size="default" placeholder="调查产品类别">
                                <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <br/> <br/>
                            <div id="wrop">
                               <Tree :data="data2" show-checkbox size="large" @on-check-change="checkChange" height="400"></Tree>

                            </div>
                            
                        </div>
                        <div class=" btnse">
                                
                                <!-- <Button type="error">取消</Button> -->
                                <Button type="success" @click="tobase" size="small">上一步</Button>
                                <Button type="success" @click="tobmess" size="small">下一步</Button>
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
const qs = require('qs');
import {getRequest, deleteRequest} from '../../../../utils/api.js'
import ports from "../../../../assets/js/ports"

export default {
  name: 'Addjia',
  data () {
    return {
        portA: ports.a,
        portB: ports.b, 
        options:[],
        checkarr:[],
        data2: [
                    // {
                    //     title: 'parent 1',
                    //     expand: true,
                    //     children: [
                    //         {
                    //             title: 'parent 1-1',
                    //             expand: true,
                    //             children: [
                    //                 {
                    //                     title: 'leaf 1-1-1'
                    //                 },
                    //                 {
                    //                     title: 'leaf 1-1-2'
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             title: 'parent 1-2',
                    //             expand: true,
                    //             children: [
                    //                 {
                    //                     title: 'leaf 1-2-1'
                    //                 },
                    //                 {
                    //                     title: 'leaf 1-2-1'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }
                ],
        select:"",
        productname:"",
        sortnum:"",
        single: false,
        value6:"",
        activeName: 'first',
        
        cityList: [
                    // {
                    //     value: 'New York',
                    //     label: 'New York'
                    // },
                    
                ],
                model1: '',
      
        fileList: []
  }
 },
  methods: {
      //选择框
       change(val){
          console.log(val)
          this.select=val    
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
      tobase(){     
          this.$router.push("/base")
      },
      //下一步
       tobmess(){
            let that = this;
            let checkarr = that.checkarr;
            // let aa = JSON.stringify(checkarr);
            // let obj = "{pid: 1,pname:洗发水系列,id: 1},{pid: 1,pname:洗发水系列,id: 1},{pid: 1,pname:洗发水系列,id: 1}"
             var newarr = []
             
              for(let i in checkarr){
                  if(checkarr[i].children==null||checkarr[i].children.length==0){
                   let obj = {}
                    obj.pid = checkarr[i].pid;
                    obj.ptid = checkarr[i].ptid;
                    obj.sid = checkarr[i].sid;
                    obj.pname = checkarr[i].pname;
                    obj.tiaoxingma = checkarr[i].tiaoxingma                            
                    newarr.push(obj)
                  }
                }
                console.log(newarr)
             var str =JSON.stringify(newarr) 
             

             str = str.replace(/\[|]/g,'')
           
            let params = {productvo:str}
            //  console.log("str")
                if(str==""){
                     alert("请选择产品再进行下一步")
                }else{                                       
                    axios({
                        method:"post",
                        url:that.portA+"saveproduct",         
                        params:params         
                    })
                    .then(function(data){
                        console.log(data.data) 
                        if(data.data.code==1){
                            that.$router.push("/mess")
                        }else{
                            alert("保存失败，请重新选择产品")
                        }
                    
                    })
                }
               

      },
      setOption(val){
        //  console.log(val.value)
                let that = this;
                let params = {
                    column1:val.value
                }
                // console.log(params)
                axios({
                    url:that.portA+"QueryByProduct",         
                    params:params           
                })
                .then(function(data){
                    // console.log(data.data) 
                    let arr = data.data;
                    for(let i in arr){
                       arr[i].title = arr[i].pname;
                       arr[i].expand = false;
                       let second = arr[i].children
               
                        for(let j in second){
                             second[j].title = second[j].pname;
                             second[j].expand = false
                             let third = second[j].children;    
                             
                             for(let k in third){
                                 third[k].title = third[k].pname;
                                 third[k].expand = false
                             }
                        }
                    }
                    that.data2 = arr
                   console.log(arr)
               
                })
      },
      checkChange(arr){
          console.log(arr)
          this.checkarr = arr
      }
   
       
  },
  mounted(){
       let that = this;
      
       //调研产品类别
            	                                                                           
            axios({               
                url:that.portA+"QueryByTypes",                    
            })
            .then(function(data){
                 console.log(data.data)       
                let arr = data.data;
                for(let i in arr){
                      let obj={value:arr[i].tid,label:arr[i].tname}
                       that.options.push(obj)
                }
              
            })
           document.title="选择产品"


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .select{width: 100%;height: 90%;background: #F5F7F9;padding:30px;}
     .btnse{width: 180px;height: 25px;display: flex;justify-content: space-between;padding-left:50px;margin: 0}
     #wrop{width: 100%;height: 90%;overflow: auto;}
</style>