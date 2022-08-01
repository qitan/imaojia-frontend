<template>
  <div class="">
    <div class="container">
      <div>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <i class="el-icon-reading"></i> <span>最新文章</span>
          </div>
          <div class="sidebar-latest"
               v-for="(article, index) in articles"
               :key="`art-`+index">
            <router-link :to="{ name: 'Article', params: {post_url: article.post_url, id: article.uid} }">{{ article.title }}</router-link>
            <div class="bottom clearfix">
              <time class="time">发布时间：{{ article.published_time }}</time>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
import { fetchArticleLatest } from '@/api/article'

export default {
  name: 'SidebarLatest',
  data() {
    return {
      articles: [],
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      fetchArticleLatest().then((res) => {
        this.articles = res.data.items
      })
    },
  },
}
</script>

<style>
</style>
