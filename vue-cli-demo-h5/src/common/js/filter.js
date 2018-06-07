import util from './util'
import Vue from 'vue'

Vue.filter("formatDate", function(time, strFormat) {
    let date = new Date(time)
    strFormat = strFormat || "yyyy-MM-dd";
    return util.formatDate.format(date, strFormat);
});

Vue.filter('NumFormat', function(value) {
    if (!value) return '0.00';
    var intPart = Number(value).toFixed(0); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    return intPartFormat;
});

Vue.filter("deptType", function(str) {
    switch (str) {
        case "01":
            return '企业';
        case "02":
            return '政府机关';
        case "03":
            return '事业单位';
        case "04":
            return '其他';
        default:
            return '企业';
    }
});
Vue.filter("studentSex", function(input) {
    var result = "";
    if (null == input || "" == input) {
        return "";
    }

    switch (input.toLowerCase()) {
        case "male":
            result = "男";
            break;
        case "female":
            result = "女";
            break;
        default:
            result = "未知";
            break;
    }
    return result;
});
Vue.filter("personType", function(str) {
    switch (str) {
        case "1":
            return '正式';
        case "2":
            return '临时';
        case "3":
            return '其他';
        default:
            return '其他';
    }
});