<template>
    <div class="checkLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}"> 
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title">
                        <span>基本信息</span>
                        <el-button type="info" @click="goBack">返&nbsp;回</el-button>                     
                    </div>                
                </Breadcrumb>
                    <Button type="success" @click="modal1 = true">认证</Button>&nbsp;&nbsp;
                    <Modal v-model="modal1"  title="认证操作" @on-ok="singleThrough()" @on-cancel="cancel()">
                        <div>是否认证？</div>
                    </Modal>
                    <Button type="success" @click="modal2 = true">退回</Button>
                    <Modal v-model="modal2"  title="退回操作" @on-ok="returnThrough()" @on-cancel="cancel()">
                        <div>是否退回？</div>
                    </Modal>                    
                <Card>                     
                    <!-- 表格内容 -->
                    <div class="table2">                        
                        <div class="right">
                           <span>所有问题</span>
                           <div v-for="(item,index) in rightData" :key="index">
                               <br>
                                <div class="row">
                                     <div class="rowDetail" v-if="item.laoobject==null">
                                         <Button type="success" style="width:100px;height:30px;line-height:10px;margin:50px 100px">暂无新问题</Button>
                                     </div>                                    
                                    <div class="rowDetail" v-else>                                   
                                        <img :src='item.laoobject.photo[0]' alt="" >
                                        <ul class="list">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{item.laoobject.type}}</li> 
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{item.laoobject.classify}}</li>
                                            <li>拍摄时间:{{item.laoobject.shoottime}}</li>
                                            <li>问题类型:{{item.laoobject.problemtypes}}</li>
                                            <li>地点备注:{{item.laoobject.placenotes}}</li>
                                            <li>问题备注:{{item.laoobject.questionnotes}}</li>
                                            <li><el-button type="success" @click="goDetailOld(item.laoobject)" size="small">详情</el-button></li>
                                            <li><el-button type="success" @click="goLocation(item.laoobject.latitude,item.laoobject.longitude,item.laoobject.pid)" size="small">查看定位</el-button></li>                                        
                                        </ul>                                                                        
                                    </div>
                                     <div class="rowDetail" v-if="item.xingobject==null">
                                         <Button type="success" style="width:100px;height:30px;line-height:10px;margin:50px 100px">暂无新问题</Button>
                                     </div>                                    
                                     <div class="rowDetail" v-else>                                   
                                        <img :src='item.xingobject.photo[0]' alt="" >
                                        <ul class="list">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{item.xingobject.type}}</li>
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{item.xingobject.classify}}</li>
                                            <li>拍摄时间:{{item.xingobject.shoottime}}</li>
                                            <li>问题类型:{{item.laoobject.problemtypes}}</li>                                            
                                            <li>地点备注:{{item.xingobject.placenotes}}</li>
                                            <li>问题备注:{{item.xingobject.questionnotes}}</li>
                                            <li><el-button type="success" @click="goDetailNew(item.xingobject)" size="small">详情</el-button></li>
                                            <li><el-button type="success" @click="goLocation(item.xingobject.latitude,item.xingobject.longitude,item.xingobject.pid)" size="small">查看定位</el-button></li>                                        
                                        </ul>                                                                        
                                    </div>                                                                                                                                   
                                </div><br><hr> 
                           </div>
                        </div>   
                    </div>
                        <Modal
                            title="查看详情"                            
                            v-model="detailsOld"                            
                            width=700                           
                            class-name="vertical-center-modal">
                            <div :style="{width:'700px',height:'400px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                                <Carousel v-model="value1"  loop :style="{width:'400px',height:'400px',textAlign:'center',lineHeight:'400px',border:'1px solid #cccccc'}">
                                    <CarouselItem v-for="(item,index) in detailsData.photo" :key="index">                                        
                                        <div :style="{width:'400px',height:'400px',background:'white'}"><img :src="item" :style="{display:'block',width:'266px',height:'400px', margin:'0 auto'}"></div>
                                    </CarouselItem>
                                </Carousel>                                                                       
                                <ul :style="{width:'200px',height:'400px',listStyle:'none',fontSize:'14px'}">
                                    <li :style="{height:'40px',}">照片类型:&nbsp;&nbsp;{{detailsData.type}}</li>
                                    <li :style="{height:'40px',}">问题归类:&nbsp;&nbsp;{{detailsData.classify}}</li>
                                    <li :style="{height:'40px',}">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:&nbsp;&nbsp;{{detailsData.shoottime}}</li>
                                    <li :style="{height:'40px',}">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.longitude}}</li>
                                    <li :style="{height:'40px',}">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.latitude}}</li>
                                    <li :style="{height:'40px',overflow:'hidden', marginBottom:'10px', textOverflow:'ellipsis',whiteSpace:'wrap',}">问题类型:&nbsp;&nbsp;{{detailsData.problemtypes}}</li>                                    
                                    <li :style="{height:'70px',overflow:'hidden', marginBottom:'10px', textOverflow:'ellipsis',whiteSpace:'wrap',}">地点备注:&nbsp;&nbsp;{{detailsData.placenotes}}</li>
                                    <li :style="{height:'70px',overflow:'hidden', textOverFlow:'ellipsis',whiteSpace:'wrap',}">问题备注:&nbsp;&nbsp;{{detailsData.questionnotes}}</li>
                                </ul>
                            </div>
                            <div slot="footer">
                                <Button type="success" @click="cancel">关闭</Button>
                            </div> 
                        </Modal>                    

                        <Modal
                            title="查看详情"
                            ok-text='保存'
                            v-model="detailsNew"
                            @on-ok="handleSuccess()"
                            @on-cancel="cancel()"                            
                            width=700
                            class-name="vertical-center-modal">
                            <div :style="{width:'700px',height:'400px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                                <Carousel v-model=value1 loop :style="{width:'400px',height:'400px',textAlign:'center',lineHeight:'400px',border:'1px solid #cccccc'}">
                                    <CarouselItem v-for="(item,index) in detailsData.photo" :key="index">                                        
                                        <div :style="{width:'400px',height:'400px',background:'white'}"><img :src="item" :style="{display:'block',width:'266px',height:'400px', margin:'0 auto'}"></div>
                                    </CarouselItem>
                                </Carousel>                                                                       
                                <ul :style="{width:'200px',height:'400px',listStyle:'none',fontSize:'14px'}">
                                    <li :style="{height:'40px',}">
                                        类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:&nbsp;&nbsp;<Select v-model="detailsData.type" :style="{width:'100px'}">
                                            <Option v-for="(item,index) in detailsDatas.types" :value="item" :key="index">{{ item }}</Option>
                                        </Select>                                            
                                    </li>                                    
                                    <li :style="{height:'40px',}">
                                        问题归类:&nbsp;&nbsp;<Select v-model="detailsData.classify" :style="{width:'100px'}">
                                            <Option v-for="(item,index) in detailsDatas.problemsClassify" :value="item" :key="index">{{ item }}</Option>
                                        </Select>                                            
                                    </li>                  
                                    <li :style="{height:'30px',}">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:&nbsp;&nbsp;{{detailsData.shoottime}}</li>
                                    <li :style="{height:'30px',}">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.longitude}}</li>
                                    <li :style="{height:'30px',}">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.latitude}}</li>
                                    <li :style="{height:'40px',}">
                                        问题类型:&nbsp;&nbsp;<Select v-model="detailsData.problemtypes" :style="{width:'100px'}">
                                            <Option v-for="(item,index) in detailsDatas.problemsTypes" :value="item" :key="index">{{ item }}</Option>
                                        </Select>                                            
                                    </li>                                   
                                    <li :style="{height:'80px',overflow:'hidden', }">
                                        地点备注:&nbsp;&nbsp;<Input type="textarea" v-model="detailsData.placenotes" :style="{height:'100px'}"></Input>
                                    </li>
                                    <li :style="{height:'80px',overflow:'hidden',}">
                                        问题备注:&nbsp;&nbsp;<Input type="textarea" v-model="detailsData.questionnotes" :style="{height:'100px'}" ></Input>
                                    </li>
                                </ul>
                            </div> 
                        </Modal>
                </Card>                                                    
            </Content>
        </Layout>
    </div>
