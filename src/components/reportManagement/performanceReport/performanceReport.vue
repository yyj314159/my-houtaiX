<template>
    <div class="performanceReport">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title"><span>条件筛选</span></div>
                    <div class="select">                                                     
                        <Input v-model="sortList.pjname" placeholder="项目名称" style="width:150px"/>&nbsp;&nbsp;       
                        <Button type="success" @click="sort">搜索</Button>
                        <Button type="success" @click="emptyData">清空条件</Button>
                    </div>
                </Breadcrumb>
                <!-- 导航 -->                       
                <Menu mode="horizontal" active-name="1" id="nav">
                    <MenuItem name="1" @on-select="name1">
                        <Icon type="ios-people" />
                        <router-link :to="{path:'/performanceReport/performanceReportVisitor',query:{sortList:par}}" active-class="active" >访问员绩效</router-link>
                    </MenuItem>
                    <MenuItem name="2" @on-select="name2">
                        <Icon type="ios-paper" />
                        <router-link :to="{path:'/performanceReport/performanceReportExamine',query:{sortList:par}}" active-class="active">审核绩效</router-link>
                    </MenuItem>
                    <MenuItem name="3" @on-select="name3">
                        <Icon type="md-paper" />
                        <router-link :to="{path:'/performanceReport/performanceReportAgent',query:{sortList:par}}" active-class="active">代理绩效</router-link>
                    </MenuItem>
                </Menu>               
                <Card>
                    <router-view ></router-view>                     
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
    name: 'performanceReport',
    data () {
        return {
        // 筛选框内容
            // 查询功能
                sortLists:{
                    provinceLists: [],
                    cityLists:[],
                    districtLists: [],
                },
                // 点击查询按钮发送的参数 
                sortList:{pjname:""}, 
                par:{pjname:""}           
        }
    },
    mounted(){
        document.title = "业绩报告"

    },

    methods:{
        emptyData(){       
            var par = {pjname:''};
            this.sortList = JSON.parse(JSON.stringify(par))
            this.par = JSON.parse(JSON.stringify(par))
            this.$router.push({path:'/performanceReport/performanceReportVisitor',query:{sortList:this.par}})
        },
        sort(){
            for (const key in this.par) {
                if (this.sortList.hasOwnProperty(key)) {
                    this.par[key] = this.sortList[key]                    
                }
            }
            this.$router.push({path:'/performanceReport/performanceReportVisitor',query:{sortList:this.par}})
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .performanceReport{min-width: 800px;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .select{width: 700px;}
        #nav{margin-bottom: 5px; height: 20px; line-height: 20px; background: transparent;}
        .content{height: 600px;}          
    }
</style>