<template>
    <div>

        <Button type="primary" @click="BulkAdd">{{this.$t('BulkAdd')}}</Button>
        <Button type="primary" @click="BulkDelete">{{this.$t('BulkDelete')}}</Button>
        <Table ref="Sampleselection"  border :columns="coldata" :data="row"></Table>
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
                return [
                    {
                        type: 'selection',
                        minWidth: 50,
                        align: 'center'
                    },{
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
                this.row.splice(index, 1);
            },
            handleEdit(index,row){
                this.editFormVisible = true;
				console.log(row)
				this.obj = Object.assign({}, row);
            },
            BulkAdd(){
                
            },
            BulkDelete(){
                console.log(this.$refs.Sampleselection.getSelection())
                console.log(this.row)
                let arr=this.$refs.Sampleselection.getSelection()
                console.log(arr)
                arr.forEach(
                    (val,index,arr)=>{
                        console.log(val)
                        console.log(index)
                        this.row.splice(this.row.findIndex(item => item.id=val.id), 1);
                    }
                )
            },
            SampleSelectAll (status) {
                this.$refs.Sampleselection.selectAll(status);
            }
        }
    }
</script>
