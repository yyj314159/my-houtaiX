
<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                   
                </Breadcrumb>
                
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <!-- 基本信息 -->
                            <el-tab-pane label="基本信息" name="first">
                                 <Card>
                                     <div style="height: 600px">
                                  <div class="shang">
                                      <div class="left">
                                          <div class="ipt">
                                               <Select v-model="model1" style="width:180px" placeholder="项目类别">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                               <Select v-model="model1" style="width:180px" placeholder="产品类别">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                          <div class="ipt">
                                              <Input v-model="value" placeholder="项目名称" style="width: 180px" />
                                              <Input v-model="value" placeholder="项目编号" style="width: 180px" />
                                          </div>
                                          <div class="ipt ipt1">
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="调查日期" ></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="截止日期"></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="预警日期" ></DatePicker>
                                              </Col>
                                          </div>
                                          <div class="ipt">
                                              <Select v-model="model1" style="width:180px" placeholder="调研产品类别">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                               <Select v-model="model1" style="width:180px" placeholder="选择项目模板">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                      </div>
                                      <div class="right">
                                          <div class="title"><span>调用以往项目信息</span></div>
                                          <div class="center">
                                              <div class="center2">
                                                  <Input v-model="value" placeholder="项目名称" style="width: 200px" />
                                                   <Input v-model="value" placeholder="项目编号" style="width: 200px;margin:10px 0" />
                                                   <Button class="btn" size="small">检测</Button>
                                              </div>
                                              
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="xia">
                                       <div class="title"><span>以往项目信息</span></div>
                                       <div class="tab">
                                              表格
                                       </div>
                                       <div class="but">
                                           <div class="fen">
                                               <el-pagination
                                                    background
                                                    layout="prev, pager, next"
                                                    :total="100">
                                                </el-pagination>
                                           </div>
                                           <div class="btncen">
                                               <Button type="error" size="small"> 取 消 </Button>
                                               
                                                <Button type="success" size="small" > 下 一 步 </Button>  
                                           </div>
                                            
                                       </div>
                                  </div>
                                    </div>
                
                                 </Card>
                            </el-tab-pane>
                             <!-- 选择产品 -->
                            <el-tab-pane label="选择产品" name="second">
                                <Card>
                                    <div style="height: 600px">
                                        <div class="select">
                                            <Select v-model="model1" style="width:300px" placeholder="请选择产品类别">
                                              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select><br>
                                            <Input v-model="value" placeholder="产品名称" style="width: 200px;margin:10px 0" /><br>
                                            <Input v-model="value" placeholder="排序值" style="width: 100px;margin:10px 0" />
                                            <Button type="success" > 提交 </Button><br><br><br>
                                          <div class=" btnse">
                                            <Button type="error">取消</Button>
                                            <Button type="success">上一步</Button>
                                            <Button type="success">下一步</Button>
                                          </div>
                                        </div>
                                           
                                    </div>
                                    
                
                                </Card>
                               
                            </el-tab-pane>
                             <!-- 导入信息 -->
                            <el-tab-pane label="导入信息" name="third">
                                <Card>
                                     <div style="height: 600px">
                                        <div class="dao">
                                            <el-button type="info" class="loadbtn">下载清单模板</el-button>
                                            
                                            <div >
                                                
                                                <div class="shangchuan">
                                                    <el-upload
                                                        class="upload-demo"
                                                        action="https://jsonplaceholder.typicode.com/posts/"
                                                        :on-preview="handlePreview"
                                                        :on-remove="handleRemove"
                                                        :before-remove="beforeRemove"
                                                        multiple
                                                        :limit="3"
                                                        :on-exceed="handleExceed"
                                                        :file-list="fileList">
                                                        <el-button size="small" type="primary">点击上传项目信息</el-button>
                                                    
                                                    </el-upload>
                                                </div>
                                                
                                            </div>
                                            
                                            
                                            <div >
                                            
                                                <div class="shangchuan">
                                                    <el-upload
                                                        class="upload-demo"
                                                        action="https://jsonplaceholder.typicode.com/posts/"
                                                        :on-preview="handlePreview"
                                                        :on-remove="handleRemove"
                                                        :before-remove="beforeRemove"
                                                        multiple
                                                        :limit="3"
                                                        :on-exceed="handleExceed"
                                                        :file-list="fileList">
                                                        <el-button size="small" type="primary">点击上传项目信息</el-button>
                                                    
                                                    </el-upload>
                                                </div>
                                                
                                            </div>
                                            <div class="beizhu">
                                                <Input v-model="value6" type="textarea" :rows="4" placeholder="备注信息" />
                                            </div>
                                            <div class="btn1">
                                                <Button type="error">取消</Button>
                                                <Button type="success">上一步</Button>
                                                <Button type="success">下一步</Button>
                                            </div>
                                      </div>
                                 </div>
                
                                </Card>
                            </el-tab-pane>
                             <!-- 编辑算法 -->
                            <el-tab-pane label="编辑算法" name="fourth">
                                 <Card>
                                    <div style="height: 600px">
                                        <div class="suan">
                                            <div class="select1">
                                                <Select v-model="model1" style="width:200px" placeholder="选择算分模板">
                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Button type="success">确定</Button>
                                            </div>
                                        <div class="select1">
                                            <Select v-model="model1" style="width:200px" placeholder="选择必备品牌">
                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Checkbox v-model="single" style="margin-left:10px">必备</Checkbox>
                                        </div>
                                            <div class="btn1 btn2">
                                                <Button type="error">取消</Button>
                                                <Button type="success">上一步</Button>
                                                <Button type="success">完成</Button>
                                            </div>
                                        </div>
                                  </div>
                
                                </Card>
                            </el-tab-pane>
                        </el-tabs>
                  
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Addjia',
  data () {
    return {
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
        cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    
                ],
                model1: '',
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    
                ],

        model1: '',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  }
 },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  },
  mounted(){
           document.title="添加项目"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
// 111
    .shang{
        width: 100%;height: 200px;display: flex;justify-content: space-between;
        .left{width: 60%;height: 200px;background:#F5F7F9;
            .ipt{width: 100%;height: 50px;display: flex;align-items: center;justify-content: space-between;padding: 0 20px;          
            }
        }
        .right{width: 37%;height: 200px;background:#F5F7F9;
        
        .center{width: 100%;height: 170px;display:flex;justify-content: center;align-items:center;
            .center2{width: 200px;height: 150px;
               .btn{width: 100px;height: 30px;background: #39435B;float: right;border: 0;color: #fff}
            }
         }
        }
    }
    .xia{width: 100%;height: 390px;border: 1px solid red;margin-top: 10px;
       .tab{width: 100%;height: 260px;border: 1px solid blue}
       .but{width: 100%;height: 100px;display: flex;justify-content: center;flex-direction:column;align-items: center;
        .fen{width: 100%;height: 40px;display: flex;justify-content: center}
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between;}
        }
      
    }
    //222
     .select{width: 100%;height: 300px;background: #F5F7F9;padding:30px}
     .btnse{width: 300px;height: 35px;display: flex;justify-content: space-between;padding: 0;margin: 0}
    //333
    .dao{background: #F5F7F9;padding: 10px}
     .loadbtn{margin-bottom: 10px}
     .shangchuan{width: 400px;height: 100px;border: 1px solid red;overflow: auto;margin:10px 0}
     .beizhu{width:400px }
     .btn1{width: 400px;height: 35px;margin: 10px;display: flex;justify-content: space-around}

    //444
    .suan{background: #F5F7F9;padding: 10px }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;}
    .select1{margin: 15px}
    .btn2{width: 300px}
</style>