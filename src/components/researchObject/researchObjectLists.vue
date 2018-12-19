<template>
    <div class="researchObjectLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>条件筛选</span>
                        <el-button type="info" @click="modal1 = true">生成二维码</el-button>
                        <Modal
                            v-model="modal1"
                            title="请输入您想要的二维码数量"
                            :loading="loading"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <Input v-model="codeNum" placeholder="二维码数量" style="width:150px"/>
                        </Modal>                        
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
                        <Select v-model="sortList.researchobjtype" style="width:100px" placeholder="项目类型" filterable>
                            <Option v-for="(item,index) in sortLists.projectTypeLists" :value="item" :key="index">{{ item }}</Option>
                        </Select> 
                        <Select v-model="sortList.projectname" style="width:100px" placeholder="项目名称" filterable>
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>                            
                        <Select v-model="sortList.relationstate" style="width:150px" placeholder="二维码关联状态" filterable>
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Input v-model="sortList.researchnum" placeholder="调研编号" style="width:100px"/>&nbsp;&nbsp;
                        <Button type="success" @click="sortData">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>&nbsp;&nbsp;
                        <Button type="success" @click="importObj">导入调研对象</Button>                                           
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="researchObject" :data="researchObjectData" size="small"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                             
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from "axios"
import ports from "../../assets/js/ports"
import city from "../../../static/city.json"
export default {
    name: 'researchObjectLists',
    data () {
        return {
            portA: ports.a,
        // 二维码生成
            modal1:false,
            loading:"",
            codeNum:"",
        // 筛选框内容
            // 存贮省市区
            city:city, 
            // 查询功能
            sortLists:{
                provinceLists: [],
                cityLists:[],
                districtLists: [],
                auditStatusLists:['已关联','未关联'],
                projectTypeLists:["小区","店招","家化","道路",],
                projectNameLists:[]
            },
            // 点击查询按钮发送的参数 
            sortList:{provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',researchobjtype:'',projectname:'',},
            sortListstore:{},
            // 表格内容
            researchObject: [{title: '项目名称', align: 'center', key: 'projectname'},{title: '项目类型', align: 'center', key: 'researchobjtype'},{title: '地区', align: 'center', key: 'address'},{title: '调研编号', align: 'center', key: 'researchnum'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '关联日期', align: 'center', key: 'relationdate'},{title: '二维码关联状态', align: 'center', key: 'relationstate'},                                        
                        {title: '查看详情', align: 'center', key: '查看详情', 
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
                                        }, '详情')
                                ])             
                            }                              
                        }
                    ],
            researchObjectData: [],
            // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]     
        }
    },
    mounted(){
        document.title="调研对象列表"
    // 下拉项目列表数据
        let RO_L_CI = this.portA+this.constData.RO_L_CI
        this.httpClient.get(RO_L_CI).then((res)=>{
            this.sortLists.projectNameLists = res.data
        })
    // 请求列表总数据
        this.researchObjectData = [];
        var par = {}
        // 判断是不是第一次加载
        if(this.$route.query.con1 == undefined){
            par = JSON.parse(JSON.stringify(this.sortList))
        }else{
            par = JSON.parse(JSON.stringify(this.$route.query.con1))
            this.sortList = JSON.parse(JSON.stringify(this.$route.query.con1))
        }
        var tempPar = {provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',researchobjtype:'',projectname:'',};
        for (const key in tempPar) {
            if (par[key] == null || par[key] == undefined) {
                par[key] = tempPar[key];
            }
        }
        switch(par.relationstate){
            case "已关联": par.relationstate = 1; break;
            case "未关联": par.relationstate = 0; break;
        }
        switch(par.researchobjtype){
            case "小区": par.researchobjtype = 1; break;
            case "店招": par.researchobjtype = 2; break;
            case "家化": par.researchobjtype = 3; break;
            case "道路": par.researchobjtype = 4; break;           
        }
        let url = this.portA + this.constData.RO_L_Sort
        let params = {currPage:1,sortList:par}
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].projectname == undefined) {
                    datas[i].projectname = "无"
                }
                if (datas[i].researchobjtype == undefined) {
                    datas[i].researchobjtype = "无"
                }
                if (datas[i].address == undefined) {
                    datas[i].address = "无"
                }
                if (datas[i].researchobject == undefined) {
                    datas[i].researchobject = "无"
                }
                if (datas[i].researchnum == undefined) {
                    datas[i].researchnum = "无"
                }                
                if (datas[i].relationdate == undefined) {
                    datas[i].relationdate = "无"
                }
                if (datas[i].relationstate == undefined) {
                    datas[i].relationstate = "无"
                }
                switch(datas[i].relationstate){
                    case 1:datas[i].relationstate = "已关联"; break;
                    case 0:datas[i].relationstate = "未关联"; break;
                }
                switch(datas[i].researchobjtype){
                    case 1:datas[i].researchobjtype = "小区"; break;
                    case 2:datas[i].researchobjtype = "店招"; break;
                    case 3:datas[i].researchobjtype = "家化"; break;
                    case 4:datas[i].researchobjtype = "道路"; break;                    
                }

                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].relationdate == undefined){
                    datas[i].relationdate = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }              
            }            
            this.researchObjectData = datas;
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
            switch(par.relationstate){
                case "已关联": par.relationstate = 1; break;
                case "未关联": par.relationstate = 0; break;
            }
            switch(par.researchobjtype){
                case "小区": par.researchobjtype = 1; break;
                case "店招": par.researchobjtype = 2; break;
                case "家化": par.researchobjtype = 3; break;
                case "道路": par.researchobjtype = 4; break;           
            }                       
            window.location.href=this.portA+this.constData.RO_L_Export+"?provinceid="+par.provinceid+"&cityid="+par.cityid+"&districtid="+par.districtid+"&relationstate="+par.relationstate+"&researchnum="+par.researchnum+"&projectname="+par.projectname+"&researchobjtype="+par.researchobjtype             
        },   
    // 添加调研对象
        importObj (index) {
            this.$router.push("/addresearchObject")  
        },
    // 跳转到相应项目的位置
        show (id) {
            var condition1 = JSON.parse(JSON.stringify(this.sortList))
            this.$router.push({path:"/researchObjectDetail",query:{apid:id,condition1:condition1}}) 
        },    
    // 省市
        getProvince(val){
            this.stringUtil.getProvince(this.city,this.sortLists,this.sortList,val);
        },

        getCity(val){
            this.stringUtil.getCity(this.city,this.sortLists,this.sortList,val);             
        },

    // 生成二维码
        ok () {
            let url = this.portA + this.constData.RO_L_Code
            let params = {count:this.codeNum}
            this.httpClient.get(url,params).then((res)=>{
                this.modal1 = false;
                window.location.href=res.data
                this.codeNum = ""
            })
        },
        cancel () {
            this.codeNum = ""
            this.$Message.success("已取消")
        },     

    emptyData(){
    // 请求列表总数据        
        var par = {provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',researchobjtype:'',projectname:''};
        this.sortList = JSON.parse(JSON.stringify(par))
        let url = this.portA + this.constData.RO_L_Sort
        let params = {currPage:1,sortList:par}
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].projectname == undefined) {
                    datas[i].projectname = "无"
                }
                if (datas[i].researchobjtype == undefined) {
                    datas[i].researchobjtype = "无"
                }
                if (datas[i].address == undefined) {
                    datas[i].address = "无"
                }
                if (datas[i].researchobject == undefined) {
                    datas[i].researchobject = "无"
                }
                if (datas[i].researchnum == undefined) {
                    datas[i].researchnum = "无"
                }                
                if (datas[i].relationdate == undefined) {
                    datas[i].relationdate = "无"
                }
                if (datas[i].relationstate == undefined) {
                    datas[i].relationstate = "无"
                }

                switch(datas[i].relationstate){
                    case 1:datas[i].relationstate = "已关联"; break;
                    case 0:datas[i].relationstate = "未关联"; break;
                }
                switch(datas[i].researchobjtype){
                    case 1:datas[i].researchobjtype = "小区"; break;
                    case 2:datas[i].researchobjtype = "店招"; break;
                    case 3:datas[i].researchobjtype = "家化"; break;
                    case 4:datas[i].researchobjtype = "道路"; break;                    
                }

                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].relationdate == undefined){
                    datas[i].relationdate = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }              
            }            
            this.researchObjectData = datas;
            this.dataTotal = res.data.count;
        });
    },

    sortData(){
        var par = {provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',researchobjtype:'',projectname:''};
        for (const key in this.sortList) {
            if (this.sortList[key] != null) {
                 const element = this.sortList[key];
                 par[key] = this.sortList[key];
             }
        }
        this.researchObjectData = [];
        switch(par.relationstate){
            case "已关联": par.relationstate = 1; break;
            case "未关联": par.relationstate = 0; break;
        }
        switch(par.researchobjtype){
            case "小区": par.researchobjtype = 1; break;
            case "店招": par.researchobjtype = 2; break;
            case "家化": par.researchobjtype = 3; break;
            case "道路": par.researchobjtype = 4; break;           
        }
        let url = this.portA + this.constData.RO_L_Sort
        let params = {currPage:1,sortList:par}
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].projectname == undefined) {
                    datas[i].projectname = "无"
                }
                if (datas[i].researchobjtype == undefined) {
                    datas[i].researchobjtype = "无"
                }
                if (datas[i].address == undefined) {
                    datas[i].address = "无"
                }
                if (datas[i].researchobject == undefined) {
                    datas[i].researchobject = "无"
                }
                if (datas[i].researchnum == undefined) {
                    datas[i].researchnum = "无"
                }                
                if (datas[i].relationdate == undefined) {
                    datas[i].relationdate = "无"
                }
                if (datas[i].relationstate == undefined) {
                    datas[i].relationstate = "无"
                }

                switch(datas[i].relationstate){
                    case 1:datas[i].relationstate = "已关联"; break;
                    case 0:datas[i].relationstate = "未关联"; break;
                }
                switch(datas[i].researchobjtype){
                    case 1:datas[i].researchobjtype = "小区"; break;
                    case 2:datas[i].researchobjtype = "店招"; break;
                    case 3:datas[i].researchobjtype = "家化"; break;
                    case 4:datas[i].researchobjtype = "道路"; break;                    
                }

                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].relationdate == undefined){
                    datas[i].relationdate = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }              
            }            
            this.researchObjectData = datas;
            this.dataTotal = res.data.count;
        });
    },

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.researchObjectData = []
            var par = {}
            var tempPar = {provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',researchobjtype:'',projectname:'',};
            for (const key in tempPar) {
                if (par[key] == null || par[key] == undefined) {
                    par[key] = tempPar[key];
                }
            }        
            switch(par.relationstate){
                case "已关联": par.relationstate = 1; break;
                case "未关联": par.relationstate = 0; break;
            }
            switch(par.researchobjtype){
                case "小区": par.researchobjtype = 1; break;
                case "店招": par.researchobjtype = 2; break;
                case "家化": par.researchobjtype = 3; break;
                case "道路": par.researchobjtype = 4; break;           
            }

        let url = this.portA + this.constData.RO_L_Sort
        let params = {currPage:page,sortList:par}
        this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    if (datas[i].projectname == undefined) {
                        datas[i].projectname = "无"
                    }
                    if (datas[i].researchobjtype == undefined) {
                        datas[i].researchobjtype = "无"
                    }
                    if (datas[i].address == undefined) {
                        datas[i].address = "无"
                    }
                    if (datas[i].researchobject == undefined) {
                        datas[i].researchobject = "无"
                    }
                    if (datas[i].researchnum == undefined) {
                        datas[i].researchnum = "无"
                    }                
                    if (datas[i].relationdate == undefined) {
                        datas[i].relationdate = "无"
                    }
                    if (datas[i].relationstate == undefined) {
                        datas[i].relationstate = "无"
                    }
                    switch(datas[i].relationstate){
                        case 1:datas[i].relationstate = "已关联"; break;
                        case 0:datas[i].relationstate = "未关联"; break;
                    }
                    switch(datas[i].researchobjtype){
                        case 1:datas[i].researchobjtype = "小区"; break;
                        case 2:datas[i].researchobjtype = "店招"; break;
                        case 3:datas[i].researchobjtype = "家化"; break;
                        case 4:datas[i].researchobjtype = "道路"; break;                    
                    }

                    if(datas[i].address == undefined){
                        datas[i].address = "无"
                    }
                    if(datas[i].name == undefined){
                        datas[i].name = "无"
                    }
                    if(datas[i].relationdate == undefined){
                        datas[i].relationdate = "无"
                    }                
                    if(datas[i].attestationuser == undefined){
                        datas[i].attestationuser = "无"
                    }
                    if(datas[i].attestationtime == undefined){
                        datas[i].attestationtime = "无"
                    }              
                }            
                this.researchObjectData = datas;
                this.dataTotal = res.data.count;
            });        
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .researchObjectLists{ overflow: hidden; min-width: 1366px;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .content{overflow: hidden;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>