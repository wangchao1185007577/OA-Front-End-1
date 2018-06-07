<script>
import Vue from "vue";

Vue.component("cellCheckbox", {
  props: {
    value: { type: Array },
    title: {
      type: String
    },
    option: { type: Array, default: [] },
    disabled: Boolean
  },
  data() {
    return {
      show: false,
      tempValue: this.value
    };
  },
  watch: {
    value(newVal) {
      this.$emit("input", newVal);
    }
  },
  methods: {},
  mounted() {},
  template: ` 
    <van-row>
      <van-cell class="van-field">
        <template slot="title">
          <span class="van-cell-text">{{title}}</span>
        </template>
        <template slot="">
          <van-checkbox-group v-model="value">
            <van-checkbox v-for="(item, index) in option" :key="item.value" :name="item.value">
              {{ item.name }}
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-cell>
    </van-row>
    `
});
</script> 