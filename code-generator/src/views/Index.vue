<template>
  <div class="home">
    <Form :label-width="80">
      <Row>
        <Col :span="18">
          <Col :span="6">
            <FormItem label="host:">
              <Input v-model="data.host"/>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="数据库:">
              <Input v-model="data.database"/>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="用户名:">
              <Input v-model="data.user"/>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem label="密码:">
              <Input v-model="data.password" type="password"/>
            </FormItem>
          </Col>
        </Col>
        <Col :span="6">
          <Button @click="getTables" class="btn-search">获取表</Button>
        </Col>
      </Row>
    <Row>
      <Col :span="18">
        <FormItem style="height: 33px">
          <CheckboxGroup v-model="selectTables">
            <Checkbox v-for="item in tables" :label="item.Name">
              {{`${item.Name}(${item.Comment})`}}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Col>
      <Col :span="6">
        <Button @click="getConfigs" class="btn-search">获取配置</Button>
      </Col>
    </Row>
    <Row>
      <Col :span="18" style="min-height: 1px">
        <div ref="json-editor" style="width: 100%; height: 600px"></div>
      </Col>
      <Col :span="6">
        <Button @click="genFile" class="btn-search">生成文件</Button>
        <FormItem label="不生成:">
          <CheckboxGroup v-model="disableFile">
            <Checkbox v-for="item in config.output" :label="item.name">
              {{item.name}}
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Col>
    </Row>
    </Form>
  </div>
</template>

<script>
import jsoneditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      data:{
        host:'localhost',
        database:'test',
        user:'root',
        password:'root'
      },
      tables:[],
      selectTables:[],
      disableFile:[],
      config:{
        output:[]
      }
    }
  },
  mounted(){
    this.getConfig();
    let container = this.$refs['json-editor']
    let options = {
      mode: 'code',
      indentation: 2,
      search: true
    }
    this.editor = new jsoneditor(container, options)
  },
  methods:{
    async getTables(){
      let res =await this.$fetch('/api/getTables',this.data);
      this.tables = res
      res.forEach(v=>this.selectTables.push(v.Name))
      console.log(res)
    },
    async getConfigs(){
      let data = this.tables.filter(v=>this.selectTables.includes(v.Name))
      let res =await this.$fetch('/api/getConfigs',{
        database:this.data,
        data
      });
      this.editor.set(res)
    },
    async genFile(){
      let data = this.editor.get()
      let res =await this.$fetch('/api/genFile',{
        disableFile:this.disableFile,
        data
      });
      console.log(res)
    }
    ,
    async getConfig(){
      this.config =await this.$fetch('/api/getConfig');
    }
  }
}
</script>
<style scoped>
  .btn-search{
    margin-left: 20px;
  }
  .home{
    margin-top: 20px;
  }
</style>
