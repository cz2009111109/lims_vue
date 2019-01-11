<template>
    <div>
        <Table border :loading="listLoading" :columns="ColData" :data="items"></Table>
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
                loading: false,
                items:[],
                total:0,
                page:1,
                showTotal:12,
                pageSizeOpt:[12,20,30,50,100]
            }
        },
        props: {
            col: Array,
            row: Array
        },
        computed:{
            coldata:function(){
                return [{
                    title: 'id',
                    minWidth: 250,
                    key: 'id'
                    },
                    {
                        title: '样本编号',
                        minWidth: 250,
                        key: 'number'
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
                this.$Modal.info({
                title: "User Info",
                content: `Name：${this.items[index].name}<br>num${
                this.items[index].num
                }<br>Starttime：${this.items[index].starttime}`
                    });
                console.log(index);
                console.log(this);
            },
            remove(index) {
                this.items.splice(index, 1);
            },
            handleEdit(index,row){
                this.editFormVisible = true;
				console.log(row)
				this.obj = Object.assign({}, row);
            },
            getData(){
                this.listLoading=true;
                let para = {
                    page: this.page,
                    showTotal:this.showTotal
                }
                getSamples(para).then((res) => {
                    console.log(res);
                    console.log(res.data.total);
                    this.items = res.data.samples;
                    this.total=res.data.total;
                    this.listLoading = false;
                });
            }
        },
        mounted(){
            this.getData();
        }
    };
</script>
