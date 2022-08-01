<template>
  <div class="">
    <div class="container footer">
      <el-row>
        <el-col :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24">
          <div class="grid-content bg-purple">
            <div class="copyright">
              COPYRIGHT &copy; 2015-{{ toYear }} <span v-html="nick"></span> <span v-html="htmlTitle(title)"></span>.
              <h5>Powered by
                <a href="/"><span v-html="nick"></span></a> on kubernetes.
                <small><a :href="beianUrl"
                     target="_blank"
                     style="color:#fff;">{{ recordNo }}</a></small>
              </h5>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GLOBAL from '../../static/config'

export default {
  name: 'Footer',
  data() {
    return {
      toYear: '',
      title: GLOBAL.mainHost.title,
      htmlTitle: GLOBAL.htmlTitle,
      nick: GLOBAL.mainHost.nick,
      recordNo: GLOBAL.mainHost.recordNo,
      beianUrl: GLOBAL.mainHost.beianUrl,
    }
  },
  mounted() {
    this.getYear()
  },
  methods: {
    getYear() {
      var date = new Date()
      this.toYear = date.getFullYear()
    },
  },
}
</script>

<style>
</style>
