
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
 
// import state from './state'
var state={
    count:0,
    name:"",
    arr:[],
    user:"",
    job:""
}
var mutations={
	add(a){
		a.count++
	},
	jian(a){
		a.count--
    },
    login(a,b){
        a.name=b
	},
	producttype(a,b){
       a.arr=b
	},
	username(a,b){
       a.user=b
	}
}


var actions={
	add:({commit})=>commit("add"),
	jian:({commit})=>commit("jian"),
	login:({commit},b)=>commit("login",b),
	producttype:({commit},b)=>commit("producttype",b),
	username:({commit},b)=>commit("username",b),
}
 


export default new Vuex.Store({
	
	state,
	mutations,
	actions
	
})
