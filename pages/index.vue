<template>
  <section class="container">
    <breed-list />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import BreedList from '~/components/home/BreedList.vue'
import { breedStore } from '~/store'

export default Vue.extend({
  components: {
    BreedList
  },
  async asyncData () {
    await breedStore.getTotal()
    await breedStore.getBreeds()
    return {}
  },
  computed: {
    breeds: () => breedStore.breeds
  },
  mounted () {
    breedStore.loadImages()
  }
})
</script>
