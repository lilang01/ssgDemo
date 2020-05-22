# mall

## vue3.0安装
```
npm i -g @vue/cli
vue create mall
```

### 项目依赖插件
```
vue-router
vuex
axios
vue-axios
vue-lazyload
element-ui
node-sass
sass-loader
vue-awesome-swiper
vue-axios
vue-cookie
babel-eslint
cli-plugin-babel
```

### vuex手记
```
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex);
const state={
    username:'',
    cartCount:0
}
// 创建Vuex实例
export default new Vuex.Store({
    state,
    actions,
    mutations
})

import store from './store'
// 获取vuex状态数据
this.$store.state.username
// 往vuex存入username数据,先通过actions传入mutations,mutations再导入state
this.$store.dispatch("saveUserName", res.username);
```

### vue-axios手记
```
import axios from 'axios'
import VueAxios from 'vue-axios'
// 使用axios
Vue.use(VueAxios,axios);
//用法
this.axios.get("",{
    params:{

    }
}).then(res => {
});
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
