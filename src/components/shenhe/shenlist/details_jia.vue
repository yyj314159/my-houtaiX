<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '6px 0'}">
                    
                    <Button style="background:gray;color:#fff" size="small" @click="tolist()">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</Button>
                    
                </Breadcrumb>
               <Card style="height: 85vh;">
                    <div style="height: 80vh;overflow:auto">
                        <div class="wrop">
                             <div class="left">
                                 <div class="title"><span>审核数据</span></div>
                                 <div class="tab">
                                       
                                            <!-- <div class="el-card box-card table_container">     -->
                                                <!-- <div class="el-card__header">
                                                    <div class="header clearfix"> 
                                                        <span>{{ title }}</span>
                                                        <el-button size="small" type="primary" @click="onEdit" class="btn_right" v-if="!isShow">编辑
                                                        </el-button>
                                                        <el-button size="small" type="primary" @click="onComplete" class="btn_right"  v-if="isFinish">完成
                                                        </el-button>
                                                    </div>
                                                </div> -->
                                                <!-- <div class="el-card__body"> -->
                                                    <table class="gridtable" border="1" width="100%" height="100%" cellspacing="0" style="text-align:center">
                                                        <thead>
                                                            <tr>
                                                               
                                                                <tr>
                                                                    <th colspan="3" rowspan="2">基础数据</th>
                                                                    <th colspan="2">上传数据</th>
                                                                    <th colspan="2">一审修改</th>
                                                                    <th colspan="2">二审修改</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>铺货</th>
                                                                    <th>价格</th>
                                                                    <th>铺货</th>
                                                                    <th>价格</th>
                                                                    <th>铺货</th>
                                                                    <th>价格</th>                                           
                                                                </tr>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="item in arr" :key="item.id">
                                                               
                                                                <td >{{ item.pname }}</td>                                                              
                                                                <td class="w">
                                                                    {{ item.ptname }}
                                                                    <!-- <el-input v-model="item.ptname"  v-if="isShow"></el-input>
                                                                     <span v-else> {{ item.ptname }}</span> -->
                                                                   
                                                                </td>
                                                                <td class="w" >{{ item.sname }}</td>
                                                                <td class="w">{{ item.shopassiscount }}</td>
                                                                <td class="w">{{ item.price }}</td>
                                                                <td class="w">{{ item.mdffinstascount }}</td>
                                                                <td class="w">{{ item.mdffinstprice}}</td>
                                                                <td class="w">{{ item.mdfsinstascount}}</td>
                                                                <td class="w">{{ item.mdfsinstprice}}</td>
                                                               
                                                            </tr>
                                                           
                                                            
                                                        
                                                            <tr> 
                                                                <th colspan="3" rowspan="2">其他数据</th>
                                                                <th colspan="2">上传数据</th>
                                                                <th colspan="2">一审修改</th>
                                                                <th colspan="2">二审修改</th>
                                                            </tr>
                                                            <tr>
                                                                <th colspan="2">反馈</th>
                                                                <th colspan="2">反馈</th>
                                                                <th colspan="2">反馈</th>                                                                                                     
                                                            </tr>
                                                            <tr v-for="item in arr2" :key="item.id">
                                                                <td colspan="3">{{ item.otherdata }}</td>
                                                                <td colspan="2">{{ item.feedback }}</td>
                                                                <td colspan="2">{{ item.modifyfinstdata }}</td>
                                                                <td colspan="2">{{ item.modifysinstdata }}</td>
                                                            </tr>
                                                            </tbody>
                                                    </table>
                                                             
                                                <!-- </div> -->
                                            <!-- </div> -->
                                        
                                 

                                
                                


                                 </div>
                            </div>
                            <div class="right">
                                <div class="top">
                                    <div class="title"><span>访问资料</span><Button type="success" size="small">下载资料</Button></div>
                                    <ul >
                                         
                                             <li v-for="item in img" :key="item.id">
                                                 <div class="image">
                                                   <img :src="`http://106.14.173.50:8888/`+item.photo" alt="" class="tupian">
                                                 </div>
                                                 <div class="font" >
                                                    <p>类型：{{item.type}}</p>
                                                    <p>归类：{{item.classify}}</p>
                                                    <p>经度：{{item.longitude}}</p>
                                                    <p>维度：{{item.latitude}}</p>
                                                    <p>拍摄时间：{{item.shoottime}}</p>
                                                    <p>问题类型：{{item.problemtypes}}</p>
                                                   
                                                 </div>
                                             </li>
                                            
                                         
                                    </ul>
                                </div>
                                <div class="xia">
                                     <div class="title"><span>访问资料</span></div>
                                     <ul >
                                          <li v-for="(item,i) in audio" :key="item.id">
                                              <div class="zuo" :style="video">{{item.recordname2}}</div>
                                              <div class="zhong">{{item.startrecordtime}}-{{item.endrecordtime}}</div>
                                              <div class="you">
                                                  <p @click="audioclk(i)">播放录音</p>
                                                  <p @click="wenzi(i)">文字转换</p>
                                                   <Modal
                                                        title="文字"
                                                        width="400px"
                                                        v-model="fonttrans"
                                                        :styles="{top: '100px'}">
                                                       <div style="width:370px;height:100px;overflow:auto">
                                                            <!-- <Input v-model="value6" type="textarea" :rows="4" placeholder="文字转换内容" /> -->
                                                            {{str}}
                                                       </div>
                                                    </Modal>
                                              </div>
                                          </li>
                                          
                                     </ul>
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
 import logo from "../../../../src/assets/logo.png"
 import $ from "jquery"
 import axios from "axios"

