<template>
  <div class="hello">
     <Layout :style="{marginLeft: '200px'}">
            <tabs :animated="false">

                <!-- 产品模板 -->
                <tab-pane label="产品模板">
                    <Content :style="{padding: '0 16px 16px'}">
                        
                        <Card style="height: 85vh;">
                            <div style="height: 80vh;overflow:auto">
                                <div class="sou">
                                    &nbsp;&nbsp;&nbsp;
                                    <Select v-model="model1" style="width:200px" :label-in-value="true" @on-change="v=>{ setOption(v,'type')}" size="default">
                                        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    
                                    &nbsp;&nbsp;
                                    <el-button type="pronameid" @click="search()" size="small">搜索</el-button>
                                    <el-button type="success" @click="leibie()" size="small">产品类别管理</el-button>
                                    <el-button type="info" @click="addparent()" size="small" style="margin-left:150px">添加父类</el-button>
                                    <Modal
                                        title="添加父类"
                                        @on-ok="parentupdate" 
                                        v-model="addpar"  
                                        :styles="{top: '100px'}">
                                        <p>
                                            <Select v-model="parmodel" style="width:200px" placeholder="项目调查产品类别" size="default">
                                                <Option v-for="item in fuji" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </p>
                                        <p style="margin:10px 0"><Input v-model="parproname" placeholder="产品名称" style="width: 300px" size="default"/></p>
                                        <p><Input v-model="parsortval" placeholder="排序值" style="width: 100px" size="default"/></p><br/>
                                        <p style="margin-top:10px"><Checkbox v-model="single">是否需要录入价格 :	</Checkbox></p>
                                    </Modal>
                                </div>
                               
                          <!-- 表格树 -->
                          
                            <div class="tree" >
                                <table-tree :columns="columns" :tree-structure="true"  :data-source="menuData"  align="center" size="mini" ref="table" :height="tableHeight"></table-tree>
                            </div>  
                            
                          
                        <!-- 弹出层模板 -->

                                <Modal
                                    v-model="modal4"
                                    title="Modal Title"
                                    ok-text="OK"
                                    cancel-text="Cancel">
                                    <div class="tankuang">
                                        <Select v-model="modelparent" style="width:300px" placeholder="请选择类别名称 ">
                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    
                                        <Input v-model="value5" type="textarea" :rows="4" placeholder="备注 / 描述"  class="beizhu"/>

                                        <Input v-model="value" placeholder="请输入排序值:" style="width: 300px" />

                                    </div>
                                </Modal>
                                


                            </div>
                        </Card>
                    </Content>
                </tab-pane>

         <!-- app项目模板 -->
                <tab-pane label="app项目模板">
                    <Content :style="{padding: '0 16px 16px'}">
                        
                         <Card style="height: 85vh;">
                            <div style="height: 80vh;overflow:auto">
                                <div class="sou">
                                    项目类型：&nbsp;&nbsp;
                                     <Select v-model="jiashi1" style="width:200px" @on-change="jiashi" size="default">
                                        <Option v-for="item in productlei" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                     </Select>
                                    &nbsp;&nbsp;
                                    <el-button type="success" @click="appsou" size="small">搜索</el-button>
                                    <el-button type="success" @click="tobianji" size="small">添加模板</el-button>
                                    <!-- <router-link to="/moban/bianji" ><el-button type="success" >添加模板</el-button></router-link> -->
                                    
                                </div>
                                <!-- 表格 -->
                               <Table border :columns="columns1" :data="data1" size="small" ref="table"  :height="tableHeight"></Table>
                                   
                            </div>
                        </Card>
                    </Content>
                </tab-pane>

                <!-- 算分模板 -->
                <tab-pane label="算分模板">
                    <Content :style="{padding: '0 16px 16px'}">
                        
                        <Card style="height: 85vh;">
                            <div style="height: 80vh;overflow:auto">
                                <div style="height: 600px">
                                    <div class="sou">
                                        项目类型：&nbsp;&nbsp;
                                        <Select v-model="jiashi1" style="width:200px" @on-change="jiashi" size="default">
                                            <Option v-for="item in productlei" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        </el-select>
                                        &nbsp;&nbsp;
                                        <el-button type="success" size="small" @click="searchSuan">搜索</el-button>
                                        <el-button type="success" @click="tonew" size="small">添加模板</el-button>
                                    </div>
                                    <!-- 表格 -->
                                     <Table border :columns="columns2" :data="dataArr" size="small" ref="table"  :height="tableHeight"></Table>
                                     <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                        show-elevator  show-total placement="top" @on-change="handlePage">
                                     </Page>
                                        <Modal
                                            title="修改模板信息"
                                            v-model="downloading"
                                            width="390px"
                                            @on-ok="suanedit"
                                            :styles="{top: '60px'}">
                                            <div style="border:1px dashed red;height:230px;padding:20px;width:350px;border-radius:5px;background:#FFFCED ">
                                                  <Select v-model="editpro" style="width:300px" placeholder="项目类型" size="default" @on-change="suanAlert">
                                                      <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                  </Select>

                                                  <Input v-model="editmoban" placeholder="模板名称" style="width: 300px;margin:10px 0" size="default"/>
                                                  <Input v-model="editbianji" type="textarea" style="width:300px" :rows="2" placeholder="备注信息" size="default"/>
                                                  <Select v-model="bibei" style="width:300px;margin-top:10px" placeholder="必备品牌" size="default" :multiple="multiple" @on-change="duoXuanChange">
                                                        <Option v-for="item in mastList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                  </Select>
                                            </div>
                                        </Modal>
                                </div>
                            </div>
                        </Card>
                    </Content>
                </tab-pane>
            </tabs>
            
            
        </Layout>
    
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"
import tableTree from './tableTree'
 import {mapGetters,mapActions} from "vuex"
