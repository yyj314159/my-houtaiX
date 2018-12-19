<template>
    <div class="customerReport">                         
            <div class="table" >
                <div class="title">
                    <span>列表状态</span>
                    <el-button type="info" @click="exportData">导出表格</el-button>
                </div>                     
                <!-- 表格 -->
                <Table border :columns="columns15" :data="data15" size="small"></Table>
                <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                       
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
    name: 'customerReport',
        data () {
        return {
            portA: ports.a,
        // 表格数据
            columns15: [{title: '区域', align: 'center', key: 'area'},{title: '省份', align: 'center', key: 'province'},{title: '客户售达方编号', align: 'center', key: 'customerId'},{title: '客户名称', align: 'center', key: 'customerName'},{title: '客户级别', align: 'center', key: 'customerLevel'},{title: '原始得分', align: 'center', key: 'originalscore'},{title: '标准得分', align: 'center', key: 'standardscore'},
            {title: '商店总数', align: 'center', key: 'shopsum'},{title: 'A+店数', align: 'center', key: 'aasum'},{title: 'A店数', align: 'center', key: 'asum'},{title: 'B店数', align: 'center', key: 'bsum'},{title: 'C店数', align: 'center', key: 'csum'},{title: 'D店数', align: 'center', key: 'dsum'},
                {title: 'DSR数量', align: 'center', key: 'dsrsum'},{title: '样本总数', align: 'center', key: 'samplesum'},{title: '经销商排名', align: 'center', key: 'ranking'}],
            data15: [],
            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[]         
        }
    },
    mounted(){
    // 请求列表总数据
        let url = this.portA + this.constData.RM_FR_CR;
        let params = {hpid: this.$route.query.id}
        this.httpClient.get(url,params).then((res)=>{
            this.pageData = res.data;
            this.dataTotal = res.data.length
            if (this.pageData.length < 10) {
                this.data15 = this.pageData
            } else {
                for(let i = 0; i<10; i++){
                    this.data15.push(this.pageData[i])
                }
            }
        });
    },

    methods:{
    //导出表格数据
        exportData(){
            window.location.href= this.portA+this.constData.RM_FR_DR_Export+"?hpid="+this.$route.query.id+"&id=4"
        },
    // 换页操作
        changPage(page){
            this.data15 = []
            if (this.pageData.length >= page*10) {
                for(var i = (page-1)*10; i<page*10; i++){
                    this.data15.push(this.pageData[i]) 
                }                  
            } else {
                for(var i = (page-1)*10; i<(this.pageData.length); i++){
                    this.data15.push(this.pageData[i]) 
                }                 
            }                               
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss"> 
.customerReport{min-width: 800px;
    .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
        li{display:block; width: 100px; height: 40px; background: #cccccc; border-radius: 5px;}
        li:hover{background: #5BB85D;}
        .active{background: #5BB85D;} 
    }
    .table{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }               
        .page{float: right; margin-top: 10px;}
    }      
}
</style>