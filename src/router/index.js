

import Vue from 'vue'
import Router from 'vue-router'


//import HelloWorld from '@/components/HelloWorld'
import aaa from "../components/aaa.vue" 
//全局
 import Pub from "../components/pub.vue" 

//登录
import Login from "../components/login/login.vue" 
//首页
      import Home from "../components/home/home.vue" 
      import homeDetail from "../components/home/homechild/homedetail.vue" 
      import homemap from "../components/home/homechild/homeposition.vue" 

// 调研对象管理
    // 调研对象列表
    import researchObjectLists from "../components/researchObject/researchObjectLists.vue"
    // 调研对象列表详情页
    import researchObjectDetail from "../components/researchObject/researchObjectDetail.vue"
    //添加调研对象
    import addresearchObject from "../components/researchObject/addresearchObject.vue"
    // 最详情页面
    import mapDetails from "../components/researchObject/mapDetails.vue"
    // 更新记录
      import updateRecordLists from "../components/researchObject/updateRecordLists.vue"
    // 更新记录详情页
       import checkLists from "../components/researchObject/checkLists.vue"
//项目管理

    //添加
     import Addjia from "../components/xiangmu/add/addjia.vue" 
     import Base from "../components/xiangmu/add/addjia/base.vue" 
     import Mess from "../components/xiangmu/add/addjia/mess.vue" 
    //  import Select from "../components/xiangmu/add/addjia/select.vue" 
     import Suanfa from "../components/xiangmu/add/addjia/suanfa.vue" 

     import Addshi from "../components/xiangmu/add/addshi.vue" 
     import Base1 from "../components/xiangmu/add/addshi/base1.vue" 
     import Bian from "../components/xiangmu/add/addshi/bian.vue" 
     import Dao from "../components/xiangmu/add/addshi/dao.vue" 


    //列表
     import Listjia from "../components/xiangmu/list/listjia.vue" 
     import Listshi from "../components/xiangmu/list/listshi.vue"     
     import xm_details from "../components/xiangmu/list/xm_details.vue"  
    //消息
     import Message from "../components/xiangmu/message/message.vue"      


    

//审核管理

    //安排
     import Shenhe from "../components/shenhe/shenanpai/shenhe.vue" 
     import Anpai from "../components/shenhe/shenanpai/anpai.vue" 
     import Anpai_shi from "../components/shenhe/shenanpai/anpai_shi.vue" 
     import Shenhe_shi from "../components/shenhe/shenanpai/shenhe_shi.vue" 
     
    //列表
     import List from "../components/shenhe/shenlist/list.vue" 
     import Details_jia from "../components/shenhe/shenlist/details_jia.vue" 
     import Details_shi from "../components/shenhe/shenlist/details_shi.vue" 

       
    //退回
     import Tuihui from "../components/shenhe/shentui/tuihui.vue" 


 // 门店管理

     // 门店列表
     import shopLists from "../components/shops/shopLists.vue"
 

//企业管理

      //模板
      import Moban from "../components/qiye/moban/moban.vue" 

      import Bianji from "../components/qiye/moban/bianji.vue" 
      import appedit from "../components/qiye/moban/appedit.vue" 

      import Jiahua from "../components/qiye/moban/chakan_jia.vue" 
      import Shixiao from "../components/qiye/moban/chakan_shi.vue" 
      import Leibie from "../components/qiye/moban/leibie.vue" 
      import Change from "../components/qiye/moban/change.vue"

      //员工
      import Yuangong from "../components/qiye/yuangong/yuangong.vue" 
      import ygrecheck from "../components/qiye/yuangong/ygrecheck.vue" 

      import Addshencha from "../components/qiye/yuangong/addshencha.vue" 
      import Addrecheck from "../components/qiye/yuangong/addshen.vue" 
      //代理
      import Daili from "../components/qiye/daili/daili.vue" 
      //访问员
      import Fangwenyuan from "../components/qiye/fangwenyuan/fangwenyuan.vue" 
      //权限
      import Quanxian from "../components/qiye/quanxian/quanxian.vue" 
      //操作日志
      import Dodata from "../components/qiye/dodata/dodata.vue" 
      // 新建
      import New from "../components/qiye/moban/new.vue" 