export default {
  name: 'Moban',
//   methods: {
//       tableRowClassName({row, rowIndex}) {
//         if (rowIndex === 1) {
//           return 'warning-row';
//         } else if (rowIndex === 3) {
//           return 'success-row';
//         }
//         return '';
//       }
//     },

  data () {
      
    return {
        multiple:true,
        xiuid:"",
        tableHeight:500,
        bibei:"",
        bbb:[],
        mastList:[],
        pageTotal: 1,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 10,  //每页条数
        dataArr :[],   //页面显示的数组

        pronameid:"",
        editbianji:"",
        editmoban:"",
        editpro:"",
        downloading:false,
        appedit:false,
        single:"",
        typeList:[
            {
                value:1,
                label: '家化'
            },  
            {
                value:2,
                label: '实效'
            }
        ],
        columns1: [
                    {
                        title: '项目类型',
                        key: 'attype'
                    },
                    {
                        title: '模板名称',
                        key: 'atname'
                    },
                    {
                        title: '备注描述',
                        key: 'atmark'
                    },
                    {
                        title: '操作',
                        key: 'address',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
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
                    // {
                    //     attype: 'John Brown',
                    //     atname: 18,
                    //     atmark: 'New York ',
                      
                    // },
                    
                ],
                columns2: [
                    {
                        title: '项目类型',
                        key: 'protype'
                    },
                    {
                        title: '模板名称',
                        key: 'name'
                    },
                    {
                        title: '备注描述',
                        key: 'dsmark'
                    },
                    {
                        title: '操作',
                        key: 'address',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show2(params.index)
                                        }
                                    }
                                }, '编辑'),
                                 h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '0px'
                                    },
                                    on: {
                                        click: () => {
                                            this.download(params.index)
                                        }
                                    }
                                }, '下载模板'),
                               
                            ]);
                        }
                    }
                    
                ],
                data2: [
                    {
                        dstype: '000',
                        name: '111',
                        dsmark: '222 ',
                      
                    },                   
                ],
        parsortval:"",
        parproname:"",
        parmodel:"",
        addpar:false,
        columns: [{
          text: '名称',
          dataIndex: 'pname',
          align:"center"
        },
        {
          text: '编号',
          dataIndex: 'bianhao'
        },
        {
          text: '条形码',
          dataIndex: 'tiaoxingma'
        },
        {
          text: '是否需要价格',
          dataIndex: 'pprice'
        },
        {
          text: '排序',
          dataIndex: 'psort'
        }
      ],
      menuData: [
        // {
        //   snumber: 0,
        //   sname: "事件1",
        //   barcode: 50,
        //   sprice: "否",
        //   ssort:60
        // },
        // {
        //   snumber: 1,
        //   sname: "事件1",
        //   barcode: 100,
        //   sprice: "否",
        //    ssort:60,
        //   children: [
        //     {
        //       snumber: 2,
        //       sname: "事件2",
        //       barcode: 10,
        //       sprice: "否",
        //        ssort:60
        //     },
        //     {
        //       snumber: 3,
        //       sname: "事件3",
        //       barcode: 90,
        //       sprice: "否",
        //         ssort:60,
        //       children: [
        //         {
        //           snumber: 4,
        //           sname: "事件4",
        //           barcode: 5,
        //           sprice: "否",
        //             ssort:60
        //         },
        //         {
        //           snumber: 5,
        //           sname: "事件5",
        //           barcode: 10,
        //           sprice: "否",
        //             ssort:60
        //         },
        //         {
        //           snumber: 6,
        //           sname: "事件6",
        //           barcode: 75,
        //           sprice: "否",
        //             ssort:60,
        //           children: [
        //             {
        //               snumber: 7,
        //               sname: "事件7",
        //               barcode: 50,
        //               sprice: "否",
        //                 ssort:60,
        //               children: [
        //                 {
        //                   snumber: 71,
        //                   sname: "事件71",
        //                   barcode: 25,
        //                   sprice: "xx",
        //                     ssort:60
        //                 },
        //                 {
        //                   snumber: 72,
        //                   sname: "事件72",
        //                   barcode: 5,
        //                   sprice: "xx",
        //                     ssort:60
        //                 }
        //               ]
        //             },
        //             {
        //               snumber: 8,
        //               sname: "事件8",
        //               barcode: 25,
        //               sprice: "否",
        //                 ssort:60
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // }
      ],
        addchild:"",
        sortnum2:"",
        productname2:"",
        sortnum:"",
        productname:"",
        addchild:"",
        xiugai:"",
       modal10: false,  
       modal11: false,  
        // 表格树
    data: [
        //1111
        //     {
        //     label: '一级 1',
        //     children: [
        //         {
        //         label: '二级 1-1',
        //         children: [{
        //         label: '三级 1-1-1'
        //         }]
        //     }
        //     ]
        //     }, 
        // //2222
        //     {
        //         label: '一级 2',
        //         children: [
        //                 {
        //                 label: '二级 2-1',
        //                 children: [{
        //                 label: '三级 2-1-1'
        //                 }
        //             ]
        //         }, 
        //         {
        //             label: '二级 2-2',
        //             children: [{
        //             label: '三级 2-2-1'
        //             }]
        //         }]
        //     }, 
        //3333
            // {
            //     label: '一级 3',
            //     children: [{
            //         label: '二级 3-1',
            //         children: [{
            //         label: '三级 3-1-1'
            //         }]
            //     }, {
            //         label: '二级 3-2',
            //         children: [{
            //         label: '三级 3-2-1'
            //         }]
            //     }]
            //  }
        
        ],
        // defaultProps: {
        //   children: 'children',
        //   label: 'label'
        // },


        
        cityList:[],
        value5:"",
        value:"",
        //app项目模板
        jiashi1:"",
        productlei: [
            
            {
                value: '1',
                label: '家化'
            },  
            {
                value: '2',
                label: '实效'
            },
        ],
         options: [
            // {
            //     value: '实效',
            //     label: '实效'
            // },
            // {
            //     value: '家化',
            //     label: '家化'
            // },  
        ],
        value8: '项目调查产品类别',
        select:"",
        model1:"",
        modelparent:"",
       

