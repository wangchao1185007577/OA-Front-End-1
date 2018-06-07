import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import Vuex from 'vuex'
import store from './vuex/store'
import router from './routes'
import _ from 'lodash'
import 'font-awesome/css/font-awesome.min.css'
import './styles/style.less'
import './common/js/filter'
import * as util from './common/js/util'

import levelSelect from "./components/levelSelect";
import cellDatePicker from "./components/cellDatePicker";
import cellNumberPicker from "./components/cellNumberPicker";
import cellRadio from "./components/cellRadio";
import cellPicker from "./components/cellPicker";
import cellCheckbox from "./components/cellCheckbox";

Vue.use(Vant)
Vue.use(Vuex)
Vue.use(_)

Vue.prototype.moment = moment
Vue.prototype.utilHelper = util

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')