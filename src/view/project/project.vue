<template>
  <div>  
    {{ $t('project.name') }} <br/>
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
          v-for="(item,index) in editForm"
          :label="item.label" >
            <Input v-if="item.type=='text'" :type="item.type" v-model="obj[item.prop]"></Input>
            <Select v-if="item.type=='select'">

            </Select>
            <DatePicker v-if="item.type=='date'" :type="item.type" v-model="obj[item.prop]" ></DatePicker>
        </FormItem>
        
     </Form>
    </Modal>
      <!-- 分页模块 -->
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
</template>
<script>
  import {
    getProjects
  } from "@/api/limsData";

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
        showTotal:10,
        pageSizeOpt:[10,20,30,50,100]
      };
    },
    computed:{
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
              array:['','','','',''],
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
        return [{
            title: this.$t('project.num'),
            key: "id",
            fixed: "left",
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
            fixed: "right",
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
                  "Edit"
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
                  "View"
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
                  "Delete"
                )
              ]);
            }
          }
        ];
      }
    },
    methods: {
      ok () {
          console.log(this.obj);
      },
      cancel () {
          this.$Message.info('Clicked cancel');
      },
      handleEdit(index,row){
        this.editFormVisible = true;
				console.log(row)
				this.obj = Object.assign({}, row);
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
