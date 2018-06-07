import axiosO from './axiosConfig';
import axiosB from 'axios';
import * as config from '../common/js/config'

export const MatchSportsTypeReport = params => {
    return axiosO.get(`Statistics/MatchSportsTypeReport`, {});
};
export const TotalCount = params => {
    return axiosO.get(`Statistics/TotalCount`, {});
};
export const MonthReport = params => {
    return axiosO.get(`Statistics/MonthReport`, {});
};

export const MatchAgeRangeReport = params => {
    return axiosO.post(`/Statistics/MatchAgeRangeReport`, params);
};

export const MatchGenderReport = params => {
    return axiosO.post(`/Statistics/MatchGenderReport`, params);
};
export const MatchSignUpTypeReport = params => {
    return axiosO.post(`/Statistics/MatchSignUpTypeReport`, params);
};

export const getFormDatebyType = (type, filter) => {
    let para = "{}";
    if (filter) {
        let filterjson = JSON.stringify(filter);
        para = encodeURIComponent(filterjson);
    }
    return axiosO.get(`/api/form_data/tree_node/` + type + `?filter=` + para, {});
};