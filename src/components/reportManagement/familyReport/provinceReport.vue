<template>
    <div class="provinceReport">                         
        <div class="table" >
            <div class="title">
                <span>列表状态</span>
                <el-button type="info" @click="exportData">导出表格</el-button>
            </div>  
            路由传参：{{this.$route.query.sortList}}                     
            <!-- 表格 -->
            <Table border :columns="columns13" :data="data13" size="small"></Table>
            <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                       
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
    name: 'provinceReport',
    data () {
        return {
            portA: ports.a,
        // 表格内容
            columns13: [{title: '区域', align: 'center', key: 'area'},{title: '省份', align: 'center', key: 'province'},{title: '原始得分', align: 'center', key: 'originalscore'},{title: '标准得分', align: 'center', key: 'standardscore'},{title: '商店总数', align: 'center', key: 'shopsum'},
            {title: 'A+店数', align: 'center', key: 'aasum'},{title: 'A店数', align: 'center', key: 'asum'},{title: 'B店数', align: 'center', key: 'bsum'},{title: 'C店数', align: 'center', key: 'csum'},{title: 'D店数', align: 'center', key: 'dsum'},{title: 'DSR数量', align: 'center', key: 'dsrsum'},
            {title: '样本总数', align: 'center', key: 'samplesum'},{title: '排名', align: 'center', key: 'ranking'}],
            data13: [],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]             
        }
    },
    mounted(){
    // 请求列表总数据
        let url = this.portA + this.constData.RM_FR_PR;
        let params = {hpid: this.$route.query.id}
        this.httpClient.get(url,params).then((res)=>{
            this.pageData = res.data;
            this.dataTotal = res.data.length
            if (this.pageData.length < 10) {
                this.data13 = this.pageData
            } else {
                for(let i = 0; i<10; i++){
                    this.data13.push(this.pageData[i])
                }
            }
        });
    },

    methods:{
    //导出表格数据
        exportData(){
            window.location.href= this.portA+this.constData.RM_FR_DR_Export+"?hpid="+this.$route.query.id+"&id=5"
        },
    // 换页操作
        changPage(page){
            this.data13 = []
            if (this.pageData.length >= page*10) {
                for(var i = (page-1)*10; i<page*10; i++){
                    this.data13.push(this.pageData[i]) 
                }                  
            } else {
                for(var i = (page-1)*10; i<(this.pageData.length); i++){
                    this.data13.push(this.pageData[i]) 
                }                 
            }                               
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.provinceReport{min-width: 800px;
    .table{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }               
        .page{float: right; margin-top: 10px;}
    }      
}
</style>