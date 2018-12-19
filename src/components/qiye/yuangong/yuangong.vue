<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}" style="background:#fff;">
                <Breadcrumb :style="{margin: '16px 0'}" >
                    <!-- <div class="back">返回</div> -->
                    
                </Breadcrumb>
                <Card style="background:#F2F4F4;">
                    <div style="height: 600px">
                      <!-- 个人信息 -->
                        <div id="top">

                          <div class="title"><span>筛选条件</span></div>
                           <div class="ipt">
                                <Select v-model="model1" style="width:100px" placeholder="部门" @on-change="change1" size="default">
                                    <Option v-for="item in bumen" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="model2" style="width:100px" placeholder="职位" @on-change="change2" size="default">
                                    <Option v-for="item in positionzhi" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="model3" style="width:100px" placeholder="员工状态" @on-change="change3" size="default">
                                    <Option v-for="item in yuanstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Button type="success" @click="search" size="default">搜索</Button>
                                <Button type="success" @click="modal10 = true" class="bumenbtn" size="default">添加部门</Button>
                                
                                    <Modal
                                        title="添加部门"
                                        v-model="modal10"
                                        @on-ok="addbu"
                                        :styles="{top: '200px'}"
                                        class-name="vertical-center-modal">
                                        <p>
                                            <Input v-model="addbumen" placeholder="请输入部门名称" style="width: 300px" />
                                        </p>
                                       
                                    </Modal>
                                <Button type="success" @click="modal11= true"  class="zhibtn" size="default">添加职位</Button>
                                     <Modal
                                        title="添加职位"
                                        v-model="modal11"
                                         @on-ok="success"
                                        :styles="{top: '200px'}"
                                        class-name="vertical-center-modal">
                                        <p>
                                             <Select v-model="model1" style="width:300px" placeholder="选择部门" @on-change="change1">
                                                <Option v-for="item in bumen" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select><br/><br/>
                                            <Input v-model="addzhi" placeholder="请输入职位名称" style="width: 300px" />
                                        </p>
                                       
                                    </Modal>
                                <Button type="success" @click="addshow" class="yuanbtn" size="default">添加员工</Button>

                                <!-- 员工添加弹出层 -->
                                     <Modal
                                        title="添加员工"
                                        v-model="modal12"
                                        :styles="{top: '50px'}"
                                        @on-ok="addok"
                                        class-name="vertical-center-modal">
                                        <div class="yuangong">
                                             <div class="addyuan">
                                                 <p class="tit1">职位信息</p>

                                                 <Select v-model="addvalue1" style="width:200px" placeholder="所在部门" @on-change="change1">
                                                    <Option v-for="item in bumen" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                                </Select><br>

                                                <Select v-model="addvalue2" style="width:200px;margin-top:5px" placeholder="所属职位" @on-change="add2">
                                                    <Option v-for="item in positionzhi" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>

                                                <Select v-model="addvalue3" style="width:200px;margin-top:5px" placeholder="权限类型" @on-change="add3">
                                                    <Option v-for="item in quanxian" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Select v-model="addvalue4" style="width:200px;margin-top:5px" placeholder="职位状态" @on-change="add4">
                                                    <Option v-for="item in yuanstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select><br/>
                                                   <Col span="12" style="margin-top:5px">
                                                        <DatePicker type="date" placeholder="入职时间" style="width: 200px" @on-change="changetime"></DatePicker>
                                                    </Col><br/><br/><br/>
                                                     <Col span="12" style="margin-top:-5px">
                                                        <DatePicker type="date" placeholder="离职时间" style="width: 200px" @on-change="changetime2"></DatePicker>
                                                    </Col><br/><br/>
                                                    <!-- <Input v-model="intime" placeholder="入职时间" style="width: 200px;margin-top:5px" />
                                                    <Input v-model="outtime" placeholder="离职时间" style="width: 200px;margin-top:5px" /> -->
                                                    <Input v-model="email" type="email" placeholder="邮箱" @on-blur="youxiang" style="width: 200px;margin-top:5px" class="emal"/>
                                                   
                                                
                                            </div>
                                            <div class="addyuan">
                                                <p class="tit1">基本信息</p>
                                                <Input v-model="yname" placeholder="姓名" style="width: 200px;margin-top:5px" @on-blur="blurname" />
                                                <Input v-model="ysex" placeholder="性别" style="width: 200px;margin-top:5px" @on-blur="blursex" />
                                                <Input v-model="yage" placeholder="年龄" style="width: 200px;margin-top:5px" @on-blur="blurage" />
                                                <Input v-model="yxueli" placeholder="学历" style="width: 200px;margin-top:5px" @on-blur="bluredu" />
                                                <Input v-model="yphone" placeholder="联系方式" style="width: 200px;margin-top:5px" @on-blur="blurphone" />
                                                <Input v-model="yzhang" placeholder="后台账户" style="width: 200px;margin-top:5px" @on-blur="bluruser" />
                                                <Input v-model="ymima" placeholder="初始密码" style="width: 120px;margin-top:5px" @on-blur="blurpassword" />
                                                <!-- <Button type="success" >还原密码</Button> -->
                                                <!-- <Input v-model="aaa" placeholder="初始密码" style="width: 120px;margin-top:5px" @on-blur="blurpassword" /> -->
                                               
                                            </div>
                                        </div>
                                        
                                        
                                    </Modal>
                                <Button type="success" @click="addshencha" size="default">管理审查访问员</Button>   
                           </div>
                        </div>

                        <!-- 更新报告 -->
                        <div id="update">
                             <div class="title title2"><span>状态列表</span><el-button type="info" size="small" @click="outecxel">导出表格</el-button></div>
                            
                             <!-- 表格 -->
                             <Table border :columns="columns1" :data="data1" size="small" class="tab"></Table>

                             <Modal
                                title="修改信息"
                                v-model="tablebianji"
                                @on-ok="updateok"                                
                                class-name="vertical-center-modal">
                                <div class="yuangong">
                                             <div class="addyuan">
                                                 <p class="tit1">职位信息</p>
                                                 <Select v-model="addvalue1" style="width:200px" placeholder="所在部门" @on-change="change1">
                                                    <Option v-for="item in bumen" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select><br>
                                                <Select v-model="addvalue2" style="width:200px;margin-top:5px" placeholder="所属职位" @on-change="add2">
                                                    <Option v-for="item in positionzhi" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Select v-model="addvalue3" style="width:200px;margin-top:5px" placeholder="权限类型" @on-change="add3">
                                                    <Option v-for="item in quanxian" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                                <Select v-model="addvalue4" style="width:200px;margin-top:5px" placeholder="职位状态" @on-change="add4">
                                                    <Option v-for="item in yuanstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select><br/>
                                                   <Col span="12" style="margin-top:5px">
                                                        <DatePicker type="date" placeholder="入职时间" style="width: 200px" @on-change="changetime" v-model="startInline"></DatePicker>
                                                    </Col><br/><br/><br/>
                                                     <Col span="12" style="margin-top:-5px">
                                                        <DatePicker type="date" placeholder="离职时间" style="width: 200px" @on-change="changetime2" v-model="endInline"></DatePicker>
                                                    </Col><br/><br/>
                                                    <!-- <Input v-model="intime" placeholder="入职时间" style="width: 200px;margin-top:5px" />
                                                    <Input v-model="outtime" placeholder="离职时间" style="width: 200px;margin-top:5px" /> -->
                                                    <Input v-model="email" type="email" placeholder="邮箱" @on-blur="youxiang" style="width: 200px;margin-top:5px" class="emal"/>
                                                   
                                                
                                            </div>
                                            <div class="addyuan">
                                                <p class="tit1">基本信息</p>
                                                <Input v-model="yname" placeholder="姓名" style="width: 200px;margin-top:5px" @on-blur="blurname" />
                                                <Input v-model="ysex" placeholder="性别" style="width: 200px;margin-top:5px" @on-blur="blursex" />
                                                <Input v-model="yage" placeholder="年龄" style="width: 200px;margin-top:5px" @on-blur="blurage" />
                                                <Input v-model="yxueli" placeholder="学历" style="width: 200px;margin-top:5px" @on-blur="bluredu" />
                                                <Input v-model="yphone" placeholder="联系方式" style="width: 200px;margin-top:5px" @on-blur="blurphone" />
                                                <Input v-model="yzhang" placeholder="后台账户" style="width: 200px;margin-top:5px" @on-blur="bluruser" />
                                                <Input v-model="ymima" placeholder="初始密码" style="width: 120px;margin-top:5px" @on-blur="blurpassword" />
                                                <!-- <Button type="success" >还原密码</Button> -->
                                                <!-- <Input v-model="aaa" placeholder="初始密码" style="width: 120px;margin-top:5px" @on-blur="blurpassword" /> -->
                                               
                                            </div>
                                        </div>
                                 
                            </Modal>


                        </div>





                    </div>
                </Card>
            </Content>
        </Layout>
         
        
  
     
    
  </div> 
