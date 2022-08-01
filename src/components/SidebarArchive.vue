<template>
  <div class="">
    <div class="container">
      <div>
        <el-card class="box-card">
          <div slot="header">
            <i class="el-icon-date"></i> <span>归档</span>
          </div>
          <div class="sidebar-archive"
               v-for="(pub_time, index) in archives"
               :key="`ptime-`+index">
            <router-link :to="{ name: 'Archive', params: {pub_year: pub_time.year, pub_date: pub_time.month} }"><i class="el-icon-notebook-1"></i> {{ pub_time.year }}年{{ pub_time.month }}月
              ({{ pub_time.count }})</router-link>
          </div>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
import { fetchArchive } from '@/api/article'

export default {
  name: 'SidebarArchive',
  data() {
    return {
      archives: {},
    }
  },
  mounted() {
    this.getArchives()
  },
  methods: {
    joinURL(pub_time) {
      return '/archives/' + pub_time.year + '/' + pub_time.month
    },
    getArchives() {
      fetchArchive().then((res) => {
        console.log(res.data.items)
        this.archives = res.data.items
      })
    },
  },
}
</script>

<style>
</style>
