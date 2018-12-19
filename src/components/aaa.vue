<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;</el-button>
                    <el-button type="danger" size="small">&nbsp;&nbsp;删&nbsp;除&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 800px">
                        <el-table :data="data1" stripe border style="width:100%" empty-text="" height="50px">
                        　　<el-table-column prop="id" label="名称" align="center" min-width="185" max-height="10">
                        　　</el-table-column>
                        　　<el-table-column prop="name" label="编号" align="center" min-width="120" max-height="10">
                        　　</el-table-column>
                        　　<el-table-column prop="discribe" label="条形码" align="center" min-width="145">
                        　　</el-table-column>
                        　　<el-table-column prop="sort" label="是否需要价格" align="center" min-width="120">
                        　　</el-table-column>
                        　　<el-table-column label="排序" align="center" min-width="100">
                        　　</el-table-column>
                            <el-table-column label="操作" align="center" min-width="80">
                        　　</el-table-column>
                        </el-table>
                         <!-- <Table :columns="columns1"  no-data-text="" style="height:50px"> </Table>      -->
                         <Tree  :data="data5" :render="renderContent"></Tree>
                       
                       
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'aaa',
  data () {
            return {
                columns1: [
                    {
                        title: '名称',
                        key: 'name',
                        
                    },
                    {
                        title: '编号',
                        key: 'age'
                    },
                    {
                        title: '条形码',
                        key: 'address'
                    },
                    {
                        title: '是否需要价格',
                        key: 'address'
                    },
                    {
                        title: '排序',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'address'
                    }
                ],
                data1: [
                    // {
                    //     name: 'John Brown',
                    //     age: 18,
                    //     address: 'New York No. 1 Lake Park',
                    //     date: '2016-10-03'
                    // },
                   
                ],
               data5: [
                    {
                        title: 'parent 1',
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '64px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                id:"1",
                                title: '一级',
                                sort:"1",
                                expand: true,
                                children: [
                                    {
                                       id:"1",
                                        title: '二级',
                                        sort:"1",
                                        expand: true,
                                    },
                                    {
                                       id:"1",
                                        title: '2级',
                                        sort:"1",
                                        expand: true,
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                }
            }

               
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('div', 
                {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        border:"1px solid #D7D7D7"
                    }
                }, 
                [
                    //图标
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'md-albums'
                            },
                            style: {                         
                                marginRight: '8px',            
                            }
                        }),
                        //文字 
                        h('span', data.title)
                    ]),


                   //加减样式
                    h('span', 
                    {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px',
                           border:"1px solid red"
                        }
                    }, 
                    //加减按钮                  
                    [
                        h('Button',
                         {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'md-add'
                            }),
                            style: {
                                marginRight: '8px',
                                border:"1px solid #515A6E"
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', 
                        {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-create-outline'
                            }),
                            style: {
                               
                                border:"1px solid #515A6E"
                            },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        }),
                        
                    ],
                    
                    
                    ),


                    //  h('span', [
                    //     h('Icon', {
                    //         props: {
                    //             type: 'md-albums'
                    //         },
                    //         style: {                         
                    //             marginRight: '8px',            
                    //         }
                    //     }),
                    //     //文字 
                    //     h('span', data.title)
                    // ]),
                    // 0000000000000000
                     h('div', 
                        {
                            style: {
                                width:'15%',
                                height:"26px",
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px',
                                border:"1px solid #D7D7D7",
                                textAlign:"center"
                            },
                           
                         },   
                          [
                            h('span', [
                                //文字 
                                h('span', data.sort)
                            ]),
                         ],                 
                    
                     ),
                     
                      h('div', 
                        {
                            style: {
                                width:'15%',
                                height:"26px",
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '0px',
                                border:"1px solid #D7D7D7",
                                textAlign:"center"
                            }
                         },  
                         [
                            h('span', [
                                //文字 
                                h('span', data.sort)
                            ]),
                         ],              
                    
                     ),
                      h('div', 
                        {
                            style: {
                                width:'20%',
                                height:"26px",
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '0px',
                                border:"1px solid #D7D7D7",
                                textAlign:"center"
                            }
                         }, 
                           [
                            h('span', [
                                //文字 
                                h('span', data.title)
                            ]),
                     ],                      
                    
                     ),
                      h('div', 
                        {
                            style: {
                                width:'16%',
                                height:"26px",
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '0px',
                                border:"1px solid #D7D7D7",
                                textAlign:"center"
                            }
                         }, 
                           [
                            h('span', [
                                //文字 
                                h('span', data.title)
                            ]),
                     ],                      
                    
                     ),





                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                console.log(data)
                console.log(index)
               // parent.children.splice(index, 1);
            }
        }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    
</style>