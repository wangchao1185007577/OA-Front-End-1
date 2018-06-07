<script>
import Vue from "vue";

Vue.component("cellRadio", {
  props: {
    value: {},
    title: {
      type: String
    },
    option: { type: Array, default: [] },
    disabled: Boolean
  },
  data() {
    return {
      show: false,
      tempValue: this.value,
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
          <van-radio-group v-model="value" :disabled="disabled">
            <van-radio :name="item.value" v-for="(item, index) in option" :key="index">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </van-row>
    `
});
</script> 