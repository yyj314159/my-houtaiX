<template>
    <div class="detailsNav">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;</el-button>
                </Breadcrumb>   
                 <!-- nav -->
                    <ul class="nav">
                        <router-link tag="li" :to="{path:'/detailsNav/districtReport',query:{id:this.$route.query.id}}" active-class="active">大区</router-link>
                        <router-link tag="li" :to="{path:'/detailsNav/subReport',query:{id:this.$route.query.id}}" active-class="active">分报告</router-link>
                        <router-link tag="li" :to="{path:'/detailsNav/salesPersonReport',query:{id:this.$route.query.id}}" active-class="active">销售员分报告</router-link>
                        <router-link tag="li" :to="{path:'/detailsNav/customerReport',query:{id:this.$route.query.id}}" active-class="active">客户分报告</router-link>
                        <router-link tag="li" :to="{path:'/detailsNav/provinceReport',query:{id:this.$route.query.id}}" active-class="active">省份报告</router-link>
                        <!-- <router-link tag="li" :to="{path:'/detailsNav/detailsReport',query:{id:this.$route.query.id}}" active-class="active">商店明细数据</router-link> -->
                    </ul>                           
                <Card>
                    <router-view></router-view>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
export default {
    name: 'detailsNav',    
    methods:{
    // 返回按钮
        goBack(){
            this.$router.push({path:'/familyReportList',query:{FD: this.$route.query.condition}})
        }                
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.detailsNav{min-width: 800px;
    .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
        li{display:block; width: 100px; height: 40px; background: #cccccc; border-radius: 5px;}
        li:hover{background: #5BB85D;}
        .active{background: #5BB85D;} 
    }
      
}
</style>