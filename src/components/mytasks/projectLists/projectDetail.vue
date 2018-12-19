<template>
    <div class="projectDetail">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button  type="success" size="small" @click="modal1 = true">&nbsp;&nbsp;重新指派&nbsp;&nbsp;</el-button>
                    <Modal
                        v-model="modal1"
                        title="重新指派"
                        @on-ok="assignOk"
                        @on-cancel="assignCancel">
                        <Select v-model="account" style="width:300px;margin-top:5px" placeholder="选择账户">
                            <Option v-for="(item,index) in accounts" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                    </Modal>                    
                </Breadcrumb> 
                <div class="title"><span>基本信息</span></div>
                <div class="table1">                             
                    <Table border :columns="columns7" :data="data7" size="small" :style="{width:'700px'}"></Table>
                    <Table border :columns="columns3" :data="data3" size="small" :style="{width:'300px'}"></Table>                
                </div>                                            
                <Card> 
                    <div class="title"><span>状态列表</span></div>
                    <!-- 表格内容 -->
                    <div class="table2">
                        <div class="accessData">
                            <span>基础数据</span><br>
                            <Table border :columns="base" :data="baseData" size="small"></Table><br>                                                       
                        </div>
                        <div class="accessData">
                           <span>详细列表</span>&nbsp;<a href="#" @click="tip1">{{tip.tip1.val}}</a><br>
                           <div class="right" v-show=tip.tip1.boo >
                                <div class="rowDetail" v-if="picData.left==null">
                                    <Button type="success" style="width:100px;height:30px;line-height:10px;margin:50px 100px">暂无</Button>
                                </div>                        
                                 <div class="rowDetail" v-else v-for="(item,index) in picData.left" :key="index">                                                                        
                                    <img :src='item.photo[0]' alt="详情图片" >
                                    <ul class="list">
                                        <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{item.type}}</li>
                                        <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{item.classify}}</li>
                                        <li>经度:{{item.latitude}}</li>
                                        <li>纬度:{{item.longitude}}</li>
                                        <li>拍摄时间:{{item.shoottime}}</li>                                            
                                        <li><el-button type="success" @click="goDetail(item)" size="small">详情</el-button></li>
                                    </ul>                                 
                                </div> 
                                <div class="rowDetail" v-if="picData.right==null">
                                    <Button type="success" style="width:100px;height:30px;line-height:10px;margin:50px 100px">暂无</Button>
                                </div>                        
                                <div class="rowDetail" v-else v-for="(item,index) in picData.right" :key="'2'+index">                                                                        
                                     <img :src='item.photo[0]' alt="详情图片">
                                    <ul class="list">
                                        <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{item.type}}</li>
                                        <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{item.classify}}</li>
                                        <li>经度:{{item.latitude}}</li>
                                        <li>纬度:{{item.longitude}}</li>
                                        <li>拍摄时间:{{item.shoottime}}</li>                                            
                                        <li><el-button type="success" @click="goDetail(item)" size="small">详情</el-button></li>
                                    </ul>                                  
                                </div> 
                            </div><br>
                                <Modal
                                    title="查看详情"                            
                                    v-model="details1"                            
                                    width=700                           
                                    class-name="vertical-center-modal">
                                    <div :style="{width:'700px',height:'400px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                                        <Carousel v-model="details2"  loop :style="{width:'400px',height:'400px',textAlign:'center',lineHeight:'400px',border:'1px solid #cccccc'}">
                                            <CarouselItem v-for="(item,index) in detailsData.photo" :key="index">                                        
                                                <div :style="{width:'400px',height:'398px',background:'white'}"><img :src="item" :style="{display:'block',width:'266px',height:'400px', margin:'0 auto'}"></div>
                                            </CarouselItem>
                                        </Carousel>                                                                       
                                        <ul :style="{width:'200px',height:'400px',listStyle:'none',fontSize:'14px'}">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{detailsData.type}}</li>
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{detailsData.classify}}</li>
                                            <li>经度:{{detailsData.latitude}}</li>
                                            <li>纬度:{{detailsData.longitude}}</li>
                                            <li>拍摄时间:{{detailsData.shoottime}}</li>                                            
                                        </ul>
                                    </div>
                                    <div slot="footer">
                                        <Button type="success" @click="cancel">关闭</Button>
                                    </div> 
                                </Modal>
                            <span>访问资料</span>&nbsp;<a href="#" @click="tip2()">{{tip.tip2.val}}</a><br>
                            <Table v-show=tip.tip2.boo border :columns="audio" :data="audioData" size="small"></Table><br>
                                <Modal
                                    title="录音内容"                            
                                    v-model="SC"                            
                                    width=700                           
                                    class-name="vertical-center-modal">
                                    <div :style="{width:'700px',height:'400px',overflow:'auto'}">
                                        {{SConent}}
                                    </div>
                                    <div slot="footer">
                                        <Button type="success" @click="cancel">关闭</Button>
                                    </div> 
                                </Modal>
                            <span>自定义数据</span>&nbsp;<a href="#" @click="tip3()">{{tip.tip3.val}}</a><br>
                            <Table v-show=tip.tip3.boo border :columns="custom" :data="customData" size="small"></Table>
                        </div>   
                    </div> 

                <Modal v-model="loader" :closable="false" title="文字转换中。。。">
                    <div><Spin></Spin></div>
                    <div slot="footer">
                        <span>请耐心等待。。。</span>
                    </div>
                </Modal> 

                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import axios from "axios"
