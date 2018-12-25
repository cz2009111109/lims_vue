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
        
        @on-ok="ok"
        @on-cancel="cancel">
      <Form  :model="editForm" :label-width="90">
        <FormItem v-for="(item,index) in editFormcols">
          {{item}}{{index}}
        </FormItem>
        <ul v-for="(item,index) in editForm">
         <li> {{item}}{{index}}</li>
        </ul>
         <ul v-for="ele in editForm">
         <li v-for="(item,index) in ele"> {{item}}:{{index}}</li>
        </ul>
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
      editFormcols:function(){
        return 
          [
            {
              pro:'id',
              label:this.$t('project.num'),
              placeholder:''
            },{
              pro:'name',
              label:this.$t('project.name'),
              placeholder:''
            },{
              pro:'nowstate',
              label:this.$t('project.nowstate'),
              placeholder:''
            }
          ]
        
      },
      editForm: function(){
        return {
          obj:{
            id: '',
            name: '',
            starttime: '',
            endtime: '',
            nowstate: '',
            date: ''
            }
          }
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
                        this.show(params.index);
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
          this.$Message.info('Clicked ok');
      },
      cancel () {
          this.$Message.info('Clicked cancel');
      },
      handleEdit(index,row){
        this.editFormVisible = true;
				console.log(row)
				this.editForm.obj = Object.assign({}, row);
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
