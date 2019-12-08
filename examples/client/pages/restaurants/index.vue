<template>
  <div>
    <a-card title="Restaurants" class="mb-2">
      <div class="mb-2 flex">
        <a-button class="mr-1" :disabled="firstLoading" @click="getRestaurants" :loading="loading && !firstLoading" icon="sync">
          Reload
        </a-button>
        <add-button-inline @add-restaurant="addRestaurant($event)"></add-button-inline>
      </div>
      <a-table :columns="columns" :dataSource="restaurants" :loading="loading" row-key="id">
        <template slot="name" slot-scope="text, record">
          <editable-cell :text="text" @change="onCellChange(record.id, 'name', $event)"></editable-cell>
        </template>
        <span slot="categories" slot-scope="categories">
          <a-tag v-for="category in categories" :key="category.id">
            {{ category.name.toUpperCase() }}
          </a-tag>
        </span>
        <template slot="operation" slot-scope="text, record">
          <nuxt-link :to="'/restaurants/' + record.id">View</nuxt-link> |
          <a-popconfirm
            v-if="restaurants.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.id)"
          >
            <a href="javascript:">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import AddButtonInline from '@/components/AddButtonInline'
import EditableCell from '@/components/EditableCell'

export default {
  name: 'Entries',
  components: {
    AddButtonInline,
    EditableCell
  },
  data() {
    return {
      restaurants: [],
      loading: false,
      firstLoading: true,
    }
  },
  computed: {
    columns() {
      return [
        {
          title: 'Restaurant',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          width: '40%'
        },
        {
          title: 'Category',
          key: 'categories',
          dataIndex: 'categories',
          scopedSlots: { customRender: 'categories' },
          width: '40%'
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        },
      ]
    }
  },
  async mounted() {
    await this.getRestaurants()
    this.firstLoading = false
  },
  methods: {
    async getRestaurants() {
      try {
        this.setLoading(true)
        this.restaurants = await this.$strapi.getEntries('restaurants', { _sort: 'name:asc' })
        this.setLoading(false)
      } catch (e) {
        await this.$notification.error({
          placement: 'bottomRight',
          message: `${e.message}`,
          description: ''
        })
        this.setLoading(false)
      }
    },
    setLoading(value) {
      this.loading = value
    },
    async onCellChange(id, dataIndex, value) {
      try {
        const restaurants = [...this.restaurants]
        const target = restaurants.find(item => item.id === id)
        if (target) {
          const response = await this.$strapi.updateEntry('restaurants', id, {
            name: value
          })
          target.name = response.name
          this.restaurants = restaurants
        }
      } catch (e) {
        await this.$notification.error({
          placement: 'bottomRight',
          message: `${e.message}`,
          description: ''
        })
      }
    },
    async onDelete(id) {
      try {
        const restaurants = [...this.restaurants];
        await this.$strapi.deleteEntry('restaurants', id)
        this.restaurants = restaurants.filter(item => item.id !== id);
      } catch (e) {
        await this.$notification.error({
          placement: 'bottomRight',
          message: `${e.message}`,
          description: ''
        })
      }
    },
    async addRestaurant(name) {
      try {
        const newRestaurant = await this.$strapi.createEntry('restaurants', { name: name })
        this.restaurants.push(newRestaurant)
      } catch (e) {
        await this.$notification.error({
          placement: 'bottomRight',
          message: `${e.message}`,
          description: ''
        })
      }
    }
  }
}
</script>

<style>
</style>
