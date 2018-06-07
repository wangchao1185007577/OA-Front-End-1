<template>
  <van-row>
    {{form}}
    <van-cell-group>
      <van-field v-model="form.name" placeholder="姓名" label="姓名" type="text" required icon="clear" @click-icon="form.name = ''"
      />
      <cell-date-picker v-model="form.birthday" title="生日" format="yyyy-MM-dd" placeholder="请选择生日"></cell-date-picker>
      <van-field v-model="form.tel" placeholder="电话" label="电话" type="tel" icon="clear" @click-icon="form.tel = ''" />
      <van-field v-model="form.email" placeholder="邮件" label="邮件" type="email" icon="clear" @click-icon="form.tel = ''" />
      <van-field v-model="form.desc" placeholder="自我介绍" label="自我介绍" type="textarea" rows="2" autosize icon="clear" @click-icon="form.desc = ''"
      />
      <cell-number-picker v-model="form.lev" title="职级" max="20000" min="-220"></cell-number-picker>
      <cell-date-picker v-model="form.onboard" type="datetime" title="报到时间" format="yyyy-MM-dd" placeholder="请选择报到时间"></cell-date-picker>
      <cell-date-picker v-model="form.shift" type="time" title="班别" :min-hour="8" :max-hour="18" placeholder="请选择班别"></cell-date-picker>
      <level-select v-model="form.manager" title="经理" placeholder="请选择经理" type="cell" data-type="USER"></level-select>
      <level-select v-model="form.dept" title="部门" placeholder="请选择部门" type="cell" data-type="DEPT"></level-select>
      <cell-radio v-model="form.shift_time" title="班别" :option="shift_time"></cell-radio>
      <cell-picker v-model="form.level" placeholder="请选择职级" title="职级" value-key="name" :option="level"></cell-picker>
      <cell-checkbox v-model="form.skills" placeholder="请选择专业技能" title="专业技能" :option="skills"></cell-checkbox>
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
    <oa-form></oa-form>
  </van-row>
</template>

<script>
import { MatchSportsTypeReport } from "../api/api";
import form from "./form";
export default {
  data() {
    return {
      active: 0,
      show: false,
      time: new Date(),
      select: [
        {
          id: "a90aeaec-e3d4-43de-bb67-85407b57b171",
          name: "汕头市"
        }
      ],
      skills: [
        {
          name: "name前端",
          value: "前端"
        },
        {
          name: "name后端.Net",
          value: "后端.Net"
        },
        {
          name: "name后端.Java",
          value: "后端Java"
        },
        {
          name: "nameDBA SQL Server",
          value: "DBA SQL Server"
        },
        {
          name: "nameDBA Oracle",
          value: "DBA Oracle"
        },
        {
          name: "nameSQL Server",
          value: "SQL Server"
        },
        {
          name: "nameOracle",
          value: "Oracle"
        }
      ],
      level: [
        {
          name: "name1",
          value: "1"
        },
        {
          name: "name2",
          value: "2"
        },
        {
          name: "name3",
          value: "3"
        },
        {
          name: "name4",
          value: "4"
        },
        {
          name: "name5",
          value: "5"
        }
      ],
      shift_time: [
        {
          name: "8:00~17:00",
          value: "A"
        },
        {
          name: "9:00~16:00",
          value: "B"
        }
      ],
      form: {
        name: "",
        birthday: "",
        tel: "",
        email: "",
        desc: "",
        lev: "",
        age: "",
        onboard: "",
        shift: "",
        manager: [],
        dept: [],
        status: "",
        shift_time: "",
        level: "",
        skills: [],
        contact: [],
        _contact: {
          number: "",
          type: "",
          _key: null
        },
        _key: null
      }
    };
  },
  methods: {
    addcontact() {
      var temp = _.cloneDeep(this.form._contact);
      return this.form.contact.push(temp);
    },
    delcontact(ind, row) {
      var i = this.form.contact.indexOf(row);
      if (i != -1) {
        this.form.contact.splice(i, 1);
      }
    }
  },
  mounted: function() {
    this.$emit("viewIn", "测试例子");
  },
  updated: function() {}
};
</script>

<style>
</style>
