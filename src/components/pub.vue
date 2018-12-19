<template>
  <div id="app" class="layout">
    <!-- <img src="./assets/logo.png"> -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" style="background:#39435B">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" accordion style="background:#39435B">
               
               <div class="logo" :style ="logo" >上海旭中调研系统</div>
                               
                    <Submenu name="1"  class=" gis" on-collapse="pppp">
                        <template slot="title"  @click.native="homeye">
                            <!-- <router-link to="/home" tag="span"> -->
                                <Icon type="ios-compass" />
                                旭中首页
                            <!-- </router-link> -->
                        </template>
                         <MenuItem name="2-1"  class="xmgl1 " @click.native="home">
                            旭中首页
                        </MenuItem>
                    </Submenu>
                                
                <Submenu name="2" class="isshow xmgl">
                    <template slot="title">
                        <Icon type="md-list-box" />
                        项目管理
                    </template>
                    <!-- <div @click="toaddjia()">00000</div> -->
                    <!-- <div @click="toaddjia()" style="border:1px solid red"><MenuItem name="2-1"  >添加项目</MenuItem></div> -->
                    <MenuItem name="2-1"  class="xmgl1 " @click.native="tjxm">
                        添加项目
                    </MenuItem>
                    <MenuItem name="2-2"  class="xmgl2" @click.native="xmlb">
                        项目列表               
                    </MenuItem>
                    <MenuItem name="2-3"  class="xmgl3" @click.native="xxfkui">                    
                        消息反馈 
                    </MenuItem>
                </Submenu>
               
                <Submenu name="3"  class=" gis">
                    <template slot="title">
                        <Icon type="md-pricetags" />
                        调研对象管理
                    </template>
                    <MenuItem name="3-1" class="dydx1" @click.native="dysx">
                        调研对象列表                   
                    </MenuItem>
                    <MenuItem name="3-2" class="dydx2" @click.native="gxjl">
                        更新记录                                      
                    </MenuItem>
                </Submenu>
                <Submenu name="4" class="isshow">
                    <template slot="title">
                        <Icon type="md-checkbox-outline" />
                        审核管理
                    </template>
                    
                    <MenuItem name="4-1" class="shgl1" @click.native="shapai">
                        审核安排
                    </MenuItem>    
                    <MenuItem name="4-2" class="shgl2" @click.native="shtui">
                        审核退回
                    </MenuItem>    
                    <MenuItem name="4-3" class="shgl3" @click.native="shlist">
                        审核列表
                    </MenuItem>    
                </Submenu>
               <Submenu name="5" class="isshow">
                    <template slot="title">
                        <Icon type="md-pie" />
                         门店管理
                    </template>
                    <MenuItem name="5-1" class="mdgl" @click.native="mdlist">
                        门店列表
                    </MenuItem>
                </Submenu>
                <Submenu name="6"  class="gis" id="qiye">
                    <template slot="title">                     
                            <Icon type="ios-cube" />
                            企业管理                       
                    </template>

                    
                    <MenuItem name="6-1" class="qygl1 qisshow" @click.native="mbgl">
                        模板管理
                    </MenuItem>
                       
                    <MenuItem name="6-2" class="qygl2" @click.native="yggl">
                        员工管理
                    </MenuItem>
                
                    
                    <MenuItem name="6-3" class="qygl3 qisshow" @click.native="dlgl">
                       代理管理
                       
                    </MenuItem>
                    <MenuItem name="6-4" class="qygl4 qisshow" @click.native="fwygl">
                        访问员管理
                    </MenuItem>

                    <MenuItem name="6-5" class="qygl5" @click.native="qxgl">
                       权限管理
                    </MenuItem>
                    <MenuItem name="6-6" class="qygl6" @click.native="czrz">
                        操作日志
                    </MenuItem>
                </Submenu>
                <Submenu name="7" class="isshow">
                <template slot="title">
                    <Icon type="ios-create" />
                    报告管理
                </template>
                <MenuItem name="7-1" class="bggl1" @click.native="yjbg">                  
                    业绩报告                                                                
                </MenuItem>
                <!-- <MenuItem name="7-2" class="bggl2" @click.native="bgmb">
                    报告模板
                </MenuItem>
                <MenuItem name="7-3" class="bggl3" @click.native="sxbg">
                    实效报告
                </MenuItem> -->
                <MenuItem name="7-4" class="bggl4" @click.native="jhbg">
                    家化报告
                </MenuItem>
                <!-- <MenuItem name="7-5" class="bggl5" @click.native="yscbg">
                    已生成报告
                </MenuItem>                -->
            </Submenu>
                <Submenu name="8"  class="gis">
                    <template slot="title">
                        <Icon type="md-eye" />
                        可视化管理
                    </template>
                    <MenuItem name="8-1" @click.native="qg">
                        全国区域                   
                    </MenuItem>
                    <MenuItem name="8-2" @click.native="province">
                        大省区域                   
                    </MenuItem>
                    <MenuItem name="8-3" @click.native="city">
                        城区区域                
                    </MenuItem>
                    <MenuItem name="8-4" @click.native="view">
                        可视化数据                                      
                    </MenuItem>
                    <MenuItem name="8-5" @click.native="set">
                        设置
                    </MenuItem>                   
                </Submenu>
              <Submenu name="9" class="isshow">
                    <template slot="title">
                        <Icon type="ios-contact" />
                        我的任务
                    </template>
                    <MenuItem name="9-1" class="mytask1" @click.native="xmlist">
                        项目列表                  
                    </MenuItem>
                    <MenuItem name="9-2" class="mytask2" @click.native="one">
                       一审任务                    
                    </MenuItem>
                    <MenuItem name="9-3" class="mytask3" @click.native="two">
                       二审任务                   
                    </MenuItem>
                    <MenuItem name="9-4" class="mytask4" @click.native="sfrw">
                        算分任务                                      
                    </MenuItem>
                    <MenuItem name="9-5" class="mytask5" @click.native="xxfk">
                        消息反馈                                     
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}" style="background:red;" class="head">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
               <ul class="loader">
                  <li class="username"></li>
                  <li class="zhiwei"></li>
                  <li @click="changepassword">【修改密码】</li>
                  <li @click="outloading">【退出登录】</li>
                </ul>

            </Header>
        </Layout>
        <div class="kong"></div>
        <Modal
            title="修改密码"
            width="350px"
            v-model="modal12"
             @on-ok="changeok"
            :styles="{top: '100px'}">
             <Input v-model="value" placeholder="请输入新密码" style="width: 300px" size="default"/>
        </Modal>
        <!-- <Modal v-model="modal12" draggable scrollable title="修改密码" width="240px" @on-ok="changeok" :styles="{left: '60px'}">
            
            <Input v-model="value" placeholder="请输入新密码" style="width: 200px" size="default"/>
        </Modal> -->
        <router-view/>
  </div>
