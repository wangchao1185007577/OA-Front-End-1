<script>
import Vue from "vue";
Vue.component("oaForm", {
  template: "<div></div>",
  props: ["formDef", "value"],
  methods: {
    createForm: function() {
      var self = this;

      let defaultForm = JSON.parse(this.formDef.data);
      let options = JSON.parse(this.formDef.opts);
      _.assign(defaultForm, this.value || {});
      let datas = {
        form: defaultForm,
        options: options
      };

      let opts = {
        template: `
        <van-row>
          <van-cell-group>
            <van-field v-model="form.name" placeholder="姓名" label="姓名" type="text" required icon="clear"  @click-icon="form.name = ''"/>
            <cell-date-picker v-model="form.birthday" type="date" title="生日" format="yyyy-MM-dd" placeholder="请选择生日"></cell-date-picker>
            <van-field v-model="form.tel" placeholder="电话" label="电话" type="tel" icon="clear" @click-icon="form.tel = ''"/>
            <van-field v-model="form.email" placeholder="邮件" label="邮件" type="email"  icon="clear" v-loading=""@click-icon="form.tel = ''"/>
            <van-field v-model="form.desc" placeholder="自我介绍" label="自我介绍" type="textarea" rows="2" autosize icon="clear"  @click-icon="form.desc = ''"/>
            <van-field v-model="form.lev" label="职级" type="number" max="10000" min="1"/>
            <van-field v-model="form.age" label="年龄" type="number" max="10000" min="1"/>
            <cell-date-picker v-model="form.onboard" type="datetime" title="报到时间" format="yyyy-MM-dd" placeholder="请选择报到时间"></cell-date-picker>
            <cell-date-picker v-model="form.shift" type="time" title="班别" format="yyyy-MM-dd" :min-hour="8"  :max-hour="18" placeholder="请选择班别"></cell-date-picker>
            <level-select v-model="form.manager" title="经理" placeholde="请选择经理" type="cell" data-type="USER"></level-select>
            <level-select v-model="form.dept" title="部门" placeholder="请选择部门" type="cell" data-type="DEPT"></level-select>
            <van-switch-cell v-model="form.status" title="状态" />
            <cell-radio v-model="form.shift_time"  title="班别" :option="shift_time"></cell-radio>
            <cell-picker v-model="form.level" placeholder="请选择职级" title="职级"  value-key="name"  :option="level"></cell-picker>
            <cell-checkbox v-model="form.skills" placeholder="请选择专业技能" title="专业技能"  :option="skills"></cell-checkbox>
          </van-cell-group>
          <van-cell>
            <template slot="title">
              <span class="van-cell-text">表格操作</span>
            </template>
            <template slot="" class="text-left">
              <van-icon name="add-o"  @click="addcontact" />
            </template>
          </van-cell>
          <van-cell-group v-for="(item,index) in form.contact" v-bind:key="index" class="m-b-xs">
            <van-cell>
              <template slot="title">
                <span class="van-cell-text">#&nbsp;{{index+1}}</span>
              </template>
              <template slot="" class="text-left">
                <van-icon name="close"  @click="delcontact(index, item)"/>
              </template>
            </van-cell>
            <van-field v-model="item.number" placeholder="号码" label="号码" type="number" icon="clear" @click-icon="item.number = ''" />
            <van-field v-model="item.type" placeholder="类别" label="类别" type="number" icon="clear" @click-icon="item.type = ''" />
          </van-cell-group>
        </van-row>
          <el-form ref="form" :model="form" label-width="80px">
            <el-col :span="24">
              <el-table :data="form.contact" style="width: 100%">
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column label="号码" width="180">
                  <template slot-scope="scope">
                    <el-input type="tel" v-model="scope.row.number" placeholder="号码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="类别" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.type" placeholder="类别"></el-input>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="delcontact(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="addcontact">新增</el-button>
              </div>
            </el-col>
            <el-col :span="24">
              <el-alert title="DEBUG-TOOL" type="success" :description="JSON" show-icon></el-alert>
            </el-col>
          </el-form>`,
        data: function() {
          return datas;
        },
        methods: {},
        computed: {},
        watch: {
          form: {
            handler: function(v) {
              self.$emit("input", v);
            },
            deep: true
          }
        }
      };

      var funcOpts = this.formDef.funs || [];
      funcOpts.push(
        "opts.computed.JSON=function(){ return JSON.stringify(this.form,null,2)}"
      );
      funcOpts.push("opts.computed.VAL=function(){ return this.form }");
      funcOpts.push("opts.methods.getData=function(){  return this.form}");

      // var getOptsFuncBody=[
      // 'opts.methods.getData=function(){ return JSON.stringify(this.form)}',
      // 'opts.computed.JSON=function(){ return JSON.stringify(this.form,null,2)}']
      var getOptsFuncBody = funcOpts.join(";");
      var getOptsFunc = new Function("opts", getOptsFuncBody);
      getOptsFunc(opts);
      var formComponent = Vue.extend(opts);
      var component = new formComponent();
      component.$mount(this.$el);
      this.$watch(
        function() {
          return component.VAL;
        },
        function(newVal, oldVal) {
          console.log(newVal);
        }
      );
    }
  },
  mounted: function() {
    if (this.formDef) {
      this.createForm();
    }
  },
  watch: {
    formDef: {
      //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
      handler(curVal, oldVal) {
        this.createForm();
      },
      deep: false
    }
  },
  data: function() {
    return {};
  }
});
</script>