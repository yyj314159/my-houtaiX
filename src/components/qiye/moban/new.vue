<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="backtomoban">返&nbsp;回</el-button>
                    <!-- <el-button type="success" size="small" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '正在保存' : '保存' }}</el-button> -->
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">保存</el-button>

                    <!-- <Button type="text" >{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button> -->

                    <!-- <el-button type="danger" size="small">删&nbsp;除</el-button> -->
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="top">
                            <div class="left">
                                <div class="title"><span>配置模板信息</span></div>
                                <div class="ipt">
                                    <div class="first">
                                        <Select v-model="proType" style="width:210px" placeholder="项目类型" size="default">
                                            <Option v-for="item in jiaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <!-- <Select v-model="model1" style="width:210px" placeholder="模板名称" size="default">
                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select> -->
                                        <Input v-model="mobanname" placeholder="模板名称" style="width: 240px" size="default"/>
                                    </div>
                                    
                                    <Input v-model="value5" type="textarea" placeholder="备注信息" size="default" style="width:500px"/>
                                    <div class="pinpai">
                                          <Select v-model="bibei" style="width:300px;margin-top:10px" placeholder="必备品牌" size="default" :multiple=true @on-change="duoXuanChange">
                                             <Option v-for="item in mastList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                          </Select>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="right"> 
                                <div class="title"><span>导入模板</span></div>
                                <div class="ipt2"> 
                                    <el-button type="info" size="small" class="load" @click="DownloadExcel">下载清单模板</el-button>
                                    <!-- <Button type="success" size="small" @click="DownloadExcel">下载清单模板</Button> -->
                                    <div class="shangchuan load">
                                       <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="http://106.14.173.50:8080/getHapu"
                                        :on-preview="handlePreview"
                                        :before-upload="beforeUpload"  
                                        :on-error = "error"
                                        :on-success="successResave"
                                        :data="uploadData"    
                                        :on-remove="handleRemove"
                                        :file-list="fileList"
                                        :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">请选取 Excel 文件</el-button>
                                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                        </el-upload>
                                        
                                    </div> 
                                    
                                </div>                              

                            </div>
                            
                        </div>
                        <!-- <div>
                            <div class="title2"><span>算分标准</span></div>
                            <div class="xia">

                            </div>
                        </div> -->
                        
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"
import Axios from 'axios';
// import {getRequest, deleteRequest} from '../../../utils/api'
export default {
  name: 'New',
  data () {
    return {
        fileList: [],
        uploadData:null,
        file: null,
        loadingStatus: false,
        bibei:"",
       mustchecks:"",
       mastList:[],
       proType:"",
       mobanname:"",
       value: '',
       jiaList:[
            {
                value: 1,
                label: '家化'
            },
            {
                value: 2,
                label: '時效'
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
                    
                ],
                model1: '',
                value5: '',
  }
 },
 methods:{

     beforeUpload (file) {
          
          var must = this.bibei.join(",")
          this.uploadData = {dstype:this.proType,name:this.mobanname,dsmark:this.value5,pid:must};

            let promise = new Promise((resolve) => {
                this.$nextTick(function () {
                    resolve(true);
                });
            });
            return promise; //通过返回一个promis对象解决

     },
     upload () {
         this.loadingStatus = true;
         this.handleUpload ()
      
        
     },
      submitUpload() {
          if( this.proType==""||this.mobanname==""||this.value5==""||this.bibei==""){
              alert("请填写完整配置模板信息")
          }else{
            this.$refs.upload.submit();
          }
       
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
     backtomoban(){
         this.$router.go(-1)
     },
     //上传成功钩子
     successResave(response, file, fileList){
           console.log(response)
           if(response.code==10000){
              alert("保存成功")  
               this.proType="";
               this.mobanname="";
               this.value5="";
               this.bibei="";
           }
     },
    //失败钩子
     error(response, file, fileList){
           console.log(response)
     },

     //多选
         duoXuanChange(val){
           console.log(val)
           this.editpro = val.join(",")
         },
       DownloadExcel(){
        //    console.log("000")
        //    var id = 1
        //    window.location.href="http://106.14.173.50:8080/creatExcelJiaHua?id="+ id;
           var that = this;
            axios({               
                url:"http://106.14.173.50:8080/creatExcelJiaHua",   
                params:{id:1}                 
            })
            .then(function(data){
                // console.log(data.data)       
               
            })
       }  
     
 },
 mounted(){
           //必备
           var that = this;
            axios({               
                url:"http://106.14.173.50:8080/queryBySubleveproductAll",                    
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                for(var i in arr){
                      var obj={value:arr[i].sid,label:arr[i].sname}
                       that.mastList.push(obj)
                }
              
            })
           document.title="添加模板"


    //    getRequest('queryBySubleveproductAll', {
           
    //     },
    //     function (res) {
    //         console.log("2222222222222222222222222222222")
    //         console.log(res)
    //     },
    //     function (errcode, errmsg) {
    //         console.log(errcode,errmsg)
    //     })
    
    // this.getAxios("/queryBySubleveproductAll",{

    // }).then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })



 
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.top{
    width: 100%;height: 200px;
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 0 0 10px;display: flex;justify-content: space-between;}
    .left{width: 100%;height:100%;background: #F5F7F9; }
    .ipt{padding-left: 10px;}
    .ipt2{width: 600px;padding-left: 10px;display: flex;justify-content: space-between;}
    .right{width: 100%;height:300px;background: #F5F7F9;padding-left: 10px ;margin-top: 20px;
         .shangchuan{width: 100%;display: flex;justify-content: space-between;margin-top: 20px;}
         .load{margin: 20px 50px}
    }
    .first{display: flex;justify-content: space-between;margin:10px 0;width: 500px}    
    .pinpai{display: flex;justify-content:space-between;margin-top: 10px;
        .file{width: 50%;}
    }
}
.title2{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 0 0 10px;margin: 10px 0}
.xia{
    width: 100%;height: 350px;border: 1px solid red;
}
</style>