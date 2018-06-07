import axios from './axiosConfig';
import moment from 'moment'

export const getUserList = params => {
    return axios.get(`/person`, { params: { param: params } });
};

export const addUser = params => {
    return axios.post(`/person?param=` + JSON.stringify(params));
};

export const delUser = params => {
    return axios.delete(`/person?param=` + JSON.stringify(params));
};

export const updateUser = params => {
    return axios.put(`/person?param=` + JSON.stringify(params));
};

export const getPostionPerson = params => {
    return axios.get(`/getPostionPerson`, { params: { param: params } });
};
export const getDepartmentUsers = function(params) {
    return axios.get(`/api/departments/` + params + `/users`, {});
};


//更新编辑节假日
export const updateDate = params => {
    console.log(params.dateId);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: '编辑成功'
            });
        }, 500);
    });
};
//法定节假日列表
let dateList = [
    { "dateId": "1", "dateYear": "2015", "dateTimeStart": "2017-07-15", "dateTimeEnd": "2017-08-15", "dateName": "愚人节", "dateType": "愚人节" },
    { "dateId": "2", "dateYear": "2017", "dateTimeStart": "2017-08-18", "dateTimeEnd": "2017-09-05", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "3", "dateYear": "2011", "dateTimeStart": "2017-07-15", "dateTimeEnd": "2017-09-19", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "4", "dateYear": "2013", "dateTimeStart": "2017-09-10", "dateTimeEnd": "2017-11-18", "dateName": "鬼节", "dateType": "鬼节" },
    { "dateId": "5", "dateYear": "2012", "dateTimeStart": "2017-07-15", "dateTimeEnd": "2017-12-07", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "6", "dateYear": "2016", "dateTimeStart": "2017-02-01", "dateTimeEnd": "2017-04-16", "dateName": "元旦节", "dateType": "元旦节" },
    { "dateId": "7", "dateYear": "2014", "dateTimeStart": "2017-04-14", "dateTimeEnd": "2017-08-10", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "8", "dateYear": "2017", "dateTimeStart": "2017-06-08", "dateTimeEnd": "2017-08-22", "dateName": "清明节", "dateType": "清明节" },
    { "dateId": "9", "dateYear": "2017", "dateTimeStart": "2017-09-06", "dateTimeEnd": "2017-11-12", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "10", "dateYear": "2018", "dateTimeStart": "2017-05-12", "dateTimeEnd": "2017-06-16", "dateName": "植树节", "dateType": "植树节" },
    { "dateId": "11", "dateYear": "2016", "dateTimeStart": "2017-10-25", "dateTimeEnd": "2017-11-25", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "12", "dateYear": "2014", "dateTimeStart": "2017-11-08", "dateTimeEnd": "2017-12-11", "dateName": "国庆节", "dateType": "国庆节" }
];
//新增法定节假日
export const addDate = params => {
    dateList.push(params);
    //console.log(params);
    debugger
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: '新增成功'
            });
        }, 500);
    });
};
//获取法定节假日列表
export const getDateList = params => {
    //console.log(params);
    //debugger
    //console.log(moment.isDate(params.dateYear));
    let dateYear = params.dateYear;
    if (moment.isDate(params.dateYear)) {
        dateYear = params.dateYear.getFullYear() + "";
    }
    let dateTimeStart = params.dateTimeStart;
    if (moment.isDate(params.dateTimeStart)) {
        dateTimeStart = moment(params.dateTimeStart).format('YYYY-MM-DD');
    }
    let dateTimeEnd = params.dateTimeEnd;
    if (moment.isDate(params.dateTimeEnd)) {
        dateTimeEnd = moment(params.dateTimeEnd).format('YYYY-MM-DD');
    }
    let dateName = params.dateName;
    let dateType = params.dateType;
    let chsDateList = dateList.filter(name => {
        //console.log(name.dateYear);
        //console.log(moment(dateTimeStart).isBetween(name.dateTimeStart, name.dateTimeEnd));
        if (dateYear && name.dateYear.indexOf(dateYear) == -1) return false;
        else if (dateTimeStart && moment(dateTimeStart).isBefore(name.dateTimeStart) && moment(dateTimeStart).isAfter(name.dateTimeEnd)) return false;
        else if (dateTimeEnd && moment(dateTimeEnd).isAfter(name.dateTimeEnd) && moment(dateTimeEnd).isBefore(name.dateTimeStart)) return false;
        else if (dateName && name.dateName.indexOf(dateName) == -1) return false;
        else if (dateType && name.dateType.indexOf(dateType) == -1) return false;
        return true;
    });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                total: chsDateList.length,
                pageSize: 10,
                data: chsDateList
            });
        }, 1000);
    });

};
//删除法定节假日
export const delDate = params => {
    let id = params.dateId;
    dateList = dateList.filter(u => u.dateId !== id);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: '删除成功'
            });
        }, 500);
    });
};
//自定义节假日列表
let dateDefinedList = [
    { "dateId": "13", "dateYear": "2019", "dateTimeStart": "2017-07-15", "dateTimeEnd": "2017-09-10", "dateName": "鬼节", "dateType": "鬼节" },
    { "dateId": "14", "dateYear": "2016", "dateTimeStart": "2017-05-01", "dateTimeEnd": "2017-08-25", "dateName": "劳动节", "dateType": "劳动节" },
    { "dateId": "15", "dateYear": "2012", "dateTimeStart": "2017-04-10", "dateTimeEnd": "2017-06-05", "dateName": "愚人节", "dateType": "愚人节" },
    { "dateId": "16", "dateYear": "2014", "dateTimeStart": "2017-03-12", "dateTimeEnd": "2017-11-25", "dateName": "植树节", "dateType": "植树节" },
    { "dateId": "17", "dateYear": "2012", "dateTimeStart": "2017-02-14", "dateTimeEnd": "2017-04-28", "dateName": "情人节", "dateType": "情人节" },
    { "dateId": "18", "dateYear": "2016", "dateTimeStart": "2017-01-01", "dateTimeEnd": "2017-02-12", "dateName": "元旦节", "dateType": "元旦节" },
    { "dateId": "19", "dateYear": "2015", "dateTimeStart": "2017-07-07", "dateTimeEnd": "2017-09-19", "dateName": "七夕", "dateType": "七夕" },
    { "dateId": "20", "dateYear": "2012", "dateTimeStart": "2017-10-01", "dateTimeEnd": "2017-11-13", "dateName": "国庆节", "dateType": "国庆节" },
    { "dateId": "21", "dateYear": "2013", "dateTimeStart": "2017-11-11", "dateTimeEnd": "2017-12-26", "dateName": "光棍节", "dateType": "光棍节" },
    { "dateId": "22", "dateYear": "2011", "dateTimeStart": "2017-02-24", "dateTimeEnd": "2017-11-10", "dateName": "平安夜", "dateType": "平安夜" },
    { "dateId": "23", "dateYear": "2015", "dateTimeStart": "2017-05-25", "dateTimeEnd": "2017-08-28", "dateName": "圣诞节", "dateType": "圣诞节" },
    { "dateId": "24", "dateYear": "2018", "dateTimeStart": "2017-04-04", "dateTimeEnd": "2017-09-13", "dateName": "清明节", "dateType": "清明节" },
];
//新增自定义节假日
export const addDateDefined = params => {
    dateDefinedList.push(params);
    //console.log(params);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: '新增成功'
            });
        }, 500);
    });
};
//获取自定义节假日列表
export const getDateDefinedList = params => {
    let dateYear = params.dateYear;
    if (moment.isDate(params.dateYear)) {
        dateYear = params.dateYear.getFullYear() + "";
    }
    let dateTimeStart = params.dateTimeStart;
    if (moment.isDate(params.dateTimeStart)) {
        dateTimeStart = moment(params.dateTimeStart).format('YYYY-MM-DD');
    }
    let dateTimeEnd = params.dateTimeEnd;
    if (moment.isDate(params.dateTimeEnd)) {
        dateTimeEnd = moment(params.dateTimeEnd).format('YYYY-MM-DD');
    }
    let dateName = params.dateName;
    let dateType = params.dateType;
    let chsDateDefinedList = dateDefinedList.filter(name => {
        if (name.dateName.indexOf(dateName) == -1) return false;
        else if (name.dateType.indexOf(dateType) == -1) return false;
        else if (name.dateYear.indexOf(dateYear) == -1) return false;
        else if (name.dateTimeStart.indexOf(dateTimeStart) == -1) return false;
        else if (name.dateTimeEnd.indexOf(dateTimeEnd) == -1) return false;
        return true;
    });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                total: chsDateDefinedList.length,
                pageSize: 10,
                data: chsDateDefinedList
            });
        }, 1000);
    });

};
//删除自定义节假日
export const delDateDefined = params => {
    let id = params.dateId;
    dateDefinedList = dateDefinedList.filter(u => u.dateId !== id);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: '删除成功'
            });
        }, 500);
    });
};