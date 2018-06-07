<script>
import Vue from "vue";
const isValidDate = date => !isNaN(date.getTime());
Vue.component("cellPicker", {
  props: {
    value: {},
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    valueKey: {
      type: String,
      default: "name"
    },
    option: { type: Array, default: [] },
    value: {}
  },
  data() {
    return {
      show: false,
      tempValue: this.value,
      dateMode: this.type,
      Showvalue: "",
      columns: [{ values: this.option, defaultIndex: 0}]
    };
  },
  methods: {
    showPop() {
      this.show = true;
    },
    onConfirm(val, i) {
      this.show = false;
      // this.value = this.option[i].name;
      this.Showvalue = this.option[i].name;
      this.$emit("input", this.option[i].value);
    },
    onCancel() {
      this.show = false;
    },
    onChange(picker){
      debugger
    }
  },
  mounted() {
    if (this.value != undefined && this.value != "") {
      let defaultValue = this.value;
      this.columns[0].defaultIndex = _.findIndex(this.option, function(o) {
        return o.value == defaultValue;
      });
      this.Showvalue = this.option[this.columns[0].defaultIndex].name;
    }
  },
  template: ` 
    <van-row>
      <van-cell @click="showPop()" :clickable="true" class="van-field">
        <template slot="title">
          <span class="van-cell-text">{{title}}</span>
        </template>
        <template slot="" class="text-left">
          <span class="van-cell-text" >{{Showvalue}}</span>
          <span class="van-cell-placeholder" v-if="!value&&placeholder">{{placeholder}}</span>
        </template>
      </van-cell>
      <van-popup v-model="show" position="bottom">
        <van-picker v-if="show"  show-toolbar :title="title" :columns="columns"  :value-key="valueKey"  @confirm="onConfirm"   @cancel="onCancel"/>
      </van-popup>
    </van-row>
    `
});
</script> 