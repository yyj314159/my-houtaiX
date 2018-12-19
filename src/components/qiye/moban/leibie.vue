

<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}" class="tit">
                    <el-button type="info" size="small" @click="backtomoban()">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  @click="modal4 = true">添加类别</el-button>
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 500px"> 
                        <!-- 表格 -->
                               
                               <Modal
                                    v-model="modal1"
                                    title="修改"
                                    @on-ok="ok"
                                >
                                    <p>类别名称 :  <Input v-model="value1" placeholder="Enter something..." style="width: 300px" /></p><br/>
                                    <p>备注/描述 :  <Input v-model="value2" placeholder="Enter something..." style="width: 300px" /></p><br/>
                                    <p>排 序 值 :  <Input v-model="value3" placeholder="Enter something..." style="width: 300px" /></p>
                                </Modal>
                        <!-- <Table border :columns="columns1" :data="data1"></Table>                         -->
                         <el-table :data="dataArr" stripe border style="width:100%" highlight-current-row>
                        　　<el-table-column prop="id" label="商品ID" align="center" min-width="40" max-height="10">
                        　　</el-table-column>
                        　　<el-table-column prop="name" label="类别名称" align="center" min-width="120" max-height="10">
                        　　</el-table-column>
                        　　<el-table-column prop="discribe" label="备注/描述" align="center" min-width="100">
                        　　</el-table-column>
                        　　<el-table-column prop="sort" label="排序值" align="center" min-width="100">
                        　　</el-table-column>
                        　　<el-table-column label="操作" align="center" min-width="100">
                        　　　　<template slot-scope="scope">
                      
                        　　　　　　<el-button type="info" size="small" @click="modifyUser(scope.row.name,scope.row.discribe,scope.row.sort,scope.row.id);modal1 = true">修改</el-button>
                        
                        　　　　</template>
                        　　</el-table-column>
                        </el-table>
                          <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                            show-elevator  show-total placement="top" @on-change="handlePage" 
                            style="margin:10px"
                            >
                            
                         </Page>


                     </div>
                    <!-- 添加 -->
                     <Modal
                        v-model="modal4"
                        title="基本信息"
                        ok-text="保存"
                        cancel-text="取消"
                        @on-ok="save"
                        >
                        <div class="tankuang">
                            <Input v-model="typename" placeholder="请输入类别名称:" style="width: 300px" />
                        
                            <Input v-model="beizhu" type="textarea" :rows="4" placeholder="备注 / 描述"  class="beizhu"/>

                            <Input v-model="sortnum" placeholder="请输入排序值:" style="width: 300px" />

                        </div>
                        
                    </Modal>
                   

                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"

export default {
  name: 'Leibie',
  data () {
    return {
        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 6,  //每页条数
        dataArr:[],
        value1:"",
        value2:"",
        value3:"",
       modal1: false,
       typename:"",
       beizhu:"",
       sortnum:"",
       columns1: [
                    {
                        title: '类别名称',
                        key: 'name'
                    },
                    {
                        title: '备注/描述',
                        key: 'discribe'
                    },
                    {
                        title: '排序',
                        key: 'sort'
                    },
                    {
                        title: '操作',
                        key: 'done',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                       
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }                                    
                                    }
                                }, '编辑'),
                                
                            ]);
                        }
                    }
                ],
        data1: [
                    // {   id:"0",
                    //     name: 'John Brown',
                    //     discribe: 18,
                    //     sort: '1',
                    // },
                    
                ],        

       // 弹出
       modal4: false,
       value: '',
       value5: '',

       tableData: [{
          select: '',
          name: '高夫经典保湿系列',
          num: '1',
          tiaoxingma: '普陀',
          address: "否",
          order: 1
        }, 
        {
          select: '',
          name: '非必选-高夫容光焕采系列',
          num: '2',
          tiaoxingma: '普陀',
          address: '否',
          order: 2
        }, ],
       
  }
 },
 methods:{
     handleClick(row) {
        console.log(row);
      },
      backtomoban(){
          this.$router.push("/moban")
      },
      show (index) {
            console.log(this.$Modal.success)
                this.$Modal.info({
                    title: '修改',
                    content: `类别名称：<input type="text" value="${this.data1[index].name}"/><br><br>
                             备注/描述：<input type="text" value="${this.data1[index].discribe}"/><br><br>
                             排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序：<input type="text" value="${this.data1[index].sort}"/>`
                })
      },
       
            // cancel () {
            //     this.$Message.info('Clicked cancel');
            // },
      save(){
         var that = this;
           
            axios({ 
                method:"post",
                url:"http://106.14.173.50:8080/SavaTypesProduct",
                params:{tname:that.typename,
                       mark:that.beizhu,
                       tsort:that.sortnum
                       }
            })
            .then(function(data){
                that.data1=[];
                console.log(data.data)       
                if(data.data.msg=="添加成功"){
                    alert("添加成功")
                    axios({ 
               
                        url:"http://106.14.173.50:8080/QueryByTypes",
                    
                    })
                    .then(function(data){
                        //console.log(data.data)       
                        var arr = data.data;
                        for(var i in arr){
                            var obj={name:arr[i].tname,discribe:arr[i].mark,sort:arr[i].tsort}
                            
                            that.data1.push(obj)
                        }
                    })
                }else{
                     alert("添加失败")
                }              
            })
      },
      //修改用户
        modifyUser(name,dis,sort,id){
        　　console.log(name)
           this.value1=name;
            this.value2 = dis;
            this.value3= sort;
            this.id = id
        },
        //确定修改
       ok(){
            var that = this;           
            axios({      
                method:"post",         
                url:"http://106.14.173.50:8080/UpdateTypesProduct",
                params:{tname:that.value1,
                       mark:that.value2,
                       tsort:that.value3,
                       tid:that.id
                       }                
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                if(arr.msg=="修改成功"){
                      that.$Message.info('修改成功');
                     axios({               
                      url:"http://106.14.173.50:8080/QueryByTypes",  
                            
                    })
                    .then(function(data){
                        that.data1=[];
                        console.log(data.data)       
                        var arr = data.data;
                        for(var i in arr){
                            var obj={name:arr[i].tname,discribe:arr[i].mark,sort:arr[i].tsort,id:arr[i].tid}
                            that.data1.push(obj)
                        }
                        that.pageTotal = that.data1.length;
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data1.slice(_start,_end);

                   })  
                }else{
                    that.$Message.info('修改失败');
                }
               
            })
                
        }, 
      //分页
         handlePage(value){
           //console.log(value)
           this.pageNum = value;
           var _start = ( value - 1 ) * this.pageSize;
           var _end = value * this.pageSize;
           this.dataArr = this.data1 .slice(_start,_end);
       },

   
 },
 mounted(){
    
           var that = this;           
            axios({               
                url:"http://106.14.173.50:8080/QueryByTypes",  
                            
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                for(var i in arr){
                      var obj={name:arr[i].tname,discribe:arr[i].mark,sort:arr[i].tsort,id:arr[i].tid}
                       that.data1.push(obj)
                }
                 that.pageTotal = that.data1.length;
                var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum * that.pageSize;
                that.dataArr = that.data1.slice(_start,_end);
            })

             document.title="添加类别"     

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .tankuang{
        width: 100%;height: 220px;
        .beizhu{margin: 20px 0}
    }
    .tit{display: flex;justify-content: space-between}
</style>