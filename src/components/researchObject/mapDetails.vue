<template>
    <div class="mapDetails">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}"> 
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title">
                        <span>地图信息</span>
                        <el-button type="info" @click="goBack">返&nbsp;回</el-button>                     
                    </div>                
                </Breadcrumb>
                <Card> 
                    <div id="container"></div>
               </Card>              
            </Content>
        </Layout>
    </div>
</template>
<script>
import img from '../../assets/img/login/logo.png'
export default {
    name: 'mapDetails',
    mounted() {
            var map = new BMap.Map(container);
            // 创建地图实例  
            var point = new BMap.Point(this.$route.query.long, this.$route.query.lat);
            // 创建点坐标  
            map.enableScrollWheelZoom();
            map.centerAndZoom(point, 16);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push(this.$route.query.resource+"?apid="+this.$route.query.apid)
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.mapDetails{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    #container{width: 100%; height: 600px; margin: 0 auto 30px;}                
}
</style>