<template>
    <div>
        <!-- 工具条1   -->

        <Form v-model="filter" inline>
            <FormItem>
                <Input v-model="filter.input" />
            </FormItem>
            <FormItem>
                <Select v-model="filter.type">
                <Option 
                    v-for="(ele,index) in filter.array"
                    value="ele.name">{{ele.label}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleFilter">{{this.$t('inquire')}}</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="Add">{{this.$t('Add')}}</Button>
            </FormItem>
        </Form> 
    
    <!-- 列表模块   -->
        <Table border :loading="listLoading" :columns="coldata" :data="items"></Table>
        <!-- 分页模块 -->
        <br/>
        <div style="float:right;">
            <Page 
                :total="total" 
                :page-size="showTotal" 
                :current='page' 
                :page-size-opts='pageSizeOpt' 
                @on-page-size-change="changePageSize" 
                @on-change="changePage"  
                show-elevator 
                show-sizer />
        </div>
    </div>
</template>
<script>
    import {
    getSampleRegs
  } from "@/api/limsData";
    import sample from "../sample/sampleTable-expand"

    export default {
        data(){
            return {

                editFormVisible: false,
                listLoading: true,
                items:[],
                total:0,
                page:1,
                showTotal:12,
                pageSizeOpt:[12,20,30,50,100],
                
            };
        },
        computed:{
            filter:function(){
                return {
                input:'',
                type:'num',
                array:[
                    {
                        name:'num',
                        label:this.$t('project.num')
                    },
                    {
                        name:'name',
                        label:this.$t('project.name')
                    },
                    {
                        name:'nowstate',
                        label:this.$t('project.nowstate')
                    }
                    ]
                }
                },
            coldata:function(){
                return [{
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(sample, {
                            props: {
                                    row: params.row.samples,
                                    col:[
                                    {
                                        title: 'id',
                                        minWidth: 250,
                                        key: 'id'
                                    },
                                    {
                                        title: '登记单编号',
                                        minWidth: 250,
                                        key: 'name'
                                    },
                                    {
                                        title: '物种',
                                        minWidth: 250,
                                        key: 'species'
                                    },
                                    {
                                        title: '创建时间',
                                        minWidth: 250,
                                        key: 'createtime'
                                    }
                                    ]

                                }
                            })
                        }
                    },
                    {
                        title: 'id',
                        minWidth: 250,
                        key: 'id'
                    },
                    {
                        title: '登记人',
                        minWidth: 250,
                        key: 'man'
                    },
                    {
                        title: '登记人电话',
                        minWidth: 250,
                        key: 'phone'
                    },
                    {
                        title: '物种',
                        minWidth: 80,
                        key: 'species'
                    },
                    {
                        title: '创建时间',
                        minWidth: 120,
                        key: 'createtime'
                    },
                    {
                        title: this.$t('Action'),
                        key: "action",
                        width: 200,
                        align: "center",
                        render: (h, params) => {
                        return h("div", [
                            h(
                            "Button", {
                                props: {
                                type: "primary",
                                size: "small"
                                },
                                style: {
                                marginRight: "5px"
                                },
                                on: {
                                click: () => {
                                    console.log(params);
                                    this.handleEdit(params.index,params.row);
                                }
                                }
                            },
                            this.$t('Edit')
                            ),
                            h(
                            "Button", {
                                props: {
                                type: "primary",
                                size: "small"
                                },
                                style: {
                                marginRight: "5px"
                                },
                                on: {
                                click: () => {
                                    console.log(params);
                                    this.show(params);
                                }
                                }
                            },
                            this.$t("View")
                            ),
                            h(
                            "Button", {
                                props: {
                                type: "error",
                                size: "small"
                                },
                                on: {
                                click: () => {
                                    console.log(params);
                                    this.remove(params.index);
                                }
                                }
                            },
                            this.$t("Delete")
                            )
                            ]);
                        }
                    }]
                }   
        },
        methods:{
             show(index) {
            },
            remove(index) {
                this.items.splice(index, 1);
            },
            handleFilter(){

            },
            handleEdit(index,row){

            },
            Add(){

            },
            getData(){
                this.listLoading=true;
                let para = {
                    page: this.page,
                    showTotal:this.showTotal,
                    type:'DNA'
                }
                getSampleRegs(para).then((res) => {
                    console.log(res);
                    console.log(res.data.total);
                    console.log(res.data.samples);
                    this.items = res.data.sampleRegesters;
                    console.log(this.items);
                    this.total=res.data.total;
                    this.listLoading = false;
                });
            },
            changePage(val){
                console.log(val);
                this.page=val;
                this.getData();
            },
            changePageSize(val){
                this.showTotal=val;
                this.getData();
            }
        },
        mounted(){
            this.getData();
        }
    };
</script>
