<template>
  <div>  
    <!-- 编辑模块 -->
    <Modal
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
  </div>
</template>
<script>
  import {
    getProjects
  } from "@/api/limsData";
  import SamRegtable from "../sampleReg/SamRegtable-expand"
  export default {
    data() {
      return {
        obj:{
            id: '',
            name: '',
            starttime: '',
            endtime: '',
            nowstate: '',
            date: '',
            sampleRegester:[],
            project:'',
            address:'',
            }
      };
    },
    props:{
      obj:Object
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
        
				console.log(row)
        this.obj = Object.assign({}, row);
        this.editFormVisible = true;
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
