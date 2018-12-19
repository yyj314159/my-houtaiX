<template>
    <div class="shopLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}" class="add">                   
                        <el-button type="success" size="normal" :style="{marginTop:'-9px'}" @click="modal12 = true">单个门店添加</el-button>  
                        <el-button type="success" size="normal" :style="{marginTop:'-9px'}" @click="downloadTemplate">模板下载</el-button> 
                        <Upload                            
                            multiple
                            :format="['xls','xlsx']"                            
                            :on-format-error="handleFormatError"
                            :on-success="handleSuccessB"
                            action="http://192.168.0.42:8080/upStore"  
                            >   
                            <Button icon="ios-cloud-upload-outline">批量上传</Button>
                        </Upload> 

                    <Modal
                        title="单个门店添加"
                        ok-text='添加'
                        v-model="modal12"
                        @on-ok="handleSuccessAdd"
                        @on-cancel = "handleCancelAdd()"
                        draggable
                        class-name="vertical-center-modal">                       
                            <div class="addshop"><br>
                            <Select v-model="addOnestore.provinceid" style="width:100px" placeholder="省" @on-change="getProvince1">
                                <Option v-for="item in sortLists.provinceLists1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="addOnestore.cityid" style="width:100px" placeholder="市" @on-change="getCity1">
                                <Option v-for="item in sortLists.cityLists1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="addOnestore.districtid" style="width:100px" placeholder="县/区">
                                <Option v-for="item in sortLists.districtLists1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="addOnestore.pjtype" style="width:100px" placeholder="项目类别">
                                <Option v-for="(item,index) in sortLists.pjtypeLists" :value="item" :key="index">{{ item}}</Option>
                            </Select>&nbsp;&nbsp;                                                                              
                                <Input v-model="addOnestore.rnum" placeholder="门店编号" style="width: 200px;margin-top:5px" />
                                <Input v-model="addOnestore.robj" placeholder="门店名称" style="width: 200px;margin-top:5px" />
                                <Select v-model="addOnestore.areastate" style="width: 200px;margin-top:5px" placeholder="面积范围">                           
                                    <Option v-for="(item,index) in sortLists.areastateLists" :value="item" :key="index">{{ item }}</Option>
                                </Select>
                                <Select v-model="addOnestore.storelevel" style="width:200px; margin-top:5px" placeholder="门店等级">
                                    <Option v-for="(item,index) in sortLists.storeLevelLists" :value="item" :key="index">{{ item }}</Option>
                                </Select>
                                <Input v-model="addOnestore.latitude" placeholder="门店经度" style="width: 200px;margin-top:5px" />
                                <Input v-model="addOnestore.longitude" placeholder="门店纬度" style="width: 200px;margin-top:5px" /><br>
                                <Input v-model="addOnestore.raddress" placeholder="详细地址" style="width: 402px;margin-top:5px" />                                                                            
                            </div>                                                                                                    
                    </Modal>
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <div class="title"><span>条件筛选</span></div>
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
                            <Input v-model="sortList.robj" placeholder="门店名称" style="width:100px"/>
                            <Select v-model="sortList.storelevel" style="width:100px" placeholder="门店等级" filterable >
                                <Option v-for="(item,index) in sortLists.storeLevelLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.areastate" style="width:100px" placeholder="面积范围" filterable >                           
                                <Option v-for="(item,index) in sortLists.areastateLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Button type="success" @click="querystorestate">搜索</Button>
                            <Button type="success" @click="emptyData">清空条件</Button>
                        </div>
                        <br/>
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns9" :data="data9" size="small"></Table>
                        <Modal
                            title="单个门店修改"
                            ok-text='保存'
                            v-model="modal4"
                            @on-ok="handleSM()"
                            @on-cancle="handleCM">
                                <div class="modify">
                                    <div><h3>区域:</h3>
                                        <Select v-model="storeList.provinceid" style="width:150px" placeholder="省" @on-change="getProvince2">
                                            <Option v-for="item in sortLists.provinceLists2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="storeList.cityid" style="width:150px" placeholder="市" @on-change="getCity2">
                                            <Option v-for="item in sortLists.cityLists2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="storeList.districtid" style="width:150px" placeholder="县/区">
                                            <Option v-for="item in sortLists.districtLists2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>&nbsp;&nbsp;                                                                            
                                    </div>                                                                             
                                    <h3>门店名称:</h3><Input v-model="storeList.robj" placeholder="门店名称"/>                                                              
                                    <h3>门店编号:</h3><Input v-model="storeList.rnum" placeholder="门店编号"/>
                                    <h3>详细地址:</h3><Input v-model="storeList.raddress" placeholder="详细地址"/>                                                                                                                                                                                                                                                   
                                            <h3>门店等级:</h3>
                                            <Select v-model="storeList.storelevel" placeholder="门店等级" >
                                                <Option v-for="(item,index) in sortLists.storeLevelLists" :value="item" :key="index">{{ item }}</Option>
                                            </Select>                                                                               
                                            <h3>面积范围:</h3>
                                            <Select v-model="storeList.areastate" placeholder="面积范围">                           
                                                <Option v-for="(item,index) in sortLists.areastateLists" :value="item" :key="index">{{ item }}</Option>
                                            </Select>                                                                                                                                    
                                    <h3>门店经度:</h3><Input v-model="storeList.latitude" placeholder="门店经度"/>
                                    <h3>门店纬度:</h3><Input v-model="storeList.longitude" placeholder="门店纬度"/>                                    
                                </div> 
                        </Modal>                         
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
    name: 'shopLists',
    data () {
        return {  
            portA: ports.a,          
        //添加单个列表
            modal12:false,
            addOnestore:{provinceid:'',cityid:'',districtid:'',pjtype:'',storelevel:'',areastate:'',rnum:'',robj:'',longitude:'',latitude:'',raddress:''},           
        // 表格数据
            columns9: [{title: '区域', key: 'area',align: 'center', 
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.area)
                            ]);
                        }            
                },
                {title: '门店名称',align: 'center', key: 'robj'},{title: '门店编号',align: 'center', key: 'rnum'},{title: '详细地址',align: 'center', key: 'raddress'},{title: '门店等级',align: 'center', key: 'storelevel'},{title: '面积范围(m^2)',align: 'center', key: 'areastate'},{title: '经度',align: 'center', key: 'longitude'},{title: '纬度',align: 'center', key: 'latitude'},                    
                {title: '操作',key: '操作', align: 'center', width: 130, 
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
                                        this.show(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data9:[],                             
        // 查询功能
            sortLists:{
                provinceLists: [],
                cityLists:[],
                districtLists: [],
                provinceLists1: [],
                cityLists1:[],
                districtLists1: [],
                pjtypeLists:["家化","实效"],
                provinceLists2: [],
                cityLists2:[],
                districtLists2: [],                
                robjLists:[],
                storeLevelLists:['A+','A','B','C','D'],
                areastateLists:['50-99','100-499','500-999','1000-2999','>3000']
            },
            // 存贮省市区
            city:city, 
            // 点击查询按钮发送的参数 
            sortList:{provinceid:'',cityid:'',districtid:'',robj:"",storelevel:"",areastate:""},
        // modal数据（编辑操作）
            storeList:{provinceid:'',cityid:'',districtid:'',robj:'',rnum:'',raddress:'',storelevel:'',areastate:'',latitude:'',longitude:'',index:''},
            modal4:false,

        // 上传
            action:ports.a+"upStore",
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]  
        }
    },
    mounted() {
        document.title = "门店列表"
    // 请求列表总数据
        var par = {provinceid:'',cityid:'',districtid:'',robj:"",storelevel:"",areastate:""};
        switch(par.storelevel){
            case 'A+': par.storelevel = 1; break;
            case 'A': par.storelevel = 2; break;
            case 'B': par.storelevel = 3; break;
            case 'C': par.storelevel = 4; break;
            case 'D': par.storelevel = 5; break;
        }             
        switch(par.areastate){
            case '50-99': par.areastate = 5; break;
            case '100-499': par.areastate = 4; break;
            case '500-999': par.areastate = 3; break;
            case '1000-2999': par.areastate = 2; break;
            case '>3000': par.areastate = 1; break;
        }         
        let params = {currPage:1,sortList:par};
        let url = this.portA+this.constData.S_Sort     
        this.httpClient.get(url,params).then((res)=>{
            let datas = res.data.datas
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].robj == undefined) {
                    datas[i].robj = "无"
                }
                if (datas[i].rnum == undefined) {
                    datas[i].rnum = "无"
                }
                if (datas[i].raddress == undefined) {
                    datas[i].raddress = "无"
                } 
                switch(datas[i].storelevel){
                    case 1: datas[i].storelevel = 'A+'; break;
                    case 2: datas[i].storelevel = 'A'; break;
                    case 3: datas[i].storelevel = 'B'; break;
                    case 4: datas[i].storelevel = 'C'; break;
                    case 5: datas[i].storelevel = 'D'; break;
                    default: datas[i].storelevel = '无';
                }             
                switch(datas[i].areastate){
                    case 5: datas[i].areastate = '50-99'; break;
                    case 4: datas[i].areastate = '100-499'; break;
                    case 3: datas[i].areastate = '500-999'; break;
                    case 2: datas[i].areastate = '1000-2999'; break;
                    case 1: datas[i].areastate = '>3000'; break;
                    default: datas[i].areastate = '无';
                } 
                for(var j = 0;j<this.city.length;j++){
                    if(this.city[j].id == datas[i].provinceid){
                        datas[i].provinceid = this.city[j].name
                        for(var k = 0;k<this.city[j].child.length;k++){
                            if(this.city[j].child[k].id == datas[i].cityid){
                                datas[i].cityid = this.city[j].child[k].name
                                for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                    if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                        datas[i].districtid = this.city[j].child[k].child[l].name
                                    }
                                }
                            }
                        }
                    }
                }
                datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid              
            }            
            this.data9 = datas;
            this.dataTotal = res.data.count;
        });

    // 三级联动——省(拿数据)
        for(var i in this.city){
            var obj = {
                value:city[i].id,
                label:city[i].name
            }
            this.sortLists.provinceLists.push(obj)
            this.sortLists.provinceLists1.push(obj)
            this.sortLists.provinceLists2.push(obj)                                
        }        
    },
    methods: {
        //导出表格数据
        exportData(){
            let par = JSON.parse(JSON.stringify(this.sortList))
            switch(par.storelevel){
                case 'A+': par.storelevel = 1; break;
                case 'A': par.storelevel = 2; break;
                case 'B': par.storelevel = 3; break;
                case 'C': par.storelevel = 4; break;
                case 'D': par.storelevel = 5; break;
            }             
            switch(par.areastate){
                case '50-99': par.areastate = 5; break;
                case '100-499': par.areastate = 4; break;
                case '500-999': par.areastate = 3; break;
                case '1000-2999': par.areastate = 2; break;
                case '>3000': par.areastate = 1; break;
            }               
            window.location.href = this.portA+"exportSto?provinceid="+par.provinceid+"&cityid="+par.cityid+"&districtid="+par.districtid+"&robj="+par.robj+"&storelevel="+par.storelevel+"&areastate="+par.areastate
        },
    // 三级联动——省(发送)
        getProvince(val){
            this.stringUtil.getProvince(this.city,this.sortLists,this.sortList,val);
        },
        getProvince1(val){
            this.sortLists.cityLists1=[]
            this.addOnestore.provinceid = val 
            this.addOnestore.districtid = '' 
            this.addOnestore.cityid = ''             
            var city = this.city;  
             for(var i in city){
                if(val == city[i].id){                 
                   var shi = city[i].child
                   for(var j in shi){
                       var obj = {
                           value:shi[j].id,
                           label:shi[j].name
                       }                                             
                        this.sortLists.cityLists1.push(obj)
                   }                   
                }
              }
        },
        getProvince2(val){
            this.sortLists.cityLists1=[]
            this.storeList.provinceid = val 
            this.storeList.districtid = '' 
            this.storeList.cityid = ''             
            var city = this.city;  
             for(var i in city){
                if(val == city[i].id){                 
                   var shi = city[i].child
                   for(var j in shi){
                       var obj = {
                           value:shi[j].id,
                           label:shi[j].name
                       }                                             
                        this.sortLists.cityLists2.push(obj)
                   }                   
                }
              }
        },        
    // 三级联动——市(发送)
        getCity(val){
            this.stringUtil.getCity(this.city,this.sortLists,this.sortList,val);             
        },
        getCity1(val2){
            this.sortLists.districtLists1=[] 
            this.addOnestore.districtid = ''         
            this.addOnestore.cityid = val2                   
            var city = this.city;  
             for(var i in city){                            
                   var shi = city[i].child
                   for(var j in shi){
                        if(val2==shi[j].id){  
                            var qu = shi[j].child;                                                                 
                            for(var k in qu){
                                 var obj = {
                                    value:qu[k].id,
                                    label:qu[k].name
                                 }    
                                 this.sortLists.districtLists1.push(obj)
                            }
                        }                       
                   }                   
              }             
        },
        getCity2(val2){
            this.sortLists.districtLists1=[] 
            this.storeList.districtid = ''         
            this.storeList.cityid = val2                   
            var city = this.city;  
             for(var i in city){                            
                   var shi = city[i].child
                   for(var j in shi){
                        if(val2==shi[j].id){  
                            var qu = shi[j].child;                                                                 
                            for(var k in qu){
                                 var obj = {
                                    value:qu[k].id,
                                    label:qu[k].name
                                 }    
                                 this.sortLists.districtLists2.push(obj)
                            }
                        }                       
                   }                   
              }             
        },
        // 下载模板
        downloadTemplate(){        
            window.location.href=this.portA+"downStore"
        },
        //上传功能（success或者error）
        //单个上传
        handleSuccessAdd(){
            var onOff = true;
            for (let key in this.addOnestore) {                
                if (this.addOnestore[key]=='') {
                    onOff = false;
                    this.$Message.info('请将信息输入完整');                    
                    return ;
                }
            }
            if(onOff){
                let urlAdd = this.portA+this.constData.S_AD_One;
                let paramsAdd = this.addOnestore;
                switch(paramsAdd.pjtype){
                    case "家化": paramsAdd.pjtype = 1; break;
                    case "实效": paramsAdd.pjtype = 2; break;
                }
                switch(paramsAdd.storelevel){
                    case 'A+': paramsAdd.storelevel = 1; break;
                    case 'A': paramsAdd.storelevel = 2; break;
                    case 'B': paramsAdd.storelevel = 3; break;
                    case 'C': paramsAdd.storelevel = 4; break;
                    case 'D': paramsAdd.storelevel = 5; break;
                }             
                switch(paramsAdd.areastate){
                    case '50-99': paramsAdd.areastate = 5; break;
                    case '100-499': paramsAdd.areastate = 4; break;
                    case '500-999': paramsAdd.areastate = 3; break;
                    case '1000-2999': paramsAdd.areastate = 2; break;
                    case '>3000': paramsAdd.areastate = 1; break;
                } 
                this.httpClient.post(urlAdd,paramsAdd).then((res)=>{
                    this.$Message.info(res.data.msg);                  
                    // 清空this.addOnestore中的value
                    for (const key in this.addOnestore) {
                         this.addOnestore[key]==''                       
                    }
                    this.data9 = [];
                    var par = {provinceid:'',cityid:'',districtid:'',robj:"",storelevel:"",areastate:""}
                    switch(par.storelevel){
                        case 'A+': par.storelevel = 1; break;
                        case 'A': par.storelevel = 2; break;
                        case 'B': par.storelevel = 3; break;
                        case 'C': par.storelevel = 4; break;
                        case 'D': par.storelevel = 5; break;
                    }             
                    switch(par.areastate){
                        case '50-99': par.areastate = 1; break;
                        case '100-499': par.areastate = 2; break;
                        case '500-999': par.areastate = 3; break;
                        case '1000-2999': par.areastate = 4; break;
                        case '>3000': par.areastate = 5; break;
                    }                      
                    let params = {currPage:1,sortList:par};
                    let url = this.portA+this.constData.S_Sort     
                    this.httpClient.get(url,params).then((res)=>{
                        let datas = res.data.datas
                        for(var i = 0 ; i < datas.length ; i++){

                            if (datas[i].robj == undefined) {
                                datas[i].robj = "无"
                            }
                            if (datas[i].rnum == undefined) {
                                datas[i].rnum = "无"
                            }
                            if (datas[i].raddress == undefined) {
                                datas[i].raddress = "无"
                            }                
                            switch(datas[i].storelevel){
                                case 1: datas[i].storelevel = 'A+'; break;
                                case 2: datas[i].storelevel = 'A'; break;
                                case 3: datas[i].storelevel = 'B'; break;
                                case 4: datas[i].storelevel = 'C'; break;
                                case 5: datas[i].storelevel = 'D'; break;
                                default: datas[i].storelevel = '无';
                            }             
                            switch(datas[i].areastate){
                                case 5: datas[i].areastate = '50-99'; break;
                                case 4: datas[i].areastate = '100-499'; break;
                                case 3: datas[i].areastate = '500-999'; break;
                                case 2: datas[i].areastate = '1000-2999'; break;
                                case 1: datas[i].areastate = '>3000'; break;
                                default: datas[i].areastate = '无';
                            } 
                            for(var j = 0;j<this.city.length;j++){
                                if(this.city[j].id == datas[i].provinceid){
                                    datas[i].provinceid = this.city[j].name
                                    for(var k = 0;k<this.city[j].child.length;k++){
                                        if(this.city[j].child[k].id == datas[i].cityid){
                                            datas[i].cityid = this.city[j].child[k].name
                                            for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                                if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                                    datas[i].districtid = this.city[j].child[k].child[l].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid             
                        }            
                        this.data9 = datas;
                        this.dataTotal = res.data.count
                    });                    
                })             
            }
        },
        handleCancelAdd(){
            var par = {provinceid:'',cityid:'',districtid:'',pjtype:'',storelevel:'',areastate:'',rnum:'',robj:'',longitude:'',latitude:'',raddress:''}
            this.addOnestore = JSON.parse(JSON.stringify(par))
            this.$Message.info("已取消")            
        },        
        //批量上传
        handleSuccessB (res, file) {
            this.$Message.success(res.msg);
            var par = {area:'',robj:'',rnum:'',raddress:'',storelevel:'',areastate:'',latitude:'',longitude:'',index:''}
            this.$router.go(0)
        },  
        handleFormatError (file) {
            console.log("handleFormatError");
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + ' 格式不正确, 请输入后缀名是xls或Xlsx的excel文件！'
            });
        },
        // 清空条件
        emptyData(){
            this.$router.go(0)
        },
        // 条件搜索
        querystorestate(){
            this.data9 = [];
            var par = JSON.parse(JSON.stringify(this.sortList))
            switch(par.storelevel){
                case 'A+': par.storelevel = 1; break;
                case 'A': par.storelevel = 2; break;
                case 'B': par.storelevel = 3; break;
                case 'C': par.storelevel = 4; break;
                case 'D': par.storelevel = 5; break;
            }             
            switch(par.areastate){
                case '50-99': par.areastate = 5; break;
                case '100-499': par.areastate = 4; break;
                case '500-999': par.areastate = 3; break;
                case '1000-2999': par.areastate = 2; break;
                case '>3000': par.areastate = 1; break;
            }               
            let params = {currPage:1,sortList:par};
            let url = this.portA+this.constData.S_Sort     
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas
                for(var i = 0 ; i < datas.length ; i++){

                    if (datas[i].robj == undefined) {
                        datas[i].robj = "无"
                    }
                    if (datas[i].rnum == undefined) {
                        datas[i].rnum = "无"
                    }
                    if (datas[i].raddress == undefined) {
                        datas[i].raddress = "无"
                    }               
                    switch(datas[i].storelevel){
                        case 1: datas[i].storelevel = 'A+'; break;
                        case 2: datas[i].storelevel = 'A'; break;
                        case 3: datas[i].storelevel = 'B'; break;
                        case 4: datas[i].storelevel = 'C'; break;
                        case 5: datas[i].storelevel = 'D'; break;
                        default: datas[i].storelevel = '无';
                    }             
                    switch(datas[i].areastate){
                        case 5: datas[i].areastate = '50-99'; break;
                        case 4: datas[i].areastate = '100-499'; break;
                        case 3: datas[i].areastate = '500-999'; break;
                        case 2: datas[i].areastate = '1000-2999'; break;
                        case 1: datas[i].areastate = '>3000'; break;
                        default: datas[i].areastate = '无';
                    } 
                    for(var j = 0;j<this.city.length;j++){
                        if(this.city[j].id == datas[i].provinceid){
                            datas[i].provinceid = this.city[j].name
                            for(var k = 0;k<this.city[j].child.length;k++){
                                if(this.city[j].child[k].id == datas[i].cityid){
                                    datas[i].cityid = this.city[j].child[k].name
                                    for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                        if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                            datas[i].districtid = this.city[j].child[k].child[l].name
                                        }
                                    }
                                }
                            }
                        }
                    }
                    datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid              
                }            
                this.data9 = datas;
                this.dataTotal = res.data.count;
            });
        },
    // 表格操作（对门店的修改）
        show (index) {
            this.storeList.index= index; 
            for(let key in this.data9[index]){
                this.storeList[key]=this.data9[index][key];
            }                  
            this.modal4 = true;
        },
        remove (index) {        
        // 删除操作通知后台
            let dlUrl = this.portA+this.constData.S_DL;
            let dlparams = {id:this.data9[index].id};
            this.httpClient.post(dlUrl,dlparams).then((res)=>{
                this.$Message.info(res.data.msg);
                this.data9 = [];
                var par = JSON.parse(JSON.stringify(this.sortList))
                switch(par.storelevel){
                    case 'A+': par.storelevel = 1; break;
                    case 'A': par.storelevel = 2; break;
                    case 'B': par.storelevel = 3; break;
                    case 'C': par.storelevel = 4; break;
                    case 'D': par.storelevel = 5; break;
                }             
                switch(par.areastate){
                    case '50-99': par.areastate = 5; break;
                    case '100-499': par.areastate = 4; break;
                    case '500-999': par.areastate = 3; break;
                    case '1000-2999': par.areastate = 2; break;
                    case '>3000': par.areastate = 1; break;
                }                   
                let params = {currPage:1,sortList:par};
                let url = this.portA+this.constData.S_Sort     
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas
                    for(var i = 0 ; i < datas.length ; i++){

                        if (datas[i].robj == undefined) {
                            datas[i].robj = "无"
                        }
                        if (datas[i].rnum == undefined) {
                            datas[i].rnum = "无"
                        }
                        if (datas[i].raddress == undefined) {
                            datas[i].raddress = "无"
                        }               
                        switch(datas[i].storelevel){
                            case 1: datas[i].storelevel = 'A+'; break;
                            case 2: datas[i].storelevel = 'A'; break;
                            case 3: datas[i].storelevel = 'B'; break;
                            case 4: datas[i].storelevel = 'C'; break;
                            case 5: datas[i].storelevel = 'D'; break;
                            default: datas[i].storelevel = '无';
                        }             
                        switch(datas[i].areastate){
                            case 5: datas[i].areastate = '50-99'; break;
                            case 4: datas[i].areastate = '100-499'; break;
                            case 3: datas[i].areastate = '500-999'; break;
                            case 2: datas[i].areastate = '1000-2999'; break;
                            case 1: datas[i].areastate = '>3000'; break;
                            default: datas[i].areastate = '无';
                        } 
                        for(var j = 0;j<this.city.length;j++){
                            if(this.city[j].id == datas[i].provinceid){
                                datas[i].provinceid = this.city[j].name
                                for(var k = 0;k<this.city[j].child.length;k++){
                                    if(this.city[j].child[k].id == datas[i].cityid){
                                        datas[i].cityid = this.city[j].child[k].name
                                        for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                            if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                                datas[i].districtid = this.city[j].child[k].child[l].name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid              
                    }            
                    this.data9 = datas;
                    this.dataTotal = res.data.count;
                })
            })
        },
        // 编辑数据
        handleSM(){
            // 把修改后的整条数据发给后台保存
            var par = JSON.parse(JSON.stringify(this.data9[this.storeList.index]))
            for (const key in par) {
                if (this.storeList.hasOwnProperty(key)) {
                    par[key] = this.storeList[key]                    
                }
            }
            switch(par.pjtype){
                case "家化": par.pjtype = 1; break;
                case "实效": par.pjtype = 2; break;
            }            
            switch(par.storelevel){
                case 'A+': par.storelevel = 1; break;
                case 'A': par.storelevel = 2; break;
                case 'B': par.storelevel = 3; break;
                case 'C': par.storelevel = 4; break;
                case 'D': par.storelevel = 5; break;
            }             
            switch(par.areastate){
                case '50-99': par.areastate = 5; break;
                case '100-499': par.areastate = 4; break;
                case '500-999': par.areastate = 3; break;
                case '1000-2999': par.areastate = 2; break;
                case '>3000': par.areastate = 1; break;
            }                
            delete  par.area;
            for(var j = 0;j<this.city.length;j++){
                if(this.city[j].name == par.provinceid){
                    par.provinceid = parseInt(this.city[j].id)
                    for(var k = 0;k<this.city[j].child.length;k++){
                        if(this.city[j].child[k].name == par.cityid){
                            par.cityid = parseInt(this.city[j].child[k].id)
                            for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                if(this.city[j].child[k].child[l].name == par.districtid){
                                    par.districtid = parseInt(this.city[j].child[k].child[l].id)
                                }
                            }
                        }
                    }
                }
            }
            let url = this.portA+this.constData.S_Modify
            this.httpClient.post(url,par).then((res)=>{
                this.$Message.info(res.data.msg);
                this.data9 = [];
                var par = JSON.parse(JSON.stringify(this.sortList))
                let params = {currPage:1,sortList:par};
                let url = this.portA+this.constData.S_Sort     
                this.httpClient.get(url,params).then((res)=>{
                    let datas = res.data.datas
                    for(var i = 0 ; i < datas.length ; i++){
                        if (datas[i].robj == undefined) {
                            datas[i].robj = "无"
                        }
                        if (datas[i].rnum == undefined) {
                            datas[i].rnum = "无"
                        }
                        if (datas[i].raddress == undefined) {
                            datas[i].raddress = "无"
                        }              
                        switch(datas[i].storelevel){
                            case 1: datas[i].storelevel = 'A+'; break;
                            case 2: datas[i].storelevel = 'A'; break;
                            case 3: datas[i].storelevel = 'B'; break;
                            case 4: datas[i].storelevel = 'C'; break;
                            case 5: datas[i].storelevel = 'D'; break;
                            default: datas[i].storelevel = '无';
                        }             
                        switch(datas[i].areastate){
                            case 5: datas[i].areastate = '50-99'; break;
                            case 4: datas[i].areastate = '100-499'; break;
                            case 3: datas[i].areastate = '500-999'; break;
                            case 2: datas[i].areastate = '1000-2999'; break;
                            case 1: datas[i].areastate = '>3000'; break;
                            default: datas[i].areastate = '无';
                        } 
                        for(var j = 0;j<this.city.length;j++){
                            if(this.city[j].id == datas[i].provinceid){
                                datas[i].provinceid = this.city[j].name
                                for(var k = 0;k<this.city[j].child.length;k++){
                                    if(this.city[j].child[k].id == datas[i].cityid){
                                        datas[i].cityid = this.city[j].child[k].name
                                        for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                            if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                                datas[i].districtid = this.city[j].child[k].child[l].name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid              
                    }            
                    this.data9 = datas;
                    this.dataTotal = res.data.count;
                });                                          
            })                    
        },
        handleCM(){
            this.$Message.info("已取消")
        },
        
        // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.data9 = [];
            var par = JSON.parse(JSON.stringify(this.sortList))
            switch(par.storelevel){
                case 'A+': par.storelevel = 1; break;
                case 'A': par.storelevel = 2; break;
                case 'B': par.storelevel = 3; break;
                case 'C': par.storelevel = 4; break;
                case 'D': par.storelevel = 5; break;
            }             
            switch(par.areastate){
                case '50-99': par.areastate = 5; break;
                case '100-499': par.areastate = 4; break;
                case '500-999': par.areastate = 3; break;
                case '1000-2999': par.areastate = 2; break;
                case '>3000': par.areastate = 1; break;
            }               
            let params = {currPage:page,sortList:par};
            let url = this.portA+this.constData.S_Sort     
            this.httpClient.get(url,params).then((res)=>{
                let datas = res.data.datas
                for(var i = 0 ; i < datas.length ; i++){

                    if (datas[i].robj == undefined) {
                        datas[i].robj = "无"
                    }
                    if (datas[i].rnum == undefined) {
                        datas[i].rnum = "无"
                    }
                    if (datas[i].raddress == undefined) {
                        datas[i].raddress = "无"
                    }              
                    switch(datas[i].storelevel){
                        case 1: datas[i].storelevel = 'A+'; break;
                        case 2: datas[i].storelevel = 'A'; break;
                        case 3: datas[i].storelevel = 'B'; break;
                        case 4: datas[i].storelevel = 'C'; break;
                        case 5: datas[i].storelevel = 'D'; break;
                        default: datas[i].storelevel = '无';
                    }             
                    switch(datas[i].areastate){
                        case 5: datas[i].areastate = '50-99'; break;
                        case 4: datas[i].areastate = '100-499'; break;
                        case 3: datas[i].areastate = '500-999'; break;
                        case 2: datas[i].areastate = '1000-2999'; break;
                        case 1: datas[i].areastate = '>3000'; break;
                        default: datas[i].areastate = '无';
                    } 
                    for(var j = 0;j<this.city.length;j++){
                        if(this.city[j].id == datas[i].provinceid){
                            datas[i].provinceid = this.city[j].name
                            for(var k = 0;k<this.city[j].child.length;k++){
                                if(this.city[j].child[k].id == datas[i].cityid){
                                    datas[i].cityid = this.city[j].child[k].name
                                    for(var l = 0; l<this.city[j].child[k].child.length;l++){
                                        if(this.city[j].child[k].child[l].id == datas[i].districtid){
                                            datas[i].districtid = this.city[j].child[k].child[l].name
                                        }
                                    }
                                }
                            }
                        }
                    }
                    datas[i]["area"] = datas[i].provinceid+datas[i].cityid+datas[i].districtid              
                }            
                this.data9 = datas;
                this.dataTotal = res.data.count;
            });      
        }              
    },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .shopLists{
        .add{width: 500px; height: 80px; display: flex; justify-content: space-around; align-items: center;}  
        .content{overflow: hidden; height: 100%;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
                span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
            }
            .modify{width: 500px;
                #down{width: 100%; height: 200px; display: flex; justify-content: space-between;}
            }
            .select{display: flex; width:800px; justify-content: space-between; align-items: center;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }  
    }
</style>