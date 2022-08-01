<template>

</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SideBar from '@/components/SideBar'

import { fetchArticleList } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {
    'article-header': Header,
    'article-sidebar': SideBar,
    'article-footer': Footer,
  },
  data() {
    return {
      articles: [],
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    handleSelect(key, keyPath) {},
    getArticles() {
      fetchArticleList().then((res) => {
        this.articles = res.data.items
      })
    },
  },
}
</script>

<style>
</style>
