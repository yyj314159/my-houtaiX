export default  {    
    login () {         
        alert("login");
    },
    getProvince(city,sortLists,sortList,val){
        sortLists.cityLists=[]
        sortList.provinceid = val
        sortList.districtid = '' 
        sortList.cityid = '' 
        var city = city                 
        for(var i in city){
            if(val == city[i].id){                 
                var shi = city[i].child
                for(var j in shi){
                    var obj = {
                        value:shi[j].id,
                        label:shi[j].name
                    }                      
                    sortLists.cityLists.push(obj)
                }               
            }
        }
    },
    getCity(city,sortLists,sortList,val){
        sortLists.districtLists=[]          
        sortList.cityid = val 
        sortList.districtid = '' 
        var city = city                    
        for(var i in city){                            
            var shi = city[i].child
            for(var j in shi){
                if(val==shi[j].id){  
                    var qu = shi[j].child;                                                                 
                    for(var k in qu){
                        var obj = {
                            value:qu[k].id,
                            label:qu[k].name
                        }    
                        sortLists.districtLists.push(obj)
                    }
                }                       
            }                   
        }             
    },
    // 获取搜索日期
    getStartTime(mm,sortList,value){
        if(sortList.endtime == ''){
            sortList.starttime = value
        }else if(value > sortList.endtime){
            mm.warning("开始日期输入有误")
            setTimeout(()=>{
                sortList.starttime = ""
            },1000) 
        }else{
            sortList.starttime = value
        }

    },
    getOverTime(mm,sortList,value){
        if(sortList.starttime == ''){
            sortList.endtime = value
        }else if(value < sortList.starttime){
            mm.warning("截止日期输入有误")
            setTimeout(()=>{
                sortList.endtime = ""
            },1000)
        }else {
           sortList.endtime = value  
        }                      
    },
    formatDate(timeStamp){ 
        let now = new Date(timeStamp)
        let year=now.getFullYear(); 
        let month=now.getMonth()+1; 
        let date=now.getDate(); 
        let hour=now.getHours(); 
        let minute=now.getMinutes(); 
        let second=now.getSeconds(); 
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    }
}