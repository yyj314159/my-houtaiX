<template>
    <div class="prescriptionC">
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
                            <Option v-for="(item,index) in templateNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Select v-model="sortList.projectName" style="width:150px" placeholder="必选产品">
                            <Option v-for="item in projectNameLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="edit">&nbsp;&nbsp;修改&nbsp;&nbsp;</Button>
                    </div>
                </Breadcrumb>                
                <Card>
                    <div class="content">
                        <div class="title">
                            <span>得分统计</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns10" :data="data10"></Table>
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                         
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'prescriptionC',
  data () {
    return {
    // 查询功能
        sortLists:{
            templateNameLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
            projectNameLists:["安阳"],
        },
        // 点击查询按钮发送的参数 
        sortList:{templateName:'',projectName:''},

        // 表格内容
        columns10: [{title: '项目名称',key: '项目名称'},{title: '项目编号',key: '项目编号'},{title: '调研对象',key: '调研对象',},{title: '调研编号',key: '调研编号'},{title: '地址',key: '地址'},
            {title: '项目状态',key: '项目状态'},{title: '结束日期',key: '结束日期'},{title: '一级指标扣分数',key: '一级指标扣分数'},{title: '二级指标扣分数',key: '二级指标扣分数'},{title: '总计',key: '总计'},
            {title: '总分',key: '总分'},{title: '访问上传得分',key: '访问上传得分'},{title: '一审修改得分',key: '一审修改得分'},{title: '二审修改得分',key: '二审修改得分'}, 
            {title: '最终得分',key: '最终得分'}],
        data10: [{项目名称: 'John Brown',项目编号: 18,调研对象: 'New York No. 1 Lake Park',调研编号: 55,地址: 23, 项目状态: 88,结束日期:77,一级指标扣分数:9,二级指标扣分数:44,总计:9,总分:44,访问上传得分:9,一审修改得分:44,
                二审修改得分:9,最终得分:44}],
    // 分页数据
        dataTotal:5,
        pageNum:5,
        dataPage:[]        
    }        
  },
  methods:{
    // 返回键
        goBack(){
            this.$router.push("/calculationLists");            
        }
    },
    // 编辑
        edit(){
            console.log("编辑")
        },
    //导出表格数据
    exportData(){
        console.log('导出数据')
    },

    // 换页操作
    changPage(page){
    //切换页码时更改表格相应数据
        // this.data7 = []
        // for (var index = (page-1)*5; index < (page)*5; index++) {
        //     this.data9.push(this.dataPage[index])          
        // } 
        console.log("换页操作")      
    } 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .prescriptionC{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .select{width: 100%; height: 50px;}        
        .content{height: 600px;
            .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
                li{display:block; width: 200px; height: 40px; background: #cccccc;}
                li:hover{background: #5BB85D;}
                .active{background: #5BB85D;}
            }
            .page{float: right; margin-top: 10px;}
        }        
    } 
</style>