// 弹出
       modal4: false,


        //222
        options2: [{
          value: '选项1',
          label: '实化'
        }, {
          value: '选项2',
          label: '家化'
        }, {
          value: '选项3',
          label: '问卷'
        }],
        //333
        options3: [{
          value: '选项1',
          label: '111'
        }, {
          value: '选项2',
          label: '222'
        }, {
          value: '选项3',
          label: '333'
        }],



        //表格树
       //111
       fuji:[],

        // 222
       
        //333
        suanfa: [{
          type: 'adfdafdfd',
          pname: 'ggggggggg',
          miaoshu: 'ggggg+65656',
          caozuo:"编辑",
          
        }],

      }
  },
  methods:{
      
     ...mapActions(["login","add","jian"]), //mapActions（[]）为store里的函数名
      handleClick(row) {
           console.log(row);
      },
      download (index) {
        //    console.log(index)
           console.log(this.data2[index].id)
           var id = this.data2[index].id;
           window.location.href="http://106.14.173.50:8080/dowloadJiaHua?id="+ id
           

      },
      show (index) {
            
           console.log(this.data1[index].atid)
            var atid = this.data1[index].atid
             localStorage.setItem('atid',atid) //存储
             this.$router.push("/appedit")
           
      },
      show2(index){
          
           console.log(this.data2[index])
           this.editpro = String(this.data2[index].dstype);
           console.log(this.editpro)
           
           this.editmoban = this.data2[index].name;
           this.editbianji = this.data2[index].dsmark;

           this.xiuid = this.data2[index].id;
           this.bibei = Number(this.data2[index].pid);

           this.downloading = true;
            // var atid = this.data1[index].atid
            //  localStorage.setItem('atid',atid) //存储


           
      },
      suanAlert(val){
         this.editpro = val
      },
       
         instance(type) {
            const title = "注意";
            const content = "<p>输入框值不能为空</p>";
            switch (type) {
                case "info":
                this.$Modal.info({
                    title: title,
                    content: "<p>部门/职位/账户名称不能重复</p>"
                });
                break;
                case "success":
                this.$Modal.success({
                    title: "ok",
                    content: "<p>操作成功</p>"
                });
                break;
                case "warning":
                this.$Modal.warning({
                    title: title,
                    content: "<p>内容不能为空</p>"
                });
                break;
                case "error":
                this.$Modal.error({
                    title: title,
                    content: "<p>修改失败</p>"
                });
                break;
            }
    },
      //添加父类弹出
      addparent(){
        
          this.addpar = true
         
      },
      //确认更改
      parentupdate(){
          var that = this
          var check = 0;
               if(that.single==true){
                 check = 1
               }else{
                 check = 0
               }
           axios({
                method: "post",
                url: "http://106.14.173.50:8080/SavaByProduct",
                params: {
                      column1:that.parmodel,
                      pname:that.parproname,
                      psort:that.parsortval,
                      pprice:check
                    }
              }).then(function(data) {
                  console.log(data.data)
                  if (data.data.code == "10000") {
                    that.instance("success");
                  } else {
                    that.instance("error");
                  }
              });
      },
       //产品类别管理

       leibie(){        
           this.$router.push("/leibie")
       },
        tobianji(){
           this.$router.push("/bianji")
        },
        tonew(){
           this.$router.push("/new")
        },
         //下拉框
        setOption(value){
            console.log(value.value);
            this.pronameid=value.value
             localStorage.setItem('val',value.value)
             localStorage.setItem('lab',value.label)
                this.fuji=[value]          
                this.parmodel = value.value
        },
       
        search(){
            // console.log(this.data5[0].children)      
                var that = this;
                console.log(that.pronameid)
                axios({
                    url:"http://106.14.173.50:8080/QueryByProduct",         
                    params:{column1:that.pronameid}           
                })
                .then(function(data){
                    console.log(data.data) 
                    var arr = data.data;
                    for(var i in arr){
                       
                    }
                     that.menuData = arr

                //    var data = []
                //     for(var i in arr){
                //        var first = arr[i]
                //        var obj1 =  {                                    
                //                     sname:first.pname,                                  
                //                     sprice: first.pprice,
                //                     ssort:first.psort,
                //                 } 
                //            data.push(obj1)                          
                //            console.log(first.children)                                                                                                                                                     
                    
                //     }
                    //  for(var j in first.children){
                              
                    //           var second = first.children[j]
                    //           var obj2 = {
                    //                 sname:second.ptname,                                  
                    //                 sprice: second.ptprice,
                    //                 ssort:second.ptsort,
                    //           }
                    //            obj1.children=[]
                    //            obj1.children.push(obj2)
                    //         console.log(obj2)
                    //             // for(var k in second.children){
                    //             //     var third = second.children[k]
                    //             //     var obj3 = {
                    //             //             snumber: third.snumber,
                    //             //             sname: third.sname,
                    //             //             barcode: third.barcode,
                    //             //             sprice: third.sprice,
                    //             //             ssort:third.ssort
                    //             //     }
                    //             //     obj2.children = [];
                    //             //     obj2.children.push(obj3)
                    //             //     // console.log(obj2)

                    //             // }

                    //       }
                    //   console.log(data)
                    
                    
                })
        
        },
        //算法搜索
         searchSuan(){
           var that = this       	
            axios({               
                url:"http://106.14.173.50:8080/inquireDomesticationScore", 
                params:{dstype:that.jiashi1,page:1}                   
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;  
                that.data2 = arr.list
                for(var i in  arr.list){
                    arr.list[i].protype = arr.list[i].dstype==1?"家化":"时效"
                }
                that.pageTotal = arr.totalCount;
                  //console.log(that.data1.length)
                var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum * that.pageSize;
                that.dataArr = that.data2.slice(_start,_end);

            })
         },
         //算法分页
         handlePage(val){
           var that = this       	
            axios({               
                url:"http://106.14.173.50:8080/inquireDomesticationScore", 
                params:{dstype:that.jiashi1,page:val}                   
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;  
                that.data2 = arr.list
                for(var i in  arr.list){
                    arr.list[i].protype = arr.list[i].dstype==1?"家化":"时效"
                }
                that.pageTotal = arr.totalCount;
                  //console.log(that.data1.length)
                var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                var _end = that.pageNum * that.pageSize;
                that.dataArr = that.data2.slice(_start,_end);

            })
         },
        //多选
         duoXuanChange(val){
        //    console.log(val)
           
            this.bbb = val;
            let aaa = val.join(",")
           console.log(this.bbb)

         },
         
         //算法弹框修改确定
         suanedit(){
            var that = this   
           var params = {id:that.xiuid,dstype:that.editpro,name:that.editmoban,dsmark:that.editbianji,pid: this.bbb.join(",")}    
           console.log(params)
            axios({               
                method:"post",
                url:"http://106.14.173.50:8080/updateDomesticationScore", 
                params:params               
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;  
                if(arr.code==10000){
                    alert("修改成功")
                    window.location.reload()
                }

            })
         },

        obtainValue(value){   
            console.log(value)
            this.select=value     
        },
        // 到查看编辑页面
        tochange(){
          this.$router.push("/change")
        },
        //树状
        handleNodeClick(data) {
            console.log(data);
        },
       
       //树状表
        

            //弹出框添加
            addchildselect(val){
                console.log(val)
            },
            xiugaiselect(val){
                console.log(val)
            },
            //添加
            append (data) {             
                console.log(data)
                this.modal10=true;
            },

            //修改
            remove(root, node, data) {
                console.log( data.pname)
                this.productname2=data.pname
                this.sortnum2 = data.psort;
                this.xiugai = this.model1
                this.modal11=true;
                console.log( data.pname)
            },
// app模板  
        jiashi(val){
          
           this.jiashi1=val
        //    if(val==1){
        //        this.$router.push("/chakan_jia")
        //    }else{
        //        this.$router.push("/chakan_shi")
        //    }
           console.log(this.jiashi1)
        },
        appsou(){
            var that = this
            axios({               
                url:"http://106.14.173.50:8080/QueryByApptemplateId", 
                params:{attype:that.jiashi1}
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                
                for(var i in arr){
                      arr[i].attype=arr[i].attype==1?"家化":"时效"                   
                }
               that.data1 = arr
            })
        }

    
  },
  mounted(){
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 200
      this.searchSuan()
         //默认搜索
           this.search()
           var that = this
        	
            axios({               
                url:"http://106.14.173.50:8080/QueryByTypes",                    
            })
            .then(function(data){
                // console.log(data.data)       
                var arr = data.data;
                for(var i in arr){
                      var obj={value:arr[i].tid,label:arr[i].tname}
                       that.options.push(obj)
                }
              
            })

         //必备
            axios({               
                url:"http://106.14.173.50:8080//queryBySubleveproductAll",                    
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                for(var i in arr){
                      var obj={value:arr[i].sid,label:arr[i].sname}
                       that.mastList.push(obj)
                }
              
            })
             document.title="模板管理"
    },
  components: {
    tableTree
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
   .tree{height: 100%;overflow: auto}
    .sou{
        width: 100%;height: 50px;display: flex;align-items: center;
    }
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .tankuang{
        width: 100%;height: 220px;
        .beizhu{margin: 20px 0}
    }
</style>
