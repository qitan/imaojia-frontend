import Vue from 'vue'
// todo: 按需加载组件
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import VueShowdown from 'vue-showdown'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/main.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//每个页面动态标题
import VueWechatTitle from 'vue-wechat-title'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueWechatTitle)
Vue.use(VueLazyload)
Vue.use(VueShowdown, {
  flavor: 'github',
  options: {
    emoji: false,
  },
})


//高亮显示代码块
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  });
})
//设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
//路由跳转到回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

function createdVue () {
  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

if (process.env.NODE_ENV == 'development') {
  axios.get('/config.json').then(res => {
    // 开发环境使用proxy代理
    Vue.prototype.SERVER_URL = ''
    createdVue()
  })
} else if (process.env.NODE_ENV == 'production') {
  axios.get('/config.json').then(res => {
    Vue.prototype.SERVER_URL = res.data.SERVER_URL
    createdVue()
  })
}