</template>
<script>
import axios from "axios"
import ports from "../../assets/js/ports"
export default {
    name: 'checkLists',
    data () {
        return {
            portA: ports.a,
            // right数据
            rightData:[],
            // 弹出详情页            
            detailsDatas:{
                types:["视频","照片"],
                problemsClassify:["门头","问题照片"],
                problemsTypes:[],
            },
            detailsData:{},            
            // 轮播
            detailsOld: false,
            detailsNew: false,
            value1:0,
            // 认证及退回
            modal1:false,
            modal2:false,
            // 图片地址
            portB:ports.b, 
        }
    },
  mounted(){
            let url = this.portA + this.constData.RO_D_Sort;
            let params = {apid:this.$route.query.apid};
            this.httpClient.get(url,params).then((res)=>{
            // 初始页面数据
            let datas = res.data;
                for(var i = 0 ; i < datas.length ; i++){                    
                    if(datas[i].laoobject != null){
                        switch(datas[i].laoobject.classify){
                            case 1: datas[i].laoobject.classify = "门头"; break;
                            case 2: datas[i].laoobject.classify = "问题照片"; break; 
                        }
                        switch(datas[i].laoobject.type){
                            case 1: datas[i].laoobject.type = "照片"; break;
                            case 2: datas[i].laoobject.type = "视频"; break; 
                        }
                        switch(datas[i].laoobject.problemtypes){
                            case 1: datas[i].laoobject.problemtypes = "乱涂写"; break;
                            case 2: datas[i].laoobject.problemtypes = "乱刻画"; break; 
                        }
                        if(datas[i].laoobject.photo.indexOf(",")){
                            datas[i].laoobject.photo = datas[i].laoobject.photo.split(",")
                            for(var j = 0;j<datas[i].laoobject.photo.length;j++){
                                datas[i].laoobject.photo[j] = this.portB + datas[i].laoobject.photo[j]
                            }
                        }else{
                            datas[i].laoobject.photo = this.portB + datas[i].laoobject.photo
                        }
                    // 添加类别
                        if(this.detailsDatas.problemsTypes.indexOf(datas[i].laoobject.problemtypes) == -1){
                            this.detailsDatas.problemsTypes.push(datas[i].laoobject.problemtypes);
                        }                        
                        
                    }

                    if(datas[i].xingobject != null){
                            switch(datas[i].xingobject.classify){
                                case 1: datas[i].xingobject.classify = "门头"; break;
                                case 2: datas[i].xingobject.classify = "问题照片"; break; 
                            }
                            switch(datas[i].xingobject.type){
                                case 1: datas[i].xingobject.type = "照片"; break;
                                case 2: datas[i].xingobject.type = "视频"; break; 
                            }
                            switch(datas[i].xingobject.problemtypes){
                                case 1: datas[i].xingobject.problemtypes = "乱涂写"; break;
                                case 2: datas[i].xingobject.problemtypes = "乱刻画"; break; 
                            }
                            if(datas[i].xingobject.photo.indexOf(",")){
                                datas[i].xingobject.photo = datas[i].xingobject.photo.split(",")
                                for(var j = 0;j<datas[i].xingobject.photo.length;j++){
                                    datas[i].xingobject.photo[j] = this.portB + datas[i].xingobject.photo[j]
                                }
                            }else{
                                datas[i].xingobject.photo = this.portB + datas[i].xingobject.photo
                            } 
                            if(this.detailsDatas.problemsTypes.indexOf(datas[i].xingobject.problemtypes) == -1){
                                this.detailsDatas.problemsTypes.push(datas[i].xingobject.problemtypes);
                            }                                                        
                    }               
                }                
                
            this.rightData = datas
        }); 
                 
  },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push({path:'/updateRecordLists',query:{con: this.$route.query.condition}})
        },
        // 查看详情(对象不能应用)
        goDetailOld(obj){
            this.detailsOld = true
            this.detailsData=JSON.parse(JSON.stringify(obj))
        },
        goDetailNew(obj){
            this.detailsNew = true
            this.detailsData=JSON.parse(JSON.stringify(obj))
        },
        // 取消
        cancel(){
            this.detailsOld = false
            this.$Message.success("已取消")
        },
        // 详情查看成功
        handleSuccess(){
            var par = JSON.parse(JSON.stringify(this.detailsData));
            switch(par.classify){
                case "门头": par.classify = 1; break;
                case "问题照片": par.classify = 2; break; 
            }
            switch(par.type){
                case "照片": par.type = 1; break;
                case "视频": par.type = 2; break; 
            }
            switch(par.problemtypes){
                case "乱涂写": par.problemtypes = 1; break;
                case "乱刻画": par.problemtypes = 2; break; 
            }
            par.photo = '';
            let url = this.portA+this.constData.RO_D_Modify;
            let params = {pc:par}
            this.httpClient.post(url,params).then((res)=>{                
                this.$Message.success(res.data.msg)
            })
            // 重新加载
        let url1 = this.portA + this.constData.RO_D_Sort;
        let params1 = {apid:this.$route.query.apid};
        this.httpClient.get(url1,params1).then((res)=>{
            // 初始页面数据
            let datas = res.data;
                for(var i = 0 ; i < datas.length ; i++){                    
                    if(datas[i].laoobject != null){
                        switch(datas[i].laoobject.classify){
                            case 1: datas[i].laoobject.classify = "门头"; break;
                            case 2: datas[i].laoobject.classify = "问题照片"; break; 
                        }
                        switch(datas[i].laoobject.type){
                            case 1: datas[i].laoobject.type = "照片"; break;
                            case 2: datas[i].laoobject.type = "视频"; break; 
                        }
                        switch(datas[i].laoobject.problemtypes){
                            case 1: datas[i].laoobject.problemtypes = "乱涂写"; break;
                            case 2: datas[i].laoobject.problemtypes = "乱刻画"; break; 
                        }
                        if(datas[i].laoobject.photo.indexOf(",")){
                            datas[i].laoobject.photo = datas[i].laoobject.photo.split(",")
                            for(var j = 0;j<datas[i].laoobject.photo.length;j++){
                                datas[i].laoobject.photo[j] = this.portB + datas[i].laoobject.photo[j]
                            }
                        }else{
                            datas[i].laoobject.photo = this.portB + datas[i].laoobject.photo
                        }
                    // 添加类别
                        if(this.detailsDatas.problemsTypes.indexOf(datas[i].laoobject.problemtypes) == -1){
                            this.detailsDatas.problemsTypes.push(datas[i].laoobject.problemtypes);
                        }                        
                        
                    }

                    if(datas[i].xingobject != null){
                            switch(datas[i].xingobject.classify){
                                case 1: datas[i].xingobject.classify = "门头"; break;
                                case 2: datas[i].xingobject.classify = "问题照片"; break; 
                            }
                            switch(datas[i].xingobject.type){
                                case 1: datas[i].xingobject.type = "照片"; break;
                                case 2: datas[i].xingobject.type = "视频"; break; 
                            }
                            switch(datas[i].xingobject.problemtypes){
                                case 1: datas[i].xingobject.problemtypes = "乱涂写"; break;
                                case 2: datas[i].xingobject.problemtypes = "乱刻画"; break; 
                            }
                            if(datas[i].xingobject.photo.indexOf(",")){
                                datas[i].xingobject.photo = datas[i].xingobject.photo.split(",")
                                for(var j = 0;j<datas[i].xingobject.photo.length;j++){
                                    datas[i].xingobject.photo[j] = this.portB + datas[i].xingobject.photo[j]
                                }
                            }else{
                                datas[i].xingobject.photo = this.portB + datas[i].xingobject.photo
                            } 
                            if(this.detailsDatas.problemsTypes.indexOf(datas[i].xingobject.problemtypes) == -1){
                                this.detailsDatas.problemsTypes.push(datas[i].xingobject.problemtypes);
                            }                                                        
                    }               
                }                                
            this.rightData = datas
            }); 
        },
        // 单个认证
        singleThrough(){
            let url = this.portA + this.constData.RO_D_ST;
            let params = {pids : this.$route.query.apid,type:1}
            this.httpClient.post(url,params).then((res)=>{
                this.$Message.success(res.data.msg);
            })
        },
        // 退回
        returnThrough(){
            let url = this.portA + this.constData.RO_D_ST;
            let params = {pids : this.$route.query.apid,type:2}
            this.httpClient.post(url,params).then((res)=>{
                this.$Message.error(res.data.msg);
            })            
        },

        // 查看地图
        goLocation(lat,long,apid){
            this.$router.push({path:'/mapDetails',query:{lat:lat,long:long,resource:'/checkLists',apid:apid}})
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.checkLists{width: 100%; min-width: 1366px;
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    .table2{width: 100%; display: flex; 
        .right{width: 60%;
            span{display: inline-block; width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;}            
            .row{width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 5px;
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