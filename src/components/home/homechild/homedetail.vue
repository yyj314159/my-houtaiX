<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '10px 0'}">
                    
                    <el-button type="info" size="small" @click="tohome">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>

                    <!-- <el-button type="text" @click="centerDialogVisible = true">点击打开</el-button> -->

                    
                    <!-- <Button type="info">Primary</Button> 
                    "D:\qrcode\img\2018-11-17\2018-11-17-11-5-27-780.png"
                    "D:\qrcode\img\2018-11-17\2018-11-17-11-5-27-780.png"-->
                </Breadcrumb>
                <Card >
                    <div style="height: 600px;max-width:1000px" class="wrop">
                        <div class="left">
                             <div class="tit">修改资料</div>
                             <div class="xia">
                                 <div class="row" v-for="(item,i) in shudata" :key="i" > 
                                      <div class="picwwrop" v-if="item.laoobject==null">
                                         <Button type="success" style="width:100px;height:30px;line-height:10px;margin:50px 100px">无问题</Button>
                                     </div>
                                     <div class="picwwrop" v-else>
                                         <p class="pic" style="cursor:pointer" @click="imgclickold(i)"><img :src="`http://106.14.173.50:8888/`+item.laoobject.photolao"></p>
                                         <div class="zi" >
                                             
                                             <p>类型：{{item.laoobject.type}}</p>
                                             <p>归类：{{item.laoobject.classify}}</p>
                                             <p>经纬：{{item.laoobject.longitude}},{{item.laoobject.latitude}}</p>
                                             <p>拍照时间：{{item.laoobject.latitude}}</p>
                                             <p>问题类型：{{item.laoobject.problemtypes}}</p>
                                             <p>地点备注：{{item.laoobject.placenotes}}</p>
                                             <p>问题备注：{{item.laoobject.questionnotes}}</p>
                                             <Button type="success" size="small" style="margin-left:5px;margin-top:10px" @click="dingweiold(i)">{{ifding}}</Button>
                                         </div>
                                        
                                     </div>
                                      
                                     <div class="picwwrop" v-if="item.xingobject==null">
                                         <Button type="success" style="width:100px;height:30px;line-height:10px;margin:50px 100px">暂无新问题</Button>
                                     </div>

                                      <div class="picwwrop" v-else>
                                         <p class="pic" style="cursor:pointer" @click="imgclicknew(i)"><img :src="`http://106.14.173.50:8888/`+item.xingobject.photoxin" ></p>
                                         <div class="zi">
                                             <p>类型：{{item.xingobject.type}}</p> 
                                             <p>归类：{{item.xingobject.classify}}</p>
                                             <p>经纬：{{item.xingobject.longitude}},{{item.laoobject.latitude}}</p>
                                             <p>拍照时间：{{item.xingobject.latitude}}</p>
                                             <p>问题类型：{{item.xingobject.problemtypes}}</p>
                                             <p>地点备注：{{item.xingobject.placenotes}}</p>
                                             <p>问题备注：{{item.xingobject.questionnotes}}</p>
                                             <Button type="success" size="small" style="margin-left:5px;margin-top:10px" @click="dingweinew(i)">点定位</Button>
                                         </div>
                                     </div>
                                                                        
                                 </div>
                                 <el-dialog
                                            :visible.sync="centerDialogVisible"
                                            width="65%"
                                            center>
                                            <div  class="modelwrop">
                                                <div style="width:65%;height:400px;margin:5px;position:relative" id="img">
                                                    <img style="width:100%;height:100%" :src="`http://106.14.173.50:8888/`+newpic">
                                                    <div id="leader">
                                                       <div id="left" @click="left">&lt;</div>
                                                       <div id="right" @click="right">&gt;</div>
                                                    </div>
                                                    
                                                </div>
                                                <div style="width:35%" class="you">
                                                    <div>类型：<span>{{type}}</span></div>
                                                    <div>归类：<span>{{classify}}</span></div>
                                                    <div>经度：<span>{{longitude}}</span></div>
                                                    <div>维度：<span>{{latitude}}</span></div>
                                                    <div>拍摄时间：<span>{{shoottime}}</span></div>
                                                    <div>地点备注：<span>{{placenotes}}</span></div>
                                                    <div>问题备注：<span>{{questionnotes}}</span></div>
                                                
                                                    <el-button type="success" @click="tohomeposition" class="dposition" size="small">点定位</el-button>                                              
                                                </div>

                                            </div>
                                            
                                    </el-dialog>
                                 <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                    show-elevator  show-total placement="top" @on-change="handlePage" 
                                 ></Page>

                                
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
  name: 'homeDetail',
  data () {
    return {
        ifding:"点定位",
        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
        dataArr :[],   //页面显示的数组

       centerDialogVisible: false,
       pppid:"",
       rowdatelao:[ ],
       rowdatexin:[ ],
       shudata:[],
       pic :[],
       pic2 :[],
       newpic:"",
       
       

       type:"",
       longitude:"",
       latitude:"",
       shoottime:"",
       questionnotes:"",
       placenotes:"",
       classify:"",
       phoneaaa:[],
       photoarr:[],
        i:"0",
  }
 },
  methods: {
      tohome(){
           this.$router.push("/home")     
      },
      tohomeposition(){
          this.centerDialogVisible = false;
          this.$router.push({
                name: 'homemap',
                params: {
                  id: {jing:this.longitude,wei:this.latitude}
                }
          })
      },
      open(val){
        //  console.log(val)
      },
      //定位
      dingweiold(i){
        //  console.log(i)
        var longitude = this.shudata[i].laoobject.longitude //经
        var latitude = this.shudata[i].laoobject.latitude //纬
        
        this.$router.push({
                name: 'homemap',
                params: {
                  id: {jing:longitude,wei:latitude}
                }
          })
      },
      dingweinew(i){
        //  console.log(i)
         var longitude = this.shudata[i].laoobject.longitude //经
         var latitude = this.shudata[i].laoobject.latitude //纬
        //   console.log(longitude,latitude)
        this.$router.push({
                name: 'homemap',
                params: {
                  id: {jing:longitude,wei:latitude}
                }
          })
      },
      //图片
      imgclickold(i){
        
        this.centerDialogVisible = true;
        var photo = this.shudata[i].laoobject.photo //图片
        var type = this.shudata[i].laoobject.type //归类
        var longitude = this.shudata[i].laoobject.longitude //经
        var latitude = this.shudata[i].laoobject.latitude //纬
        var shoottime = this.shudata[i].laoobject.shoottime //拍摄时间
        var questionnotes = this.shudata[i].laoobject.questionnotes //问题备注
        var placenotes = this.shudata[i].laoobject.placenotes  //地点备注
        var classify = this.shudata[i].laoobject.classify  //地点备注
        //   console.log(photo)
        //图片截取
        
        var photoarr = photo.split(',');
    
        this.pic = photoarr
        this.newpic = this.pic[0]
         console.log(this.pic)

        this.type = type
        this.longitude = longitude
        this.latitude = latitude
        this.shoottime = shoottime
        this.questionnotes = questionnotes
        this.placenotes = placenotes
        this.classify = classify
       
      },
      

      imgclicknew(i){
         this.centerDialogVisible = true;
        var photo = this.shudata[i].xingobject.photo //图片
        var type = this.shudata[i].xingobject.type //归类
        var longitude = this.shudata[i].xingobject.longitude //经
        var latitude = this.shudata[i].xingobject.latitude //纬
        var shoottime = this.shudata[i].xingobject.shoottime //拍摄时间
        var questionnotes = this.shudata[i].xingobject.questionnotes //问题备注
        var placenotes = this.shudata[i].xingobject.placenotes  //地点备注
        var classify = this.shudata[i].xingobject.classify  //地点备注

       //图片截取
        
        var photoarr = photo.split(',');
    
        this.pic = photoarr
        this.newpic = this.pic[0]
         console.log(this.pic)

        this.type = type
        this.pic = photo
        this.type = type
        this.longitude = longitude
        this.latitude = latitude
        this.shoottime = shoottime
        this.questionnotes = questionnotes
        this.placenotes = placenotes
        this.classify = classify
        // console.log(pic)
      },
      //左边轮播
       left(){ 
           var lun = this.pic;
            if(!(lun instanceof Array)){
                this.pic.split(',');
                var lun = this.pic.split(',')
            }
           
            this.i--;     
           if(this.i==-1){
               this.i=lun.length-1;
               lun[lun.length-1]
           }
           this.newpic = lun[this.i]
             
            console.log(this.i)
       },
       right(){
          var lun = this.pic;
          if(!(lun instanceof Array)){
              this.pic.split(',');
              var lun = this.pic.split(',')
          }
           
           this.i++         
           if(this.i>lun.length-1){
               this.i=0
               lun[0]
           }
           this.newpic = lun[this.i]
           console.log(this.i)
       },
     //分页
         handlePage(value){
           console.log(value)
            var that = this;
          axios({
                    url:"http://106.14.173.50:8080/queryByProjectDetails",
                    params:{apid:1,page:value}
                })
                .then(function(data){
                     console.log(data.data)   
                     that.pageTotal = data.data.totalCount;
                     that.pageSize = data.data.limit; //每页条数
                
                     that.shudata=data.data.list
                     that.dataArr = that.shudata
                       
                })

       },


  },

  mounted(){
      var obj = this.$route.params.id ;   
    //    var apid;
    //      this.pppid = apid = obj.pid
        // "/img/2018-11-21/2018-11-21-17-6-28-751.png,/img/2018-11-21/2018-11-21-17-6-28-907.png,/img/2018-11-21/2018-11-21-17-6-29-19.png"
      var xid = localStorage.getItem('apid')
    //    console.log(xid)
    //    var xid = 1
          var that = this;
          axios({
                    url:"http://106.14.173.50:8080/queryByProjectDetails",
                    params:{apid:xid,page:1}
                })
                .then(function(data){
                         console.log(data.data)   
                     that.pageTotal = data.data.totalCount;
                    //  that.pageNum = data.data.totalCount; //初始页
                     that.pageSize = data.data.limit; //每页条数
                     var arr = data.data.list
                    
                     for(var i in arr){                
                         var objxin = arr[i].xingobject;
                         for(var j in objxin){
                        //新数据
                           
                             //图片处理
                            
                            
                          objxin.photoxin= objxin.photo.split(',')[0];
                             console.log(objxin.photo.split(','))
                             //类型
                             if(objxin.type===1){
                                 objxin.type="照片"
                             }else if(objxin.type===2){
                                objxin.type="视频"
                             }else if(objxin.type===3){
                                  objxin.type="录音"
                             }
                            //归类
                            if(objxin.classify===1){
                                objxin.classify="门头凭证"
                            }else if(objxin.classify===2){
                                objxin.classify="问题凭证"
                            }
                            //问题类型
                            if(objxin.problemtypes===1){
                                objxin.problemtypes="乱涂写"
                            }else if(objxin.problemtypes===2){
                                objxin.problemtypes="乱刻画"
                            }
                            
                         }
                          //老数据
                         var objlao = arr[i].laoobject;
                         console.log(arr[1].laoobject.photo)
                          for(var j in objlao){
                       //图片处理
                            
                        //    console.log(objlao.photo)
                         objlao.photolao = objlao.photo.split(',')[0];
                        //   console.log( objlao.photolao)
                              
                             if(objlao.type===1){
                                 objlao.type="照片"
                             }else if(objlao.type===2){
                                objlao.type="视频"
                             }else if(objlao.type===3){
                                  objlao.type="录音"
                             }
                             //归类
                            if(objlao.classify===1){
                                objlao.classify="门头凭证"
                            }else if(objlao.classify===2){
                                objlao.classify="问题凭证"
                            }
                             //问题类型
                            if(objlao.problemtypes===1){
                                objlao.problemtypes="乱涂写"
                            }else if(objlao.problemtypes===2){
                                objlao.problemtypes="乱刻画"
                            }
                           
                         }
                       

                     }
                     that.shudata=arr
                    //  console.log(obj)            
                    //  console.log(that.shudata)
                     var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                     var _end = that.pageNum * that.pageSize;
                     that.dataArr = that.shudata
                        
                })
                
                document.title="首页" 
          
          

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only position: absolute;top: 0;left: 0-->
<style scoped  lang="scss">
   .wrop{
       display: flex;justify-content: space-between;
       .left{width:100%;height: 600px;overflow: auto;
       .row{width:100%;height:200px;margin:15px 0 ;display:flex;justify-content: space-between;border-bottom: 1px dotted #5BC0DE;padding-bottom:10px ;
            .picwwrop{width:50%;height: 190px;display: flex;justify-content: space-between;
                     .pic{width:50% ;height: 185px;
                         img{width:100% ;height: 185px;}
                      }
                     .zi{width: 48%;height:185px;background: #fff;font-size: 10px;box-sizing:border-box;
                        p{padding: 1px;font-weight: bold;width: 100%;height:20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
                     }
            }
         }
       }
       .xia{width: 100%;height: 570px;}
   }
    .tit{
        width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;padding-left:5px;color: #fff;
    }
    .modelwrop{display:flex;justify-content:space-between;margin:0;padding:0;
           .you{width:35%;height:350px;padding:10px;position: relative;font-weight: bold;
             
              
           }
    }
    .dposition{position: absolute;bottom: 2%;left:10px;}

      #leader{display: none;width: 100%;height: 40px;position: absolute;z-index: 888;display: flex;justify-content: space-between;text-align: center;line-height: 40px;top: 50%;font-size: 16px;font-weight: bold;color: #fff}
                #left{width: 40px;height: 40px;background:rgba($color: #000000, $alpha: .3);border-radius: 10px}
                #right{width: 40px;height: 40px;background:rgba($color: #000000, $alpha: .3);border-radius: 10px}
        


</style>