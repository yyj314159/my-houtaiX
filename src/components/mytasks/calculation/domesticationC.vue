<template>
    <div class="domesticationC">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;完&nbsp;成&nbsp;&nbsp;</el-button>
                    <el-button type="danger" size="small">&nbsp;&nbsp;取&nbsp;消&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Breadcrumb :style="{margin: '16px 0',background:'white'}" class="Title">                   
                    <div class="title"><span>算分标准</span></div>
                    <div class="select">                             
                        <Select v-model="sortList.templateName" style="width:250px" placeholder="已选算分模板名称">
                            <Option v-for="(item,index) in sortLists.templateNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <!-- <Select v-model="sortList.projectName" style="width:150px" placeholder="必选产品">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp; -->
                        <Button type="success" @click="sortData">确认</Button>
                    </div>
                </Breadcrumb>  
                <Card>
                    <div class="content">
                        <div class="title">
                            <span>得分统计</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns10" :data="data10" size="small"></Table>
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
export default {
    name: 'domesticationC',
    data () {
        return {
            portA: ports.a,
        // 筛选框内容
        // 查询功能
            sortLists:{
                templateNameLists: [],
                projectNameLists:["安阳"],
                totalDA:[]
            },
            // 点击查询按钮发送的参数 
            sortList:{templateName:'',projectName:''},
            // 表格内容
            columns10: [{title: '调研对象', align: 'center',key: 'name'},{title: '门店类型',align: 'center',key: 'type'},{title: 'SKU总数',align: 'center',key: 'skusum'},{title: '原始得分',align: 'center',key: 'originalscore'},{title: '标准得分',align: 'center',key: 'score'},
                {title: '实际SKU总数',align: 'center',key: 'practicalsum',},{title: '实际必选SKU总数',align: 'center',key: 'requiredsum'},{title: '缺失必选SKU总数',align: 'center',key: 'deficiencysum'}],
            data10: [],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]     
        }
    },
    mounted(){
    // 下拉框
        let proUrl = this.portA+this.constData.MT_CL_DT_S;
        this.httpClient.get(proUrl).then((res)=>{
            console.log(res.data)
            let datas = res.data;
            for(var i = 0;i<datas.length;i++){
                this.sortLists.templateNameLists.push(datas[i].name)
            }
            this.sortLists.totalDA = datas;
        }); 
    },

    methods:{
        // 返回键
            goBack(){
                this.$router.push("/calculationLists");            
            },
        // 搜索数据
            sortData(){
                let url = this.portA + this.constData.MT_CL_DT;
                let tid = 0;
                for(var i = 0;i<this.sortLists.totalDA.length;i++){
                    if(this.sortLists.totalDA[i].name == this.sortList.templateName){
                        tid = this.sortLists.totalDA[i].id
                    }
                }
                let params = {tid: tid}
                this.httpClient.get(url,params).then((res)=>{  
                    console.log(res.data)       
                    let datas = res.data;
                    for(var i = 0;i<datas.length;i++){
                        switch(datas[i].type){
                            case 1: datas[i].type = 'A+'; break;
                            case 2: datas[i].type = 'A'; break;
                            case 3: datas[i].type = 'B'; break;
                            case 4: datas[i].type = 'C'; break;
                            case 5: datas[i].type = 'D'; break;
                            default: datas[i].type = '无';
                        }
                    } 
                    this.pageData = datas
                    if (this.pageData.length < 10) {
                        this.data10 = this.pageData
                    } else {
                        for(let i = 0; i<10; i++){
                            this.data10.push(this.pageData[i])
                        }
                    }
                });                
            },
        //导出表格数据
        exportData(){
            window.location.href = this.portA+this.constData.MT_CL_DT_export
        },

        // 换页操作

        changPage(page){    
            this.data10 = []
            if (this.pageData.length >= page*10) {
                for(var i = (page-1)*10; i<page*10; i++){
                    this.data10.push(this.pageData[i]) 
                }                  
            } else {
                for(var i = (page-1)*10; i<(this.pageData.length); i++){
                    this.data10.push(this.pageData[i]) 
                }                 
            }                               
        }      
      
    }
}
</script>
<style scoped lang="scss">
    .domesticationC{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .content{overflow: hidden;
            .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
                li{display:block; width: 200px; height: 40px; background: #cccccc;}
                li:hover{background: #5BB85D;}
                .active{background: #5BB85D;}
            }
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }

    } 
</style>