export default {
  name: 'Details_jia',
  data () {
    return {
        str:"",
      fonttrans:false,
       arr:[],
       arr2:[],
       img:[],
       audio:[],
       logo:logo,
       video:{
          backgroundImage: "url(" + require("../../../../src/assets/img/test/video.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPosition:"left "
      },
      title:'风险评估',
                isShow:false,
                isFinish:false,
                tableData: [
//                 
                    {
                        id:1,
                        pname: '高夫金典保湿666',
                        ptname: '金典保湿磨砂洁面泥',
                        sname: '120g',
                        nowManage: '3.2',
                        shopassiscount:"铺货1",
                        price:"1000元",
                        mdffinstascount:"铺货1",
                        mdffinstprice:"1000元",
                        mdfsinstascount:"铺货1",
                        mdfsinstprice:"1000元",
//                      Hidden: '是',
//                      Total:'0',
//                      remark:'222'
                    },
                    {
                        id:2,
                        pname: '高夫金典保湿666',
                        ptname: '金典保湿磨砂洁面泥',
                        sname: '120g',
                        nowManage: '3.2',
                        shopassiscount:"铺货2",
                        price:"1000元",
                        mdffinstascount:"铺货1",
                        mdffinstprice:"1000元",
                        mdfsinstascount:"铺货1",
                        mdfsinstprice:"1000元",
//                      Hidden: '是',
//                      Total:'0',
//                      remark:'222'
                    },
                    {
                        id:3,
                        pname: '高夫金典保湿666',
                        ptname: '金典保湿磨砂洁面泥',
                        sname: '120g',
                        nowManage: '3.2',
                        shopassiscount:"铺货3",
                        price:"1000元",
                        mdffinstascount:"铺货1",
                        mdffinstprice:"1000元",
                        mdfsinstascount:"铺货1",
                        mdfsinstprice:"1000元",
//                      Hidden: '是',
//                      Total:'0',
//                      remark:'222'
                    }
                ]

    }
   
 
   },
    created() {
            this.getData(this.tableData);
    },
    methods:{
        onEdit(){
                this.isShow = true
                this.isFinish=true
            },
            onComplete(){
                this.isShow = false
                this.isFinish=false
            },
            getData(list){
                //console.log(list[0]);
                for ( let field in list[0]) {
                    var k = 0;
                    while (k < list.length) {
                        list[k][field + 'span'] = 1;
                        list[k][field + 'dis'] = false;
                        for (var i = k + 1; i <= list.length - 1; i++) {
                            if (list[k][field] == list[i][field] && list[k][field] != '') {
                                list[k][field + 'span']++;
                                list[k][field + 'dis'] = false;
                                list[i][field + 'span'] = 1;
                                list[i][field + 'dis'] = true;
                            } else {
                                break;
                            }
                        }
                        k = i;
                    }
                }
                return list;
            },
        tolist(){
           this.$router.go(-1)
        },
        audioclk(i){
           console.log(i)
           var aaa = this.audio[i].recordname
           window.location.href="http://106.14.173.50:8888/"+ aaa
           
        },
        //文字转换
        wenzi(i){
            console.log(i)
            this.fonttrans = true
            var that = this;
            var params = {pcm:that.audio[i].recordname}
            console.log(params)
        axios({               
                url:"http://106.14.173.50:8080/speechRecognition",    
                params:params    
            })
            .then(function(data){
              console.log(data.data)
              var str = data.data;
              that.str = str
              
        });
        },
        getTime(nS) {
            let date = new Date(nS);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D+h+m+s;
        }
    



    },
    mounted(){
       var listid = localStorage.getItem("listid")
        console.log(listid)
        var that = this;
        axios({               
                url:"http://106.14.173.50:8080/auditdetail",    
                params:{
                    id:listid
                }            
            })
            .then(function(data){
              console.log(data.data)
               that.arr = data.data.detailsinfo.basicdata;
               var arr2 = that.arr2 = data.data.detailsinfo.sddata;
                for(var i in arr2){
                    arr2[i].feedback = arr2[i].feedback==0?arr2[i].customfield3:arr2[i].customfield4;
                    arr2[i].modifyfinstdata = arr2[i].modifyfinstdata==0?arr2[i].customfield3:arr2[i].customfield4;
                    arr2[i].modifysinstdata = arr2[i].modifysinstdata==0?arr2[i].customfield3:arr2[i].customfield4;
                }
               var imgs = that.img = data.data.detailsinfo.imgs;
               for(var i in imgs){
                     imgs[i].type=imgs[i].type==1?"照片":(imgs[i].type==2?"视频":"录音")
                     imgs[i].classify=imgs[i].classify==1?"门头":(imgs[i].classify==2?"问题照片":"无")
                     imgs[i].problemtypes=imgs[i].problemtypes==1?"乱涂写":(imgs[i].problemtypes==2?"乱刻画":"无")
               }
               var audio = that.audio = data.data.detailsinfo.accessdata;


               for(var i in audio){
                     var index = audio[i].recordname.lastIndexOf("\/")
                     var str = audio[i].recordname.substring(index + 1, audio[i].recordname.length)
                     audio[i].recordname2 = str
                    //时间转换
                      audio[i].startrecordtime = that.getTime(audio[i].startrecordtime )
                      audio[i].endrecordtime = that.getTime(audio[i].endrecordtime )

               }
              
        });

           document.title="退回详情"

    },


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.wrop{width: 100%;height: 600px;display: flex;justify-content: space-between;
   .left{width: 55%;height: 100%; }
   .tab{width: 100%;height: 570px;border: 1px solid green;overflow: auto}
   .right{width: 44%;height: 100%;
       .top{height: 400px;width: 100%;
            
            ul{width: 100%;height: 380px;overflow: auto;border: 1px solid #000;
            // display: flex;flex-wrap:wrap;
               li{width: 100%;height: 132px;border: 1px solid red;margin: 3px;display: flex;justify-content: space-between;
                  .image{width: 130px;height: 130px;border: 1px solid blue;
                     img{width: 130px;height: 130px;}
                  }
                  .font{width: 100%;height: 200px;font-size: 12px;font-weight: bold;padding-left: 15px;
                       p{margin-top:2px;font-weight: bold}
                  }
               }
             }
        }
       .xia{height: 180px;width: 100%;border: 1px solid #000;margin-top:20px;overflow: auto;
             ul{width: 100%;}
             li{width: 100%;height: 49px;border: 1px solid #000;display: flex;justify-content: space-between;
               .zuo{width: 20%;height: 49px;border: 1px solid green;text-align: center;line-height: 49px;padding-left: 30px;font-size:12px;overflow: hidden;}
               .zhong{width: 60%;height: 49px;border: 1px solid green;font-size:12px;text-align: center;line-height: 49px}
               .you{width: 20%;height: 49px;border: 1px solid green;cursor: pointer;
                   p{width: 100%;height: 22px;background: #5BB85D;color:#fff;border-radius: 2px;text-align: center;font-size: 12px;line-height: 22px}
                   p:nth-child(2){margin-top: 2px}
               }
             }
       }
   }
}

.title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center;
       
}
 .tupian{width: 100px;height: 100px; }
    
</style>