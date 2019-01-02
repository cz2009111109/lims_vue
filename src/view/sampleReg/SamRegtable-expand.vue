<template>
    <div>
        <Table border :columns="coldata" :data="row"></Table>
    </div>
</template>
<script>
import sample from "../sample/sample"
    export default {
        data(){
            return {
                items:[]
            }
        },
        props: {
            col: Array,
            row: Array
        },
        computed:{
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
                        title: '登记单编号',
                        minWidth: 250,
                        key: 'name'
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
            }
        }
    };
</script>

