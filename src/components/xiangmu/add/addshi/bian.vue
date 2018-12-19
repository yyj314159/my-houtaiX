<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 8px 8px'}">
                <Breadcrumb :style="{margin: '8px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small" >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small" >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                     <Card style="height: 85vh;">
                        <div style="height: 80vh;overflow:auto;border:1px solid red;">
                            <div style="display:flex;justify-content:space-between">                     
                                <div class="left wrop">
                                    <div class="shang">
                                        <el-upload
                                            class="upload-demo"
                                        
                                            ref="upload"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList"
                                            :auto-upload="false">
                                            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                                            <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
                                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                        </el-upload>
                                    </div>
                                    <div class="xia">
                                        <div class="title">指标描述</div>
                                        <Select v-model="model1" style="width:120px" size="small">
                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>&nbsp;
                                        <Select v-model="model1" style="width:120px" size="small">
                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>&nbsp;
                                        <Button type="success" size="small" >搜索</Button>

                                        <Table border :columns="columns1" :data="data1" size="small" ref="table"   :height="tableHeight" style="margin-top:5px"></Table>
                                    </div>
                                </div>    
                                <div class="right wrop">
                                    <div class="title">分数对应表</div>
                                    <Input v-model="value" placeholder="已选择App模板" style="width: 200px" size="default"/>&nbsp;
                                    <Button type="success" size="default" >搜索</Button>
                                    
                                    <Table border :columns="columns2" :data="data2" size="small" ref="table2"   :height="tableHeight2" style="margin-top:5px"></Table>
                                
                                </div>    
                             </div>
                             <div class="btnwrop">
                                  <div class="btn">
                                      <Button type="success" size="small" @click="goback">上一步</Button>
                                      <Button type="success" size="small" @click="complete">完成</Button>
                                  </div>
                             </div>
                        </div>
                    </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Bian',
  data () {
    return {
        aaa:"0000000",
        value: '',
       tableHeight:300,
       tableHeight2:345,
       fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                   
                ],
        model1: '',
        columns1: [
                    {
                        title: '分数',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'asdk',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'L Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'SyPark',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottak',
                    date: '2016-10-04'
                }
            ],
            columns2: [
                    {
                        title: 'APP显示字段',
                        key: 'name'
                    },
                    {
                        title: '一级指标',
                        key: 'age',
                        render: (h, params) => {
                            return h('Select', {
                                props:{
                                    value: params.row.applyResult,
                                },
                                style: {
                                   width:"100%"
                                },
                                on: {
                                        'on-change':(event) => {
                                            this.data2[params.index].age=event
                                            console.log(event)
                                            console.log(this.data2[params.index].age)
                                            
                                        } 
                                },
                            },
                            [
                            h('Option',{
                                props: {
                                    value: '1'
                                }
                            },'选择1'),
                                h('Option',{
                                    props: {
                                        value: '2'
                                    }
                                },'选择2')
                          ]);
                        },

                    },
                    {
                        title: '对应指标分类',
                        key: 'address',
                        render: (h, params) => {
                            return h('Select', {
                                props:{
                                    value: params.row.applyResult,
                                },
                                style: {
                                   width:"100%"
                                },
                                on: {
                                        'on-change':(event) => {
                                            this.data2[params.index].age=event
                                            console.log(event)
                                            console.log(this.data2[params.index].age)
                                            
                                        } 
                                },
                            },
                            [
                            h('Option',{
                                props: {
                                    value: '1'
                                }
                            },'选择1'),
                                h('Option',{
                                    props: {
                                        value: '2'
                                    }
                                },'选择2')
                          ]);
                        },
                    },
                    {
                        title: '对应指标序号',
                        key: 'address',
                        render: (h, params) => {
                            return h('Select', {
                                props:{
                                    value: params.row.applyResult,
                                },
                                style: {
                                   width:"100%"
                                },
                                on: {
                                        'on-change':(event) => {
                                            this.data2[params.index].age=event
                                            console.log(event)
                                            console.log(this.data2[params.index].age)
                                            
                                        } 
                                },
                            },
                            [
                            h('Option',{
                                props: {
                                    value: '1'
                                }
                            },'选择1'),
                                h('Option',{
                                    props: {
                                        value: '2'
                                    }
                                },'选择2')
                          ]);
                        },
                    }
                ],
            data2: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'Nerk',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Lok',
                    date: '2016-10-01'
                },
                {
                    name: 'Jock',
                    age: 30,
                    address: 'SydPark',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Otk',
                    date: '2016-10-04'
                }
            ]
    }
 },
  methods: {
    //   on-change(){

    //   },
     submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      goback(){
          this.$router.go(-1)
      },
      //完成
      complete(){
          
      }
  },
  mounted(){
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145
      this.tableHeight2 = window.innerHeight - this.$refs.table2.$el.offsetTop - 112

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
   .right{
       width: 60%;height: 95%;border: 1px solid blue;
   }
   .left{width: 39%;height: 95%;border: 1px solid blue;
       .shang{height: 20%;width: 100%;border:1px solid green}
       .xia{height: 80%;width:100%;border: 1px solid yellow}
   }
   .title{width: 100%;height: 30px;background:#5BC0DE;color:#fff;text-align: left;line-height: 30px;padding-left: 10px;margin-bottom: 5px }
   .btnwrop{
       width: 100%;height: 30px;border: 1px solid red;display:flex;justify-content: center;
       .btn{width: 120px;height: 25px;background: yellow;display:flex;justify-content: space-between;}
   }
</style>