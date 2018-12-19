<template>
    <div class="domestication2">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',display:'flex', justifyContent: 'space-between'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <span>
                        <el-button  type="success" size="small">&nbsp;&nbsp;审核通过&nbsp;&nbsp;</el-button>
                        <el-button type="info" size="small">&nbsp;审核不通过&nbsp;</el-button>                    
                    </span>
                </Breadcrumb>                             
                <Card> 
                    <div class="title"><span>状态列表</span></div>
                    <!-- 表格内容 -->
                    <div class="table2">
                        <div class="accessData">
                            <span>基础数据</span><br>
                            <Table border :columns="base" :data="baseData" size="small"></Table><br>                                                       
                        </div>
                        <Modal
                            title="基础数据修改"
                            ok-text='保存'
                            v-model="m1"
                            @on-ok="data1S()"
                            @on-cancel="cancel()">
                                <div class="modify">                                                                            
                                    <h3>品牌:{{data1.pname}}</h3>                                                             
                                    <h3>系列:{{data1.ptname}}</h3>
                                    <h3>SKU:{{data1.sname}}</h3>                                                                                                                                                                                                                                                                                                                                                                                       
                                    <h3>铺货数量:</h3><Input v-model="data1.shopassiscount" />
                                    <h3>价格:</h3><Input v-model="data1.price"/>                                    
                                </div>
                        </Modal>

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
                        v-model="m2"                            
                        width=700 
                        @on-ok="data2S()"
                        @on-cancel="cancel()"                                                   
                        class-name="vertical-center-modal">
                        <div :style="{width:'700px',height:'400px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                            <Carousel v-model="details"  loop :style="{width:'400px',height:'400px',textAlign:'center',lineHeight:'400px',border:'1px solid #cccccc'}">
                                <CarouselItem v-for="(item,index) in data2.photo" :key="index">                                        
                                    <div :style="{width:'400px',height:'398px',background:'white'}"><img :src="item" :style="{display:'block',width:'266px',height:'400px', margin:'0 auto'}"></div>
                                </CarouselItem>
                            </Carousel>  
                            <ul :style="{width:'200px',height:'400px',listStyle:'none',fontSize:'14px'}">
                                <li :style="{height:'70px',}">
                                    类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:&nbsp;&nbsp;<Select v-model="data2.type" :style="{width:'100px'}">
                                        <Option v-for="(item,index) in data2Lists.types" :value="item" :key="index">{{ item }}</Option>
                                    </Select>                                            
                                </li>                                    
                                <li :style="{height:'70px',}">
                                    问题归类:&nbsp;&nbsp;<Select v-model="data2.classify" :style="{width:'100px'}">
                                        <Option v-for="(item,index) in data2Lists.problemsClassify" :value="item" :key="index">{{ item }}</Option>
                                    </Select>                                            
                                </li>
                                <li :style="{height:'40px',}">经度:{{data2.latitude}}</li>
                                <li :style="{height:'40px',}">纬度:{{data2.longitude}}</li>
                                <li :style="{height:'40px',}">拍摄时间:{{data2.shoottime}}</li>                                            
                            </ul>
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
                            <Button type="success" @click="cancel">取消</Button>
                        </div> 
                    </Modal>                            
                            <span>自定义数据</span>&nbsp;<a href="#" @click="tip3()">{{tip.tip3.val}}</a><br>
                            <Table v-show=tip.tip3.boo border :columns="custom" :data="customData" size="small"></Table>
                            <Modal v-model="m4" draggable :title=data4.title @on-ok="data4S()" @on-cancel="cancel()" >
                                <Select v-model="data4.val" style="width:100px">
                                    <Option v-for="(item,index) in data4Lists" :value="item" :key="index">{{ item }}</Option>
                                </Select>
                            </Modal>                             
                        </div>   
                    </div> 
                    <Modal v-model="loader" :closable="false" title="文字转换中。。。">
                        <div :style="{textAlign:'center'}">
                            <Spin></Spin>
                        </div>
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
    name: 'domestication2',
    data () {
    return {
            portA: ports.a,
            portB: ports.b,             
            // 基础数据
            base: [{title: '品牌', align: 'center', key: 'pname',sortable:true},{title: '系列', align: 'center', key: 'ptname',sortable:true},{title: 'SKU', align: 'center', key: 'sname',sortable:true},{title: '铺货数量', align: 'center', key: 'shopassiscount',sortable:true},{title: '价格', align: 'center', key: 'price',sortable:true},
                {title: '操作', align: 'center', key: 'oprate', 
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
                                                this.show1(params.row)
                                            }
                                        }
                                    }, '修改')
                            ])             
                        },
                },        
            ],
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
            custom: [{title: '其他数据', align: 'center', key: 'otherdata'},{title: '反馈', align: 'center', key: 'feedback'},
                {title: '修改', align: 'center', key: 'oprate', 
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
                                                this.show4(params.row)
                                            }
                                        }
                                    }, '修改')
                            ])             
                        }
                }
            ],
            customData:[],

            // 详情页修改
            m1: false,
            data1:{},
            m2:false,
            data2:{},
            data2Lists:{types:[0,1],problemsClassify:[0,1]},
            details:0,
            data3:{},
            m4: false,
            data4:{title:'',val:''},
            data4Lists:["男","女"]

        }
    },

    mounted(){
        let url = this.portA+this.constData.MT_FI_DT_Sort;
        let params = {id:this.$route.query.id} 
        this.httpClient.get(url,params).then((res)=>{
            // 初始页面数据
            if(res.data.detailsinfo.accessdata){
                let datas1 = res.data.detailsinfo.accessdata
                for(let i = 0;i<datas1.length;i++){
                    datas1[i].startrecordtime = this.stringUtil.formatDate(datas1[i].startrecordtime)
                    datas1[i].endrecordtime = this.stringUtil.formatDate(datas1[i].endrecordtime)
                    datas1[i]['time'] = `${datas1[i].startrecordtime}/${datas1[i].endrecordtime}`;
                    let name = datas1[i].recordname.split('/');
                    datas1[i]['name'] = name[name.length-1]
                }
                this.audioData = datas1
            }

            this.baseData = res.data.detailsinfo.basicdata
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
                let datas = res.data.detailsinfo.sddata
                for(let i = 0;i<datas.length;i++){
                    if (datas[i].feedback == "0") {
                        datas[i].feedback = datas[i].customfield3
                    } else {
                        datas[i].feedback = datas[i].customfield4
                    }
                    datas[i]["lists"] = [datas[i].customfield3,datas[i].customfield4]
                }
                this.customData = datas
            }
        });     
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
        
        // 修改信息
        show1(name){
            this.m1 = true
            this.data1 = name
        }, 
        data1S(){
            var par = {id:"",shopassiscount:'',price:''}
            for (const key in this.data1) {
                if (par.hasOwnProperty(key)) {
                    par[key] = this.data1[key];                    
                }
            }
            let url = this.portA+this.constData.MT_FI_DT_DBModify;
            let params = par;
            this.httpClient.post(url,params).then((res)=>{                
                this.$Message.success(res.data.msg)
            })            
        },
        
        goDetail(name){
            this.m2 = true
            this.data2 = name
        },
        data2S(){
            var par = JSON.parse(JSON.stringify(this.data2))
            // if (par.classify == "门头") {
            //     par.classify = 1
            // }
            // if (par.classify == "问题照片") {
            //     par.classify = 2
            // }

            // par.photo = ''
            let url = this.portA+this.constData.MT_FI_DT_DLModify;
            let params = par; 
            this.httpClient.post(url,params).then((res)=>{                
                this.$Message.success(res.data.msg)
            })
        },
        show3(name){
            console.log(name)
        },
        show4(name){
            this.m4 = true;
            this.data4.title = name.otherdata
            this.data4.val = name.feedback
        },
        data4S(){
            var par = JSON.parse(JSON.stringify(this.data4))
            // if (par.classify == "门头") {
            //     par.classify = 1
            // }
            // if (par.classify == "问题照片") {
            //     par.classify = 2
            // }


            // par.photo = ''
            let url = this.portA+this.constData.MT_FI_DT_CDModify;
            let params = par; 
            this.httpClient.post(url,params).then((res)=>{                
                this.$Message.success(res.data.msg)
            })
        },

        // 详情取消
        cancel(){
            this.SC = false
            this.$Message.success("已取消")
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
        },                
        goBack(){
            this.$router.push({path:'/secondInstanceLists',query:{FD: this.$route.query.condition}})
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.domestication2{min-width: 800px;
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
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