import ports from "../../../assets/js/ports"
export default {
    name: 'projectDetail',
    data () {
        return {
            portA: ports.a,
            portB: ports.b,
            //选择账户
            modal1:false,
            accounts:['jj','dd'],
            account:'', 
            // 表格数据 
            columns7: [{title: '录入账号', align: 'center', key: 'surnum'},{title: '联系方式', align: 'center', key: 'contact'},{title: '开始时间', align: 'center', key: 'starttime',},{title: '结束时间', align: 'center', key: 'endtime'},{title: '上传时间', align: 'center', key: 'uptime'},{title: '一审时间', align: 'center', key: 'finsttime',},
                {title: '二审时间', align: 'center', key: 'sinsttime'}
            ],
            data7:[],

            columns3: [{title: '上传图片', align: 'center', key: 'researchobject'},{title: '上传视频', align: 'center', key: 'researchnum'},{title: '上传录音', align: 'center', key: 'taskstate'},],
            data3:[], 
            
            // 基础数据
            base: [{title: '品牌', align: 'center', key: 'pname',sortable:true},{title: '系列', align: 'center', key: 'ptname',sortable:true},{title: 'SKU', align: 'center', key: 'sname',sortable:true},{title: '铺货数量', align: 'center', key: 'shopassiscount',sortable:true},{title: '价格', align: 'center', key: 'price',sortable:true},],
            baseData:[],        
            // 展开功能
            tip:{tip1:{boo:false,val:"展开"},tip2:{boo:false,val:"展开"},tip3:{boo:false,val:"展开"}},
            // 图片数据
            picData:{},
        
        // 访问数据
            audio: [{title: '录音', align: 'center', key: 'name'},{title: '时间', align: 'center', key: 'time'},
                {title: '播放录音', align: 'center', key: 'oprate', 
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
                                                this.showName(params.row.name)
                                            }
                                        }
                                    }, '播放')
                            ])             
                        },
                },
                {title: '文字转换', align: 'center', key: 'oprate', 
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
                                                this.showPath(params.row.recordname)
                                            }
                                        }
                                    }, '转换')
                            ])             
                        },
                }],
            SC:false,
            SConent:"",
            audioData:[], 
            loader: false,        
            // 自定义数据
            custom: [{title: '其他数据', align: 'center', key: 'otherdata'},{title: '反馈', align: 'center', key: 'feedback'},],
            customData:[], 

            // 弹出详情页
            detailsData:{type:"无",classify:"无",shoottime:"无",longitude:"无",latitude:"无",problemtypes:"无",placenotes:"无",questionnotes:"无"},
            details1: false, 
            details2:0
        
        }
    },
    mounted(){
        let url = this.portA+this.constData.MT_PL_DT;
        let params = {id:this.$route.query.id};
        this.httpClient.get(url,params).then((res)=>{
            // 初始页面数据
            this.data7 = res.data.basicinfo.left;
            this.data3 = res.data.basicinfo.right;
            this.baseData = res.data.detailsinfo.basicdata
            if(res.data.detailsinfo.accessdata){
            let datas = res.data.detailsinfo.accessdata
                for(let i = 0;i<datas.length;i++){
                    datas[i].startrecordtime = this.stringUtil.formatDate(datas[i].startrecordtime)
                    datas[i].endrecordtime = this.stringUtil.formatDate(datas[i].endrecordtime)
                    datas[i]['time'] = `${datas[i].startrecordtime}/${datas[i].endrecordtime}`;
                    let name = datas[i].recordname.split('/');
                    datas[i]['name'] = name[name.length-1]
                }
                this.audioData = datas
            }
            if(res.data.detailsinfo.imgs){
                let datas2 = res.data.detailsinfo.imgs
                for(let i = 0; i<datas2.left.length;i++){
                    if(datas2.left[i].photo.indexOf(",")){
                        datas2.left[i].photo = datas2.left[i].photo.split(",")
                        for(var j = 0;j<datas2.left[i].photo.length;j++){
                            datas2.left[i].photo[j] = this.portB + datas2.left[i].photo[j]
                        }
                    }else{
                        datas2.left[i].photo = this.portB + datas2.left[i].photo
                    }                
                } 
                for(let i = 0; i<datas2.right.length;i++){
                    if(datas2.right[i].photo.indexOf(",")){
                        datas2.right[i].photo = datas2.right[i].photo.split(",")
                        for(var j = 0;j<datas2.right[i].photo.length;j++){
                            datas2.right[i].photo[j] = this.portB + datas2.right[i].photo[j]
                        }
                    }else{
                        datas2.right[i].photo = this.portB + datas2.right[i].photo
                    }                
                }                
                this.picData = datas2
            }
            if(res.data.detailsinfo.sddata){
                let datas3 = res.data.detailsinfo.sddata
                for(let i = 0;i<datas3.length;i++){
                    if (datas3[i].feedback == "0") {
                        datas3[i].feedback = datas3[i].customfield3
                    } else {
                        datas3[i].feedback = datas3[i].customfield4
                    }
                    datas3[i]["lists"] = [datas3[i].customfield3,datas3[i].customfield4]
                }
                this.customData = datas3
            }
        });

        let urlIVs = this.portA+this.constData.MT_PL_DT_IVs;
        this.httpClient.get(urlIVs).then((res)=>{
            this.accounts = res.data
        })       
    },
    methods:{
        // 展开收缩
        tip1(){
            if (this.tip.tip1.boo == false) {
                this.tip.tip1.boo = true;
                this.tip.tip1.val = "收起"
            } else {
                this.tip.tip1.boo = false;
                this.tip.tip1.val = "展开"
            }         
        },    
        tip2(){
            if (this.tip.tip2.boo == false) {
                this.tip.tip2.boo = true;
                this.tip.tip2.val = "收起"
            } else {
                this.tip.tip2.boo = false;
                this.tip.tip2.val = "展开"
            }         
        },
        tip3(){
            if (this.tip.tip3.boo == false) {
                this.tip.tip3.boo = true;
                this.tip.tip3.val = "收起"
            } else {
                this.tip.tip3.boo = false;
                this.tip.tip3.val = "展开"
            }         
        },    
        // 查看详情
        goDetail(obj){
            this.details1 = true
            this.detailsData = obj
        },
        // 返回按钮
        goBack(){
            this.$router.push({path:'/projectLists',query:{FD: this.$route.query.condition}})
        },
        //指派人员
        assignOk () {
            let url = this.portA+this.constData.MT_PL_DT_RAS;
            let params = {rid:this.$route.query.id,interviewer:this.account};
            this.httpClient.post(url,params).then((res)=>{
                this.$Message.success(res.data.msg)
            })            
        },
        assignCancel () {
            this.$Message.info('指派失败');
        },
        // 详情取消
        cancel(){
            this.details1 = false
            this.SC = false
            this.$Message.success("已查看")
        },
        // 播放录音
        showName(name){
            let h = document.body.offsetHeight;
            let w = document.body.offsetWidth;
            let bw = 400;
            let bh = 200; 
            window.open(this.portB+name,"播放录音",`width=${bw},height=${bh},top=${(h-bh)/2},left=${(w-bw)/2}`)
        },
        // 转换数字
        showPath(path){
            this.loader = true;
            if(this.loader){
                let url = this.portA+this.constData.MT_PL_TP;
                let params = {pcm:path};
                this.httpClient.get(url,params).then((res)=>{
                    this.SConent = res.data;
                    this.SC = true;
                    this.loader = false;
                })
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.projectDetail{ min-width: 800px;
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    .table1{width: 100%; display: flex; justify-content:space-between; padding-bottom: 10px;    }
    .table2{width: 100%; display: flex; justify-content: space-between;
        a,span{display: inline-block; width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;}
        a:hover{background: orangered;}
        .accessData{width: 49%;
            .right{width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 5px;
                .rowDetail{width: 360px; height: 220px; display: flex; justify-content: space-between; align-items: center; 
                    img{display: block; width: 160px;height: 160px; margin-right: 20px;}
                    .list{width: 180px; height: 200px; list-style: none; 
                        li{height: 24px; line-height: 24px; width: 160px; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;}
                        li:nth-last-child(1){height: 40px; line-height: 40px;}
                        li:nth-last-child(2){height: 40px; line-height: 40px;}
                    }   
                } 
            }
        }           
    }   
}
</style>