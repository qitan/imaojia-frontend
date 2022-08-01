<template>
  <div>
    <template v-for="(toc, index) in tocContent">
      <ul :key='`toc-`+index'>
        <li>
          <a href="javascript:"
             @click="jumpAnchor(toc.id)">{{ toc.name }}</a>
        </li>
        <Toc @callAnchor="jumpAnchor"
             :tocContent="toc.children"></Toc>
      </ul>
    </template>

  </div>
</template>

<script>
export default {
  name: 'Toc',
  props: {
    tocContent: Array,
  },
  data() {
    return {}
  },
  methods: {
    jumpAnchor(selector) {
      this.$emit('callAnchor', selector)
      // this.callAnchor(selector)
    },
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
