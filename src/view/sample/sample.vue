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
                <Button type="primary" @click="Add">{{this.$t('Add')}}</Button>&nbsp;
            </FormItem>
            <FormItem>
                <Button type="primary" @click="BulkDelete">{{this.$t('BulkDelete')}}</Button>
            </FormItem>
        </Form> 
       
        
    
    <!-- 列表模块   -->
        <Table border ref="selection" :loading="listLoading" :columns="coldata" :data="items"></Table>
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
    getSamples
  } from "@/api/limsData";
    export default {
        data(){
            return {

                editFormVisible: false,
                listLoading: true,
                items:[],
                total:0,
                page:1,
                showTotal:12,
                pageSizeOpt:[12,20,30,50,100]
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
                return [ {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }, {
                    title: 'id',
                    minWidth: 60,
                    key: 'id'
                    },
                    {
                        title: '样本编号',
                        minWidth: 250,
                        key: 'number'
                    },
                    {
                        title: '样本类型',
                        minWidth: 250,
                        key: 'type'
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
            handleEdit(index,row){

            },
            handleFilter(){

            },
            Add(){

            },
            BulkDelete(){
                console.log(this)
                console.log(this.$refs)
                console.log(this.items)
                console.log("selection")
                console.log(this.$refs.selection)
                console.log(this.$refs.selection.getSelection())
                let arr=this.$refs.selection.getSelection()
                console.log(arr)
                arr.forEach(
                    (val,index,arr)=>{
                        console.log(val)
                        console.log(index)
                        this.items.splice(this.items.findIndex(item => item.id=val.id), 1);
                    }
                )
                
            },
            getData(){
                this.listLoading=true;
                let para = {
                    page: this.page,
                    showTotal:this.showTotal,
                    type:'DNA'
                }
                getSamples(para).then((res) => {
                    console.log(res);
                    console.log(res.data.total);
                    console.log(res.data.samples);
                    this.items = res.data.samples;
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
