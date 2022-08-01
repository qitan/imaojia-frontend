<template>
  <div class="">
    <div class="container">
      <div>
        <el-col :xs="24"
                :sm="24"
                :md="6"
                :lg="6"
                :xl="6">
          <div class="grid-content bg-purple">
            <SidebarSearch></SidebarSearch>
            <SidebarCategory :menu_categories="menu_categories"></SidebarCategory>
            <SidebarLatest></SidebarLatest>
            <SidebarTag></SidebarTag>
            <SidebarArchive></SidebarArchive>
          </div>
        </el-col>
      </div>
    </div>
  </div>

</template>

<script>
import SidebarCategory from '@/components/SidebarCategory'
import SidebarLatest from '@/components/SidebarLatest'
import SidebarTag from '@/components/SidebarTag'
import SidebarArchive from '@/components/SidebarArchive'
import SidebarSearch from '@/components/SidebarSearch'

export default {
  name: 'SideBar',
  props: {
    menu_categories: Array,
  },
  components: {
    SidebarCategory,
    SidebarLatest,
    SidebarTag,
    SidebarArchive,
    SidebarSearch,
  },
  methods: {},
}
</script>

<style>
</style>
