<template>
    <div class="familyReportList">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
                        <Select v-model="sortList.scorestatu" style="width:150px" placeholder="得分状态" filterable>
                            <Option v-for="(item,index) in sortLists.scorestateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Input v-model="sortList.pjname" placeholder="项目名称" style="width:150px"/>&nbsp;&nbsp;
                        <Select v-model="sortList.reportstatu" style="width:150px" placeholder="报告状态" filterable >                           
                            <Option v-for="(item,index) in sortLists.reportstatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="sortData">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>
                    </div>                
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="family" :data="familyData" size="small"></Table>
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage"/>                       
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
  name: 'familyReportList',
    data () {
        return {
            portA: ports.a,
        // 筛选框内容
            // 查询功能
            sortLists:{
                provinceLists: [],
                cityLists:[],
                districtLists: [],
                scorestateLists:["部分未计算分数","已出分数"],
                reportstatusLists:["已定稿报告","未定稿报告"]
            },
            // 点击查询按钮发送的参数 
            sortList:{scorestatu:"",pjname:"",reportstatu:""},
            // 表格数据
            family: [{title: '项目名称', align: 'center', key: 'pjname'},{title: '报告状态', align: 'center', key: 'reportstatu'},{title: '得分状态', align: 'center', key: 'scorestatu'},{title: '调研对象数量', align: 'center', key: 'projectsum'},{title: '调研产品数量', align: 'center', key: 'productsum'},                                        
                        {title: '查看详情', align: 'center', key: '详情', 
                            render: (h, params) => {
                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.show(params.row.id)
                                                }
                                            }
                                        }, '查看')
                                ])             
                            }                              
                        }
                    ],
            familyData: [],            
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]                      
        }
    },
    beforeMount(){
        document.title = "家化报告"           
    //表格信息
        this.familyReportData=[];
    // 请求列表总数据        
        var par = {}
        // 判断是不是第一次加载
        if(this.$route.query.FD == undefined){
            par = {scorestatu:"",pjname:"",reportstatu:""}
        }else{
            par = JSON.parse(JSON.stringify(this.$route.query.FD))
            this.sortList = JSON.parse(JSON.stringify(this.$route.query.FD))
        }
        var tempPar = {scorestatu:"",pjname:"",reportstatu:""};
        for (const key in tempPar) {
            if (par[key] == null || par[key] == undefined) {
                par[key] = tempPar[key];
            }
        }
        if(par.scorestatu == "已出分数"){
            par.scorestatu = 1
        }
        if(par.scorestatu == "部分未计算分数"){
            par.scorestatu = 0
        }
        if(par.reportstatu == "已定稿报告"){
            par.reportstatu = 1
        }
        if(par.reportstatu == "未定稿报告"){
            par.reportstatu = 0
        }
        let url = this.portA+this.constData.RM_FR_FRL
        let params = {page:1,...par} 
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.list;
            for(var i = 0 ; i < datas.length ; i++){
                if(datas[i].scorestatu == 1){
                    datas[i].scorestatu = "已出分数"
                }
                if(datas[i].scorestatu == 0){
                    datas[i].scorestatu = "部分未计算分数"
                } 
                if(datas[i].reportstatu == 1){
                    datas[i].reportstatu = "已定稿报告"
                }
                if(datas[i].reportstatu == 0){
                    datas[i].reportstatu = "未定稿报告"
                }   
            }
            this.familyData = datas; 
            this.dataTotal = res.data.totalCount           
        });
    },
    methods: {
        // 跳转详情页面
        show (index) {
            var condition = JSON.parse(JSON.stringify(this.sortList))
            console.log(condition)
            this.$router.push({path:"/detailsNav",query:{id:index,condition:condition}})  // 跳转到相应项目的位置
        },

    //导出表格数据
        exportData(){
            let par = JSON.parse(JSON.stringify(this.sortList))
            var tempPar = {scorestatu:"",pjname:"",reportstatu:""};
            for (const key in tempPar) {
                if (par[key] == null || par[key] == undefined) {
                    par[key] = tempPar[key];
                }
            }            
            if(par.scorestatu == "已出分数"){
                par.scorestatu = 1
            }
            if(par.scorestatu == "部分未计算分数"){
                par.scorestatu = 0
            }
            if(par.reportstatu == "已定稿报告"){
                par.reportstatu = 1
            }
            if(par.reportstatu == "未定稿报告"){
                par.reportstatu = 0
            }             

            window.location.href= this.portA+this.constData.RM_FR_FRL_Export+"?scorestatu="+par.scorestatu+"&pjname="+par.pjname+"&reportstatu="+par.reportstatu
        },

        // 清空
        emptyData(){
            var par = {scorestatu:"",pjname:"",reportstatu:""}
            this.sortList = JSON.parse(JSON.stringify(par))                      
            let url = this.portA+this.constData.RM_FR_FRL
            let params = {page:1,...par} 
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.list;
                for(var i = 0 ; i < datas.length ; i++){
                    if(datas[i].scorestatu == 1){
                        datas[i].scorestatu = "已出分数"
                    }
                    if(datas[i].scorestatu == 0){
                        datas[i].scorestatu = "部分未计算分数"
                    } 
                    if(datas[i].reportstatu == 1){
                        datas[i].reportstatu = "已定稿报告"
                    }
                    if(datas[i].reportstatu == 0){
                        datas[i].reportstatu = "未定稿报告"
                    }   
                }
                this.familyData = datas;
                this.dataTotal = res.data.totalCount             
            });         
        },        
    // 条件搜索
        sortData(){
            this.familyReportData=[]
            let par = JSON.parse(JSON.stringify(this.sortList))
            if(par.scorestatu == "已出分数"){
                par.scorestatu = 1
            }
            if(par.scorestatu == "部分未计算分数"){
                par.scorestatu = 0
            }
            if(par.reportstatu == "已定稿报告"){
                par.reportstatu = 1
            }
            if(par.reportstatu == "未定稿报告"){
                par.reportstatu = 0
            }                         
            let url = this.portA+this.constData.RM_FR_FRL
            let params = {page:1,...par} 
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.list;
                for(var i = 0 ; i < datas.length ; i++){
                    if(datas[i].scorestatu == 1){
                        datas[i].scorestatu = "已出分数"
                    }
                    if(datas[i].scorestatu == 0){
                        datas[i].scorestatu = "部分未计算分数"
                    } 
                    if(datas[i].reportstatu == 1){
                        datas[i].reportstatu = "已定稿报告"
                    }
                    if(datas[i].reportstatu == 0){
                        datas[i].reportstatu = "未定稿报告"
                    }   
                }
                this.familyData = datas;
                this.dataTotal = res.data.totalCount             
            }); 
        },
           
        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.familyReportData = []
                let par = JSON.parse(JSON.stringify(this.sortList))
                if(par.scorestatu == "已出分数"){
                    par.scorestatu = 1
                }
                if(par.scorestatu == "部分未计算分数"){
                    par.scorestatu = 0
                }
                if(par.reportstatu == "已定稿报告"){
                    par.reportstatu = 1
                }
                if(par.reportstatu == "未定稿报告"){
                    par.reportstatu = 0
                } 
                let url = this.portA+this.constData.RM_FR_FRL
                let params = {page:page,...par} 
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.list;
                    for(var i = 0 ; i < datas.length ; i++){
                        if(datas[i].scorestatu == 1){
                            datas[i].scorestatu = "已出分数"
                        }
                        if(datas[i].scorestatu == 0){
                            datas[i].scorestatu = "部分未计算分数"
                        }  
                        if(datas[i].reportstatu == 1){
                            datas[i].reportstatu = "已定稿报告"
                        }
                        if(datas[i].reportstatu == 0){
                            datas[i].reportstatu = "未定稿报告"
                        }   
                    }
                    this.familyData = datas;
                    this.dataTotal = res.data.totalCount             
                });                                   
            } 
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.familyReportList{min-width: 800px;
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    .content{overflow: hidden;
        .page{float: right; margin-top: 10px; margin-bottom: 5px;}
    }
}
</style>