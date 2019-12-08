<template>
  <div class="flex">
    <a-button class="mr-1" @click="() => { inputVisible = !inputVisible }">{{ !inputVisible ? 'Add' : 'Cancel'}}</a-button>
    <div v-if="inputVisible" class="flex">
      <a-input class="mr-1" :value="value" @change="handleChange" @pressEnter="check" />
      <a-icon class="my-auto" type="check" @click="check" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddButtonInline',
    data() {
     return {
       inputVisible: false,
       value: ''
     }
    },
    methods: {
      handleChange(e) {
        const value = e.target.value;
        this.value = value;
      },
      check() {
        this.editable = false;
        this.$emit('add-restaurant', this.value);
      },
    }
  }
</script>

<style scoped>

</style>
