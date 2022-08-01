<template>
  <div class=""
       v-wechat-title="pageTitle">
    <div class="container">
      <MainBase>
        <template v-slot:base>
          <el-col :xs="24"
                  :sm="24"
                  :md="18"
                  :lg="18"
                  :xl="18"
                  v-loading="loading">
            <div class="grid-content bg-purple-light">
              <el-card class="article-detail">
                <p>
                  Oh...页面找不到了!
                </p>
              </el-card>
            </div>
          </el-col>
        </template>
      </MainBase>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

import MainBase from '@/components/MainBase'

export default {
  data() {
    return {
      pageTitle: '404找不到页面',
    }
  },
  components: {
    MainBase,
  },
  mounted() {},
  methods: {},
  computed: {},
}
</script>

<style>
</style>
