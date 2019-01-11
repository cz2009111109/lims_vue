<template>
    <div>
        <!-- 工具条1   -->
        <Button  @click="handleSelectAll(true)">{{this.$t('SetAllSelected')}}</Button>
        <Button  @click="handleSelectAll(false)">{{this.$t('CancelAllSelected')}}</Button>
        <Button type="primary" @click="BulkDelete">{{this.$t('BulkDelete')}}</Button>
    <!-- 列表-->
        <Table ref="selection"  border :columns="coldata" :data='row'>
            
        </Table>
        
    </div>
</template>
<script>
import sample from "../sample/sampleTable-expand"
    export default {
        data(){
            return {
                project:{},
                items:[]
            }
        },
        watch:{
            row:(newVal,oldNal) =>{
                this.items=newVal
            }
        },
        props: {
            col: Array,
            row: Array.sampleRegester
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
                    type: 'selection',
                    minWidth: 50,
                    align: 'center'
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
            showProps(){
                console.log(this.row)
            },
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
                console.log("sampleReg操作");
                console.log(this.row)
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
                console.log(this.$refs.selection.getSelection())
                console.log(this.row)
                let arr=this.$refs.selection.getSelection()
                console.log(arr)
                arr.forEach(
                    (val,index,arr)=>{
                        console.log(val)
                        console.log(index)
                        this.row.splice(this.row.findIndex(item => item.id=val.id), 1);
                    }
                )
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        },
        mounted(){
            this.showProps();
        }
    };
</script>

