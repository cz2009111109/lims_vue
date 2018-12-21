<template>
  <div>    
      <Table border :loading="listLoading" :columns="columns7" :data="projects"></Table>
      <br/>
      <Modal 
        
        >

      </Modal>
      <Page :total="total" :page-size="showTotal" :current='page' :page-size-opts='pageSizeOpt' @on-page-size-change="changePageSize" @on-change="changePage"  show-elevator show-sizer />


    
  </div>
</template>

<script>
  import {
    getProjects
  } from "@/api/limsData";

  export default {
    data() {
      return {
        listLoading: true,
        loading: false,
        projects: [],
        total: 0,
        page: 1,
        showTotal:10,
        pageSizeOpt:[10,20,30,50,100],
        columns7: [{
            title: "项目编号",
            key: "id",
            fixed: "left",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "项目编号"
                  }
                }),
                h("strong", params.row.id)
              ]);
            }
          },
          {
            title: "项目名称",
            key: "name"
          },
          {
            title: "开始时间",
            key: "starttime"
          },
          {
            title: "结束时间",
            key: "endtime"
          },
          {
            title: "操作",
            key: "action",
            fixed: "right",
            width: 150,
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
        ],
        data6: [{
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park"
          },
          {
            name: "Jim Green",
            age: 24,
            address: "London No. 1 Lake Park"
          },
          {
            name: "Joe Black",
            age: 30,
            address: "Sydney No. 1 Lake Park"
          },
          {
            name: "Jon Snow",
            age: 26,
            address: "Ottawa No. 2 Lake Park"
          }
        ]
      };
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: "User Info",
          content: `Name：${this.data6[index].name}<br>Age：${
      this.data6[index].age
      }<br>Address：${this.data6[index].address}`
        });
        console.log(index);
        console.log(this);

      },
      remove(index) {
        this.data6.splice(index, 1);
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
          this.projects = res.data.projects;
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
