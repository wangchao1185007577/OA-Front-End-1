<script>
import Vue from "vue";

import { getFormDatebyType } from "../api/api";

Vue.component("levelSelect", {
  props: {
    value: { type: Array, default: [] },
    title: { type: String, default: "选择" },
    placeholder: { type: String, default: "请选择" },
    type: { type: String, default: "button" },
    dataType: { type: String, default: "DEPT" }
  },
  data() {
    return {
      show: false,
      selshow: false,
      historyModel: [],
      historyFilter: [],
      searchText: "",
      Dtitle: "主目录",
      noMore: false,
      loading: false,
      finished: false,
      currentFilter: {},
      currentModel: {},
      selectModel: this.value ? this.value : [],
      loadMode: "default"
    };
  },
  methods: {
    showDialog() {
      this.show = true;
      this.intMian();
    },
    showsel() {
      this.selshow = true;
    },
    onConfirm() {
      this.show = false;
      this.$emit("input", this.selectModel);
    },
    intMian() {
      this.historyModel = [];
      this.historyFilter = [];
      this.currentFilter = {
        HasPropertyTypes: false,
        GroupOp: "AND",
        Rules: [
          {
            Field: "ParentId",
            Op: "eq",
            Data: "00000000-0000-0000-0000-000000000000"
          }
        ],
        Page: {
          PageNumber: 1,
          PageSize: 200000,
          TotalItems: 0,
          TotalPage: 0
        }
      };
      this.currentModel = {
        id: "00000000-0000-0000-0000-000000000000",
        name: "根目录",
        children: []
      };
      this.getDept(this.currentModel);
    },
    getDept(item) {
      var filter = this.currentFilter;
      filter.Rules[0].Data = item.id;
      var that = this;
      that.loading = true;
      getFormDatebyType("DEPT", filter).then(data => {
        that.loading = false;
        this.checkSelect(data.data);
        if (item.id == "00000000-0000-0000-0000-000000000000") {
          that.$set(that, "currentModel", {
            id: "00000000-0000-0000-0000-000000000000",
            name: "根目录",
            children: data.data
          });
        } else {
          that.currentModel = {
            id: item.id,
            name: item.name,
            children: that.currentModel.children.concat(data.data)
          };
        }
        if (this.dataType != "DEPT") {
          getFormDatebyType("User", filter).then(udata => {
            if (udata.data.length) {
              this.checkSelect(udata.data);
              var user = _.each(udata.data, function(item) {
                item.isUser = true;
              });
              that.$set(
                that.currentModel,
                "children",
                that.currentModel.children.concat(user)
              );
            }
          });
        }
        that.currentFilter.Page.TotalItems = data.TotalCount;
      });
    },
    onClickRight() {
      this.show = false;
    },
    onClickLeft() {
      this.currentModel = this.historyModel.pop();
      this.currentFilter = this.historyFilter.pop();
      this.Dtitle = this.currentModel.name;
      this.noMore = false;
    },
    checkSelect(dataSource) {
      var selectModel = this.selectModel;
      _.each(dataSource, function(item) {
        item.isChecked =
          _.filter(selectModel, function(d) {
            return d.id == item.id;
          }).length > 0;
      });
    },
    chooseConfirm() {
      var sel = _.filter(this.currentModel.children, function(item) {
        return item.isChecked == true;
      });
      _.each(sel, function(item) {
        this.selectModel.push({ id: item.id, name: item.name });
      });
    },
    onSearch() {
      if (this.searchText != "" && this.searchText != undefined) {
        this.loadMode = "search";
        this.historyModel = [];
        this.historyFilter = [];
        this.noMore = false;
        this.currentFilter = {
          HasPropertyTypes: false,
          GroupOp: "AND",
          Rules: [
            {
              Field: "name",
              Op: "cn",
              Data: this.searchText
            }
          ],
          Page: {
            PageNumber: 1,
            PageSize: 20,
            TotalItems: 0,
            TotalPage: 0
          }
        };
        this.currentModel = {
          id: "00000000-0000-0000-0000-000000000000",
          name: "搜索结果",
          children: []
        };
        this.searchInfo();
      } else {
        this.noMore = true;
      }
    },
    searchInfo() {
      var that = this;
      var filter = this.currentFilter;
      that.loading = true;
      getFormDatebyType("DEPT", filter).then(data => {
        that.loading = false;
        this.checkSelect(data.data);
        that.currentModel.children = that.currentModel.children.concat(
          data.data
        );
        that.currentFilter.Page.TotalItems = data.TotalCount;
      });
    },
    onCancel() {
      this.loadMode = "default";
      this.intMian();
    },
    onSelect(item) {
      if (!item.isUser) {
        this.noMore = false;
        this.finished = false;
        this.Dtitle = item.name;
        this.historyModel.push(this.currentModel);
        this.historyFilter.push(this.currentFilter);
        this.currentModel = item;
        this.currentModel.children = [];
        this.currentFilter.Page = {
          PageNumber: 1,
          PageSize: 200000,
          TotalItems: 0,
          TotalPage: 0
        };
        this.getDept(item);
      } else {
        item.isChecked = !item.isChecked;
      }
    },
    onLoad() {
      if (this.loadMode == "search") {
        if (
          this.currentFilter.Page.PageNumber *
            this.currentFilter.Page.PageSize <=
            this.currentFilter.Page.TotalItems ||
          this.currentFilter.Page.TotalItems == 0
        ) {
          if (this.currentFilter.Page.TotalItems != 0) {
            this.currentFilter.Page.PageNumber =
              this.currentFilter.Page.PageNumber + 1;
          }
          this.searchInfo();
        } else {
          this.finished = false;
          this.noMore = true;
        }
        this.loading = false;
      } else {
        this.noMore = true;
        this.loading = false;
      }
    },
    toggleCell(item) {
      if (item.isChecked) {
        if (
          _.filter(this.selectModel, function(s) {
            return s.id == item.id;
          }).length == 0
        ) {
          this.selectModel.push({ id: item.id, name: item.name });
        }
      } else {
        if (this.selectModel.length > 0) {
          this.selectModel = _.filter(this.selectModel, function(s) {
            return s.id != item.id;
          });
        }
      }
    },
    removeSelect(item) {
      this.selectModel = _.filter(this.selectModel, function(s) {
        return s.id != item.id;
      });
      this.checkSelect(this.currentModel.children);
    }
  },
  mounted() {
    this.intMian();
  },
  template: `<van-row>
    <van-button type="default" @click="showDialog" v-if="type=='button'">{{title}}</van-button>
     <van-cell @click="showDialog" :clickable="true" class="van-field" v-if="type=='cell'">
        <template slot="title">
          <span class="van-cell-text">{{title}}</span>
        </template>
        <template slot="" class="text-left">
          <van-tag plain type="success" v-for="tag in value" v-bind:key="tag.id" class="m-r-xs">{{tag.name}}</van-tag>
          <span class="van-cell-placeholder" v-if="value.length==0&&placeholder">{{placeholder}}</span>
        </template>
      </van-cell>
    <van-popup v-model="show" position="right" :overlay="false" class="wh100">
      <van-nav-bar :title="Dtitle" :left-arrow="historyModel.length>0" @click-left="onClickLeft" @click-right="onClickRight" :fixed="true">
        <span v-if="historyModel.length>0" slot="left">返回</span>
        <i class="fa fa-close fa-2x" slot="right" @></i>
      </van-nav-bar>
      <van-search class="level-pop" placeholder="请输入名称" show-action v-model="searchText"  @click="onSearch"  @cancel="onCancel" />
      <div class="level-pop-count" v-if="this.loadModel=='search'">搜索结果({{currentFilter.Page.TotalItems}})</div>
      <van-row class="level-pop-info" :class="this.loadModel=='search'?'level-pop-search':''">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
          <van-cell v-for="item in currentModel.children" :is-link="!item.isUser">
            <template>
              <span class="van-cell-text" style="width: 90%;display: inline-block;"  @click="onSelect(item)">{{item.name}}</span>
            </template>
            <template slot="right-icon">
              <van-checkbox v-model="item.isChecked" class="van-cell__right-icon" @change="toggleCell(item)" v-if="(dataType=='USER'&&item.isUser)||dataType=='DEPT'"/>
              <van-icon name="arrow" @click="onSelect(item)"  class="van-cell__right-icon"  v-if="!((dataType=='USER'&&item.isUser)||dataType=='DEPT')"/>
            </template>
          </van-cell>
          <van-cell v-if="noMore" title="暂无更多信息"/>
        </van-list>
      </van-row>
      <van-popup v-model="selshow" position="bottom" style="height:250px;overflow-y: scroll;">
        <van-cell v-for="item in selectModel" :title="item.name">
          <van-icon slot="right-icon" name="close" class="van-cell__right-icon" @click="removeSelect(item)"/>
        </van-cell>
      </van-popup>
      <van-row class="level-pop-footer">
        <van-goods-action>
          <van-goods-action-mini-btn text="已选" style="width:150px" :info="selectModel.length>0?(selectModel.length+''):''" @click="showsel"/>
          <van-goods-action-big-btn text="确认" @click="onConfirm"/>
        </van-goods-action>
      </van-row>
    </van-popup>
  </van-row>`
});
</script> 