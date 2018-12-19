<template>
    <div class="agent"> 
        <div class="title">
            <span>列表状态</span>
            <el-button type="info" @click="exportData">导出表格</el-button>
        </div>         
        <!-- 表格 -->
        路由传参：{{this.$route.query.sortList}}
        <Table border :columns="agent" :data="agentData" size="small"></Table>
        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" /> 
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
    name: 'agent',
    data () {
        return {
            portA: ports.a,
        //表格内容
            agent: [{title: '代理名称',align: 'center',key: 'agencyname'},{title: '区域',align: 'center',key: 'areaname'},{title: '项目名称',align: 'center',key: 'projectname',sortable: true},{title: '开始时间',align: 'center',key: 'starttime',sortable: true},
                        {title: '结束时间',align: 'center',key: 'endtime'},{title: '每天完成数量',align: 'center',key: 'daynum'},{title: '退回比例',align: 'center',key: 'returnratio'},{title: '退回完成率',align: 'center',key: 'bouncerate'},
                            {title: '实际录入数量',align: 'center',key: 'enteringnum'},{title: '修改数量',align: 'center',key: 'amendnum'}],
            agentData: [{区域: 'John Brown',代理名称: 18,项目名称: 'New York No. 1 Lake Park',开始时间: 55, 结束时间: 23,每天完成数量: 88,退回比例:77,退回完成率:9,实际录入数量:88,修改数量:8}],
                        
        // 分页数据
            dataTotal:10,
            pageNum:10,             
        }
    },
    mounted(){
    // 请求列表总数据
        let par = {}
        let route = this.$route.query.sortList
        if(route.provinceid == undefined && route.cityid == undefined && route.districtid == undefined && route.pjname == undefined){
            par = {page:1,id:1,provinceid:'',cityid:'',districtid:'',pjname:''}
        }else{
            par = {page:1,id:1,...route}
        }
        console.log(par)
        let url = this.portA+this.constData.RM_PR_Sort;
        let params = par
        this.httpClient.get(url,params).then((res)=>{          
            this.agentData = res.data.list;
            this.dataTotal = res.data.totalCount;
        });
    },
    methods:{
        exportData(){
            let par = {}
            let route = this.$route.query.sortList
            if(route.pjname == undefined){
                par = {page:1,id:1,pjname:''}
            }else{
                par = {page:1,id:1,...route}
            }
            window.location.href = this.portA+this.constData.RM_PR_Export+"?pjname="+par.pjname+"&id=1"
        },
        // 换页操作
        changPage(page){
            this.agentData = []
            let par = {}
            let route = this.$route.query.sortList
            if(route.pjname == undefined){
                par = {page:page,id:1,pjname:''}
            }else{
                par = {page:page,id:1,...route}
            }
            let url = this.portA+this.constData.RM_PR_Sort;
            let params = par
            this.httpClient.get(url,params).then((res)=>{         
                this.agentData = res.data.list;
                this.dataTotal = res.data.totalCount;
            })                                  
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .agent{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        } 
        .page{float: right; margin-top: 10px; margin-bottom: 5px;}
    }
</style>