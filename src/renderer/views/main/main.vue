<template>
  <div>
    fghjjkfghjkfghj
    <el-image src="http://i0.hdslb.com/bfs/archive/bbd7e2e4fc1e3466c6fef2cf18a35dc95d1502ff.png"></el-image>

    <el-container>
      <el-header>

      </el-header>
      <el-main>
        <el-tabs v-model="tabName" @tab-click="handleClick">
          <el-tab-pane v-for="item in tab.tab" :key="item.id" :label="item.name" :name="item.tab_id" @click="selectTab(item.uri)" />

        </el-tabs>
        <div>
          <keep-alive>
            <component :is="currentTabComponent"></component>
          </keep-alive>
        </div>
      </el-main>
    </el-container>

    <div>

    </div>
  </div>
</template>

<script>
import Promo from '../pegasus/promo'

export default {
  name: 'main',
  data() {
    return {
      tabName: '用户管理',
      tab: {
        tab: []
      },
      currentTabName: '' // 当前的tab
    }
  },
  components: {
    Promo
  },
  computed: {
    /**
     * 当前页面
     * @returns {{data(): {indexData: [], indexConfig: []}, methods: {}, name: string, mounted(): void}}
     */
    currentTabComponent() {
      return Promo
    }
  },
  mounted() {
    const item = localStorage.getItem('tabData')
    if (item) {
      const tab = JSON.parse(item)
      if (tab.tab) {
        this.tab.tab = tab.tab
        this.tabName = tab.tab[1].tab_id
      }
    }
  },
  methods: {
    /**
     * 切换tab
     * @param tab
     * @param event
     */
    handleClick(tab, event) {
      console.log(tab, event)
    },
    selectTab(uri) {
      console.log(uri)
      switch (uri) {
        default: this.currentTabName = uri
      }
    }

  }
}
</script>

<style scoped>

</style>
