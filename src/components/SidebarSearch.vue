<template>
  <div class="">
    <div class="container">
      <div>
        <slot name="isearch">
          <el-card class="box-card">
            <el-input clearable
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search"
                      minlength="3"
                      maxlength="20"
                      @change="keySearch"
                      v-model="q">
            </el-input>
          </el-card>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarTag',
  data() {
    return {
      q: this.$route.params.q ? this.$route.params.q : '',
      tags: [],
    }
  },
  mounted() {},
  methods: {
    keySearch() {
      this.$router
        .push({ name: 'Search', params: { q: this.q } })
        .catch((err) => {
          err
        })
    },
  },
}
</script>

<style>
</style>
