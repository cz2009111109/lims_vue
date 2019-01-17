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
      <Table border :loading="listLoading" :columns="ColData" :data="items"></Table>
      <br/>
    <!-- 编辑模块 -->
    <Modal
        v-model="editFormVisible"
        :title="editPageTitle"
        :model="editForm"
        :ref='obj'
        width="60%"
        @on-ok="ok"
        @on-cancel="cancel">
      <Form  width="100%"  :label-width="90">
        <!-- <ul>
          <li v-for="(item,value) in editForm">{{item}}--{{value}}</li>
        </ul> -->
        <FormItem
          v-for="(item,index) in editForm" :label="item.label" >
            <Input v-if="item.type=='text'" :type="item.type" v-model="obj[item.prop]"></Input>
            <Select v-if="item.type=='select'" v-model="obj.nowstate">
              <Option v-for="ele in item.array"  :value="ele.value">{{ele.value}}</Option>
            </Select>
            <DatePicker v-if="item.type=='date'" :type="item.type" v-model="obj[item.prop]" ></DatePicker>
        </FormItem>
        
     </Form>
    </Modal>
      <!-- 分页模块 -->
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
    getProjects
  } from "@/api/limsData";
  import SamRegtable from "../sampleReg/SamRegtable-expand"
  import projectEdit from "./projectEdit"
  export default {
    data() {
      return {
        obj:{
            id: '',
            name: '',
            starttime: '',
            endtime: '',
            nowstate: '',
            date: ''
            },
        editFormVisible: false,
        listLoading: true,
        loading: false,
        items: [],
        total: 0,
        page: 1,
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
      editForm: function(){
        return [
            {
              type:'text',
              prop:'id',
              label:this.$t('project.num'),
              placeholder:''
            },{
              type:'text',
              prop:'name',
              label:this.$t('project.name'),
              placeholder:''
            },{
              type:'select',
              array:[
                  {
                    name:'1',
                    value:'未启动'},
                  {
                    name:'2',
                    value:'检测'},
                  {
                    name:'3',
                    value:'前期探索'},
                  {
                    name:'4',
                    value:'实验中'},
                  {
                    name:'5',
                    value:'建库测序'},
                  {
                    name:'6',
                    value:'分析'},
                  {
                    name:'7',
                    value:'结题'},
                  {
                    name:'8',
                    value:'售后'},
                  {
                    name:'9',
                    value:'已完成'},
                  {
                    name:'10',
                    value:'作废'},
                  {
                    name:'11',
                    value:'暂停'}
                ],
              prop:'nowstate',
              label:this.$t('project.nowstate'),
              placeholder:''
            },{
              type:'date',
              prop:'starttime',
              label:this.$t('project.starttime'),
              placeholder:''
            },{
              type:'date',
              prop:'endtime',
              label:this.$t('project.endtime'),
              placeholder:''
            }
          ]
        },
      editPageTitle:function(){
        return this.$t('editPageTitle')
      },
      ColData:function(){
        return [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
                return h(SamRegtable, {
                    props: {
                        row: params.row,
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
            title: this.$t('project.num'),
            key: "id",
            width: 130,
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: this.$t('project.num'),
                  }
                }),
                h("strong", params.row.id)
              ]);
            }
          },
          {
            title: this.$t('project.name'),
            minWidth: 250,
            key: 'name'
          },
          {
            title: this.$t('project.nowstate'),
            width: 100,
            key: "nowstate"
          },
          {
            title: this.$t('project.starttime'),
            width: 130,
            key: "starttime"
          },
          {
            title:this.$t('project.endtime'),
            width: 130,
            key: "endtime"
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
                        this.remove(params.index);
                      }
                    }
                  },
                  this.$t("Delete")
                )
              ]);
            }
          }
        ];
      }
    },
    methods: {
      ok () {
          console.log('ok')
          console.log(this.obj);
          console.log(this.items);
          if(this.items.find(this.obj.id)==this.obj){
            console.log('true')
          }else{
            console.log('false')
          }
      },
      cancel () {
          console.log('ok')
          console.log(this.obj);
          if(this.items.find(this.obj.id)==this.obj){
            console.log('true')
          }else{
            console.log('false')
          }
      },
      handleFilter(){
          console.log(this.filter)
      },
      Add(){

      },
      handleEdit(index,row){
        this.editFormVisible = true;
				console.log(row)
				this.obj = Object.assign({}, row);
      },
      show(index) {
        console.log(index);
        console.log(this);

      },
      remove(index) {
        this.items.splice(index, 1);
      },
      getData() {
        this.listLoading = true;
        let para = {
          page: this.page,
          showTotal:this.showTotal
        }
        getProjects(para).then((res) => {
          console.log(res);
          console.log(res.data.total);
          this.items = res.data.projects;
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
    mounted() {
      this.getData();
    }
  };

</script>
