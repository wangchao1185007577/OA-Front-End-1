<template>
     <van-row>
        <van-row>
            <van-tabs :active="active" style="margin-bottom: 50px;">
                <van-tab  :title="'项目联赛'" >
                    <table class="SportTable m-t m-b">
                        <thead>
                            <tr>
                                <th>项目（10项）</th>
                                <th>赛事数</th>
                                <th>人数</th>
                                <th>人次</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr v-for="item in MatchTableb.cslsList">
                                <td class="text-center">{{item.SportsTypeDesc}}</td>
                                <td class="text-center">{{item.MatchCount}}</td>
                                <td class="text-center">{{item.NumofPreson}}</td>
                               <td class="text-center">{{item.PersonTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <van-row class="m-b">
                        如有问题请联系15102157035
                    </van-row>
                </van-tab>
                 <van-tab  :title="'项目系列赛'" >
                    <table class="SportTable m-t m-b">
                        <thead>
                            <tr>
                                <th>项目（37+项）</th>
                                <th>赛事数</th>
                                <th>人数</th>
                                <th>人次</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr v-for="item in MatchTableb.xmxlsList">
                                <td class="text-center">{{item.SportsTypeDesc}}</td>
                                <td class="text-center">{{item.MatchCount}}</td>
                                <td class="text-center">{{item.NumofPreson}}</td>
                               <td class="text-center">{{item.PersonTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <van-row class="m-b">
                        如有问题请联系15102157035
                    </van-row>
                </van-tab>
                 <van-tab  :title="'品牌特色赛事活动'" >
                    <table class="SportTable m-t m-b">
                        <thead>
                            <tr>
                                <th>项目（12+项）</th>
                                <th>赛事数</th>
                                <th>人数</th>
                                <th>人次</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr v-for="item in MatchTableb.ppsshdList">
                                <td class="text-center">{{item.SportsTypeDesc}}</td>
                                <td class="text-center">{{item.MatchCount}}</td>
                                <td class="text-center">{{item.NumofPreson}}</td>
                               <td class="text-center">{{item.PersonTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <van-row class="m-b">
                        如有问题请联系15102157035
                    </van-row>
                </van-tab>
            </van-tabs>
        </van-row>
    </van-row>
</template>

<script>
import { MatchSportsTypeReport } from "../api/api";

export default {
  data() {
    return {
      active: 0,
      MatchTableb: {
        cslsList: [],
        xmxlsList: [],
        ppsshdList: []
      }
    };
  },
  methods: {
    getMatchSportsTypeReport() {
      MatchSportsTypeReport().then(response => {
        this.MatchTableb.cslsList = _.filter(response.Result, function(item) {
          return item.SportsCategoryDesc == "项目联赛";
        });
        this.MatchTableb.xmxlsList = _.filter(response.Result, function(item) {
          return item.SportsCategoryDesc == "项目系列赛";
        });
        this.MatchTableb.ppsshdList = _.filter(response.Result, function(item) {
          return item.SportsCategoryDesc == "品牌特色赛事活动";
        });

        if (this.MatchTableb.cslsList.length == 0) {
          this.MatchTableb.cslsList.push({
            SportsTypeDesc: "无",
            MatchCount: 0,
            NumofPreson: 0,
            PersonTime: 0
          });
        }
        if (this.MatchTableb.xmxlsList.length == 0) {
          this.MatchTableb.xmxlsList.push({
            SportsTypeDesc: "无",
            MatchCount: 0,
            NumofPreson: 0,
            PersonTime: 0
          });
        }
        if (this.MatchTableb.ppsshdList.length == 0) {
          this.MatchTableb.ppsshdList.push({
            SportsTypeDesc: "无",
            MatchCount: 0,
            NumofPreson: 0,
            PersonTime: 0
          });
        }
      });
    }
  },
  mounted: function() {
    this.getMatchSportsTypeReport();
    this.$emit("viewIn", "分类统计");
  },
  updated: function() {}
};
</script>

<style scoped>

</style>
