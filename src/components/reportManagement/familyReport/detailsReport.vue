<template>
    <div class="detailsReport">                         
            <div class="table" >
                <div class="title">
                    <span>列表状态</span>
                    <el-button type="info">导出表格</el-button>
                </div>  
                路由传参：{{this.$route.query.sortList}}                     
                <!-- 表格 -->
                <Table border :columns="columns14" :data="data14" size="small"></Table>
                <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                       
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
    name: 'detailsReport',
    data () {      
        return {
            portA: ports.a,
        // 表格数据
            columns14: [{title: '调研对象', align: 'center', key: '调研对象'},{title: '门店类型', align: 'center', key: '门店类型'},{title: 'SKU总数', align: 'center', key: 'SKU总数'},{title: '原始得分', align: 'center', key: '原始得分'},{title: '标准得分', align: 'center', key: '标准得分'},           
                {title: '实际SKU总数', align: 'center', key: '实际SKU总数'},{title: '实际必选SKU总数', align: 'center', key: '实际必选SKU总数'},{title: '缺失必选SKU总数', align: 'center', key: '缺失必选SKU总数'},{title: 'XX实际必选SKU总数', align: 'center', key: 'XX实际必选SKU总数'},
                {title: 'XX总数', align: 'center', key: 'XX总数'},{title: 'xx系列', align: 'center', key: 'xx系列'},{title: 'xxx系列', align: 'center', key: 'xxx系列'},{title: 'DSR店数', align: 'center', key: 'DSR店数'}],
            data14: [{调研对象: 'John Brown',门店类型: '河南',SKU总数: '001',原始得分: '小猫',客户级别: 'AAA',标准得分:999,实际SKU总数: 4,实际必选SKU总数: 55,缺失必选SKU总数: "查看",XX实际必选SKU总数: 99,
                    XX总数: 43,xx系列: 55,xxx系列: 77,DSR店数: 88}],
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
        // if(route.provinceid == undefined || route.cityid == undefined || route.districtid == undefined || route.pjname == undefined){
        //     par = {page:1,id:1,provinceid:'',cityid:'',districtid:'',pjname:''}
        // }else{
        //     par = {page:1,id:1,...route}
        // }
        console.log(par)
        // axios({
        //     url:this.portA+"/performanCereport",
        //     method:'get',
        //     params:par                         
        // }).then((res)=>{
        //     console.log(res.data)           
        //     this.agentData = res.data.list;
        //     this.dataTotal = res.data.totalCount;
        // });
    },

    methods:{
    // 换页操作
        changPage(page){
            this.agentData = []
            let par = {}
            let route = this.$route.query.sortList
            if(route.provinceid == undefined || route.cityid == undefined || route.districtid == undefined || route.pjname == undefined){
                par = {page:page,id:1,provinceid:'',cityid:'',districtid:'',pjname:''}
            }else{
                par = {page:page,id:1,...route}
            }
            console.log(par)
            axios({
                url:this.portA+"/performanCereport",
                method:'get',
                params:par                         
            }).then((res)=>{
                console.log(res.data)           
                this.agentData = res.data.list;
                this.dataTotal = res.data.totalCount;
            })                                  
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.detailsReport{min-width: 800px;
    .table{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }               
        .page{float: right; margin-top: 10px;}
    }      
}
 
</style>