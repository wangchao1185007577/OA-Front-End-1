<script>
import Vue from "vue";

Vue.component("cellNumberPicker", {
  props: {
    value: {},
    disabled: Boolean,
    disableInput: Boolean,
    min: {
      type: [String, Number],
      default: -Infinity
    },

    max: {
      type: [String, Number],
      default: Infinity
    },
    step: {
      type: [String, Number],
      default: 1
    },
    title: {
      type: String,
      default: ""
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
    };
  },
  watch:{
    value(newVal){
      this.$emit("input", newVal);
    }
  },
  methods: {
  },
  mounted() {},
  template: ` 
    <van-row>
      <van-cell class="van-field">
        <template slot="title">
          <span class="van-cell-text">{{title}}</span>
        </template>
        <template slot="">
          <van-stepper v-model="value" integer  :min="min" :max="max"  :step="step"  :default-value="defaultValue" />
          <span></span>
        </template>
      </van-cell>
    </van-row>
    `
});
</script> 