<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="todetail">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        详情

                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'homemap',
  data () {
    return {
       
  }
 },
 methods:{
     todetail(){
         console.log("000")
         this.$router.push("/home")
     }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    
</style>