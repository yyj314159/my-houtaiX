<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <!-- <Breadcrumb :style="{margin: '16px 0'}">
                                                        
                </Breadcrumb> -->
                <Card>
                    <div style="height: 600px;position:relative">
                        <el-button type="info" size="small" @click="tohomedetail" class="back">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                        <div id="allmap" style="height:600px"></div>	
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
// 导入BMap组件
import $ from "jquery"
import axios from "axios"
// import BMap from 'BMap'

export default {
  name: 'homemap',
  data () {
    return {
       
    }
 },
 methods: {
    ready: function(x, y) {
      var map = new BMap.Map('allmap')//显示标签
      var point = new BMap.Point(x, y)
      
      map.addControl(new BMap.MapTypeControl())
      map.enableScrollWheelZoom(true)//启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
      map.enableDoubleClickZoom(true)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)

      map.centerAndZoom(point, 15)// 初始化地图,设置城市和地图级别。
      map.centerAndZoom(point, 14)// 初始化地图,设置城市和地图级别。
    },
    tohomedetail(){
        this.$router.push("/homedetail")
    }
  },
   mounted() {
       var obj = this.$route.params.id ;   
       
       var x = obj.jing;
       var y = obj.wei;
    //   console.log(x,y)
    this.ready(x,y)
    document.title="首页" 
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .back{position:absolute;top:5px;left:10px;z-index: 10}
</style>