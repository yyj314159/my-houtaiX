<template>
    <div class="examine">
        <div class="title">
            <span>列表状态</span>
            <el-button type="info" @click="exportData">导出表格</el-button>
        </div>
        <!-- 表格 -->
        路由传参：{{this.$route.query.sortList}}
        <Table border :columns="examine" :data="examineData" size="small"></Table>
        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" /> 
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
    name: 'examine',
    data () {
        return {
            portA: ports.a,
            // 表格内容
            examine: [{title: '用户名',align: 'center',key: 'auditname'},{title: '审核职位',align: 'center',key: 'auditposition'},{title: '手机号',align: 'center',key: 'auditphone'},{title: '审核完成数量',align: 'center',key: 'auditnum',sortable: true},
                {title: '一审自动审核数',align: 'center',key: 'oneauditnum',sortable: true},{title: '批量审核数量',align: 'center',key: 'batchnum',sortable: true },{title: '单项审核数量',align: 'center',key: 'singlenum',sortable: true},
                {title: '有效审核时长',align: 'center',key: 'validtime',sortable: true },{title: '退回数量',align: 'center',key: 'returnednum',sortable: true}],
            examineData: [{审核职位: 'John Brown',用户名: 18,手机号: 'New York No. 1 Lake Park',审核完成数量: 55,一审自动审核数: 23,批量审核数量: 88,单项审核数量:77,有效审核数量:9,退回数量:44}],
            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[]              
        }
    },
    mounted(){
    // 请求列表总数据
        let par = {}
        let route = this.$route.query.sortList
        if(route.pjname == undefined){
            par = {page:1,id:2,pjname:''}
        }else{
            par = {page:1,id:2,...route}
        }
        console.log(par)
        let url = this.portA+this.constData.RM_PR_Sort;
        let params = par
        this.httpClient.get(url,params).then((res)=>{         
            this.examineData = res.data.list;
            this.dataTotal = res.data.totalCount;
        });
    },

    methods:{
        exportData(){
            let par = {}
            let route = this.$route.query.sortList
            if(route.pjname == undefined){
                par = {page:1,id:2,pjname:''}
            }else{
                par = {page:1,id:2,...route}
            }
            window.location.href = this.portA+this.constData.RM_PR_Export+"?pjname="+par.pjname+"&id=2"
        },
        // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.agentData = []
            let par = {}
            let route = this.$route.query.sortList
            if(route.pjname == undefined){
                par = {page:page,id:3,pjname:''}
            }else{
                par = {page:page,id:3,...route}
            }
            let url = this.portA+this.constData.RM_PR_Sort;
            let params = par
            this.httpClient.get(url,params).then((res)=>{          
                this.examineData = res.data.list;
                this.dataTotal = res.data.totalCount;
            });                                  
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .examine{overflow: hidden; 
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        } 
        .page{float: right; margin-top: 10px;margin-bottom: 5px;}
    } 
</style>