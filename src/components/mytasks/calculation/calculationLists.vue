<template>
    <div class="calculationLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
                        <Select v-model="sortList.hpobj" style="width:100px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.hpobj" style="width:100px" placeholder="项目类型">
                            <Option v-for="(item,index) in sortLists.rojectNameTypes" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;

                        <Select v-model="sortList.tstate" style="width:100px" placeholder="任务状态">
                            <Option v-for="(item,index) in sortLists.taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.checkstate" style="width:100px" placeholder="完成状态">
                            <Option v-for="(item,index) in sortLists.checkStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Input v-model="sortList.rnum" placeholder="调研编号" style="width:150px"/>&nbsp;&nbsp;
                        <Button type="success" @click="sortData">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <div class="title">
                            <span>列表状态</span>
                            <el-Button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <div class="power">
                            <Button type="success" @click="show()">&nbsp;&nbsp;核对&nbsp;&nbsp;</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="columns10" :data="data10" size="small"></Table>
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
    name: 'calculationLists',
    data () {
        return {
            portA: ports.a,
        // 存贮省市区
            city:city, 
        // 查询功能
            sortLists:{
                projectNameLists:[],
                rojectNameTypes:["家化","实效"],
                taskStateLists: ["已完成","未完成"],
                checkStateLists:["已核对","未核对"],
                researchNumberLists:[22],
            },
            // 点击查询按钮发送的参数 
            sortList:{hpobj:'',tstate:'',checkstate:'',rnum:''},
        // 表格内容
            columns10: [{title: '项目名称', align: 'center', key: 'hpobj'},{title: '调研对象', align: 'center', key: 'robj'},{title: '调研编号', align: 'center', key: 'rnum'},{title: '任务状态', align: 'center', key: 'tstate'},                                                           
                        {title: '得分核对状态', align: 'center', key: 'checkstate'},{title: '原始得分', align: 'center', key: 'origscore',sortable: true},{title: '一审后得分',  align: 'center', key: 'finstscore',sortable: true},{title: '二审后得分', align: 'center', key: 'sinstscore',sortable: true},
                        {title: '核对得分', align: 'center', key: 'checkscore',sortable: true}],
            data10: [],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]   
        }
    },
    //预加载数据
    mounted(){
        document.title = "算分任务"

    // 下拉框
        let proUrl = this.portA+this.constData.MT_PL_CI2;
        this.httpClient.get(proUrl).then((res)=>{
            this.sortLists.projectNameLists = res.data
        });    
    // 请求列表总数据        
        var par = {}
        // 判断是不是第一次加载
        if(this.$route.query.FD == undefined){
            par = JSON.parse(JSON.stringify(this.sortList))
        }else{
            par = JSON.parse(JSON.stringify(this.$route.query.FD))
            this.sortList = JSON.parse(JSON.stringify(this.$route.query.FD))
        }
        
        var tempPar = {hpobj:'',tstate:'',checkstate:'',rnum:''};
        for (const key in tempPar) {
            if (par[key] == null || par[key] == undefined) {
                par[key] = tempPar[key];
            }
        }
        let url = this.portA+this.constData.MT_CL_Sort;
        let params = {currPage:1,sortList:par};       
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                switch(datas[i].tstate){
                    case 1: datas[i].tstate = "已完成"; break;
                    case 0: datas[i].tstate = "未完成"; break;
                }
                switch(datas[i].checkstate){
                    case 1: datas[i].checkstate = "已核对"; break;
                    case 0: datas[i].checkstate = "未核对"; break;
                }                              
            }
            this.data10 = datas;
            this.dataTotal = res.data.count;            
        });
    }, 
    methods:{
        show () {
            // 根据index找到相应的data数据，传给后台，让后台返回详情数据
            // this.$router.push("/prescriptionC")   //跳转到相应项目的位置
            this.$router.push("/domesticationC")   //跳转到相应项目的位置
        },
        //导出表格数据
        exportData(){
            let par = JSON.parse(JSON.stringify(this.sortList))
            var tempPar = {hpobj:'',tstate:'',checkstate:'',rnum:''};
            for (const key in tempPar) {
                if (par[key] == null || par[key] == undefined) {
                    par[key] = tempPar[key];
                }
            } 
            switch(par.tstate){
                case "已完成": par.tstate = 1; break;
                case "未完成": par.tstate = 0; break; 
            }           
            switch(par.checkstate){
                case "已核对": par.checkstate = 1; break;
                case "未核对": par.checkstate = 0; break; 
            } 
            window.location.href=this.portA+this.constData.MT_CL_Export+"?hpobj="+par.hpobj+"&tstate="+par.tstate+"&checkstate="+par.checkstate+"&rnum="+par.rnum
        },
        // 清空
            emptyData(){
                var par = {hpobj:'',tstate:'',checkstate:'',rnum:''}
                this.sortList = JSON.parse(JSON.stringify(par))                      
                let url = this.portA+this.constData.MT_CL_Sort;
                let params = {currPage:1,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;
                    
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].tstate){
                            case 1: datas[i].tstate = "已完成"; break;
                            case 0: datas[i].tstate = "未完成"; break;
                        }
                        switch(datas[i].checkstate){
                            case 1: datas[i].checkstate = "已核对"; break;
                            case 0: datas[i].checkstate = "未核对"; break;
                        }    
                    }
                    this.data10 = datas;
                    this.dataTotal = res.data.count; 
                });          
            },
        // 搜索
            sortData(){
                this.data10=[]
                var par = JSON.parse(JSON.stringify(this.sortList))
                var tempPar = {hpobj:'',tstate:'',checkstate:'',rnum:''};
                for (const key in tempPar) {
                    if (par[key] == null || par[key] == undefined) {
                        par[key] = tempPar[key];
                    }
                }              
                switch(par.tstate){
                    case "已完成": par.tstate = 1; break;
                    case "未完成": par.tstate = 0; break; 
                }           
                switch(par.checkstate){
                    case "已核对": par.checkstate = 1; break;
                    case "未核对": par.checkstate = 0; break; 
                }                      
                let url = this.portA+this.constData.MT_CL_Sort;
                let params = {currPage:1,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;                    
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].tstate){
                            case 1: datas[i].tstate = "已完成"; break;
                            case 0: datas[i].tstate = "未完成"; break;
                        }
                        switch(datas[i].checkstate){
                            case 1: datas[i].checkstate = "已核对"; break;
                            case 0: datas[i].checkstate = "未核对"; break;
                        }       
                    }
                    this.data10 = datas;
                    this.dataTotal = res.data.count; 
                })
            },

        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.data10 = []
                var par = JSON.parse(JSON.stringify(this.sortList))
                var tempPar = {hpobj:'',tstate:'',checkstate:'',rnum:''};
                for (const key in tempPar) {
                    if (par[key] == null || par[key] == undefined) {
                        par[key] = tempPar[key];
                    }
                }              
                switch(par.tstate){
                    case "已完成": par.tstate = 1; break;
                    case "未完成": par.tstate = 0; break; 
                }           
                switch(par.checkstate){
                    case "已核对": par.checkstate = 1; break;
                    case "未核对": par.checkstate = 0; break; 
                }                     
                let url = this.portA+this.constData.MT_CL_Sort;
                let params = {currPage:page,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;                    
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].tstate){
                            case 1: datas[i].tstate = "已完成"; break;
                            case 0: datas[i].tstate = "未完成"; break;
                        }
                        switch(datas[i].checkstate){
                            case 1: datas[i].checkstate = "已核对"; break;
                            case 0: datas[i].checkstate = "未核对"; break;
                        }       
                    }
                    this.data10 = datas;
                    this.dataTotal = res.data.count; 
                })                                 
            } 

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .calculationLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .content{overflow: hidden;
            .power{margin-bottom: 10px; width: 100%; display: flex; justify-content: flex-end;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>