// 报告模板

      // 业绩报告
      import performanceReport from "../components/reportManagement/performanceReport/performanceReport.vue"    
      import performanceReportAgent from "../components/reportManagement/performanceReport/agent.vue"
      import performanceReportExamine from "../components/reportManagement/performanceReport/examine.vue"
      import performanceReportVisitor from "../components/reportManagement/performanceReport/visitor.vue"
      // 报告模板
      import reportTemplateAdd from "../components/reportManagement/reportTemplate/add.vue"
      import reportTemplateEdit from "../components/reportManagement/reportTemplate/edit.vue"
      import reportTemplateList from "../components/reportManagement/reportTemplate/list.vue"
      import reportTemplateProblem from "../components/reportManagement/reportTemplate/problem.vue"

      // 时效报告
      import prescriptionReportList from "../components/reportManagement/prescriptionReport/list.vue"
      import prescriptionReportTemplate from "../components/reportManagement/prescriptionReport/template.vue"
      import prescriptionReportDetailedList from "../components/reportManagement/prescriptionReport/detailedList.vue"

      // 家化报告
      import familyReportList from "../components/reportManagement/familyReport/familyReportList.vue"
      import detailsNav from "../components/reportManagement/familyReport/detailsNav.vue"
      import customerReport from "../components/reportManagement/familyReport/customerReport.vue"
      import detailsReport from "../components/reportManagement/familyReport/detailsReport.vue"
      import districtReport from "../components/reportManagement/familyReport/districtReport.vue"
      import provinceReport from "../components/reportManagement/familyReport/provinceReport.vue"
      import salesPersonReport from "../components/reportManagement/familyReport/salesPersonReport.vue"
      import subReport from "../components/reportManagement/familyReport/subReport.vue"

      // 已生成报告
      import generatedReportList from "../components/reportManagement/generatedReport/generatedReportList.vue"


  // 可视化数据
      // 全国区域
      import countryVisual from "../components/visualData/countryVisual.vue"
      // 大省区域
      import provinceVisual from "../components/visualData/provinceVisual.vue"
      // 城区区域
      import cityVisual from "../components/visualData/cityVisual.vue"
      // 可视化数据
      import visualData from "../components/visualData/visualData.vue"     
      // 设置
      import visualSet from "../components/visualData/visualSet.vue"     

