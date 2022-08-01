<template>
  <div class="">
    <div class="container">
      <div>
        <el-card class="box-card">
          <div slot="header">
            <i class="el-icon-price-tag"></i> <span>标签</span>
          </div>
          <div class="tag-group">
            <el-tag v-for="item in tags"
                    :key="item.name"
                    :type="randomType()"
                    @click="getTagArticles(item.name)"
                    effect="dark">
              {{ item.name }}
            </el-tag>
          </div>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { fetchTag } from '@/api/article'

export default {
  name: 'SidebarTag',
  data() {
    return {
      tags: [],
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      fetchTag().then((res) => {
        this.tags = res.data.items.sort(function () {
          return 0.5 - Math.random()
        })
      })
    },
    getTagArticles(tag) {
      this.$router.push({ name: 'Tag', params: { name: tag } }).catch((err) => {
        err
      })
    },
    randomType() {
      let types = ['', 'success', 'info', 'danger', 'warning']
      return types[Math.floor(Math.random() * types.length)]
    },
  },
}
</script>

<style>
</style>