</template>

<script>
import $ from "jquery"
import axios from "axios"
import {mapGetters,mapActions} from "vuex"

export default {
  name: 'Pub',
  data(){
      return{
          uid:"",
          value:"",
          modal12: false,
         logo:{
          backgroundImage: "url(" + require("../../src/assets//img/login/logo.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPosition:"5px  ",
          backgroundSize:"30px 30px"
          }
      }
  },
  methods:{
      home(){
        this.$router.push("/home")
      },
      pppp(aaa){
        // console.log(aaa+"66666666666")
      },
      homeye(){
        //  this.$router.push("/home")
        //  console.log('00000000')
      },
       xmlb(){
        this.$router.push("/listjia")
      },
       xxfkui(){
        this.$router.push("/message")
      },
       shapai(){
        this.$router.push("/shenhe")
      },
       shtui(){
        this.$router.push("/tuihui")
      },
       shlist(){
        this.$router.push("/list")
      },
       mdlist(){
        this.$router.push("/shopLists")
      },
       xmlist(){
        this.$router.push("/projectLists")
      },
       one(){
        this.$router.push("/firstInstanceLists")
      },
      two(){
        this.$router.push("/secondInstanceLists")
      },
      sfrw(){
        this.$router.push("/calculationLists")
      },
      xxfk(){
        this.$router.push("/feedBack") 
      },

      yjbg(){
        this.$router.push("/performanceReport")
      },
      bgmb(){
        this.$router.push("/reportTemplateList")
      },
      sxbg(){
        this.$router.push("/prescriptionReportList")
      },
      jhbg(){
        this.$router.push("/familyReportList")
      },
      yscbg(){
        this.$router.push("/generatedReportList")
      },

      

      tjxm(){
        this.$router.push("/base")
      },
      dysx(){
        this.$router.push("/researchObjectLists")        
      },
      gxjl(){
        this.$router.push("/updateRecordLists")    
      },
      mbgl(){
        this.$router.push("/moban")    
      },
      yggl(){
       this.$router.push("/yuangong")    
      },
      dlgl(){
       this.$router.push("/daili")    
      },
     fwygl(){
       this.$router.push("/fangwenyuan")    
      },
     qxgl(){
       this.$router.push("/quanxian")    
      },
      czrz(){
       this.$router.push("/dodata")    
      },
     qg(){
       this.$router.push("/countryVisual")    
      },
      province(){
       this.$router.push("/provinceVisual")    
      },
      city(){
       this.$router.push("/cityVisual")    
      },
     view(){
       this.$router.push("/visualData")    
      },
      set(){
       this.$router.push("/researchObjectLists")    
      },
      
      instance (type) {
                const title = '注意';
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
                            content: '<p>密码修改成功</p>'
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: '<p>修改失败</p>'
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
      changepassword(){
          this.modal12 = true
      },
      //修改密码
      changeok(){
           var that = this;
        //    console.log("000")
           axios({        
                method:"post",
                url:"http://106.14.173.50:8080/modificationUserPassword",
                params:{uid:that.uid,password:that.value}
            })
            .then(function(data){
                // console.log(data.data)
                if(data.data.msg=="修改成功"){
                    that.instance('success')
                    that.$router.push("/login")
                }else{
                    that.instance('error')
                }
            });
      },
     aaa(){
        //  console.log("222")
        // this.$router.push("/home")
     },
     toaddjia(){
        //  console.log("222")
     },
     outloading(){
         localStorage.clear()
         this.$router.push("/login?ptype=1")
         
     }
  },
  mounted(){

      function ifquan(biaoqian){
       var text = $.trim(biaoqian.text());
       var str =  localStorage.getItem('Jurisdiction')
       var arr = str.split(',')
       var num = $.inArray(text, arr);  //返回 -1则不存在

       if(num==-1){
           biaoqian.css({'display':'none'})
       }else{
           biaoqian.css({'display':'block'})
       }
       
    }
    //   console.log( localStorage.getItem('username'))
      var uid = localStorage.getItem('uid')
      this.uid = uid
      var ptypeid = localStorage.getItem('ptypeid')
    //   console.log(ptypeid)
    //   if(ptypeid==1){
           
    //             // 项目管理
    //             ifquan($(".xmgl1"))
    //             ifquan($(".xmgl2"))
    //             ifquan($(".xmgl3"))
    //             //  调研对象管理
    //             // ifquan($(".dydx1"))
    //             // ifquan($(".dydx2"))
    //             // 审核管理
    //             ifquan($(".shgl1"))
    //             ifquan($(".shgl2"))
    //             ifquan($(".shgl3"))
    //             // 门店管理mdgl
    //             ifquan($(".mdgl"))
    //             // 企业管理
    //             // ifquan($(".qygl1"))
    //             // ifquan($(".qygl2"))
    //             // ifquan($(".qygl3"))
    //             // ifquan($(".qygl4"))
    //             // ifquan($(".qygl5"))
    //             // ifquan($(".qygl6"))
    //             // 报告管理
    //             ifquan($(".bggl1"))
    //             ifquan($(".bggl2"))
    //             ifquan($(".bggl3"))
    //             ifquan($(".bggl4"))
    //             ifquan($(".bggl5"))
    //             // 我的任务
    //             ifquan($(".mytask1"))
    //             ifquan($(".mytask2"))
    //             ifquan($(".mytask3"))
    //             ifquan($(".mytask4"))
    //             ifquan($(".mytask5"))   
    //          //GIS判断   
    //          $(".isshow").css({'display':'none'})
    //          $("#qiye .qisshow").css({'display':'none'})
    //          $(".gis").css({'display':'block'})
   
    //   }




       $(".username").text("【"+localStorage.getItem('username')+"】")
       $(".zhiwei").text("【"+localStorage.getItem('job')+"】")
       if(localStorage.getItem('username')==null||localStorage.getItem('username')==""){
           this.$router.push("/login")
       };

    
    
  }
}
</script>
    
<style scoped  lang="scss">
#app {
  
        /* body,ul,li,dl,dt,dd,p,ol,h1,h2,h3,h4,h5,h6,form,img,table,fieldset,legend,menu,input,button{
          margin:0;padding:0;
          }
        ul,li,ol{list-style:none;}
        img,fieldset{border:0; }
        img{display:block;}
        a{text-decoration:none; color:#333;}
        h1,h2,h3,h4,h5,h6{font-weight:500;}
        body{ font-family:"微软雅黑";}
        input,a{outline:none;} */
  
}


.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
  .logo{
     width: 200px;height: 40px;background:#293743;color: #00ADEE;text-align: center;line-height: 40px;font-weight: 500;font-size: 14px;padding-left: 10px
  }
   ul,li,ol{list-style:none;}
.ivu-layout-header{height: 40px;}
  .loader{float:right;
           min-width: 350px;
           height: 40px;
           font-weight: bold;
           font-size: 14px;
           display: flex;
           justify-content: space-around;
           margin-right:180px;
           line-height: 40px;
       
  }
  li {cursor: pointer;}
.kong{height: 40px;width: 100%}
.head{width: 100%;height: 40px;position: fixed;top:0;left: 0;z-index: 99;}

/* 项目管理 */
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
}
  
</style>
