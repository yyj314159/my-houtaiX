<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="backmoban">返&nbsp;回</el-button>
                    <el-button type="success" size="small" @click="save">保&nbsp;存</el-button>
                    <el-button type="danger" size="small">删&nbsp;除</el-button>
                </Breadcrumb>
                <!-- 内容 -->
                <Card style="height: 85vh;">
                    <div style="height: 80vh;overflow:auto">
                          <div class="bbb">
                               <div class="tit">配置模板信息</div>
                               <div class="sou">
                                  
                                  <Select v-model="jia" style="width:200px;" placeholder="项目类型" size="default" @on-change="selectjia">
                                        <Option v-for="item in jiaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                                  <Select v-model="moban" style="width:200px;margin-left:60px" placeholder="模板名称" size="default">
                                        <Option v-for="item in mobanList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                               </div>
                                <Input v-model="value6" type="textarea" :rows="1" placeholder="备注信息" style="width:400px" /><br>
                                <Select v-model="model1" style="width:400px;margin-top:10px" placeholder="必备品牌（必选）" size="default">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                             </div>

                              <!-- 下 -->
                              <div class="table">
                               <div class="other"><span>算法标准</span> </div>
                               
                               
                                <!-- 表格 -->
                                <ul class="list">
                                      <li>四川</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                      <li>上海</li>
                                  </ul>
                             <!-- <table border="1" width="100%" cellpadding='0' cellspacing='0'>
                                  

                                  <tr class="header">
                                      <td>品牌</td>
                                      <td>系列</td>
                                      <td>条形码</td>
                                      <td>SKU</td>
                                      <td>SKU总数</td>
                                      <td>A+店/面积>=3000m2</td>
                                      <td>A店/面积1000-2999m2</td>
                                      <td>B店/面积500-999m2</td>
                                      <td>C店/面积100-499m2</td>
                                      <td>D店/面积50-99m2</td>
                                     
                                  </tr>
                                 
                                  

                                  
                              </table> -->
                               <table border="1" width="100%" style="height: 400px;" cellspacing="0" >
                                    <tr style="height:20px">
                                        <th>品牌</th>
                                        <th>系列</th>
                                        <th>条形码</th>
                                        <th>SKU</th>
                                        <th>SKU总数</th>
                                        <!-- <th>A+店/面积>=3000m2</th>
                                        <th>A店/面积1000-2999m2</th>
                                        <th>B店/面积500-999m2</th>
                                        <th>C店/面积100-499m2</th>
                                        <th>D店/面积50-99m2</th>  -->
                                    </tr>
                                        <template v-for="item in dataList" >
                                        
                                            <tr >
                                                <!-- 左标题 -->
                                                <td :rowspan="item.pdate.length">{{item.pname}}</td>
                                                <!-- 第一行 -->
                                                <td>{{item.pdate[0].ptvalue}}</td>
                                                <td>{{item.pdate[0].tiaoxingma}}</td>
                                                <td>{{item.pdate[0].skutitle}}</td>
                                                <td>{{item.pdate[0].skuzong}}</td>
                                            </tr>
                                            <tr v-for="son in item.pdate.length-1" >
                                                <!-- 遍历第一行数据 -->
                                                <td >{{item.pdate[son].ptvalue}}</td>
                                                <td >{{item.pdate[son].tiaoxingma}}</td>
                                                <td >{{item.pdate[son].skutitle}}</td>
                                                <td >{{item.pdate[son].skuzong}}</td>
                                            </tr>
                                            <!-- <tr></tr> -->
                                        </template>

                                    </table>


                          </div>



                    </div>
                </Card>
            </Content>

        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Jiahua',
  data () {
    return {
        jia:"",
        moban:'',
        mobanList:[],
        value6:"",
        jiaList:[
            {
                value: 1,
                label: '家化'
            },
            {
                value: 2,
                label: '時效'
            },
        ],
        cityList: [
                    {
                        value: '门头照',
                        label: '门头照'
                    },
                    {
                        value: '问题照片',
                        label: '问题照片'
                    },
                    {
                        value: '货架',
                        label: '货架'
                    }
                    
                ],
                model1:"",
                textarea3:"",
                single: false,
                single1: false,
                single2: false,
                single3: false,
        dataList: [
          {
            "pid": "1111",
            "pname": "红色",
            "pdate": [
              {
                "ptid": "sadasd",
                "ptvalue": "1",
                "tiaoxingma":"条形码1",
                 "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              },
              {
                "ptid": "1239977",
                "ptvalue": "bb",
                "tiaoxingma":"条形码2",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              }
              ,
              {
                "ptid": "1239977",
                "ptvalue": "3",
                "tiaoxingma":"条形码3",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              }
            ]
          },
          {
            "pid": "2222",
            "pname": "蓝色",
            "pdate": [
              {
                "ptid": "sadasd",
                "ptvalue": "11",
                "tiaoxingma":"条形码3",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              },
              {
                "ptid": "1239977",
                "ptvalue": "b",
                "tiaoxingma":"条形码3",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              },
              {
                "ptid": "1239977",
                "ptvalue": "33",
                "tiaoxingma":"条形码3",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              }
              ,
              {
                "ptid": "1239977",
                "ptvalue": "44",
                "tiaoxingma":"条形码3",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              }
              ,
              {
                "ptid": "1239977",
                "ptvalue": "55",
                "tiaoxingma":"条形码3",
                "suu":"sku",
                 "skutitle":"skutitle",
                 "skuzong":"skuzong",
              }
            ]
          }
        ]

       
  }
 },
 methods:{
     objectSpanMethod({row, column, rowIndex, columnIndex}) {

      },
     backmoban(){
         this.$router.push("/moban")
     },
     selectjia(val){
        if(val===1){
               this.$router.push("/chakan_jia")
        }else{
            this.$router.push("/chakan_shi")
        }
     },
     //保存
     save(){
        var params={
            aaa:this.jia,
            aaa:this.moban,

         }
         var that = this;
        //    axios({               
        //         url:"http://106.14.173.50:8080/QueryByApptemplateId", 
        //         params:params
        //     })
        //     .then(function(data){
        //         console.log(data.data)       
                
        //     })
     }
 },
 mounted(){
     //默認傢化
     this.jia = 1
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .tit{
      width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px
    }
    .sou{margin: 10px 0}
    .table{width: 100%;height:320px;margin-top:-10px;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px;margin-top:25px;}
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:25px;margin:5px 0 0 0;padding:0;overflow: auto;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}
.list{
   width: 100%;height: 36px;display: flex;justify-content: space-between;
   li{width:100%;height: 36px;text-align: center;line-height: 36px;border: 1px solid #999}
}
</style>
