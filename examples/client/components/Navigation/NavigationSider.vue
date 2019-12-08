<template>
  <a-layout-sider :trigger="null" v-model="collapsed" collapsible style="box-shadow: 2px 0 6px rgba(0,21,41,.35);">
    <div style="display: flex">
      <img v-if="!collapsed" src="~/assets/images/logo/nuxt/raw.svg" class="h-4 my-2 mx-auto" alt="" />
      <img v-else src="~/assets/images/logo/nuxt/letter.svg" class="h-4 my-2 mx-auto" alt="" />
    </div>
    <a-menu :defaultSelectedKeys="[$route.path]" :inlineCollapsed="collapsed" mode="inline" theme="dark" class="py-2">
      <a-menu-item key="/restaurants">
        <nuxt-link to="/restaurants">
          <a-icon type="smile" />
          <span>Restaurants</span>
        </nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'NavigationSider',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      currentPath: null
    }
  }
}
</script>

<style scoped></style>
