import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue.use(VueRouter)
if (!window.VueRouter) Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Main.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category/:cate_url',
    name: 'Category',
    component: () => import('../views/Main.vue'),
    meta: {
      title: '文章分类'
    }
  },
  {
    path: '/tags/:name',
    name: 'Tag',
    component: () => import('../views/Main.vue'),
    meta: {
      title: '文章标签'
    }
  },
  {
    path: '/archives/:pub_year/:pub_date',
    name: 'Archive',
    component: () => import('../views/Main.vue'),
    meta: {
      title: '文章归档'
    }
  },
  {
    path: '/search/:q',
    name: 'Search',
    component: () => import('../views/Main.vue'),
    meta: {
      title: '搜索结果'
    }
  },
  {
    // TODO: 同id跳转到统一的url
    path: '/articles/:id/:post_url',
    name: 'Article',
    component: () => import('../views/Article.vue'),
    meta: {
      title: '文章内容'
    }
  }
  // {
  //   path: '/404',
  //   name: 'Page Not Found',
  //   component: () => import('../views/404.vue'),
  //   meta: {
  //     title: '页面找不到了'
  //   }
  // },
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
