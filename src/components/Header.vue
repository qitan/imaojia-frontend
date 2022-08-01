<template>
  <div class="">
    <div class="container">
      <div>
        <el-button :style="{display: isVisible}"
                   @click="navDrawer = true"
                   type="text"
                   class="navBtn">
          <i class="el-icon-menu"
             style="margin-left: .62rem;margin-top: -.1rem;font-size:18px;"></i>
        </el-button>
        <el-menu mode="vertical"
                 :unique-opened="true"
                 class="imjheader"
                 :background-color="device === 'mobile' ? '#242526' : '#242526'"
                 text-color="#fff"
                 active-text-color="#fd2020"
                 @select="jumpCategory"
                 :default-active="menuIndex ? menuIndex : $route.params.cate_url">
          <el-drawer title="IMAOJIA"
                     :size="device === 'mobile' ? '60%' : '30%'"
                     :visible.sync="navDrawer"
                     :with-header="false"
                     custom-class="mobile-menu"
                     direction="rtl"
                     ref="drawer"
                     :show-close="true"
                     :append-to-body="true"
                     :modal-append-to-body="true">
            <div class="isearch">
              <iSearch />
            </div>
            <el-menu-item index="/">首页</el-menu-item>
            <NavMenu :navMenus="menu_categories" />
          </el-drawer>
        </el-menu>
      </div>
      <el-container>
        <el-col :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24">
          <div class="grid-content bg-purple">
            <template>
              <div id="immenu">
                <el-menu :mode="device === 'mobile' ? 'vertical' : 'horizontal'"
                         :unique-opened="true"
                         class="imjheader"
                         :background-color="device === 'mobile' ? '#242526' : '#242526'"
                         text-color="#fff"
                         active-text-color="#fd2020"
                         @select="jumpCategory"
                         :default-active="menuIndex ? menuIndex : $route.params.cate_url">
                  <router-link :to="{ name: 'Home', params: {} }"
                               style="outline: none;"><i class="blog-logo"></i></router-link>
                  <template v-if="device==='mobile'">
                    <el-button @click="drawer = true"
                               type="text"
                               class="mobile-header">
                      <i class="el-icon-menu"></i>
                    </el-button>
                    <el-drawer title="IMAOJIA"
                               size="60%"
                               :visible.sync="drawer"
                               :with-header="false"
                               custom-class="mobile-menu"
                               direction="rtl"
                               ref="drawer"
                               :show-close="true"
                               :append-to-body="true"
                               :modal-append-to-body="true">
                      <div class="isearch">
                        <iSearch />
                      </div>
                      <el-menu-item index="/">首页</el-menu-item>
                      <NavMenu :navMenus="menu_categories" />
                    </el-drawer>
                  </template>
                  <template v-else>
                    <el-menu-item index="/"
                                  style="margin-top: 4px;">首页</el-menu-item>
                    <NavMenu :navMenus="menu_categories" />
                  </template>
                </el-menu>
              </div>
            </template>
          </div>
        </el-col>
        <div class="line" />
      </el-container>
    </div>
  </div>

</template>

<script>
import Resize from '@/utils/resize'
import { mapState, mapGetters } from 'vuex'
import NavMenu from '@/components/NavMenu'
import SidebarSearch from '@/components/SidebarSearch'

export default {
  name: 'Header',
  props: {
    menu_categories: Array,
  },
  components: {
    NavMenu: NavMenu,
    iSearch: SidebarSearch,
  },
  data() {
    return {
      isCollapse: true,
      drawer: false,
      isVisible: 'none',
      navDrawer: false,
      mode: this.device === 'mobile' ? 'vertical' : 'horizontal',
    }
  },
  mixins: [Resize],
  computed: {
    ...mapState({
      device: (state) => state.device,
      menuIndex: (state) => state.menuIndex,
      category: (state) => state.category,
    }),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      let offsetTop = document.querySelector('#immenu').offsetTop
      if (scrollTop > offsetTop) {
        this.isVisible = 'flex'
        this.navDrawer == true
      } else {
        this.isVisible = 'none'
        this.navDrawer == false
      }
    },

    jumpCategory(key, keyPath) {
      this.$store.commit('SET_MENU_INDEX', key)
      this.$refs.drawer.closeDrawer()
      if (key == '/') {
        this.$router.push({
          name: 'Home',
        })
      } else {
        this.$router.push({
          name: 'Category',
          params: { cate_url: key },
        })
      }
    },
    closeDraw() {
      this.drawer = false
      this.$refs.drawer.closeDrawer()
    },
    joinURL(url) {
      return '/category/' + url
    },
  },
}
</script>

<style>
</style>
