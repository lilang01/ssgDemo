import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import env from './env'//依赖不需要加./  文件导入需要加./

// 根据前端的跨域方式做调整
// axios.defaults.baseURL='/api';
// 请求超时时间
axios.defaults.timeout=8000;
// 根据环境变量请求不同的接口地址
axios.defaults.baseURL=env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res=response.data;
  if(res.status==0){
    // 成功
    return res.data;
  }else if(res.status==10){
    // 10 未登录
    window.location.href='/#/login';
  }else{
    // 错误信息
    alert(res.msg);
  }
});

Vue.use(VueAxios,axios);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
