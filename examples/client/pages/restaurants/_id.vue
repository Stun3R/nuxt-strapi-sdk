<template>
  <div>
    <a-breadcrumb class="mb-3">
      <a-breadcrumb-item>
        <nuxt-link to="/"><a-icon type="home"></a-icon></nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <nuxt-link to="/restaurants">Restaurants</nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-if="restaurant">
        {{ restaurant.name }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-card :title="restaurant.name">
      <div class="mb-2" v-if="restaurant.description" v-html="$md.render(restaurant.description)"></div>
      Categories : <a-tag v-for="category in restaurant.categories" :key="category.id">
        {{ category.name.toUpperCase() }}
      </a-tag>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data() {
    return {
    }
  },
  async asyncData({ app, params }) {
    try {
      const response = await app.$strapi.getEntry('restaurants', params.id)
      return { restaurant: response}
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  validate({ params }) {
    // Doit être un nombre
    return /^\d+$/.test(params.id)
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
