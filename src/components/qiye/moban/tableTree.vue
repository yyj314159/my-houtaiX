<template>
  <div class="table-box">
  
    <p v-if="fixedHead" class="header-box">{{fixedHead}}</p>
  
    <el-table :data="data" border fit height="calc(100% - 40px)" style="width: 100%" :row-style="showTr" tooltip-effect="dark" class="tree-table">
  
      <el-table-column type="selection" width="40">
  
      </el-table-column>
  
      <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" :min-width="firstWidth(index)" show-overflow-tooltip :align="firstAlign(index)">
  
        <template slot-scope="scope">
  
            <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
  
            <span class="button" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
  
                  <i v-if="!scope.row._expanded" class="el-icon-circle-plus" aria-hidden="true"></i>
  
                  <i v-if="scope.row._expanded" class="el-icon-remove" aria-hidden="true"></i>
  
                </span>
  
            <span v-else-if="index===0" class="ms-tree-space"></span>
  
            {{scope.row[column.dataIndex]}}
</template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="treeType === 'normal'">
<template slot-scope="scope">
  <el-button type="primary" v-model="edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          <Modal
              title="编辑"
              @on-ok="editupdate" 
              v-model="edit"
              :styles="{top: '100px'}">
              <p>项目调查产品类别：
                <Select v-model="model1" style="width:200px" placeholder="项目调查产品类别" size="default">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </p>
              <p style="margin:10px 0">产品名称：<Input v-model="editproname" placeholder="产品名称" style="width: 300px" size="default"/></p>
               <p>排序值：<Input v-model="editsortval" placeholder="排序值" style="width: 100px" size="default"/></p><br/><hr />
               <p style="margin-top:10px"><Checkbox v-model="single">是否需要录入价格 :	</Checkbox></p><br/>
               <p>条形码：<Input v-model="tiaoxingma" placeholder="条形码" style="width: 100px" size="default"/>（仅第三级子集填写）</p>
          </Modal>
  
  <el-button type="primary" v-model="addchild" size="mini" @click="showHandleAdd(scope.row)">添加子类</el-button>
         <Modal
              title="添加子类"
              v-model="addchild"
              @on-ok="addchildpro" 
              :styles="{top: '100px'}">
              <p>
                <Select v-model="model1" style="width:200px" placeholder="项目调查产品类别" size="default">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </p>
               <p style="margin:10px 0"><Input v-model="addproname" placeholder="产品名称" style="width: 300px" size="default"/></p>
               <p><Input v-model="addsortval" placeholder="排序值" style="width: 100px" size="default"/></p><br/><hr />
               <p style="margin-top:10px"><Checkbox v-model="single">是否需要录入价格 :	</Checkbox></p><br/>
               <p>条形码：<Input v-model="tiaoxingma" placeholder="条形码" style="width: 100px" size="default"/>（仅第三级子集填写）</p>
          </Modal>
