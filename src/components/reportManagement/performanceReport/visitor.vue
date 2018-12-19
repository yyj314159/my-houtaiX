<template>
    <div class="visitor">
        <div class="title">
            <span>列表状态</span>
            <el-button type="info" @click="exportData">导出表格</el-button>
        </div>           
        <!-- 表格 -->
        路由传参：{{this.$route.query.sortList}}
        <Table border :columns="visitor" :data="visitorData" size="small" ></Table>
        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" /> 
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
            // 表格内容
            visitor: [{title: '用户名',align: 'center',key: 'interviewername'},{title: '归属代理',align: 'center',key: 'agencyname'},{title: '手机号',align: 'center',key: 'phone'},{title: '完成工作数量',align: 'center',key: 'completenum',sortable: true},{title: '有效工作时长',align: 'center',key: 'worktime',sortable: true},
                            {title: '实际照片数量',align: 'center',key: 'photonum'},{title: '实际问题照片数量',align: 'center',key: 'issuephotonum'},{title: '实际扫码数量',align: 'center',key: 'codenum'},{title: '实际录音数量',align: 'center',key: 'recordnum'}],
            visitorData: [],
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
            par = {page:1,id:3,pjname:''}
        }else{
            par = {page:1,id:3,...route}
        }
        console.log(par)
        let url = this.portA+this.constData.RM_PR_Sort;
        let params = par
        this.httpClient.get(url,params).then((res)=>{     
            this.visitorData = res.data.list;
            this.dataTotal = res.data.totalCount;
        });
    },

    methods:{
        //导出表格数据
        
        exportData(){
            let par = {}
            let route = this.$route.query.sortList
            if(route.provinceid == undefined || route.cityid == undefined || route.districtid == undefined || route.pjname == undefined){
                par = {page:1,id:3,provinceid:'',cityid:'',districtid:'',pjname:''}
            }else{
                par = {page:1,id:3,...route}
            }
            window.location.href = this.portA+this.constData.RM_PR_Export+"?pjname="+par.pjname+"&id=3"
        },

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.visitorData = []
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
                this.visitorData = res.data.list;
                this.dataTotal = res.data.totalCount;
            });                                  
        }
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .visitor{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }    
        .page{float: right; margin-top: 10px; margin-bottom: 5px;}   
    }
</style>