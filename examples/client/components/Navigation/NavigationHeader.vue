<template>
  <a-layout-header class="p-0 bg-white">
    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="setCollapsed" class="trigger" />
    <div class="header--right" style="">
      <a-dropdown placement="bottomRight">
        <span class="header--trigger">
          <a-avatar :src="userAvatar" class="header--avatar" />
          <span>
            {{ this.$strapi.user.username }}
          </span>
        </span>
        <a-menu slot="overlay">
          <a-menu-item @click="logout">
            <a-icon type="logout"></a-icon>
            Logout
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: 'NavigationHeader',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userAvatar() {
      return `https://ui-avatars.com/api/?background=880D1E&color=fff&name=${this.$strapi.user.username}`
    }
  },
  methods: {
    async logout() {
      await this.$strapi.logout()
      await this.$notification.success({
        placement: 'bottomRight',
        message: 'Successful logout',
        description: ''
      })
    },
    setCollapsed() {
      this.$emit('edit-collapsed')
    }
  }
}
</script>

<style lang="scss" scoped>
.trigger {
  height: 64px;
  padding: 19px 24px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
}

.trigger:hover {
  color: #880d1e;
}
.header {
  &--right {
    float: right;
    height: 100%;
    margin-left: auto;
    overflow: hidden;
  }
  &--avatar {
    margin-right: 4px;
  }
  &--trigger {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
  }
}
</style>
