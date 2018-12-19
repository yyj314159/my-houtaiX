<template>
    <div class="addresearchObject">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>编辑</span> 
                        <el-button type="info" @click="goback">返回</el-button>                      
                    </div>
                    <div class="select">
                        <el-button type="success" size="small" @click="downloadTemplate">模板下载</el-button>
                        <form id="form" enctype="multipart/form-data">
                            <input id="folder" type='file' name="file" webkitdirectory>
                            <input id="submit" type="button" value="提交" @click="submit"> 
                        </form> 
                        <p>
                            提示:请上传文件夹<br>（包含excel表和图片文件夹）
                        </p>            
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="addResearchObject" :data="addResearchObjectData" size="small"></Table>
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
import $ from "jquery"
import ports from "../../assets/js/ports"
export default {
    name: 'addresearchObject',
    data () {
        return {
            portA: ports.a,
            // 表格内容
            addResearchObject: [{title: '项目类型', align: 'center', key: 'researchobjtype'},{title: '项目名称', align: 'center', key: 'projectname'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '调研编号', align: 'center', key: 'researchnum'},
            {title: '照片', align: 'center', key: 'cphoto'},{title: '归类', align: 'center', key: 'cclassify'},{title: '经度', align: 'center', key: 'clongitude'},{title: '纬度', align: 'center', key: 'clatitude'},
            {title: '地点备注', align: 'center', key: 'cplacenotes'},{title: '问题类型', align: 'center', key: 'cproblemtypes'},{title: '问题备注', align: 'center', key: 'cquestionnotes'}],            
            addResearchObjectData: [],
            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[],                
            // 后台需求数据
            gsu:''
        }
    },
    methods:{
        // 导入调研对象       
        submit(){
            $.ajax({
                url: this.portA+this.constData.RO_AD_Upload,
                type: 'POST',
                cache: false,
                data: new FormData($('#form')[0]),
                processData: false,
                contentType: false
            }).done((res)=> {
                this.$Message.info(res.msg);
                this.gsu = res.gsu;
                let url = this.portA + this.constData.RO_AD_Sort
                let params = {currPage:1,gsu:this.gsu}
                this.httpClient.get(url,params).then((data)=>{
                    let datas = data.data.datas;
                    for(var i = 0 ; i < datas.length ; i++){
                        switch(datas[i].cclassify){
                            case 1: datas[i].cclassify = "门头"; break;
                            case 2: datas[i].cclassify = "问题照片"; break;
                        }
                        switch(datas[i].cproblemtypes){
                            case 1: datas[i].cproblemtypes = "乱涂写"; break;
                            case 2: datas[i].cproblemtypes = "乱刻画"; break;
                        }
                        switch(datas[i].researchobjtype){
                            case 1: datas[i].researchobjtype = "小区"; break;
                            case 2: datas[i].researchobjtype = "店招"; break;
                            case 3: datas[i].researchobjtype = "家化"; break;
                            case 4: datas[i].researchobjtype = "道路"; break;
                        }
                    }
                    this.addResearchObjectData = datas;
                    this.dataTotal = data.data.counts;
                })                 
            })
        },       
        goback(){
            this.$router.push("/researchObjectLists")
        },
        // 下载模板
        downloadTemplate(){        
            window.location.href=this.portA+this.constData.RO_AD_DT
        },        
    // 生成二维码
        ok () {
            setTimeout(() => {
                this.modal1 = false;
            }, 1000);            
        },
        cancel () {
            this.$Modal.info('已取消');
        },     

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.researchObjectData = []
            let url = this.portA + this.constData.RO_AD_Sort
            let params = {currPage:page,gsu:this.gsu}
            this.httpClient.get(url,params).then((res)=>{
                this.addResearchObjectData = res.data.datas;
                this.dataTotal = res.data.counts;
            });                                   
        } 
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .addresearchObject{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .select{width: 640px; display: flex; justify-content: space-between; height: 40px; align-items: center;
            #form{width: 340px; height: 40px; border: 1px solid #67C23A; border-radius: 5px; display: flex; align-items: center; justify-content: space-around;
                #folder{background: #cccccc; border: 1px solid blue; border-radius: 3px;}
                #submit{ width: 40px; background: #67C23A; border-radius: 3px;}
            }
            p{width: 200px; height: 40px; border: 1px dashed #67C23A;border-radius: 5px; text-align: center;}
        }
        .content{overflow: hidden;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>