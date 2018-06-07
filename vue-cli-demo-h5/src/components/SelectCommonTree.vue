<script>
  import Vue from "vue";

  import {
    getTreeNodeChilds,
    searchTreeNodes
  } from "../api/formData";

  Vue.component("SelectCommonTree", {
    props: ["value", "treeType", "dataType"],
    data() {
      return {
        options: {
          treeType: this.treeType || "DEPT",
          dataType: this.dataType || "DEPT"

        },
        condition: {
          searchTerm:"",
        },
        activeTabName: "oc_objects",
        searchDataList: [],
        selectDataList: [],
        dialogShow: false,
        tableState: {
          listLoading: false,
          total: 0,
          pageSize: 10
        }

      };
    },
    methods: {
      deleteSelectUserList(row) {
      let ind = _.indexOf(this.selectUserList, row);
      this.selectDataList.splice(ind, 1);
      },
      addSelectUserList(row) {
        if (
          _.filter(this.selectDataList, function (item) {
            return item.id == row.id;
          }).length == 0
        ) {
          this.selectDataList.push(row);
        } else {
          alert("该人员已存在");
        }
      },

      OnTreeclick: function (val) {
        this.tableState.listLoading = true;
        getTreeNodeChilds({
          id: val.id,
          type: this.dataType
        }).then(data => {
          debugger;
          this.searchDataList = data.data;
          this.tableState.listLoading = false;

        });
      },
      dialogOpen: function () {
        this.dialogShow = true;
      },
      resetCondition: function () {},
      getData: function (val) {
        this.tableState.listLoading = true;
        getTreeNodeChilds({
          id: val.id,
          type: this.dataType
        }).then(data => {
          debugger;
          this.searchDataList = data.data;
          this.tableState.listLoading = false;

        });

      },
      getSearch: function () {
        debugger;
        this.tableState.listLoading = true;
        searchTreeNodes({type:this.dataType,term:this.condition.searchTerm}).then(
          data => {
          debugger;
          this.searchDataList = data.data;
          this.tableState.listLoading = false;
        }
        );

      },
      onConfirm() {
        let SendObj = {};
        SendObj.DataList = this.selectDataList;
        this.$emit("input", SendObj);
        this.dialogShow = false;
      }
    },
    mounted: function () {},
    updated: function () {},
    template: '<div>\
                <el-button @click="dialogOpen()">选择</el-button>\
                <el-dialog title="数据选择" :visible.sync="dialogShow" top="15px" append-to-body width="60%">\
                    <el-row :md="24" :gutter="20">\
                      <el-tabs   v-model="activeTabName" type="border-card"  >\
                        <el-tab-pane name="oc_objects">\
                          <span slot="label">数据选择</span>\
                          <el-col :md="6">\
                              <default-common-tree @on-select-change="OnTreeclick" :treeType="treeType"></default-common-tree>\
                          </el-col>\
                          <el-col :md="18">\
                              <el-card class="m-b">\
                                  <el-row :md="24" :gutter="20">\
                                      <el-col :md="12" class="control-group">\
                                          <el-col :md="10" class="control-label">\
                                              <label>搜索:</label>\
                                          </el-col>\
                                          <el-col :md="14">\
                                            <el-input name="searchTerm" v-model="condition.searchTerm"></el-input>\
                                          </el-col>\
                                      </el-col>\
                                      <el-col :md="12">\
                                          <el-button type="reset" @click="resetCondition()">\
                                              <i class="fa fa-times m-r-sm"></i>重 置</el-button>\
                                          <el-button type="success" @click="getSearch()">\
                                              <i class="fa fa-search m-r-sm"></i>查 询</el-button>\
                                      </el-col>\
                                  </el-row>\
                              </el-card>\
                          </el-col>\
                          <el-col :md="18" class="m-b">\
                              <el-card class="no-padding">\
                                  <div>\
                                  <el-table :data="searchDataList"height="200" border v-loading="tableState.listLoading" @row-dblclick="addSelectUserList">\
                                      <el-table-column prop="name" label="名称" min-width="100" show-overflow-tooltip>\
                                      </el-table-column>\
                                      <el-table-column prop="desc" label="描述" min-width="100" show-overflow-tooltip>\
                                      </el-table-column>\
                                  </el-table>\
                                  </div>\
                              </el-card>\
                          </el-col>\
                          <el-col :md="18" class="m-b">\
                              <el-card class="no-padding">\
                                  <div>\
                                  <el-table :data="selectDataList"height="200" border v-loading="tableState.listLoading" @row-dblclick="deleteSelectUserList">\
                                     <el-table-column prop="name" label="名称" min-width="100" show-overflow-tooltip>\
                                      </el-table-column>\
                                      <el-table-column prop="desc" label="描述" min-width="100" show-overflow-tooltip>\
                                      </el-table-column>\
                                  </el-table>\
                                  </div>\
                              </el-card>\
                          </el-col>\
                        </el-tab-pane>\
                      </el-tabs>\
                    </el-row>\
                <div slot="footer" class="dialog-footer">\
                    <el-button @click="dialogShow = false">取 消</el-button>\
                    <el-button type="primary" @click="onConfirm()">确 定</el-button>\
                </div>\
                </el-dialog>\
            </div>'
  });

</script>

<style scoped lang="less">
  .el-tree {
    height: 525px;
  }

  .el-dialog__body {
    padding: 10px 20px 10px;
  }

  .el-dialog {
    margin-bottom: 0px;
  }

</style>
