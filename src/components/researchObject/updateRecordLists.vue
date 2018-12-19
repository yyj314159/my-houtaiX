<template>
    <div class="updateRecordLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>条件筛选</span>  
                    </div>
                    <div class="select">                             
                        <Select v-model="sortList.provinceid" style="width:100px" placeholder="省" @on-change="getProvince">
                            <Option v-for="item in sortLists.provinceLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="sortList.cityid" style="width:100px" placeholder="市" @on-change="getCity">
                            <Option v-for="item in sortLists.cityLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="sortList.districtid" style="width:100px" placeholder="县/区">
                            <Option v-for="item in sortLists.districtLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>&nbsp;&nbsp;                     
                        <DatePicker type="date" placeholder="开始日期" :clearable='false' style="width: 120px" @on-change="getStartTime" v-model="sortList.starttime"></DatePicker>                                                       
                        <DatePicker type="date" placeholder="截止日期" :clearable='false' style="width: 120px" @on-change="getOverTime" v-model="sortList.endtime"></DatePicker>&nbsp;&nbsp;                         
                        <Select v-model="sortList.attestationstate" style="width:100px" placeholder="认证状态" filterable>
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.researchobjtype" style="width:100px" placeholder="项目类型" filterable>
                            <Option v-for="(item,index) in sortLists.projectTypeLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>                         
                        <Select v-model="sortList.projectname" style="width:100px" placeholder="项目名称" filterable>
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Input v-model="sortList.researchnum" placeholder="调研编号" style="width:100px"/>
                        <Button type="success" @click="sortData">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <div class="power">
                            <Button type="success" @click="batchThrough">&nbsp;&nbsp;批量认证&nbsp;&nbsp;</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="updateRecord" :data="updateRecordData" size="small" @on-select="selectData" @on-select-cancel="cancelData" @on-select-all="selectAllData"></Table>
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
import ports from "../../assets/js/ports"
import city from "../../../static/city.json"
export default {
    name: 'updateRecordLists',
    data () {
        return {
            portA: ports.a,
        // 筛选框内容
            // 存贮省市区
            city:city, 
            // 查询功能
            sortLists:{
                provinceLists: [],
                cityLists:[],
                districtLists: [],
                auditStatusLists:["全部","已认证","未认证","已退回"],
                projectTypeLists:["小区","店招","家化","道路",],
                projectNameLists:[]
            },
            // 点击查询按钮发送的参数 
            sortList:{provinceid:'',cityid:'',districtid:'',starttime:'',endtime:'',projectname:'',attestationstate:'',researchobjtype:'',researchnum:''},
            // 批量认证
            attestatioData:[],
            // 表格内容
            updateRecord: [{type: 'selection',width: 50,align: 'center'},{title: '项目名称', align: 'center', key: 'projectname'},{title: '项目类型', align: 'center', key: 'researchobjtype'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '调研编号', align: 'center', key: 'researchnum'},{title: '详细地址', align: 'center', key: 'address'},{title: '复查访问员', align: 'center', key: 'name'},                                        
                        {title: '更新时间', align: 'center', key: 'updatetime'},{title: '认证员', align: 'center', key: 'attestationuser'},{title: '确认时间', align: 'center', key: 'attestationtime'},{title: '认证状态', align: 'center', key: 'attestationstate'},
                        {title: '操作', align: 'center', key: '操作', 
                            render: (h, params) => {
                                    return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.show(params.row.pid)
                                                }
                                            }
                                        }, '查看/操作')
                                ])             
                            }                              
                        }
                    ],
            updateRecordData: [],       
        // 分页数据
            dataTotal:10,
            pageNum:10,              
        }
    },
    mounted(){
        document.title="更新记录"
    // 下拉项目列表数据
        let RO_L_CI = this.portA+this.constData.RO_L_CI
        this.httpClient.get(RO_L_CI).then((res)=>{
            this.sortLists.projectNameLists = res.data
        })
    // 请求列表总数据        
        var par = {}
        // 判断是不是第一次加载
        if(this.$route.query.con == undefined){
            par = JSON.parse(JSON.stringify(this.sortList))
        }else{
            par = JSON.parse(JSON.stringify(this.$route.query.con))
            this.sortList = JSON.parse(JSON.stringify(this.$route.query.con))
        }
        
        var tempPar = {provinceid:'',cityid:'',districtid:'',starttime:'',endtime:'',projectname:'',attestationstate:'',researchobjtype:'',researchnum:''};
        for (const key in tempPar) {
            if (par[key] == null || par[key] == undefined) {
                par[key] = tempPar[key];
            }
        }
        switch(par.attestationstate){
            case "全部": par.attestationstate = 0; break;
            case "已认证": par.attestationstate = 1; break;
            case "未认证": par.attestationstate = 2; break;
            case "已退回": par.attestationstate = 3; break;           
        }       
        switch(par.researchobjtype){
            case "小区": par.researchobjtype = 1; break;
            case "店招": par.researchobjtype = 2; break;
            case "家化": par.researchobjtype = 3; break;
            case "道路": par.researchobjtype = 4; break;           
        }
        let url = (this.portA + this.constData.RO_UP_Sort)
        let params = {currPage:1,sortList:par}
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if(datas[i].projectname == undefined){
                    datas[i].projectname = "无"
                }
                if(datas[i].researchobjtype == undefined){
                    datas[i].researchobjtype = "无"
                }
                if(datas[i].researchobject == undefined){
                    datas[i].researchobject = "无"
                }
                if(datas[i].researchnum == undefined){
                    datas[i].researchnum = "无"
                }
                if(datas[i].attestationstate == undefined){
                    datas[i].attestationstate = "无"
                }
                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].updatetime == undefined){
                    datas[i].updatetime = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }
                switch(datas[i].attestationstate){
                    case 0:datas[i].attestationstate = "全部"; break;
                    case 1:datas[i].attestationstate = "已认证"; break;
                    case 2:datas[i].attestationstate = "未认证"; break;
                    case 3:datas[i].attestationstate = "已退回"; break;                    
                }                                 
                switch(datas[i].researchobjtype){
                    case 1:datas[i].researchobjtype = "小区"; break;
                    case 2:datas[i].researchobjtype = "店招"; break;
                    case 3:datas[i].researchobjtype = "家化"; break;
                    case 4:datas[i].researchobjtype = "道路"; break;                    
                }
            }
            this.updateRecordData = datas;
            this.dataTotal = res.data.count;            
        });
    // 三级联动——省(拿数据)
        for(var i in this.city){
            var obj = {
                value:city[i].id,
                label:city[i].name
            }
            this.sortLists.provinceLists.push(obj)                                
        }

    },
  methods:{
    // 导出表格数据
        exportData(){
            let par = JSON.parse(JSON.stringify(this.sortList))
            switch(par.attestationstate){
                case "全部": par.attestationstate = 0; break;
                case "已认证": par.attestationstate = 1; break;
                case "未认证": par.attestationstate = 2; break;
                case "已退回": par.attestationstate = 3; break;           
            }       
            switch(par.researchobjtype){
                case "小区": par.researchobjtype = 1; break;
                case "店招": par.researchobjtype = 2; break;
                case "家化": par.researchobjtype = 3; break;
                case "道路": par.researchobjtype = 4; break;           
            }                         
            window.location.href=this.portA+this.constData.RO_UP_Export+"?provinceid="+par.provinceid+"&cityid="+par.cityid+"&districtid="+par.districtid+"&starttime="+par.starttime+"&endtime="+par.endtime+"&projectname="+par.projectname+"&attestationstate="+par.attestationstate+"&researchnum="+par.researchnum+"&researchobjtype="+par.researchobjtype            
        }, 
    // 省市
        getProvince(val){
            this.stringUtil.getProvince(this.city,this.sortLists,this.sortList,val);
        },

        getCity(val){
            this.stringUtil.getCity(this.city,this.sortLists,this.sortList,val);             
        },

    // 跳转详情页
        show (id) {
            var condition = JSON.parse(JSON.stringify(this.sortList))
            this.$router.push({path:"/checkLists",query:{apid:id,condition:condition}})  
        },
    // 获取搜索日期
        getStartTime(value){
            this.stringUtil.getStartTime(this.$Message,this.sortList,value)
        },
        getOverTime(value){
            this.stringUtil.getOverTime(this.$Message,this.sortList,value)                     
        },

    // 清空
        emptyData(){           
            var par = {provinceid:'',cityid:'',districtid:'',starttime:'',endtime:'',projectname:'',attestationstate:'',researchobjtype:'',researchnum:''}
            this.sortList = JSON.parse(JSON.stringify(par))                  
            let url = (this.portA + this.constData.RO_UP_Sort)
            let params = {currPage:1,sortList:par}
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    if(datas[i].projectname == undefined){
                        datas[i].projectname = "无"
                    }
                    if(datas[i].researchobjtype == undefined){
                        datas[i].researchobjtype = "无"
                    }
                    if(datas[i].researchobject == undefined){
                        datas[i].researchobject = "无"
                    }
                    if(datas[i].researchnum == undefined){
                        datas[i].researchnum = "无"
                    }
                    if(datas[i].attestationstate == undefined){
                        datas[i].attestationstate = "无"
                    }
                    if(datas[i].address == undefined){
                        datas[i].address = "无"
                    }
                    if(datas[i].name == undefined){
                        datas[i].name = "无"
                    }
                    if(datas[i].updatetime == undefined){
                        datas[i].updatetime = "无"
                    }                
                    if(datas[i].attestationuser == undefined){
                        datas[i].attestationuser = "无"
                    }
                    if(datas[i].attestationtime == undefined){
                        datas[i].attestationtime = "无"
                    }
                    switch(datas[i].attestationstate){
                        case 0:datas[i].attestationstate = "全部"; break;
                        case 1:datas[i].attestationstate = "已认证"; break;
                        case 2:datas[i].attestationstate = "未认证"; break;
                        case 3:datas[i].attestationstate = "已退回"; break;                    
                    }                                 
                    switch(datas[i].researchobjtype){
                        case 1:datas[i].researchobjtype = "小区"; break;
                        case 2:datas[i].researchobjtype = "店招"; break;
                        case 3:datas[i].researchobjtype = "家化"; break;
                        case 4:datas[i].researchobjtype = "道路"; break;                    
                    }
                }
                this.updateRecordData = datas;
                this.dataTotal = res.data.count;            
            });
        },
        sortData(){
            var par = {provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',researchobjtype:'',projectname:''};
            for (const key in this.sortList) {
                if (this.sortList[key] != null) {
                    par[key] = this.sortList[key];
                }
            }
            this.updateRecordData = [];
            switch(par.attestationstate){
                case "全部": par.attestationstate = 0; break;
                case "已认证": par.attestationstate = 1; break;
                case "未认证": par.attestationstate = 2; break;
                case "已退回": par.attestationstate = 3; break;           
            }       
            switch(par.researchobjtype){
                case "小区": par.researchobjtype = 1; break;
                case "店招": par.researchobjtype = 2; break;
                case "家化": par.researchobjtype = 3; break;
                case "道路": par.researchobjtype = 4; break;           
            }
            let url = (this.portA + this.constData.RO_UP_Sort)
            let params = {currPage:1,sortList:par}
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    if(datas[i].projectname == undefined){
                        datas[i].projectname = "无"
                    }
                    if(datas[i].researchobjtype == undefined){
                        datas[i].researchobjtype = "无"
                    }
                    if(datas[i].researchobject == undefined){
                        datas[i].researchobject = "无"
                    }
                    if(datas[i].researchnum == undefined){
                        datas[i].researchnum = "无"
                    }
                    if(datas[i].attestationstate == undefined){
                        datas[i].attestationstate = "无"
                    }
                    if(datas[i].address == undefined){
                        datas[i].address = "无"
                    }
                    if(datas[i].name == undefined){
                        datas[i].name = "无"
                    }
                    if(datas[i].updatetime == undefined){
                        datas[i].updatetime = "无"
                    }                
                    if(datas[i].attestationuser == undefined){
                        datas[i].attestationuser = "无"
                    }
                    if(datas[i].attestationtime == undefined){
                        datas[i].attestationtime = "无"
                    }
                    switch(datas[i].attestationstate){
                        case 0:datas[i].attestationstate = "全部"; break;
                        case 1:datas[i].attestationstate = "已认证"; break;
                        case 2:datas[i].attestationstate = "未认证"; break;
                        case 3:datas[i].attestationstate = "已退回"; break;                    
                    }                                 
                    switch(datas[i].researchobjtype){
                        case 1:datas[i].researchobjtype = "小区"; break;
                        case 2:datas[i].researchobjtype = "店招"; break;
                        case 3:datas[i].researchobjtype = "家化"; break;
                        case 4:datas[i].researchobjtype = "道路"; break;                    
                    }
                }
                this.updateRecordData = datas;
                this.dataTotal = res.data.count;          
            });
        },
    // 批量通过
        selectData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.pid)
            })
        },
        selectAllData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.pid)
            })
        },
        cancelData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.pid)
            })
        },
        batchThrough(){
            let pid = ''
            this.attestatioData.forEach((item)=>{
                pid += item + ','
            })
            let url =  this.portA+this.constData.RO_UP_BT;
            let params = {pids : pid.slice(0,pid.length-1),type:1}
            this.httpClient.post(url,params).then((res)=>{
                this.$Message.info(res.data.msg);
                this.$router.go(0)
            })
        },
  
    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.updateRecordData = [];
            let par = {}
            var tempPar = {provinceid:'',cityid:'',districtid:'',starttime:'',endtime:'',projectname:'',attestationstate:'',researchobjtype:'',researchnum:''};
            for (const key in tempPar) {
                if (par[key] == null || par[key] == undefined) {
                    par[key] = tempPar[key];
                }
            }
            switch(par.attestationstate){
                case "全部": par.attestationstate = 0; break;
                case "已认证": par.attestationstate = 1; break;
                case "未认证": par.attestationstate = 2; break;
                case "已退回": par.attestationstate = 3; break;           
            }       
            switch(par.researchobjtype){
                case "小区": par.researchobjtype = 1; break;
                case "店招": par.researchobjtype = 2; break;
                case "家化": par.researchobjtype = 3; break;
                case "道路": par.researchobjtype = 4; break;           
            }
            let url = (this.portA + this.constData.RO_UP_Sort)
            let params = {currPage:page,sortList:par}
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    if(datas[i].projectname == undefined){
                        datas[i].projectname = "无"
                    }
                    if(datas[i].researchobjtype == undefined){
                        datas[i].researchobjtype = "无"
                    }
                    if(datas[i].researchobject == undefined){
                        datas[i].researchobject = "无"
                    }
                    if(datas[i].researchnum == undefined){
                        datas[i].researchnum = "无"
                    }
                    if(datas[i].attestationstate == undefined){
                        datas[i].attestationstate = "无"
                    }
                    if(datas[i].address == undefined){
                        datas[i].address = "无"
                    }
                    if(datas[i].name == undefined){
                        datas[i].name = "无"
                    }
                    if(datas[i].updatetime == undefined){
                        datas[i].updatetime = "无"
                    }                
                    if(datas[i].attestationuser == undefined){
                        datas[i].attestationuser = "无"
                    }
                    if(datas[i].attestationtime == undefined){
                        datas[i].attestationtime = "无"
                    }
                    switch(datas[i].attestationstate){
                        case 0:datas[i].attestationstate = "全部"; break;
                        case 1:datas[i].attestationstate = "已认证"; break;
                        case 2:datas[i].attestationstate = "未认证"; break;
                        case 3:datas[i].attestationstate = "已退回"; break;                    
                    }                                 
                    switch(datas[i].researchobjtype){
                        case 1:datas[i].researchobjtype = "小区"; break;
                        case 2:datas[i].researchobjtype = "店招"; break;
                        case 3:datas[i].researchobjtype = "家化"; break;
                        case 4:datas[i].researchobjtype = "道路"; break;                    
                    }
                }
                this.updateRecordData = datas;
                this.dataTotal = res.data.count;          
            });                                  
        }
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .updateRecordLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .select{width: 100%;}
        .content{overflow: hidden;
            .power{margin-bottom: 10px;}
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>