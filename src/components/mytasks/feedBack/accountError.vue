<template>
    <div class="accountError">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',display:'flex', justifyContent: 'space-between',}">                  
                    <div class="title">
                        <!-- 导航 -->
                        <ul class="nav">
                            <li @click="feedBack">消息反馈</li>
                            <li @click="accountError" class="active">账号异常</li>
                        </ul>
                        <el-button type="info" @click="exportData">导出表格</el-button>
                    </div>
                </Breadcrumb>                
                <Card>
                    <div class="content">
                         <div class="select">                             
                            <DatePicker type="date" placeholder="开始日期" :clearable='false' style="width: 120px" @on-change="getStartTime" v-model="sortList.starttime"></DatePicker>                                                       
                            <DatePicker type="date" placeholder="截止日期" :clearable='false' style="width: 120px" @on-change="getOverTime" v-model="sortList.endtime"></DatePicker>                        
                            <Select v-model="sortList.hpobj" style="width:100px" placeholder="项目名称">
                                <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{item}}</Option>
                            </Select>&nbsp;&nbsp;&nbsp;                            
                            <Button type="success" @click="sortData">搜索</Button>
                            <Button type="success" @click="emptyData">清空条件</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns9" :data="data9" size="small"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />   
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
import city from "../../../../static/city.json"
export default {
    name: 'accountError',
    data () {
        return {
            portA: ports.a,
        // 存贮省市区
            city:city,               
        // 筛选框内容
            sortLists:{
                projectNameLists: [],
            },
            sortList:{hpobj:"",starttime:"",endtime:""},
        //表格内容
            columns9: [{title: '项目名称', align: 'center', key: 'hpobj'},{title: '地区', align: 'center', key: 'area'},{title: '调研对象', align: 'center', key: 'robj',},{title: '调研编号', align: 'center', key: 'rnum'},{title: '区域代理人', align: 'center', key: 'regionalper'},
                {title: '录入人员', align: 'center', key: 'entryper'},{title: '录入人员IP数量', align: 'center', key: 'entryipcount'},{title: '绑定手机号', align: 'center', key: 'bindphonenum'}],
            data9: [],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]          
        }
    },
    //预加载数据
    mounted(){
        document.title = "账号异常"
        // 筛选框列表
        let proUrl = this.portA+this.constData.MT_PL_CI2;
        this.httpClient.get(proUrl).then((res)=>{
            // 初始页面数据
            this.sortLists.projectNameLists = res.data
        });         
        //表格信息
        this.data9=[]
        var par = {}
        // 判断是不是第一次加载
        if(this.$route.query.FD == undefined){
            par = JSON.parse(JSON.stringify(this.sortList))
        }else{
            par = JSON.parse(JSON.stringify(this.$route.query.FD))
            this.sortList = JSON.parse(JSON.stringify(this.$route.query.FD))
        }
        
        var tempPar = {hpobj:"",starttime:'',endtime:""};
        for (const key in tempPar) {
            if (par[key] == null || par[key] == undefined) {
                par[key] = tempPar[key];
            }
        }
        let url = this.portA+this.constData.MT_FB_AE_Sort;
        let params = {currPage:1,sortList:par};       
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                switch(datas[i].fdbacktype){
                    case 1: datas[i].fdbacktype = "已完成"; break;
                    case 0: datas[i].fdbacktype = "未完成"; break;
                }
                for(var j = 0;j<this.city.length;j++){
                    if(this.city[j].id == datas[i].provinceid){
                        datas[i].provinceid = this.city[j].name
                        for(var k = 0;k<this.city[j].child.length;k++){
                            if(this.city[j].child[k].id == datas[i].cityid){
                                datas[i].cityid = this.city[j].child[k].name
                                for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                    if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                        datas[i].districtid = this.city[j].child[k].child[l].name
                                    }
                                }
                            }
                        }
                    }
                }
                datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid                                  
            }
            this.data9 = datas;
            this.dataTotal = res.data.count;            
        });
    },

    methods:{
        // 切换反馈
            feedBack(){
                this.$router.push("/feedBack");            
            },
        // 切换账号异常
            accountError(){
                this.$router.push("/accountError")
            },
        // 导出数据
            exportData(){
                let par = JSON.parse(JSON.stringify(this.sortList))
                var tempPar = {hpobj:"",starttime:'',endtime:""};
                for (const key in tempPar) {
                    if (par[key] == null || par[key] == undefined) {
                        par[key] = tempPar[key];
                    }
                }            
                window.location.href=this.portA+this.constData.MT_FB_AE_Export+"?hpobj="+par.hpobj+"&starttime="+par.starttime+"&endtime="+par.endtime
            },
    // 获取搜索日期
        getStartTime(value){
            this.stringUtil.getStartTime(this.$Message,this.sortList,value)
        },
        getOverTime(value){
            this.stringUtil.getOverTime(this.$Message,this.sortList,value)                     
        },
    // 清空数据
        emptyData(){
                var par = {hpobj:"",starttime:'',endtime:""}
                this.sortList = JSON.parse(JSON.stringify(par))                      
                let url = this.portA+this.constData.MT_FB_AE_Sort;
                let params = {currPage:1,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;
                    
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].fdbacktype){
                            case 1: datas[i].fdbacktype = "已完成"; break;
                            case 0: datas[i].fdbacktype = "未完成"; break;
                        }

                        for(var j = 0;j<this.city.length;j++){
                            if(this.city[j].id == datas[i].provinceid){
                                datas[i].provinceid = this.city[j].name
                                for(var k = 0;k<this.city[j].child.length;k++){
                                    if(this.city[j].child[k].id == datas[i].cityid){
                                        datas[i].cityid = this.city[j].child[k].name
                                        for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                            if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                                datas[i].districtid = this.city[j].child[k].child[l].name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid     
                    }
                    this.data9 = datas;
                    this.dataTotal = res.data.count; 
                });          
            },        
        // 搜索
            sortData(){
                this.data9=[]
                var par = JSON.parse(JSON.stringify(this.sortList))
                var tempPar = {hpobj:"",starttime:'',endtime:""};
                for (const key in tempPar) {
                    if (par[key] == null || par[key] == undefined) {
                        par[key] = tempPar[key];
                    }
                } 
                switch(par.fdbacktype){
                    case "已完成": par.fdbacktype = 1; break;
                    case "未完成": par.fdbacktype = 0; break;
                }             
                    
                let url = this.portA+this.constData.MT_FB_AE_Sort;
                let params = {currPage:1,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;                    
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].fdbacktype){
                            case 1: datas[i].fdbacktype = "已完成"; break;
                            case 0: datas[i].fdbacktype = "未完成"; break;
                        } 
                        for(var j = 0;j<this.city.length;j++){
                            if(this.city[j].id == datas[i].provinceid){
                                datas[i].provinceid = this.city[j].name
                                for(var k = 0;k<this.city[j].child.length;k++){
                                    if(this.city[j].child[k].id == datas[i].cityid){
                                        datas[i].cityid = this.city[j].child[k].name
                                        for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                            if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                                datas[i].districtid = this.city[j].child[k].child[l].name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid     
                    }
                    this.data9 = datas;
                    this.dataTotal = res.data.count; 
                })
            },

        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.data9 = []
                var par = JSON.parse(JSON.stringify(this.sortList))
                var tempPar = {hpobj:"",starttime:'',endtime:""};
                for (const key in tempPar) {
                    if (par[key] == null || par[key] == undefined) {
                        par[key] = tempPar[key];
                    }
                }              
                switch(par.fdbacktype){
                    case "已完成": par.fdbacktype = 1; break;
                    case "未完成": par.fdbacktype = 0; break;
                }  
                    
                let url = this.portA+this.constData.MT_FB_AE_Sort;
                let params = {currPage:page,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;                    
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].fdbacktype){
                            case 1: datas[i].fdbacktype = "已完成"; break;
                            case 0: datas[i].fdbacktype = "未完成"; break;
                        }  
                        for(var j = 0;j<this.city.length;j++){
                            if(this.city[j].id == datas[i].provinceid){
                                datas[i].provinceid = this.city[j].name
                                for(var k = 0;k<this.city[j].child.length;k++){
                                    if(this.city[j].child[k].id == datas[i].cityid){
                                        datas[i].cityid = this.city[j].child[k].name
                                        for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                            if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                                datas[i].districtid = this.city[j].child[k].child[l].name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid     
                    }
                    this.data9 = datas;
                    this.dataTotal = res.data.count; 
                })                                                                   
            }          

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .accountError{
        .title{width: 100%;height: 40px;background: #cccccc;line-height: 40px;color: #fff; display:flex;justify-content: space-between;align-items:center; margin-bottom: 10px;
            span:nth-child{display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
            .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
                li{display:block; width: 200px; height: 40px; background: #C1C1C1;}
                li:hover{background: #5BB85D;}
                .active{background: #5BB85D;}
            }
        }
        .content{overflow: hidden;
            .select{width: 650px; margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }   
    }
</style>