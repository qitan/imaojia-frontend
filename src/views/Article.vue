<template>
  <MainBase :page-title="pageTitle">
    <template v-slot:base>
      <el-col :xs="24"
              :sm="24"
              :md="18"
              :lg="18"
              :xl="18"
              v-loading="loading">
        <div class="grid-content bg-purple-light">
          <el-card class="article-detail">
            <div class="article-title">
              <h2 class="article-title">{{ articleInfo.title }}</h2>
              <i class="el-icon-user-solid"></i> {{ articleInfo.author.first_name ? articleInfo.author.first_name : articleInfo.author.username }} <i class="el-icon-time"></i>
              {{ articleInfo.published_time }}
              <!--<span style="cursor: pointer;" @click="giveLike(articleInfo.id)"><i :class="likeicon"></i> {{ liked }}赞</span> <i class="el-icon-chat-line-round"></i> 0条-->
              <i class="el-icon-price-tag"></i><span class="tag-name"
                    v-for="tag in articleInfo.tags"
                    :key="tag.name">
                <router-link :to="{ name: 'Tag', params: {name: tag.name} }">{{ tag.name }}</router-link>
              </span>
            </div>
            <p></p>
            <div v-if="tocExist">
              <el-button :class="{tocFixedBtn: !tocBtnVisible, tocBtn: tocBtnVisible}"
                         @click="showToc"
                         title="目录"><i class="el-icon-document"
                   style="text-align: center;margin-top: -.1rem;font-weight: 600 !important;"></i></el-button>
              <span :class="{'tocClose tocCloseHidden': tocVisible===false, 'tocClose tocCloseVisible': tocVisible===true}"
                    @click="showToc"><i class="el-icon-close"
                   style="font-size:48px;"></i></span>
              <div class="toc-anchor">
                <div class="anchor">
                  <Toc @callAnchor="goAnchor"
                       :tocContent="articleInfo.content.toc"></Toc>
                </div>
              </div>
            </div>
            <div class="article-content"
                 v-lazy-container="{selector: 'img'}">
              <div v-highlight
                   v-if="articleInfo.content"
                   v-html="articleInfo.content.content">
              </div>
              <blockquote class="share-post">
                <p><b>原创文章，转载请注明: </b>
                  <router-link :to="{ name: 'Home', params: {} }"><span v-html="hostTitle"></span></router-link> » <router-link
                               :to="{ name: 'Article', params: {post_url: articleInfo.post_url, id: articleInfo.uid} }">{{ articleInfo.title }}</router-link>
                </p>
              </blockquote>
            </div>
            <el-divider></el-divider>
            <div class="related-article">
              <div class="prev-a">
                <span v-if="articleInfo.post_prev && articleInfo.post_prev.title"
                      @click="jumpArticle(articleInfo.post_prev.post_url, articleInfo.post_prev.uid)"><i class="el-icon-d-arrow-left"></i> {{ articleInfo.post_prev.title }}</span>
              </div>
              <div class="next-a">
                <span v-if="articleInfo.post_next && articleInfo.post_next.title"
                      @click="jumpArticle(articleInfo.post_next.post_url, articleInfo.post_next.uid)">{{ articleInfo.post_next.title }} <i class="el-icon-d-arrow-right"></i></span>
              </div>
            </div>

          </el-card>
        </div>
      </el-col>
    </template>
  </MainBase>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

import MainBase from '@/components/MainBase'
import Toc from '@/components/Toc'
import GLOBAL from '../../static/config'

import { fetchArticleDetail, articleLike } from '@/api/article'

export default {
  data() {
    return {
      tocExist: false,
      tocVisible: false,
      tocBtnVisible: false,
      articleInfo: { author: {} },
      article_id: '',
      liked: '',
      likeicon: 'el-icon-star-off',
      loading: false,
      hostTitle: GLOBAL.mainHost.title,
      pageTitle: '文章详情',
    }
  },
  components: {
    MainBase,
    Toc,
  },
  computed: {
    ...mapState({
      menuIndex: (state) => state.menuIndex,
      device: (state) => state.device,
    }),
  },
  watch: {
    $route: 'getArticleDetail',
  },
  mounted() {
    this.getArticleDetail()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goAnchor(selector) {
      this.$el.querySelector('#' + selector).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    handleScroll() {
      if (this.tocExist) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        let offsetTop = document.querySelector(`.article-content`).offsetTop
        if (scrollTop > offsetTop) {
          this.tocBtnVisible = true
        } else {
          this.tocBtnVisible = false
        }
      }
    },
    showToc() {
      const target = document.querySelector(`.toc-anchor`)
      if (target.style.opacity === '1') {
        target.style.cssText =
          'transform: scale(0, 0) !important;opacity: 0 !important;'
        this.tocVisible = false
      } else {
        if (this.device === 'mobile') {
          target.style.cssText =
            'transform: scale(1, 1) !important;opacity: 1 !important;width: 50% !important;right: 15px !important;'
          document.querySelector(`.tocClose`).style.right = '21%'
        } else {
          target.style.cssText =
            'transform: scale(1, 1) !important;opacity: 1 !important;'
          document.querySelector(`.tocClose`).style.right = '10%'
        }
        this.tocVisible = true
      }
    },
    giveLike(articleId) {
      articleLike({ id: articleId }).then((res) => {
        if (res.code === 20000) {
          this.liked += 1
          this.likeicon = 'el-icon-star-on'
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success',
          })
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error',
          })
        }
      })
    },
    getArticleDetail() {
      this.loading = true
      fetchArticleDetail({ id: this.$route.params.id })
        .then((res) => {
          this.loading = false
          if (res.code === 20000) {
            this.articleInfo = res
            this.pageTitle = res.title
            this.article_id = res.uid
            this.$store.commit('SET_MENU_INDEX', res.category.cate_url)
            if (this.$route.params.post_url !== res.post_url) {
              this.$router.push({
                name: 'Article',
                params: { post_url: res.post_url, id: res.uid },
              })
            }
            if (res.content.toc.length > 0) {
              this.tocExist = true
            }
            this.liked = this.articleInfo.vote_count
          }
        })
        .catch((err) => {
          this.loading = false
        })
    },
    jumpArticle(url, id) {
      this.$router.push({
        name: 'Article',
        params: {
          post_url: url,
          id: id,
        },
      })
    },
  },
}
</script>

<style>
</style>
