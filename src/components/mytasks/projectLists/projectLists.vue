<template>
    <div class="projectLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">                  
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
                        <Select v-model="sortList.ragency" style="width:100px" placeholder="区域代理" @on-change="getPN">
                            <Option v-for="(item,index) in sortLists.regionalAgencyLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.hpobj" style="width:100px" placeholder="项目名称"  >
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp; 
                        <Select v-model="sortList.tstate" style="width:100px" placeholder="任务状态">
                            <Option v-for="(item,index) in sortLists.taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.astate" style="width:100px" placeholder="审核状态">
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="sortData">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>                        
                    </div>
                </Breadcrumb> 
                <Card>                    
                    <div class="content">
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <div class="tables">
                            <div id="table" v-for="(item,index) in dataTitle" :key="index" >
                                <!-- 表格下拉-->                               
                                <div class="title">
                                    <Button type="success" @click="open(index)">{{item.tip}}</Button>
                                    <Button type="success" @click="downloadAccount(item.hpid)">下载访问员账号</Button> 
                                    <Button type="info" >项目名称：&nbsp;{{item.obj}}</Button>
                                </div>
                                <!-- 数据表 -->
                                <Table border v-show=item.boo :columns="columns7" :data="data[index]" size="small"></Table>
                            </div>
                        </div>
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
    name: 'visitor',
    data () {
        return {
            portA: ports.a, 
        // 查询功能
            sortLists:{
                regionalAgencyLists: [],
                projectNameLists:[],
                taskStateLists: ["已完成","未完成"],
                auditStatusLists:["已审核","未审核"]
            },
            // 点击查询按钮发送的参数 
            sortList:{ragency:'',hpobj:'',tstate:'',astate:''},
        // table数据
            // 表头数据
            dataTitle:[],
            // 表格数据
            columns7: [{title: '调研对象', align: 'center', key: 'robj'},{title: '调研编号', align: 'center', key: 'rnum'},{title: '访问员姓名', align: 'center', key: 'interviewer',},{title: '任务状态', align: 'center', key: 'tstate'},{title: '审核状态', align: 'center', key: 'astate'},{title: '截至日期', align: 'center', key:'edate',sortable: true},
                {title: '操作', align: 'center', key: 'oprate', 
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
            data:[],
        }
    },

    //预加载数据
    // 动态
    mounted(){
        document.title = "项目列表"
        // 筛选框列表
        let agencyUrl = this.portA+this.constData.MT_PL_CI1;
        this.httpClient.get(agencyUrl).then((res)=>{
            // 初始页面数据
            this.sortLists.regionalAgencyLists = res.data
            this.sortLists.projectNameLists = [] 
        });        
        //表格信息
        var par = {}
        // 判断是不是第一次加载
        if(this.$route.query.FD == undefined){
            par = JSON.parse(JSON.stringify(this.sortList))
        }else{
            par = JSON.parse(JSON.stringify(this.$route.query.FD))
            this.sortList = JSON.parse(JSON.stringify(this.$route.query.FD))
        }
        
        var tempPar = {ragency:'',hpobj:'',tstate:'',astate:''};
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
        let url = this.portA+this.constData.MT_PL_Sort;
        let params = par;
        this.httpClient.get(url,params).then((res)=>{
            var datas = res.data.data
            for(var i = 0;i<datas.length;i++){
                for(var j = 0;j<datas[i].length;j++){
                    switch(datas[i][j].astate){
                        case 1: datas[i][j].astate = "已审核"; break;
                        case 0: datas[i][j].astate = "未审核"; break; 
                    }
                    switch(datas[i][j].tstate){
                        case 1: datas[i][j].tstate = "已完成"; break;
                        case 0: datas[i][j].tstate = "未完成"; break; 
                    } 
                    if(datas[i][j].edate == null){
                        datas[i][j].edate = "无"
                    }
                    if(datas[i][j].iname == null){
                        datas[i][j].iname = "无"
                    }                                                            
                }
            }                        
            this.data = datas 
            this.dataTitle = res.data.title;  
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
        //   展示相应的detail
        show (index) {     
            var condition = JSON.parse(JSON.stringify(this.sortList))
            this.$router.push({path:"/projectDetail",query:{id:index,condition:condition}})              
        },
        
        //导出表格数据
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
            window.location.href=this.portA+this.constData.MT_PL_Export+"?ragency="+par.ragency+"&hpobj="+par.hpobj+"&tstate="+par.tstate+"&astate="+par.astate
        },
        // 清空条件
        emptyData(){
            var par = {ragency:'',hpobj:'',tstate:'',astate:''}
            this.sortList = JSON.parse(JSON.stringify(par))
            let url = this.portA+this.constData.MT_PL_Sort;
            this.httpClient.get(url).then((res)=>{
                // 初始页面数据          
                var datas = res.data.data
                for(var i = 0;i<datas.length;i++){
                    for(var j = 0;j<datas[i].length;j++){
                        switch(datas[i].tstate){
                            case "已完成": datas[i].tstate = 1; break;
                            case "未完成": datas[i].tstate = 0; break;
                        }
                        switch(datas[i].astate){
                            case "已审核": datas[i].astate = 1; break;
                            case "未审核": datas[i].astate = 0; break;
                        }
                        if(datas[i][j].edate == null){
                            datas[i][j].edate = "无"
                        }
                        if(datas[i][j].iname == null){
                            datas[i][j].iname = "无"
                        }                                                            
                    }
                }
                this.data = datas 
                this.dataTitle = res.data.title;                   
            })          
        },
        // 条件搜索
        sortData(){
            this.data = []
            let par = JSON.parse(JSON.stringify(this.sortList))
            switch(par.tstate){
                case "已完成": par.tstate = 1; break;
                case "未完成": par.tstate = 0; break;
            }
            switch(par.astate){
                case "已审核": par.astate = 1; break;
                case "未审核": par.astate = 0; break;
            }                         
            let url = this.portA+this.constData.MT_PL_Sort;
            let params = par;
            this.httpClient.get(url,params).then((res)=>{
                // 初始页面数据          
                var datas = res.data.data
                for(var i = 0;i<datas.length;i++){
                    for(var j = 0;j<datas[i].length;j++){
                        switch(datas[i].tstate){
                            case "已完成": datas[i].tstate = 1; break;
                            case "未完成": datas[i].tstate = 0; break;
                        }
                        switch(datas[i].astate){
                            case "已审核": datas[i].astate = 1; break;
                            case "未审核": datas[i].astate = 0; break;
                        }
                        if(datas[i][j].edate == null){
                            datas[i][j].edate = "无"
                        }
                        if(datas[i][j].iname == null){
                            datas[i][j].iname = "无"
                        }                                                            
                    }
                }
                this.data = datas 
                this.dataTitle = res.data.title;                   
            })
        },

    // 表格操作
        // 展开收缩
        open(index){  
            if (this.dataTitle[index].boo == false) {
                this.dataTitle[index].boo = true;
                this.dataTitle[index].tip = "收起"
            } else {
               this.dataTitle[index].boo = false;
               this.dataTitle[index].tip = "展开"
            }          
        },
        // 下载访问员账号
        downloadAccount(index){
            window.location.href = this.portA+this.constData.MT_PL_DowIv + "?pid=" + index;
        }
    },       
}
</script>
<style scoped lang="scss">
.projectLists{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    .content{overflow: hidden;
        .tables{overflow: hidden;
            #table{border: 1px solid #cccccc; border-radius: 5px; margin-bottom: 10px; 
                .title{width: 50%; display: flex; justify-content: space-between; align-items: center; border-radius: 5px; background: white; margin-top: 10px;}
            }
        } 
    }  
} 
</style>