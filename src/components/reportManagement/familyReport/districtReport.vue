<template>
    <div class="districtReport">                         
        <div class="table" >
            <div class="title">
                <span>列表状态</span>
                <el-button type="info" @click="exportData">导出表格</el-button>
            </div>                     
            <!-- 表格 -->
            <Table border :columns="district" :data="districtData" size="small"></Table>
            <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />


            <div class="titleT">
                <p>汇总列表</p>                     
                <Table border :columns="districtT" :data="districtTData" size="small"></Table>   
            </div>                              
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ports from "../../../assets/js/ports"
export default {
    name: 'district',
    data () {
        return {
            portA: ports.a,
            // 表格内容
            district: [{title: '区域',align: 'center',key: 'area'},{title: '原始得分',align: 'center',key: 'originalscore'},{title: '标准得分',align: 'center',key: 'standardscore'},{title: '商店总数',align: 'center',key: 'shopsum',sortable: true},{title: 'A+店数',align: 'center',key: 'aasum',sortable: true},
                            {title: 'A店数',align: 'center',key: 'asum'},{title: 'B店数',align: 'center',key: 'bsum'},{title: 'C店数',align: 'center',key: 'csum'},{title: 'D店数',align: 'center',key: 'dsum'},{title: 'DSR数量',align: 'center',key: 'dsrsum'},{title: '样本总数',align: 'center',key: 'samplesum'},
                            {title: '排名',align: 'center',key: 'ranking'},],
            districtData: [],
            // 表格内容
            districtT: [{title: '原始得分',align: 'center',key: '原始得分'},{title: '标准得分',align: 'center',key: '标准得分'},{title: '商店总数',align: 'center',key: '商店总数'},{title: 'A+店数',align: 'center',key: 'A+店书'},{title: 'A店数',align: 'center',key: 'A店书'},
                            {title: 'B店数',align: 'center',key: 'B店书'},{title: 'C店数',align: 'center',key: 'C店书'},{title: 'D店数',align: 'center',key: 'D店书'},{title: 'DSR数量',align: 'center',key: 'DSR数量'},{title: '样本总数',align: 'center',key: '样本总数'},],
            districtTData: [{}],
            
            // 分页数据
                dataTotal:1,
                pageNum:10,
                pageData:[]                          
        }
    },

    mounted(){
    // 请求列表总数据
        let url = this.portA + this.constData.RM_FR_DR;
        let params = {hpid: this.$route.query.id}
        this.httpClient.get(url,params).then((res)=>{       
            this.pageData = res.data;
            this.dataTotal = res.data.length
            if (this.pageData.length < 10) {
                this.districtData = this.pageData
            } else {
                for(let i = 0; i<10; i++){
                    this.districtData.push(this.pageData[i])
                }
            }
        });
    },

    methods:{
    //导出表格数据
        exportData(){
            window.location.href= this.portA+this.constData.RM_FR_DR_Export+"?hpid="+this.$route.query.id+"&id=1"
        },
    // 换页操作
        changPage(page){
            this.districtData = []
            if (this.pageData.length >= page*10) {
                for(var i = (page-1)*10; i<page*10; i++){
                    this.districtData.push(this.pageData[i]) 
                }                  
            } else {
                for(var i = (page-1)*10; i<(this.pageData.length); i++){
                    this.districtData.push(this.pageData[i]) 
                }                 
            }                               
        }
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.districtReport{min-width: 800px;
    .table{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }               
        .page{float: right; margin-top: 10px;}
        .titleT{width: 100%;  margin-bottom: 5px;  margin-top: 30px;
            p{width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;}
        }
    }      
}
</style>