</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import MSDataTransfer from './dataTranslate.js'
  import $ from "jquery"
  import axios from "axios"

  export default {
  
    name: 'tree-grid',
  
    props: {
  
      treeStructure: {
  
        type: Boolean,
  
        default: true
  
      },
  
      columns: {
  
        type: Array,
  
        default: () => []
  
      },
  
      dataSource: {
  
        type: Array,
  
        default: () => []
  
      },
  
      treeType: {
  
        type: String,
  
        default: 'normal'
  
      },
  
      defaultExpandAll: {
  
        type: Boolean,
  
        default: false
  
  
  
      },
  
      fixedHead: {
  
        type: String,
  
        default: ''
  
      },
  
      fixed: {
  
        type: Boolean,
  
        default: true
  
      },
  
  
  
      btnList: {
  
        type: Array,
  
        default: () => ([])
  
      },
  
      operatWidth: {
  
        type: Number,
  
        default: 300
  
      }
  
    },
  
    data() {
  
      return {
        sid:"",
        psort:"",
        pprice:'',
        bianhao:"",
        tiaoxingma:"",
        single:false,
        sid:"",
        ptid:"",
        pid:"",
        edit:false,
        addchild:false,
         editproname:"",
         editsortval:"",
         addproname:"",
         addsortval:"",
        cityList: [
         
                    // {
                    //     value: 'New York',
                    //     label: 'New York'
                    // },
                    
                ],
                model1: ''

      }
  
    },
  
    computed: {
  
      data() {
  
        if (this.treeStructure) {
  
          let data = MSDataTransfer.treeToArray(this.dataSource, null, null, this.defaultExpandAll)
  
          return data
  
        }
  
        return this.dataSource
  
      }
  
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
      editupdate(){
         console.log(this.pid,this.ptid,this.sid)
          var that = this;
          if(this.pid && this.ptid == undefined && this.sid == undefined){
              console.log("111")
              axios({
                method: "post",
                url: "http://106.14.173.50:8080/UpdateProduct",
                params: {
                      pid:that.pid,
                      pname:that.editproname,
                      psort:that.editsortval
                    }
              }).then(function(data) {
                  console.log(data.data)
                  if (data.data.code == "10000") {
                    // that.instance("success");
                    alert("修改成功")
                    window.location.reload()
                  } else {
                    that.instance("error");
                    
                  }
              });
          }else if(this.sid == null){
              console.log("222")
              var check = 0;
               if(that.single==true){
                 check = 1
               }else{
                 check = 0
               }
                console.log(that.editproname,that.ptid,that.pid,check,that.editsortval)
                axios({
                  method: "post",
                  url: "http://106.14.173.50:8080/UpdateProducttype",
                  params: {
                        pid:that.pid,
                        ptid:that.ptid,
                        ptprice:check,
                        ptname:that.editproname,
                        ptsort:that.editsortval
                      }
              }).then(function(data) {
                    console.log(data.data)
                    if (data.data.code == "10000") {
                      alert("修改成功")
                    window.location.reload()
                    } else {
                      that.instance("error");
                    }
              });
          }else{
              console.log("333")
              var check = 0;
               if(that.single==true){
                 check = 1
               }else{
                 check = 0
               }
               console.log(that.editproname,that.editsortval,that.tiaoxingma,that.bianhao,that.sid,that.ptid)
              axios({
              method: "post",
              url: "http://106.14.173.50:8080/UpdateSublevelproduct",
              params: {
                        sid:that.sid,
                        ptid:that.ptid,
                        sprice:check,
                        sname:that.editproname,                     
                        ssort:that.editsortval,
                        barcode:that.tiaoxingma,

                        snumber:that.bianhao,
                  }
            }).then(function(data) {
              console.log(data.data)
              if (data.data.code == "10000") {
                    alert("修改成功")
                    window.location.reload()
              } else {
                that.instance("error");
              }
            });
          }
         
          
      },
      //添加子集
      addchildpro(){
           
            console.log(this.pid,this.ptid,this.sid)
          var that = this;
          if(this.pid && this.ptid == undefined && this.sid == undefined){
              console.log("111")
              var check = 0;
               if(that.single==true){
                 check = 1
               }else{
                 check = 0
               }
               console.log(that.editproname,that.editsortval,that.pid,)
              axios({
                method: "post",
                url: "http://106.14.173.50:8080/SavaByProducttype",
                params: {
                      pid:that.pid,
                      ptname:that.addproname,
                      ptsort:that.addsortval,
                      ptrice:check
                      
                    }
              }).then(function(data) {
                  console.log(data.data)
                  if (data.data.code == "10000") {
                    // that.instance("success");
                     alert("添加成功")
                    window.location.reload()
                  } else {
                    that.instance("error");
                  }
              });
          }else if(this.sid == null){
              console.log("222")
              var check = 0;
               if(that.single==true){
                 check = 1
               }else{
                 check = 0
               }
                console.log(that.single)
                axios({
                  method: "post",
                  url: "http://106.14.173.50:8080//SavaBySublevelproduct",
                  params: {
                        sid:that.sid,
                        ptid:that.ptid,
                        sprice:check,
                        sname:that.addproname,
                        ssort:that.addsortval,
                        baecode:that.tiaoxingma,
                        snumber:that.bianhao
                      }
              }).then(function(data) {
                    console.log(data.data)
                    if (data.data.code == "10000") {
                      // that.instance("success");
                       alert("添加成功")
                       window.location.reload()
                    } else {
                      that.instance("error");
                    }
              });
          }else{
              alert("亲，没有子集啦")
            
          }

      },
   //每行数据编辑
      showEditDialog(row) { 
        console.log(row)  
        this.pid = row.pid
        this.sid = row.sid
        console.log(this.pid)
        this.ptid = row.ptid
       
        this.tiaoxingma = row.tiaoxingma
        this.bianhao = row.bianhao
        this.pprice = row.pprice
        this.psort = row.psort

        this.edit = true;
        this.editproname=row.pname
        this.editsortval = row.psort
        var obj =  {
                    value: localStorage.getItem('val'),
                    label: localStorage.getItem('lab')
                }               
            // console.log(obj)
        this.cityList=[obj]          
        this.model1 = obj.value
      },
     //添加子集弹出
      showHandleAdd(row) {   
        console.log("000")  
         console.log(row)  
        this.pid = row.pid
        this.sid = row.sid
        console.log(this.pid)
        this.ptid = row.ptid
        
        this.tiaoxingma = row.tiaoxingma
        this.bianhao = row.bianhao
        this.pprice = row.pprice
        this.psort = row.psort

        this.addchild = true;
        this.addproname=row.pname
        this.addsortval = row.psort
        var obj =  {
                    value: localStorage.getItem('val'),
                    label: localStorage.getItem('lab')
                }               
            // console.log(obj)
        this.cityList=[obj]          
        this.model1 = obj.value
      },
  
      // -----------------------
  
      showTr(rows, index) {
  
        let row = rows.row
  
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
  
        row._show = show
  
        return show ? '' : 'display:none;'
  
      },
  
      toggle(trIndex) {
  
        let record = this.data[trIndex]
  
        record._expanded = !record._expanded
  
      },
  
      spaceIconShow(index) {
  
        if (this.treeStructure && index === 0) {
  
          return true
  
        }
  
        return false
  
      },
  
      toggleIconShow(index, record) {
  
        if (this.treeStructure && index === 0 && record.children && record.children.length > 0) {
  
          return true
  
        }
  
        return false
  
      },
  
      firstWidth(index) {
  
        if (index === 0) {
  
          return '150'
  
        } else {
  
          return '100'
  
        }
  
      },
  
      firstAlign(index) {
  
        if (index === 0) {
  
          return 'left'
  
        } else {
  
          return 'center'
  
        }
  
      }
  
    },
    mounted(){
       
          
    }
  
  }
</script>
<style scoped>
  .table-box {
  
    width: 100%;
  
    height: 100%;
  
  }
  
  
  
  .header-box {
  
    padding: 8px 0;
  
    margin: 0;
  
    text-align: center;
  
    font-weight: bold;
  
  }
  
  
  
  .ms-tree-space {
  
    position: relative;
  
    top: 1px;
  
    display: inline-block;
  
    font-family: 'Glyphicons Halflings';
  
    font-style: normal;
  
    font-weight: 400;
  
    line-height: 1;
  
    width: 18px;
  
    height: 14px;
  
  }
  
  
  
  .ms-tree-space::before {
  
    content: ""
  
  }
  
  
  
  table td {
  
    line-height: 26px;
  
  }
  
  
  
  .button {
  
    font-size: 20px;
  
    cursor: pointer;
  
  }
  
  
  
  .firstWidth {
  
    min-width: 150px;
  
  }
  
  
  
  .tree-table .el-table__body-wrapper {
  
    overflow-y: auto;
  
  }
  
  
  
  .el-icon-circle-plus,
  
  .el-icon-remove {
  
    color: #409EFF;
  
  }
</style>

