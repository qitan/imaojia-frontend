<template>
  <div>
    <el-menu-item index="13">首页</el-menu-item>
    <template v-for="(category, index) in menu_categories">
      <el-menu-item v-if="category.category_child.length === 0"
                    :key="`cate`+index"
                    :index="joinURL(category.cate_url)">{{ category.cate_url }}{{ category.id }}{{ category.name }}</el-menu-item>
      <el-submenu v-else
                  :key="`cate`+index"
                  :index="joinURL(category.cate_url)">
        <template slot="title"><span slot="title">
            <router-link :to="{ name: 'Category', params: {cate_url: category.cate_url} }">{{ category.name }}</router-link>
          </span></template>
        <template v-for="(subcategory, subindex) in category.category_child">
          <el-menu-item v-if="subcategory.category_child.length === 0"
                        :key='`subcate`+subindex'
                        :index="joinURL(subcategory.cate_url)">{{ subcategory.name }}</el-menu-item>
          <el-submenu v-else
                      :key='`subcate`+subindex'
                      :index="joinURL(subcategory.cate_url)">
            <template slot="title">{{ subcategory.cate_url }}</template>
            <el-menu-item v-for="(thirdcategory, tdindex) in subcategory.category_child"
                          :key='`thirdcate`+tdindex'
                          :index="joinURL(thirdcategory.cate_url)">{{ thirdcategory.name }}</el-menu-item>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import Resize from '@/utils/resize'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  props: {
    menu_categories: Array,
  },
  data() {
    return {
      activeIndex: this.$route.path,
      isCollapse: true,
      drawer: false,
    }
  },
  mixins: [Resize],
  computed: {
    ...mapState({
      device: (state) => state.device,
    }),
  },
  mounted() {},
  methods: {
    jumpCategory(url) {
      this.$router.push({
        name: 'Category',
        params: { cate_url: url },
      })
    },
    handleSelect(key, keyPath) {},
    joinURL(url) {
      return '/category/' + url
    },
  },
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