</template>

<script>
import $ from "jquery";
import axios from "axios";
import qs from "qs";
// import ports from "../../assets/js/ports"

export default {
  name: "Addshencha",
  data() {
    return {
      startInline: "",
      endInline: "",
      ptypeid: "",
      uid: "",
      aaa: "mid",
      tablebianji: false,
      columns1: [
        {
          title: "员工编号",
          key: "uid",
          //  children: [
          //                   {
          //                       title: 'Age',
          //                       key: 'age',
          //                       align: 'center',
          //                       width: 200,
          //                       sortable: true
          //                   },
          //                   {
          //                       title: 'Address',
          //                       align: 'center',
          //                   }
          //               ]
        },
        {
          title: "员工姓名",
          key: "uname"
        },
        {
          title: "账户",
          key: "account"
        },
        {
          title: "所在部门",
          key: "dname"
        },
        {
          title: "员工职位",
          key: "pname"
        },
        {
          title: "手机号",
          key: "iphone"
        },
        {
          title: "员工状态",
          key: "utype"
        },
        {
          title: "权限类型",
          key: "jname"
        },
        {
          title: "编辑",
          key: "ydo",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data1: [
        // {
        //     ynum: '001',
        //     yname: '张三',
        //     yuser: '123456',
        //     ybumen: '行政',
        //     yposition:"总裁",
        //     yphone:"6668888",
        //     ystatus:"在职",
        //     yquan:"001",
        // },
        //  {
        //     ynum: '002',
        //     yname: '王五',
        //     yuser: '1288856',
        //     ybumen: '行政',
        //     yposition:"总经理",
        //     yphone:"99998888",
        //     ystatus:"在职",
        //     yquan:"001",
        // },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input: "",
      bumen: [],
      quanxian: [],
      positionzhi: [],
      obj: {},
      intime: "",
      outtime: "",
      email: "",
      yname: "",
      ysex: "",
      yage: "",
      yxueli: "",
      yphone: "",
      yzhang: "",
      ymima: "",
      yuanstatus: [
        {
          value: "0",
          label: "离职"
        },
        {
          value: "1",
          label: "在职"
        }
      ],
      cityList: [],
      addbumen: "",
      addzhi: "",
      model1: "",
      model2: "",
      model3: "",
      addvalue1: "",
      addvalue2: "",
      addvalue3: "",
      updateUid:0,
      addvalue4: "",
      modal9: false,
      modal10: false,
      modal11: false,
      modal12: false,
      modal13: false,
      value: ""
    };
  },
  methods: {
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
    show(index) {
      this.tablebianji = true;
      var data = this.data1[index];
      // alert(JSON.stringify(data));
      this.addvalue1 = data.did;
      this.addvalue2 = data.pid;
      this.addvalue3 = data.jid;
      this.updateUid = data.uid;
      this.addvalue4 = (data.utype == "在职") ? "1" : "0";
      this.startInline = data.starttime;
      this.endInline = data.overtime;
      this.yname = data.uname;
      this.ysex = data.sex;
      this.yphone = data.iphone;
      this.yxueli = data.education;
      this.utype = data.utype;
      this.yzhang = data.account;
      this.yage = data.age;
      this.email = data.email;
      this.ymima = data.password;
      this.change1(this.addvalue1);
      this.changetime(this.startInline);
      this.changetime2(this.endInline);
      this.intime = data.starttime;
      this.outtime = data.overtime;
    },

    updateok() {
      var that = this;
      var params = {
        column1: that.ptypeid,
        did: that.addvalue1,
        pid: that.addvalue2,
        jid: that.addvalue3,
        utype: that.addvalue4,
        starttime: that.intime.length > 0 ? that.intime.substring(0,10) : "",
        overtime: that.outtime.length > 0 ? that.outtime.substring(0,10) : "",
        email: that.email,
        uname: that.yname,
        sex: that.ysex,
        age: that.yage,
        education: that.yxueli,
        iphone: that.yphone,
        account: that.yzhang,
        password: that.ymima,
        uid: that.updateUid
      };
      // alert(JSON.stringify(params));

      axios({
        method: "post",
        url: "http://106.14.173.50:8080/modificationStaff",
        params: params
      }).then(function(data) {
        // console.log(data.data)
        if (data.data.msg == "修改成功") {
          that.instance("success");
        } else {
          that.instance("error");
        }
      });
    },

    youxiangerr(type) {
      const title = "注意";
      const content = "<p>邮箱格式错误</p>";
      switch (type) {
        case "error":
          this.$Modal.error({
            title: title,
            content: content
          });
          break;
      }
    },
    changetime(data) {
      // console.log(data)
      this.startInline = data;
      if (data.length > 0)
      this.intime = data;
      console.log("changetime = " + this.startInline);
    },
    changetime2(data) {
      // console.log(data)
      this.endInline = data;
       if (data.length > 0)
      this.outtime = data;
      console.log("changetime2 = " + this.endInline);
    },
    addshencha() {
      this.$router.push("./ygrecheck");
    },
    // shencha(){
    //     this.$router.push("./addshencha")
    // },
    // 部门
    change1(val) {
      this.model1 = val;
      var that = this;
      // 职位
      axios({
        url: "http://106.14.173.50:8080/QueryByPositionId",
        params: { did: that.model1 }
      }).then(function(data) {
        // console.log(data.data)
        var arr = data.data;
        that.positionzhi = [];
        for (var i in arr) {
          that.obj = { value: arr[i].pid, label: arr[i].pname };
          that.positionzhi.push(that.obj);
        }
      });
    },
    change2(val) {
      //    console.log(val)
      this.model2 = val;
    },
    change3(val) {
      //    console.log(val)
      this.model3 = val;
    },
    //员工添加下拉
    add1(val) {
      // console.log(val)
      this.addvalue1 = val;
    },
    add2(val) {
      // console.log(val)
      this.addvalue2 = val;
    },
    add3(val) {
      // console.log(val)
      this.addvalue3 = val;
    },
    add4(val) {
      // console.log(val)
      this.addvalue4 = val;
    },
    //邮箱失焦
    youxiang() {
      //    console.log("222")
      var em = this.email;
      var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regEmail.test(em)) {
        $(".emal").css({ border: "1px solid red" });
        this.youxiangerr("error");
        // this.email=""
      } else {
        //  $('.emal').css({'border':'1px solid green'})
      }
    },
    blurname() {
      // console.log("000")
      if (!this.yname) {
        //alert("222")
        this.instance("error");
      }
    },
    blursex() {
      if (!this.ysex) {
        //alert("222")
        this.instance("error");
      }
    },
    blurage() {
      if (!this.yage) {
        //alert("222")
        this.instance("error");
      }
    },
    bluredu() {
      if (!this.yxueli) {
        //alert("222")
        this.instance("error");
      }
    },
    blurphone() {
      if (!this.yphone) {
        //alert("222")
        this.instance("error");
      }
    },
    bluruser() {
      if (!this.yzhang) {
        //alert("222")
        this.instance("error");
      }
    },
    blurpassword() {
      if (!this.ymima) {
        //alert("222")
        this.instance("error");
      }
    },
    //员工添加
    addok() {
      this.ymima = $.trim(this.ymima);
      this.yzhang = $.trim(this.yzhang);
      this.yphone = $.trim(this.yphone);
      this.email = $.trim(this.email);
      if (this.ysex == "男") {
        this.ysex == 1;
      } else {
        this.ysex == 2;
      }
    //   console.log(that.addvalue1);
      if (
        this.addvalue1 == "" ||
        this.addvalue2 == "" ||
        this.addvalue3 == "" ||
        this.addvalue4 == "" ||
        this.intime == "" ||
        this.outtime == "" ||
        this.email == "" ||
        this.yname == "" ||
        this.ysex == "" ||
        this.yage == "" ||
        this.yxueli == "" ||
        this.yphone == "" ||
        this.yzhang == "" ||
        this.ymima == ""
      ) {
        this.instance("warning");
      } else {
        var that = this;
        var em = that.email;
        axios({
          url: "http://106.14.173.50:8080/QueryByAccount",
          params: { account: that.yzhang }
        }).then(function(data) {
          console.log(data.data);
          if (data.data.msg == "账号可用") {
            axios({
              method: "post",
              url: "http://106.14.173.50:8080/SavaUser",
              params: {
                did: that.addvalue1,
                pid: that.addvalue2,
                jid: that.addvalue3,
                utype: that.addvalue4,
                starttime: that.intime,
                overtime: that.outtime,
                email: that.email,
                uname: that.yname,
                sex: that.ysex,
                age: that.yage,
                education: that.yxueli,
                iphone: that.yphone,
                account: that.yzhang,
                password: that.ymima,
                uuid: that.uid
              }
            }).then(function(data) {
              console.log(data.data);
              if (data.data.msg == "添加成功") {
                // this.instance("success");
                alert("添加成功")
                window.location.reload()
              }
            });
          } else {
            that.instance("warning");
          }
        });
      }
    },
    //添加部门
    addbu() {
      this.addbumen = $.trim(this.addbumen);
      if (this.addbumen == "" || this.addbumen == null) {
        this.instance("warning");
      } else {
        var that = this;
        // console.log(that.addbumen)
        axios({
          url: "http://106.14.173.50:8080/QueryByDname",
          params: { dname: that.addbumen }
        }).then(function(data) {
          // console.log(data.data)
          if (data.data.msg == "部门已被占用") {
            that.instance("info");
          } else {
            axios({
              method: "post",
              url: "http://106.14.173.50:8080/SavaDepartment",
              params: { dname: that.addbumen,uid:that.uid }
            }).then(function(data) {
              that.addbumen = "";
              // console.log(data.data)
              if (data.data.msg == "添加成功") {
                // that.instance("success");
                alert("添加成功")
                window.location.reload()
              }
            });
          }
        });
      }
    },
    //添加职位
    success() {
        
      this.addbumen = $.trim(this.addzhi);
      if (this.modal1 == "" || this.addzhi == "") {
        this.instance("warning");
      } else {
        var that = this;
        
        // console.log(that.addzhi,that.model1)
        axios({
          url: "http://106.14.173.50:8080/QueryByPname",
          params: { pname: that.addzhi }
        }).then(function(data) {
          // console.log(data.data)
          if (data.data.msg == "职位已被占用") {
            that.instance("info");
          } else if (data.data.msg == "职位可用") {
            axios({
              method: "post",
              url: "http://106.14.173.50:8080/SavaPosition",
              params: { did: that.model1, pname: that.addzhi,uid:that.uid}
            }).then(function(data) {
              that.addzhi = "";
              that.modal1 = "";
               console.log(data.data)
              if ((data.data.msg = "添加成功")) {
                 alert("添加成功")
                // that.$Message.success("添加成功啦");
                 window.location.reload()
              }
            });
          }
        });
      }
    },
    //搜索
    search() {
      var that = this;
      // console.log(that.model1,that.model2,that.model3)
      axios({
        url: "http://106.14.173.50:8080/QueryByUser",
        params: {
          did: that.model1,
          pid: that.model2,
          utype: that.model3,
          mid: that.ptypeid
        }
      }).then(function(data) {
        // console.log(data.data)
        var arr = data.data;
        for (var i in arr) {
          if (arr[i].utype === 1) {
            arr[i].utype = "在职";
          } else {
            arr[i].utype = "离职";
          }
          //    console.log(arr[i].utype)
        }
        that.data1 = arr;
      });
    },
    addshow() {
      this.modal12 = true;
      this.addvalue1 = "";
      this.addvalue2 = "";
      this.addvalue3 = "";
      this.addvalue4 = "";
      this.intime = "";
      this.outtime = "";
      this.email = "";
      this.yname = "";
      this.ysex = "";
      this.yage = "";
      this.yxueli = "";
      this.yphone = "";
      this.yzhang = "";
      this.ymima = "";
    },
    //导出excel
    outecxel() {
      var that = this;
      var did = that.model1;
      var pid = that.model2;
      var utype = that.model3;
      var ccc = that.ptypeid;

      let url =
        "http://106.14.173.50:8080/exportEXL?did=" +
        did +
        "&pid=" +
        pid +
        "&utype=" +
        utype +
        "&mid=" +
        ccc +
        "&id=1";
      window.location.href = url;
    }
  },
  mounted() {
    var uid = localStorage.getItem("uid");
    this.ptypeid = localStorage.getItem("ptypeid");
      console.log(this.ptypeid)
    this.uid = uid;
    // 搜索
    var that = this;
    // console.log(that.model1,that.model2,that.model3)
    axios({
      url: "http://106.14.173.50:8080/QueryByUser",
      params: {
        did: that.model1,
        pid: that.model2,
        utype: that.model3,
        mid: that.ptypeid
      }
    }).then(function(data) {
      var arr = data.data;
      // console.log(arr)
      for (var i in arr) {
        if (arr[i].utype === 1) {
          arr[i].utype = "在职";
        } else {
          arr[i].utype = "离职";
        }
        //    console.log(arr[i].utype)
      }
      that.data1 = arr;
    });

    var that = this;

    //  部门
    axios({
      url: "http://106.14.173.50:8080/QueryByDepartment"
    }).then(function(data) {
      // console.log(data.data)
      var arr = data.data;
      for (var i in arr) {
        var obj = { value: arr[i].did, label: arr[i].dname };
        that.bumen.push(obj);
      }
    });
    //权限类型
    axios({
      url: "http://106.14.173.50:8080/selectJuisdiction"
    }).then(function(data) {
      // console.log(data.data)
      var arr = data.data;
      for (var i in arr) {
        var obj = { value: arr[i].jid, label: arr[i].jname };
        that.quanxian.push(obj);
      }
    });

    //按钮权限判断
    function ifquan(biaoqian) {
      var text = $.trim(biaoqian.text());
      //  console.log(text)
      var str = localStorage.getItem("Jurisdiction");
      var arr = str.split(",");
      var num = $.inArray(text, arr); //返回 -1则不存在
      // console.log(num)
      if (num == -1) {
        biaoqian.css({ display: "none" });
      } else {
        biaoqian.css({ display: "block" });
      }
    }

    var aaa = $(".tab").find("tr:first");
    //  console.log("000"+aaa)

    //  ifquan($(".bumenbtn"))
    //  ifquan($(".zhibtn"))
    //  ifquan($(".yuanbtn"))
    //  ifquan($(".addbtn"))
    //  ifquan($(".bjbtn"))

    document.title = "员工管理";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.back {
  width: 80px;
  height: 30px;
  background: #39435b;
  color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}
.title {
  width: 100%;
  height: 30px;
  background: #5bc0de;
  line-height: 30px;
  color: #fff;
  padding: 0 0 0 10px;
  display: flex;
  justify-content: space-between;
}
.title2 {
  margin-bottom: 10px;
}
.ipt {
  max-width: 800px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#top {
  height: 100px;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  p {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    padding-left: 10px;
  }
}
#update {
  width: 100%;
  height: 500px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  border-radius: 5px;
  overflow: auto;
}
table {
  text-align: center;
  td {
    height: 25px;
  }
}
.header {
  background: #1d95c9;
  color: #fff;
}

.yuangong {
  width: 100%;
  height: 330px;
  display: flex;
  justify-content: space-between;
  .addyuan {
    width: 49%;
    height: 330px;
    border: 1px dotted red;
    background: #fffced;
    padding-left: 15px;
  }
}
.tit1 {
  font-size: 14px;
  font-weight: bold;
}
// .bumenbtn{display: block}
</style>
