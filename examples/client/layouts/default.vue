<template>
  <a-layout class="h-100">
    <navigation-sider :collapsed="collapsed"></navigation-sider>
    <a-layout>
      <navigation-header :collapsed="collapsed" @edit-collapsed="setCollapsed"></navigation-header>
      <a-layout-content class="m-3">
        <nuxt></nuxt>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import NavigationSider from '@/components/Navigation/NavigationSider'
import NavigationHeader from '@/components/Navigation/NavigationHeader'
export default {
  components: {
    NavigationSider,
    NavigationHeader
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    setCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style lang="scss" scoped></style>
