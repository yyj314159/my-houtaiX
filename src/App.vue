


<template>
  <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
  


export default {
  name: 'App',
 provide (){
     return {
       reload:this.reload
     }
  },
  data(){
    return {
       isRouterAlive:true
    }
  },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
  },
  components:{
  }


}   

</script>

<style>
  *{margin:0;padding: 0}

</style>
