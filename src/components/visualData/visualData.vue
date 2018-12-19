<template>
    <div class="visualData">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}"> 
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title">
                        <span>全国区域</span>
                        <el-button type="info" @click="goBack">返&nbsp;回</el-button>                     
                    </div>                
                </Breadcrumb>
                <Card> 
                    <div id="container"></div>
               </Card>              
            </Content>
        </Layout>
    </div>
</template>
<script>
import img from '../../assets/img/login/logo.png'
var echarts = require('echarts')
export default {
    name: 'visualData',
    mounted() {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
        option = {
            title : {
                text: '预算 vs 开销（Budget vs spending）',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                orient : 'vertical',
                x : 'right',
                y : 'bottom',
                data:['预算分配（Allocated Budget）','实际开销（Actual Spending）']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            polar : [
            {
                indicator : [
                    { text: '销售（sales）', max: 6000},
                    { text: '管理（Administration）', max: 16000},
                    { text: '信息技术（Information Techology）', max: 30000},
                    { text: '客服（Customer Support）', max: 38000},
                    { text: '研发（Development）', max: 52000},
                    { text: '市场（Marketing）', max: 25000},
                    ]
                }
            ],
            calculable : true,
            series : [
                {
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    data : [
                        {
                            value : [4300, 10000, 28000, 35000, 50000, 19000],
                            name : '预算分配（Allocated Budget）'
                        },
                        {
                            value : [5000, 14000, 28000, 31000, 42000, 21000],
                            name : '实际开销（Actual Spending）'
                        }
                    ]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }  

    },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.back(-1)
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.visualData{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    #container{width: 100%; height: 600px; margin: 0 auto 30px;}                
}
</style>