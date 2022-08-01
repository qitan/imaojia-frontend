<template>
  <div class=""
       v-wechat-title="title">
    <el-backtop>
    </el-backtop>
    <div class="container">
      <article-header :menu_categories="categories"></article-header>
      <div class="main-container">
        <el-row :gutter="10">
          <slot name="base">
            <el-col :xs="24"
                    :sm="24"
                    :md="18"
                    :lg="18"
                    :xl="18">
              <div class="grid-content bg-purple-light">
                <el-card v-for="article in articles"
                         :key="article.uid"
                         style="margin-bottom: 15px;">
                  <div>
                    <h2><span v-if="$route.name !== 'Search'"><span class="title-category">
                          {{ article.category.name }}
                        </span> <span v-if="article.stick"
                              class="article-stick"><i class="el-icon-magic-stick"></i></span></span>
                      <router-link :to="{ name: 'Article', params: {post_url: article.post_url, id: article.uid} }">{{ article.title }}</router-link>
                    </h2>
                  </div><br />
                  <div class="article-content"
                       v-lazy-container="{selector: 'img'}">
                    <div>
                      {{ article.content }}...
                    </div>
                    <p v-if="$route.name !== 'Search'">
                      <i class="el-icon-user-solid"></i> {{ article.author.first_name ? article.author.first_name : article.author.username }} <i class="el-icon-time"></i> {{ article.published_time }}
                      <!--<i class="el-icon-star-off"></i> {{ article.vote_count }}赞 <i class="el-icon-chat-line-round"></i> 0条-->
                      <i class="el-icon-price-tag"></i><span class="tag-name"
                            v-for="tag in article.tags"
                            :key="tag.name">
                        <router-link :to="{ name: 'Tag', params: {name: tag.name} }">{{ tag.name }}</router-link>
                      </span>
                    </p>
                  </div>
                </el-card>
                <infinite-loading :identifier="infiniteId"
                                  @infinite="getArticles"
                                  ref="infiniteLoadmore"
                                  style="margin-bottom:15px;">
                  <div slot="bubbles">数据加载中...</div>
                  <div slot="error"
                       slot-scope="{ trigger }">
                    <el-button class="loadMore"
                               @click="trigger"
                               type="primary">加载更多</el-button>
                  </div>
                  <div slot="no-more">
                    <el-alert title="没有更多了..."
                              type="info"
                              center
                              show-icon></el-alert>
                  </div>
                  <div slot="no-results">
                    <el-alert title="没有内容..."
                              type="info"
                              center
                              show-icon></el-alert>
                    No results
                  </div>
                </infinite-loading>
              </div>
            </el-col>
          </slot>
          <article-sidebar :menu_categories="categories"></article-sidebar>
        </el-row>
      </div>
      <article-footer></article-footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SideBar from '@/components/SideBar'

import InfiniteLoading from 'vue-infinite-loading'

import GLOBAL from '../../static/config'

import {
  fetchCategoryList,
  fetchArticleList,
  fetchCategoryArticle,
  fetchTagArticle,
  fetchArchiveArticle,
  fetchSearchArticle,
} from '@/api/article'

export default {
  name: 'MainBase',
  props: {
    tips: String,
    pageTitle: String,
  },
  components: {
    'article-header': Header,
    'article-sidebar': SideBar,
    'article-footer': Footer,
    InfiniteLoading,
  },
  data() {
    return {
      articles: [],
      reading: false,
      loading: false,
      count: 0,
      pageNumber: 1,
      nextNotExist: false,
      infiniteId: +new Date(),
      currTitle: '加载中',
    }
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
      menuIndex: (state) => state.menuIndex,
    }),
    title() {
      if (this.pageTitle) {
        this.currTitle = this.pageTitle
      }
      return `${this.currTitle} | ${GLOBAL.mainHost.title}`
    },
  },
  mounted() {
    this.getCategories()
  },
  watch: {
    $route: 'resetArticles',
  },
  methods: {
    // joinTitle(title) {
    //   return title + ' | ' + GLOBAL.mainHost.title
    // },
    getCategories() {
      if (this.categories.length === 0) {
        fetchCategoryList().then((res) => {
          this.$store.commit('SET_CATEGORIES', res.data.items)
        })
      }
    },
    resetArticles() {
      this.pageNumber = 1
      this.articles = []
      this.infiniteId += 1
    },
    getArticles($state) {
      if (this.pageNumber % 5 === 0) {
        $state.error()
      }
      const pageFuncList = {
        Home: {
          title: '首页',
          args: { query: { page: this.pageNumber } },
          func: fetchArticleList,
        },
        // 获取分类归档
        Category: {
          title: '分类',
          args: {
            cate_url: this.$route.params.cate_url,
            query: { page: this.pageNumber },
          },
          func: fetchCategoryArticle,
        },
        // 获取标签归档
        Tag: {
          title: `标签：${this.$route.params.name}`,
          args: {
            name: this.$route.params.name,
            query: { page: this.pageNumber },
            setMenuNull: true,
          },
          func: fetchTagArticle,
        },
        // 获取日期归档
        Archive: {
          title: `${this.$route.params.pub_year}年${this.$route.params.pub_date}月归档`,
          args: {
            pub_time:
              this.$route.params.pub_year + '-' + this.$route.params.pub_date,
            query: { page: this.pageNumber },
          },
          func: fetchArchiveArticle,
          setMenuNull: true,
        },
        // 文章搜索
        Search: {
          title: `${this.$route.params.q}搜索结果`,
          args: {
            content__contains: this.$route.params.q,
            page: this.pageNumber,
          },
          func: fetchSearchArticle,
          setMenuNull: true,
        },
      }
      pageFuncList[this.$route.name]
        ['func'](pageFuncList[this.$route.name]['args'])
        .then((res) => {
          this.articles.push(...res.data.items)
          this.$route.name == 'Category'
            ? (this.currTitle = `分类：${res.data.title}`)
            : (this.currTitle = pageFuncList[this.$route.name]['title'])
          this.pageNumber += 1
          $state.loaded()
          if (res.next === null) {
            this.nextNotExist = true
            console.log('no next')
            $state.complete()
          }
        })
      if (pageFuncList[this.$route.name]['setMenuNull']) {
        this.$store.commit('SET_MENU_INDEX', null)
      }
    },
  },
}
</script>

<style>
</style>
