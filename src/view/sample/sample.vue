<template>
    <div>
        <Table border :columns="coldata" :data="row"></Table>
    </div>
</template>
<script>
    export default {
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
            
        }
    };
</script>
