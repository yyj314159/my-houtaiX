<template>
    <div class="firstInstanceLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title"><span>条件筛选</span></div>
                    <div class="select">                             
                        <Select v-model="sortList.ragency" style="width:100px" placeholder="区域代理"  @on-change="getPN">
                            <Option v-for="(item,index) in sortLists.regionalAgencyLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.hpobj" style="width:100px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp; 
                        <Select v-model="sortList.tstate" style="width:100px" placeholder="任务状态">
                            <Option v-for="(item,index) in sortLists.taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.astate" style="width:100px" placeholder="审核状态">
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
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
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <div class="power">
                            <Button type="success" @click="batchThrough">&nbsp;&nbsp;批量通过&nbsp;&nbsp;</Button>
                            <Button type="success" @click="downloadData">&nbsp;&nbsp;下载资料&nbsp;&nbsp;</Button>
                            <Button type="success" @click="downloadPicture">&nbsp;&nbsp;下载照片&nbsp;&nbsp;</Button>
                            <Button type="success" @click="downloadAudioVideo">&nbsp;&nbsp;下载录音录像&nbsp;&nbsp;</Button> 
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="firstInstance" :data="firstInstanceData" size="small" @on-select="selectData" @on-select-cancel="cancelData" @on-select-all="selectAllData"></Table>
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
import ports from "../../../assets/js/ports.js"
export default {
    name: 'firstInstanceLists',
    data () {
        return {
            portA: ports.a,
            portB: ports.b,
        // 批量认证
            attestatioData:[],
        // 筛选框内容
            // 查询功能
            sortLists:{
                regionalAgencyLists: ["kk"],
                projectNameLists:["kk"],
                taskStateLists: ["已完成","未完成"],
                auditStatusLists:["已审核","未审核"],
                researchNumberLists:[]
            },
            // 点击查询按钮发送的参数 
            sortList:{ragency:'',hpobj:'',tstate:'',astate:'',rnum:''},
            // 表格内容
            firstInstance: [{type: 'selection',width: 50,align: 'center'},{title: '项目名称', align: 'center', key: 'hpobj'},{title: '调研对象', align: 'center', key: 'robj'},{title: '调研编号', align: 'center', key: 'rnum'},{title: '审核状态', align: 'center', key: 'astate'},{title: '审核时间', align: 'center', key: 'edate'},                                        
                        {title: '操作', align: 'center', key: '操作', 
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
                                        }, '审核')
                                ])             
                            }                              
                        }
                    ],
            firstInstanceData: [],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]         
       }
    },
    //预加载数据
    mounted(){
        document.title = "一审任务"
    // 筛选框列表
        // 筛选框列表
        let agencyUrl = this.portA+this.constData.MT_PL_CI1;
        this.httpClient.get(agencyUrl).then((res)=>{
            // 初始页面数据
            this.sortLists.regionalAgencyLists = res.data
            this.sortLists.projectNameLists = [] 
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
        
        var tempPar = {ragency:'',hpobj:'',tstate:'',astate:'',rnum:''};
        for (const key in tempPar) {
            if (par[key] == null || par[key] == undefined) {
                par[key] = tempPar[key];
            }
        }
        switch(par.tstate){
            case "已完成": par.tstate = 1; break;
            case "未完成": par.tstate = 0; break;
        }
        switch(par.astate){
            case "已审核": par.astate = 1; break;
            case "未审核": par.astate = 0; break;
        }
        let url = this.portA+this.constData.MT_FI_Sort;
        let params = {currPage:1,sortList:par};       
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                switch(datas[i].astate){
                    case 1: datas[i].astate = "已审核"; break;
                    case 0: datas[i].astate = "未审核"; break; 
                }
                switch(datas[i].tstate){
                    case 1: datas[i].tstate = "已完成"; break;
                    case 0: datas[i].tstate = "未完成"; break; 
                }               
                if(datas[i].edate == null){
                    datas[i].edate = "无"
                }
                if(datas[i].iname == null){
                    datas[i].iname = "无"
                }     
            }
            this.firstInstanceData = datas;
            this.dataTotal = res.data.count;            
        });
    },

    methods:{
        // 获取下拉框
        getPN(val){
            let proUrl = this.portA+this.constData.MT_PL_CI2;
            let params = {agency:val};
            this.httpClient.get(proUrl,params).then((res)=>{
                // 初始页面数据
                this.sortLists.projectNameLists = res.data
            }); 
        },
        // 导出对象
        exportData(){
            let par = JSON.parse(JSON.stringify(this.sortList))
            switch(par.tstate){
                case "已完成": par.tstate = 1; break;
                case "未完成": par.tstate = 0; break;
            }
            switch(par.astate){
                case "已审核": par.astate = 1; break;
                case "未审核": par.astate = 0; break;
            }
            window.location.href=this.portA+this.constData.MT_FI_Export+"?ragency="+par.ragency+"&hpobj="+par.hpobj+"&tstate="+par.tstate+"&astate="+par.astate+"&rnum="+par.rnum

        },
        // 跳转相应的位置（家化或实效）
            show (index) {
                var condition = JSON.parse(JSON.stringify(this.sortList))
                this.$router.push({path:"/prescription1",query:{id:index,condition:condition}})  // 跳转到相应项目的位置
            },
        // 清空
        emptyData(){
            var par = {ragency:'',hpobj:'',tstate:'',astate:'',rnum:''}
            this.sortList = JSON.parse(JSON.stringify(par))                      
            let url = this.portA+this.constData.MT_FI_Sort;
            let params = {currPage:1,sortList:par};       
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    switch(datas[i].tstate){
                        case "已完成": datas[i].tstate = 1; break;
                        case "未完成": datas[i].tstate = 0; break;
                    }
                    switch(datas[i].astate){
                        case "已审核": datas[i].astate = 1; break;
                        case "未审核": datas[i].astate = 0; break;
                    }
                    if(datas[i].edate == null){
                        datas[i].edate = "无"
                    }
                    if(datas[i].iname == null){
                        datas[i].iname = "无"
                    }     
                }
                this.firstInstanceData = datas;
                this.dataTotal = res.data.count;
                this.sortLists.projectNameLists = []  
            });          
        },
        // 搜索
            sortData(){
                this.firstInstanceData=[]
                let par = JSON.parse(JSON.stringify(this.sortList))
                switch(par.tstate){
                    case "已完成": par.tstate = 1; break;
                    case "未完成": par.tstate = 0; break;
                }
                switch(par.astate){
                    case "已审核": par.astate = 1; break;
                    case "未审核": par.astate = 0; break;
                }                      
                let url = this.portA+this.constData.MT_FI_Sort;
                let params = {currPage:1,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].tstate){
                            case "已完成": datas[i].tstate = 1; break;
                            case "未完成": datas[i].tstate = 0; break;
                        }
                        switch(datas[i].astate){
                            case "已审核": datas[i].astate = 1; break;
                            case "未审核": datas[i].astate = 0; break;
                        }
                        if(datas[i].edate == null){
                            datas[i].edate = "无"
                        }
                        if(datas[i].iname == null){
                            datas[i].iname = "无"
                        }     
                    }
                    this.firstInstanceData = datas;
                    this.dataTotal = res.data.count;            
                });
            },

    // 批量通过
        selectData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.id)
            })
        },
        selectAllData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.id)
            })
        },
        cancelData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.id)
            })
        },
        batchThrough(){
            let pid = ''
            this.attestatioData.forEach((item)=>{
                pid += item + ','
            })
            let url = this.portA+this.constData.MT_FI_BT;
            let params = {rids : pid.slice(0,pid.length-1), type:1} 
            this.httpClient.get(url,params).then((res)=>{
                this.$Message.info(res.data.msg);
                this.$router.go(0)
            })
        },
        // 下载资料
            downloadData(){
                let pid = ''
                this.attestatioData.forEach((item)=>{
                    pid += item + ','
                })               
                window.location.href = this.portA+this.constData.MT_DT_DowDt+"?rids="+pid.slice(0,pid.length-1)
            },
        // 下载照片
            downloadPicture(){
                let pid = ''
                this.attestatioData.forEach((item)=>{
                    pid += item + ','
                }) 
                let url = this.portA+this.constData.MT_DT_DowPht;
                let params = {rids:pid.slice(0,pid.length-1)}  
                this.httpClient.get(url,params).then((res)=>{
                    window.location.href = this.portB+res.data
                })
            },
        // 下载录音录像
            downloadAudioVideo(){
                let pid = ''
                this.attestatioData.forEach((item)=>{
                    pid += item + ','
                })  
                let url = this.portA+this.constData.MT_DT_DowReVd;               
                let params = {rids:pid.slice(0,pid.length-1)}  
                this.httpClient.get(url,params).then((res)=>{
                    window.location.href = this.portB+res.data
                })
            },
        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.firstInstanceData=[]
                let par = JSON.parse(JSON.stringify(this.sortList))
                switch(par.tstate){
                    case "已完成": par.tstate = 1; break;
                    case "未完成": par.tstate = 0; break;
                }
                switch(par.astate){
                    case "已审核": par.astate = 1; break;
                    case "未审核": par.astate = 0; break;
                }
                let url = this.portA+this.constData.MT_FI_Sort;
                let params = {currPage:page,sortList:par};       
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas;
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].tstate){
                            case "已完成": datas[i].tstate = 1; break;
                            case "未完成": datas[i].tstate = 0; break;
                        }
                        switch(datas[i].astate){
                            case "已审核": datas[i].astate = 1; break;
                            case "未审核": datas[i].astate = 0; break;
                        }
                        if(datas[i].edate == null){
                            datas[i].edate = "无"
                        }
                        if(datas[i].iname == null){
                            datas[i].iname = "无"
                        }     
                    }
                    this.firstInstanceData = datas;
                    this.dataTotal = res.data.count;            
                });                                 
            }
    } 


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .firstInstanceLists{min-width: 800px;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        }
        .select{width: 80%;}
        .content{overflow: hidden;
            .power{margin-bottom: 10px; width: 100%; display: flex; justify-content: flex-end;}
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>