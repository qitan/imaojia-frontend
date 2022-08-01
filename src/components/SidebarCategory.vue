<template>
  <div class="">
    <div class="container">
      <div>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <i class="el-icon-folder-opened"></i> <span>分类</span>
          </div>
          <el-tree :data="menu_categories"
                   node-key="cate_url"
                   ref="tree"
                   @node-click="categorySelect"
                   :expand-on-click-node="false"
                   highlight-current
                   default-expand-all
                   :current-node-key="$route.params.cate_url"
                   :props="defaultProps">
          </el-tree>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SidebarCategory',
  props: {
    menu_categories: Array,
  },
  inheritAttrs: false,
  data() {
    return {
      q: '',
      categories: [],
      defaultProps: {
        children: 'category_child',
        label: 'name',
      },
    }
  },
  computed: {
    ...mapState({
      menuIndex: (state) => state.menuIndex,
    }),
  },
  watch: {
    $route: 'setCheckNode',
  },
  mounted() {},
  methods: {
    setCheckNode() {
      this.$refs.tree.setCurrentKey(
        this.menuIndex ? this.menuIndex : this.$route.params.cate_url
      )
    },
    categorySelect(data) {
      this.$store.commit('SET_MENU_INDEX', data.cate_url)
      this.$router
        .push({ name: 'Category', params: { cate_url: data.cate_url } })
        .catch((err) => {
          err
        })
    },
  },
}
</script>

<style>
</style>
