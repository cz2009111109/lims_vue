<template>
  <div>  
    {{ $t('project.name') }} <br/>
    <!-- 列表模块   -->
      <Table border :loading="listLoading" :columns="ColData" :data="projects"></Table>
      <br/>
    
    
    <template>
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    
    <!-- 编辑模块 -->
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="DatePicker">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Radio">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Checkbox">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Switch">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
        <FormItem label="Slider">
            <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem label="Text">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
    </Form>
    </Modal>
</template>
      <!-- 分页模块 -->
      <Page :total="total" :page-size="showTotal" :current='page' :page-size-opts='pageSizeOpt' @on-page-size-change="changePageSize" @on-change="changePage"  show-elevator show-sizer />

  </div>
</template>
<script>
  import {
    getProjects
  } from "@/api/limsData";
  //import i18n from '@/locale';

  export default {
    data() {
      return {
        formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },
        modal1: false,
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
            title: this.$t('project.name'),
            key: 'name'
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
    computed:{
      ColData:function(){
        return [{
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
            title: this.$t('project.name'),
            key: 'name'
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
