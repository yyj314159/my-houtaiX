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
                                              <Col span="12" style="width: 120px">
                                                <DatePicker type="date" placeholder="调查日期" ></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px">
                                                <DatePicker type="date" placeholder="截止日期"></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px">
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
                                           <div class="btncen">
                                               <Button type="error" size="small"> 取 消 </Button>
                                               <Button type="success" size="small"> 下 一 步 </Button>
                                           </div>
                                            
                                       </div>
                                  </div>
                                    </div>
                
                                 </Card>
                            </el-tab-pane>


                             <!-- 导入信息 -->
                            <el-tab-pane label="导入信息" name="second">
                                <Card>
                                    <div style="height: 600px" >
                                        <div class="wrop">
                                            <div class="left">
                                                <div class="s">
                                                    <div>
                                                        <el-button type="info" plain>下载清单模板</el-button>
                                                    </div>
                                                    <!-- 上传 -->
                                                    <Upload class="upload"
                                                        multiple
                                                        action="//jsonplaceholder.typicode.com/posts/">
                                                        <Button icon="ios-cloud-upload-outline">导入项目信息</Button>
                                                    </Upload>
                                                    <Input v-model="value6" type="textarea" :rows="4" placeholder="备注信息" />
                                                </div>
                                                <div class="x">
                                                    <div>
                                                         <Select v-model="model1" style="width:60px" placeholder="省">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        <Select v-model="model1" style="width:60px" placeholder="市">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        <Select v-model="model1" style="width:60px" placeholder="区">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        <Select v-model="model1" style="width:100px" placeholder="分配状态">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        <Button type="success">分配</Button>
                                                    </div>
                                                    <div class="fenpei">
                                                         
                                                        
                                                    </div>
                                                    <!-- 地图 -->
                                                    <div class="map">
                                                        地图

                                                    </div>
                                                       


                                                </div>
                                            </div>
                                             <div class="right">
                                                 <div class="title"><span>已添加项目访问员</span></div>
                                                 表格
                                             </div>
                                        </div>                                         
                                    </div>
                                     <div class="but">
                                        <div class="btncen">
                                            <Button type="error" size="small"> 取 消 </Button>
                                            <Button type="success" size="small" style="margin:0 20px"> 上 一 步 </Button>
                                            <Button type="success" size="small"> 下 一 步 </Button>
                                        </div>
                                        
                                    </div>
                                </Card>
                               
                            </el-tab-pane>


                             <!-- 编辑算法 -->
                            <el-tab-pane label="编辑算法" name="third">
                                <Card>
                                    <div style="height: 600px" >
                                        <div class="wrop">
                                            <div class="left">
                                                <div class="ss">
                                                    <div class="cen2">
                                                        <Select v-model="model1" style="width:160px" placeholder="选择算分模板">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        <Button type="success">确定</Button>
                                                    </div>                                                   
                                                </div>
                                                <div class="x">
                                                    <div class="title"><span>指标描述</span></div>
                                                    <div style="margin:10px 0">
                                                         <Select v-model="model1" style="width:120px" placeholder="一级指标类型">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        <Select v-model="model1" style="width:120px" placeholder="二级指标类型">
                                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                        </Select>
                                                        
                                                        <Button type="success">确定</Button>
                                                    </div>
                                                    
                                                    <!-- 地图 -->
                                                    <div class="map3">
                                                        地图

                                                    </div>
                                                       


                                                </div>
                                            </div>
                                             <div class="right">
                                                 <div class="title"><span>分数对应表</span></div>
                                                 表格
                                             </div>
                                        </div>                                         
                                    </div>
                                     <div class="but">
                                        <div class="btncen">
                                            <Button type="error" size="small"> 取 消 </Button>
                                            <Button type="success" size="small" style="margin:0 20px"> 上 一 步 </Button>
                                            <Button type="success" size="small"> 完 成 </Button>
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
  name: 'Addshi',
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
// 111
    .shang{
        width: 100%;height: 200px;display: flex;justify-content: space-between;
        .left{width: 60%;height: 200px;background:#F5F7F9;
            .ipt{width: 100%;height: 50px;display: flex;align-items: center;justify-content: space-around;
            
            }
            .ipt1{justify-content: space-around;}
        }
        .right{width: 37%;height: 200px;background:#F5F7F9;
        
        .center{width: 100%;height: 170px;display:flex;justify-content: center;align-items:center;
            .center2{width: 200px;height: 150px;
               .btn{width: 100px;height: 30px;background: #39435B;float: right;border: 0;color: #fff}
            }
         }
        }
    }
    .xia{width: 100%;height: 340px;border: 1px solid red;margin-top: 10px;
       .tab{width: 100%;height: 260px;border: 1px solid greenyellow}
       .but{width: 100%;height: 30px;display: flex;justify-content: center;
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between}
        }
      
    }

    //222
    .wrop{
        display: flex;justify-content: space-between;
        .left{width: 49%;height: 580px;
           .s,.x{width: 100%;height: 50%;}
           //.x{display: flex;justify-content: space-between}
           .fenpei{float: right}
           .map{width: 100%;height: 244px;margin-top: 10px;border: 1px solid blue}
           .upload{width: 100%;height: 110px;;margin: 10px 0;overflow: auto}
        }
        .right{width: 49%;height: 580px;border: 1px solid blue}
    }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center; }

     .but{width: 100%;height: 30px;display: flex;justify-content: center;
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between}
     }
     //333
     .ss{width: 100%;height: 30%;display: flex;align-items: center;justify-content: center}
     .cen2{width: 240px;height: 40px;}
     .map3{width: 100%;height: 320px;margin-top: 10px;border: 1px solid blue}
</style>