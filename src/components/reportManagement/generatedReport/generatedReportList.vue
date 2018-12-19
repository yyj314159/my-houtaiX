<template>
  <div class="generatedReportList">
      <Layout :style="{marginLeft: '200px'}">            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                  
                    <div class="title"><span>条件筛选</span></div>
                    <div class="select">                             
                        <Select v-model="sortList.projectName" style="width:100px" placeholder="报告名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <DatePicker type="date" placeholder="开始日期" :clearable='false' style="width: 120px" @on-change="getStartTime" v-model="sortList.starttime"></DatePicker>                                                       
                        <DatePicker type="date" placeholder="截止日期" :clearable='false' style="width: 120px" @on-change="getOverTime" v-model="sortList.endtime"></DatePicker>&nbsp;&nbsp;                         

                        <Button type="success">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="generatedReport" :data="generatedReportData" size="small"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                       
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import axios from 'axios'
export default {
  name: 'generatedReportList',
  data () {
    return {
        // 查询功能
            sortLists:{
                projectNameLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
            },
            // 点击查询按钮发送的参数 
            sortList:{projectName:null,startTime:null,overTime:null},
        // 表格数据
        generatedReport: [
            {title: '报告名称', key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }            
            },           
            {title: '操作人', align: 'center', key: 'operator'},{title: '创建时间', align: 'center', key: 'startTime'},                    
            {title: '操作', align: 'center', key: 'operate', 
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '查看')
                    ]);
                }
            }
        ],
        generatedReportData: [{name: '中国上海',operator: '龙凤店',startTime:999},{name: '中国北京',operator: '小女店',startTime:909}], 
        

        // 分页数据
            dataTotal:5,
            pageNum:5,
            dataPage:[]   

    }
  },
  mounted() {
        document.title = "已生成报告"
    //请求列表总数据
    // axios({
    //     url:"http://192.168.0.133:8080/querystorestate",  
    //     methods:'get',             
    //     params:{name:'generatedReportList'}                           
    // }).then((res)=>{
    //     console.log(res.data) 
    //     this.data = res.data;       
    //     this.dataTotal = res.data.length + 1;
    //     // 初始页面数据
    //     for (let index = 0; index < 10; index++) {
    //         this.generatedReportData.push(this.data[index])           
    //     }
    // })                 
  },
  methods:{
    // 导出数据
       exportData(){
           console.log("导出数据")
            // window.location.href=""
       },
    // 获取搜索日期
        getStartTime(value){
            this.stringUtil.getStartTime(this.$Message,this.sortList,value)
        },
        getOverTime(value){
            this.stringUtil.getOverTime(this.$Message,this.sortList,value)                     
        },

    // 表格操作（对门店的修改）
        show (index) {
            this.generatedlist.index= index; 
            for(let key in this.generatedReportData[index]){
                this.generatedlist[key]=this.generatedReportData[index][key];
            }                  
            console.log(this.generatedlist.index)
        },
        remove (index) {
    // 前端页面显示删除
            this.generatedReportData.splice(index, 1);
        // 删除操作通知后台
            // axios({
            //     url:"http://192.168.0.133:8080/downloadTemplet", 
            //     params:{index}, 
            //     methods:'get',                                        
            // })

        },
        emptyData(){
            var par = {ragency:'',hpobj:'',tstate:'',astate:'',rnum:''}
            this.sortList = JSON.parse(JSON.stringify(par))                      
             axios({
                url:this.portA+"fTaskInfo",  
                method:'get',
                params:{currPage:1,sortList:par}                          
            }).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    if(datas[i].astate == 1){
                        datas[i].astate = "已审核"
                    }
                    if(datas[i].astate == 0){
                        datas[i].astate = "未审核"
                    } 
                    if(datas[i].tstate == 1){
                        datas[i].tstate = "已完成"
                    }
                    if(datas[i].tstate == 0){
                        datas[i].tstate = "未完成"
                    }
                    if(datas[i].edate == null){
                        datas[i].edate = "无"
                    }
                    if(datas[i].iname == null){
                        datas[i].iname = "无"
                    }     
                }
                this.firstInstanceData = datas;
                this.dataTotal = res.data.count; 
            });          
        },

    // 编辑数据
        handleSuccess(){
            // 将修改后的数据存到前端相应的位置
            for(let key in this.generatedReportData[this.generatedlist.index]){
                this.generatedReportData[this.generatedlist.index][key]=this.generatedlist[key];
            }  
            // 把修改后的整条数据发给后台保存
            // axios({
            //     url:"http://192.168.0.133:8080/downloadTemplet", 
            //     params:{generatedlist.index,this.generatedReportData[generatedlist.index].name,this.generatedReportData[generatedlist.index].operator,this.generatedReportData[generatedlist.index].startTime}, 
            //     methods:'get',                                        
            // })

            console.log(this.generatedReportData[this.generatedlist.index].name)             
        },


    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.generatedReportData = []
            for (var index = (page-1)*5; index < (page)*5; index++) {
                this.generatedReportData.push(this.dataPage[index])          
            }       
        }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.generatedReportList{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    .select{width: 650px;}
    .content{overflow: hidden;
        .page{float: right; margin-top: 10px; margin-bottom: 5px;}
    }
}
</style>