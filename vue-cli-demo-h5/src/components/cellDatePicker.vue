<script>
import Vue from "vue";
const currentYear = new Date().getFullYear();
const isValidDate = date =>
  Object.prototype.toString.call(date) === "[object Date]" &&
  !isNaN(date.getTime());
Vue.component("cellDatePicker", {
  props: {
    type: {
      type: String,
      default: "date"
    },
    placeholder: {
      type: String
    },
    title: {
      type: String
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: ""
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: isValidDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: isValidDate
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    },
    value: {}
  },
  data() {
    return {
      show: false,
      tempValue: this.value,
      dateMode: this.type
    };
  },
  methods: {
    showPop() {
      this.show = true;
    },
    onConfirm(val) {
      this.show = false;
      this.value = val;
      this.$emit("input", val);
    },
    onCancel() {
      this.show = false;
    }
  },
  mounted() {},
  template: ` 
    <van-row>
      <van-cell @click="showPop()" :clickable="true" class="van-field">
        <template slot="title">
          <span class="van-cell-text">{{title}}</span>
        </template>
        <template slot="" class="text-left">
          <span class="van-cell-text" v-if="value&&dateMode!='time'">{{value|formatDate(format)}}</span>
          <span class="van-cell-text" v-if="value&&dateMode=='time'">{{value}}</span>
          <span class="van-cell-placeholder" v-if="!value&&placeholder">{{placeholder}}</span>
        </template>
      </van-cell>
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker v-model="tempValue" :type="dateMode" :min-hour="minHour" :max-hour="maxHour"   @confirm="onConfirm"  @cancel="onCancel"/>
      </van-popup>
    </van-row>
    `
});
</script> 