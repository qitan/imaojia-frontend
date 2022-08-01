<template>
  <div class="navMenu">
    <template v-for="navMenu in navMenus">
      <!-- 最后一级菜单 -->
      <el-menu-item v-if="navMenu.category_child.length === 0"
                    :key="navMenu.id"
                    :data="navMenu"
                    :index="navMenu.cate_url">
        <span slot="title">{{navMenu.name.toUpperCase()}}</span>
      </el-menu-item>
      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.category_child.length > 0"
                  :key="navMenu.id"
                  :data="navMenu"
                  :index="navMenu.cate_url">
        <template slot="title">
          <span> {{navMenu.name.toUpperCase()}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.category_child"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data() {
    return {}
  },
  methods: {
    joinURL(url, name) {
      return url + '/' + name
    },
    jumpTo(url) {
      this.$emit('callJump', url)
    },
    jumpCategory(url) {
      this.$router.push({
        name: 'Category',
        params: { cate_url: url },
      })
    },
  },
}
</script>

<style scoped>
* {
  outline: none;
}
</style>
