<template>
  <section>
    <img v-if="!breed || loading" src="/images/loading.gif" class="loader">
    <div v-else>
      {{ breed.name }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { breedStore } from '~/utils/store-accessor'
import { Breed } from '~/types'

interface Computed {
  breed?: Breed,
  loading: boolean
}

export default Vue.extend<{}, {}, Computed, {}>({
  name: 'Breed',
  async fetch () {
    await breedStore.loadBreed(+this.$route.params.id)
  },
  computed: {
    breed () {
      return breedStore.breeds.length ? breedStore.breeds[0] : null
    },
    loading () {
      return breedStore.loading
    }
  },
  mounted () {
    breedStore.loadImages(10)
  }
})
</script>

<style lang="scss" scoped>
  .loader {
    display: block;
    margin: 0 auto;
  }
</style>
