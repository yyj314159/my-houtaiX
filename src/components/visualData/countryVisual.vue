<template>
    <div class="countryVisual">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 6px 6px'}"> 
                <Breadcrumb :style="{margin: '6px 0'}"> 
                    <div class="title">
                        <span>全国区域</span>
                        <el-button type="info" @click="goBack">返&nbsp;回</el-button>                     
                    </div>                
                </Breadcrumb>
                <Card style="height: 85vh;">
                    <div style="height: 80vh;overflow:auto">
                         <!-- <div id="container"></div> -->
                          <div id="main" style="width: 600px;height:400px;"></div>
                    </div>   
               </Card>              
            </Content>
        </Layout>
    </div>
</template>
<script>
import $ from "jquery"
import axios from "axios"
import img from '../../assets/img/login/logo.png'

var echarts = require('echarts')


export default {
    name: 'countryVisual',
    methods:{
        // 返回按钮
        goBack(){
            this.$router.back(-1)
        },
    },
    mounted() {


        
// function randomData() {
// 		return Math.round(Math.random()*500);
// 	}
 
// 	var mydata = [
// 		{name: '北京',value: randomData() },{name: '天津',value: randomData() },
// 		{name: '上海',value: randomData() },{name: '重庆',value: randomData() },
// 		{name: '河北',value: randomData() },{name: '河南',value: randomData() },
// 		{name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
// 		{name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },
// 		{name: '安徽',value: randomData() },{name: '山东',value: randomData() },
// 		{name: '新疆',value: randomData() },{name: '江苏',value: randomData() },
// 		{name: '浙江',value: randomData() },{name: '江西',value: randomData() },
// 		{name: '湖北',value: randomData() },{name: '广西',value: randomData() },
// 		{name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
// 		{name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },
// 		{name: '吉林',value: randomData() },{name: '福建',value: randomData() },
// 		{name: '贵州',value: randomData() },{name: '广东',value: randomData() },
// 		{name: '青海',value: randomData() },{name: '西藏',value: randomData() },
// 		{name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
// 		{name: '海南',value: randomData() },{name: '台湾',value: randomData() },
// 		{name: '香港',value: randomData() },{name: '澳门',value: randomData() }
// 	];
 
// 	var option = {
// 		backgroundColor: '#FFFFFF',
// 		title: {
// 			text: '全国地图',
// 			subtext: '纯属虚构',
// 			x:'center'
// 		},
// 		tooltip : {
// 			trigger: 'item'
// 		},
// 		visualMap: {
// 			show : false,
// 			x: 'left',
// 			y: 'bottom',
// 			splitList: [ 
// 				{start: 500, end:600},{start: 400, end: 500},
// 				{start: 300, end: 400},{start: 200, end: 300},
// 				{start: 100, end: 200},{start: 0, end: 100},
// 			],
// 			color: ['#66CC33', '#00FF00', '#66FF33','#339900', '#33CC00', '#00CC00']
// 		},
// 		series: [{
// 			name: '随机数据',
// 			type: 'map',
// 			mapType: 'china', 
// 			roam: true,
// 			label: {
// 				normal: {
// 					show: false
// 				},
// 				emphasis: {
// 					show: false
// 				}
// 			},
// 			data:mydata
// 		}]
// 	};
// 	var chart = echarts.init(document.getElementById('main'));
//     chart.setOption(option);



    //    echarts.init(document.getElementById('main')).setOption({
      

	//     });
	

//各省份的地图json文件
var provinces = {
    '上海': '/asset/get/s/data-1482909900836-H1BC_1WHg.json',
    '河北': '/asset/get/s/data-1482909799572-Hkgu_yWSg.json',
    '山西': '/asset/get/s/data-1482909909703-SyCA_JbSg.json',
    '内蒙古': '/asset/get/s/data-1482909841923-rkqqdyZSe.json',
    '辽宁': '/asset/get/s/data-1482909836074-rJV9O1-Hg.json',
    '吉林': '/asset/get/s/data-1482909832739-rJ-cdy-Hx.json',
    '黑龙江': '/asset/get/s/data-1482909803892-Hy4__J-Sx.json',
    '江苏': '/asset/get/s/data-1482909823260-HkDtOJZBx.json',
    '浙江': '/asset/get/s/data-1482909960637-rkZMYkZBx.json',
    '安徽': '/asset/get/s/data-1482909768458-HJlU_yWBe.json',
    '福建': '/asset/get/s/data-1478782908884-B1H6yezWe.json',
    '江西': '/asset/get/s/data-1482909827542-r12YOJWHe.json',
    '山东': '/asset/get/s/data-1482909892121-BJ3auk-Se.json',
    '河南': '/asset/get/s/data-1482909807135-SJPudkWre.json',
    '湖北': '/asset/get/s/data-1482909813213-Hy6u_kbrl.json',
    '湖南': '/asset/get/s/data-1482909818685-H17FOkZSl.json',
    '广东': '/asset/get/s/data-1482909784051-BJgwuy-Sl.json',
    '广西': '/asset/get/s/data-1482909787648-SyEPuJbSg.json',
    '海南': '/asset/get/s/data-1482909796480-H12P_J-Bg.json',
    '四川': '/asset/get/s/data-1482909931094-H17eKk-rg.json',
    '贵州': '/asset/get/s/data-1482909791334-Bkwvd1bBe.json',
    '云南': '/asset/get/s/data-1482909957601-HkA-FyWSx.json',
    '西藏': '/asset/get/s/data-1482927407942-SkOV6Qbrl.json',
    '陕西': '/asset/get/s/data-1482909918961-BJw1FyZHg.json',
    '甘肃': '/asset/get/s/data-1482909780863-r1aIdyWHl.json',
    '青海': '/asset/get/s/data-1482909853618-B1IiOyZSl.json',
    '宁夏': '/asset/get/s/data-1482909848690-HJWiuy-Bg.json',
    '新疆': '/asset/get/s/data-1482909952731-B1YZKkbBx.json',
    '北京': '/asset/get/s/data-1482818963027-Hko9SKJrg.json',
    '天津': '/asset/get/s/data-1482909944620-r1-WKyWHg.json',
    '重庆': '/asset/get/s/data-1482909775470-HJDIdk-Se.json',
    '香港': '/asset/get/s/data-1461584707906-r1hSmtsx.json',
    '澳门': '/asset/get/s/data-1482909771696-ByVIdJWBx.json'
};

//各省份的数据
var allData = [{
    name: '北京'
}, {
    name: '天津'
}, {
    name: '上海'
}, {
    name: '重庆'
}, {
    name: '河北'
}, {
    name: '河南'
}, {
    name: '云南'
}, {
    name: '辽宁'
}, {
    name: '黑龙江'
}, {
    name: '湖南'
}, {
    name: '安徽'
}, {
    name: '山东'
}, {
    name: '新疆'
}, {
    name: '江苏'
}, {
    name: '浙江'
}, {
    name: '江西'
}, {
    name: '湖北'
}, {
    name: '广西'
}, {
    name: '甘肃'
}, {
    name: '山西'
}, {
    name: '内蒙古'
}, {
    name: '陕西'
}, {
    name: '吉林'
}, {
    name: '福建'
}, {
    name: '贵州'
}, {
    name: '广东'
}, {
    name: '青海'
}, {
    name: '西藏'
}, {
    name: '四川'
}, {
    name: '宁夏'
}, {
    name: '海南'
}, {
    name: '台湾'
}, {
    name: '香港'
}, {
    name: '澳门'
}];
for (var i = 0; i < allData.length; i++) {
    allData[i].value = Math.round(Math.random() * 100);
}


loadMap('/asset/get/s/data-1527045631990-r1dZ0IM1X.json', 'china');//初始化全国地图
var myChart = this.$echarts.init(document.getElementById("main"))

var timeFn = null;

//单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
myChart.on('click', function(params) {
    clearTimeout(timeFn);
    //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
    timeFn = setTimeout(function() {
        var name = params.name; //地区name
        var mapCode = provinces[name]; //地区的json数据
        if (!mapCode) {
            alert('无此区域地图显示');
            return;
        }

        loadMap(mapCode, name);
        
    }, 250);
});


// 绑定双击事件，返回全国地图
myChart.on('dblclick', function(params) {
    //当双击事件发生时，清除单击事件，仅响应双击事件
    clearTimeout(timeFn);
    
    //返回全国地图
    loadMap('/asset/get/s/data-1527045631990-r1dZ0IM1X.json', 'china');
});

/**
 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
 @params {String} mapCode:json数据的地址
 @params {String} name: 地图名称
 */
function loadMap(mapCode, name) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        if (params.data) return params.name + '：' + params.data['value']
                    },
                },
                visualMap: {
                    type: 'continuous',
                    text: ['', ''],
                    showLabel: true,
                    left: '50',
                    min: 0,
                    max: 100,
                    inRange: {
                        color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
                    },
                    splitNumber: 0
                },
                series: [{
                    name: 'MAP',
                    type: 'map',
                    mapType: name,
                    selectedMode: 'false',//是否允许选中多个区域
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: allData
                }]
            };
            myChart.setOption(option);
            // curMap = {
            //     mapCode: mapCode,
            //     mapName: name
            // };
        } else {
            alert('无法加载该地图');
        }
    });
}



        
    },    
   
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.countryVisual{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    #container{width: 100%; height: 100%; margin: 0 auto 30px;}                
}
</style>