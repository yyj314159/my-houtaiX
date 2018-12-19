<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small" >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card style="height: 85vh;">
                            <div style="height: 80vh;overflow:auto">
                            <div class="wrop">
                                <div class="left">
                                    <div class="s">
                                       
                                        <el-button type="info" plain size="small">下载清单模板</el-button>
                                       
                                        <!-- 上传 -->
                                        <Upload class="upload"
                                            size="small"
                                            multiple
                                            action="//jsonplaceholder.typicode.com/posts/">
                                            <Button icon="ios-cloud-upload-outline">导入项目信息</Button>
                                        </Upload>
                                        <Input v-model="value6" type="textarea" :rows="2" placeholder="备注信息" class="beizhu"/>
                                    </div>
                                    <div class="x">
                                        <div>
                                             <Select v-model="model1" style="width:60px" placeholder="省" size="default">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:60px" placeholder="市" size="default">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:60px" placeholder="区" size="default">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:100px" placeholder="分配状态" size="default">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Button type="success" size="default">分配</Button>
                                        </div>
                                       
                                        <!-- 地图 -->
                                        <div class="map">
                                            <!-- <div id="allmap" style="height:100%"></div>	 -->
                                            <div style="height:100%" id="map"></div>
                                          <!-- <div id="myMap" class="myMapClass" ref="myMap" style="height:100%"></div> -->

                                        </div>
                                            
                                    </div>
                                </div>
                                    <div class="right">
                                        <div class="title"><span>已添加项目访问员</span></div>
                                       <Table border :columns="columns1" :data="data1" :height="tableHeight" size="small" ref = "table"></Table>
                                    </div>
                            </div>                                         
                        </div>
                            <div class="but">
                                <div class="btncen">
                                    <!-- <Button type="error" size="small"> 取 消 </Button> -->
                                    <Button type="success" size="small" style="margin:0 20px" @click="toback"> 上 一 步 </Button>
                                    <Button type="success" size="small" @click="toxia"> 下 一 步 </Button>
                                </div>
                            
                           </div>
                    </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Dao',
  data () {
    return {
        map:{},
        tableHeight:450,
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
        columns1: [
                    {
                        title: '访问员账号',
                        key: 'name'
                    },
                    {
                        title: '调研对象',
                        key: 'age'
                    },
                    {
                        title: '操作',
                        key: 'address',
                        align:'center',
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
                                }, '删除'),
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.index)
                                //         }
                                //     }
                                // }, 'Delete')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
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
        show (index) {
                // this.$Modal.info({
                //     title: 'User Info',
                //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                // })
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
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
      },
      //头部导航
      
      toxia(){
          this.$router.push("/Bian")          
      },
      toback(){
         this.$router.go(-1)
      },
      
    //    ready: function(x, y) {
    //     var map = new BMap.Map('allmap')//显示标签
    //     var point = new BMap.Point(x, y)
        
    //     map.addControl(new BMap.MapTypeControl())
    //     map.enableScrollWheelZoom(true)//启用滚轮放大缩小，默认禁用
    //     map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    //     map.enableDoubleClickZoom(true)
    //     var marker = new BMap.Marker(point)
      
        
    //     map.addOverlay(marker)

    //     map.centerAndZoom(point, 15)// 初始化地图,设置城市和地图级别。
    //     map.centerAndZoom(point, 14)// 初始化地图,设置城市和地图级别。
    // },


    //''''''''地。。。图。。。代。。。码''''''''''''''''''''''''''''''''''''

             BaiduMap(){
                    this.map_init();
                    this.map_load()
                },            
                map_init() { 
                     var markerArr = [  
                        { title: "名称：广州火车站", point: "113.264531,23.157003", address: "广东省广州市广州火车站", tel: "12306" },  
                        { title: "名称：广州塔（赤岗塔）", point: "113.330934,23.113401", address: "广东省广州市广州塔（赤岗塔） ", tel: "18500000000" },  
                        { title: "名称：广州动物园", point: "113.312213,23.147267", address: "广东省广州市广州动物园", tel: "18500000000" },  
                        { title: "名称：天河公园", point: "113.372867,23.134274", address: "广东省广州市天河公园", tel: "18500000000" }  
    
                    ];   
                    var map = new BMap.Map("map"); // 创建Map实例  
                    var point = new BMap.Point(113.312213, 23.147267); //地图中心点，广州市  
                    map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别。  
                    map.enableScrollWheelZoom(true); //启用滚轮放大缩小  
                    //向地图中添加缩放控件  
                    var ctrlNav = new window.BMap.NavigationControl({  
                        anchor: BMAP_ANCHOR_TOP_LEFT,  
                        type: BMAP_NAVIGATION_CONTROL_LARGE  
                    });  
                    map.addControl(ctrlNav);  
  
                    //向地图中添加缩略图控件  
                    var ctrlOve = new window.BMap.OverviewMapControl({  
                        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,  
                        isOpen: 1  
                    });  
                    map.addControl(ctrlOve);  

                    //向地图中添加比例尺控件  
                    var ctrlSca = new window.BMap.ScaleControl({  
                        anchor: BMAP_ANCHOR_BOTTOM_LEFT  
                    });  
                    map.addControl(ctrlSca);  
  
                    var point = new Array(); //存放标注点经纬信息的数组  
                    var marker = new Array(); //存放标注点对象的数组  
                    var info = new Array(); //存放提示信息窗口对象的数组  
                    for (var i = 0; i < markerArr.length; i++) {  
                        var p0 = markerArr[i].point.split(",")[0]; //  
                        var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来  
                        point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点  
                        marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记  
                        map.addOverlay(marker[i]);  
                        marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画  
                        var label = new window.BMap.Label(markerArr[i].title, { offset: new window.BMap.Size(20, -10) });  
                        marker[i].setLabel(label);  
                        info[i] = new window.BMap.InfoWindow("<p style=’font-size:12px;lineheight:1.8em;’>" + markerArr[i].title + "</br>地址：" + markerArr[i].address + "</br> 电话：" + markerArr[i].tel + "</br></p>"); // 创建信息窗口对象  
                    }  
                    marker[0].addEventListener("mouseover", function () {  
                        this.openInfoWindow(info[0]);  
                    });  
                    marker[1].addEventListener("mouseover", function () {  
                        this.openInfoWindow(info[1]);  
                    });  
                    marker[2].addEventListener("mouseover", function () {  
                        this.openInfoWindow(info[2]);  
                    });  
                },  
                //异步调用百度js  
               map_load() {  
                    var load = document.createElement("script");  
                    load.src = "http://api.map.baidu.com/api?v=1.4&callback=map_init";  
                    document.body.appendChild(load);  
                }  
                // window.onload = map_load;  

  },
  mounted(){
      this.BaiduMap()
    //   this.ready(120,30)
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 160;
      
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .wrop{
        display: flex;justify-content: space-between;
        .left{width: 49%;height:76vh;
           .x{width: 100%;height: 70%;background: #F2F4F4;border: 1px solid green}
           .s{width: 100%;height: 25%;margin-bottom: 15px;background: #F2F4F4;}
           .beizhu{margin-top: -110px}
           
        //    .fenpei{float: right}
           .map{width: 100%;height: 90%;margin-top: 10px;border: 1px solid blue}
           .upload{width: 100%;height: 110px;;margin: 10px 0;overflow: auto}
        }
        .right{width: 49%;height: 75vh;border: 1px solid blue}
    }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center; }

     .but{width: 100%;height: 30px;display: flex;justify-content: center;margin-top: -20px;
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between}
     }
</style>