// 我的任务


      // 项目列表
      import projectLists from "../components/myTasks/projectLists/projectLists.vue"
      import projectDetail from "../components/myTasks/projectLists/projectDetail.vue"
      // 一审任务
      import firstInstanceLists from "../components/myTasks/firstInstance/firstInstanceLists.vue"
      import domestication1 from "../components/myTasks/firstInstance/domestication1.vue"
      import prescription1 from "../components/myTasks/firstInstance/prescription1.vue" 
      // 二审任务
      import secondInstanceLists from "../components/myTasks/secondInstance/secondInstanceLists.vue"
      import domestication2 from "../components/myTasks/secondInstance/domestication2.vue"
      import prescription2 from "../components/myTasks/secondInstance/prescription2.vue"

      // 算分任务
      import calculationLists from "../components/myTasks/calculation/calculationLists.vue"
      import domesticationC from "../components/myTasks/calculation/domesticationC.vue"
      import prescriptionC from "../components/myTasks/calculation/prescriptionC.vue"      
      // 消息反馈
      import feedBack from "../components/myTasks/feedBack/feedBack.vue"
      import accountError from "../components/myTasks/feedBack/accountError.vue"      





Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/login',
      component: Login
    },

    {
      path:"/pub",
      component:Pub,
          children:[
            {  
              path: '/aaa',
              component: aaa
            },
    //首页
            {  
              path: '/home',           
              component: Home
            }, 
            {  
              path: '/homedetail',
              name: 'homeDetail',
              component: homeDetail
            }, 
            {  
              path: '/homeposition',
              name:"homemap",
              component: homemap
            },     

    //项目管理

          //添加项目
            {
              path: '/addjia',
              component: Addjia
            },
            {
              path: '/base',
              component: Base
            },
            {
              path: '/mess',
              component: Mess
            },
            // {
            //   path: '/select',
            //   component: Select
            // },
            {
              path: '/suanfa',
              component: Suanfa
            },

              
            {
              path: '/addshi',
              component: Addshi
            },
            {
              path: '/base1',
              component: Base1
            },
            {
              path: '/bian',
              component: Bian
            },
            {
              path: '/dao',
              component: Dao
            },

          //项目列表
            {     
              path: '/listjia',
              component: Listjia
            },
            {     
              path: '/listshi',
              component: Listshi
            },
            {     
              path: '/xm_details',
              component: xm_details
            },
          //消息反馈
            {     
              path: '/message',
              component: Message
            },


    //调研对象
        // 调研对象列表
        {
          path: '/researchObjectLists',
          component: researchObjectLists
        },
      // 调研对象列表详情页
        {
          path: '/researchObjectDetail',
          component: researchObjectDetail
        },
      // 添加调研对象
      {
        path: '/addresearchObject',
        component: addresearchObject
      },
      // 最详情页面
      {
        path: '/mapDetails',
        component: mapDetails
      },      

    // 更新记录
        {
          path: '/updateRecordLists',
          component: updateRecordLists
        },            
      // 更新记录详情页
      {
        path: '/checkLists',
        component: checkLists
      }, 


    //审核管理

        //安排
            {
              path: '/shenhe',
              component: Shenhe
            },
            {
              path: '/anpai',
              component: Anpai
            },
            {
              path: '/anpai_shi',
              component: Anpai_shi
            },
            {
              path: '/shenhe_shi',
              component: Shenhe_shi
            },

         //退回   
            {
              path: '/tuihui',
              component: Tuihui,
             
            },
          //列表  
            {
              path: '/list',
              component: List,
             
            },
            {
              path: '/details_shi',
              component: Details_shi,
             
            },
            {
              path: '/details_jia',
              component: Details_jia,
             
            },
  //门店管理（一级）
            // 门店列表
            {
              path: '/shopLists',
              component: shopLists           
            },
                
           
        
   //企业管理
          //模板

            {
              path: '/moban',
              component: Moban,
             
            },
            {
              path: '/appedit',
              component: appedit,          
            },
            
              {
                path: '/bianji',
                component: Bianji
              },
              {
                path: '/leibie',
                component: Leibie,
               
              },
              {
                path: '/change',
                component: Change,
               
              },
           
            //查看
            {
              path: '/chakan_jia',
              component: Jiahua
            },
            {
              path: '/chakan_shi',
              component: Shixiao
            },
            //员工
            {
              path: '/yuangong',
              component: Yuangong
            },
            {
              path: '/ygrecheck',
              component: ygrecheck,
            },
            {
              path: '/addshencha',
              name: 'Addrecheck',
              component: Addshencha
            },
            {
              path: '/addshen',
              component: Addrecheck
            },
            //代理
            {
              path: '/daili',
              component: Daili
            },
          //访问员
          {
            path: '/fangwenyuan',
            component: Fangwenyuan
          },
          //权限
          {
            path: '/quanxian',
            component: Quanxian
          },
          //操作日志
          {
            path: '/dodata',
            component: Dodata
          },
          //新建
          {
            path: '/new',
            component: New
          },
          
  // 报告管理(一级)

        // 绩效报告
        {path:'/performanceReport', component:performanceReport,
          children:[
            {
              path: '/performanceReport/performanceReportAgent',
              component: performanceReportAgent
            },
            {
              path: '/performanceReport/performanceReportExamine',
              component: performanceReportExamine
            },{
              path: '/performanceReport/performanceReportVisitor',
              component: performanceReportVisitor
            },
            {path:'/performanceReport',redirect: '/performanceReport/performanceReportVisitor'}
          ]
        },
        // 报告模板
        {
          path: '/reportTemplateAdd',
          component: reportTemplateAdd
        },
        {
          path: '/reportTemplateEdit',
          component: reportTemplateEdit
        },
        {
          path: '/reportTemplateList',
          component: reportTemplateList
        },
        {
          path: '/reportTemplateProblem',
          component: reportTemplateProblem
        },
        

        // 时效报告
        {
          path: '/prescriptionReportList',
          component: prescriptionReportList
        },
        {
          path: '/prescriptionReportTemplate',
          component: prescriptionReportTemplate
        },
        {
          path: '/prescriptionReportDetailedList',
          component: prescriptionReportDetailedList
        },
        
        // 家化报告
        {
          path: '/familyReportList',
          component: familyReportList
        },
        {path:'/detailsNav', component:detailsNav,
          children:[
            {
              path: '/detailsNav/customerReport',
              component: customerReport
            },
            {
              path: '/detailsNav/detailsReport',
              component: detailsReport
            },{
              path: '/detailsNav/districtReport',
              component: districtReport
            },
            {
              path: '/detailsNav/provinceReport',
              component: provinceReport
            },
            {
              path: '/detailsNav/salesPersonReport',
              component: salesPersonReport
            },{
              path: '/detailsNav/subReport',
              component: subReport
            },
          ]
        },

        // 已生成列表
        {
          path: '/generatedReportList',
          component: generatedReportList
        },
// 可视化数据
        {
          path: '/countryVisual',
          component: countryVisual
        },
        {
          path: '/provinceVisual',
          component: provinceVisual
        },
        {
          path: '/cityVisual',
          component: cityVisual
        },
        {
          path: '/visualData',
          component: visualData
        },
        {
          path: '/visualSet',
          component: visualSet
        },

//我的任务（一级）
        // 项目列表
        {
          path: '/projectLists',
          component: projectLists
        }, 
        {
          path: '/projectDetail',
          component: projectDetail
        },      
        // 一审任务
        {
          path: '/firstInstanceLists',
          component: firstInstanceLists
        },
        {
          path: '/domestication1',
          component: domestication1
        },
        {
          path: '/prescription1',
          component: prescription1
        },
        // 二审任务
        {
          path: '/secondInstanceLists',
          component: secondInstanceLists
        },
        {
          path: '/domestication2',
          component: domestication2
        },
        {
          path: '/prescription2',
          component: prescription2
        },
        // 算分任务
        {
          path: '/calculationLists',
          component: calculationLists
        },
        {
          path: '/domesticationC',
          component: domesticationC
        },
        {
          path: '/prescriptionC',
          component: prescriptionC
        },
        // 消息反馈
        {
          path: '/feedBack',
          component: feedBack
        },
        {
          path: '/accountError',
          component: accountError
        },





         ]
    },


    
    







//默认跳转
    {
      path:"/",
      redirect:"/login?ptype=1"
    }
    
  ]
})
