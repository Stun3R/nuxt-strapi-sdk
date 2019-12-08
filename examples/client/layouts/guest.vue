<template>
  <a-layout class="h-100">
    <a-layout-header class="bg-white">
      <nuxt-link to="/auth" class="logo">
        <img class="logo--img" src="~/assets/images/logo/nuxt/raw-reverted.svg" alt="" />
      </nuxt-link>
    </a-layout-header>
    <a-layout-content>
      <nuxt></nuxt>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
.logo {
  width: 120px;
  margin: 16px 28px 16px 0;
  float: left;
  display: flex;

  &--img {
    height: 28px;
    margin: auto;
  }
}
</style>
