<template>
  <section class="container">
    <search @change="searchChange" />
    <breed-list />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import BreedList from '~/components/home/BreedList.vue'
import { breedStore } from '~/store'
import Search from '~/components/home/Search.vue'
import { debounce } from '~/utils'

const search = debounce(async () => {
  await breedStore.searchBreeds()
  breedStore.loadImages()
}, 1000)

const loadAll = async () => {
  await breedStore.getTotal()
  await breedStore.getBreeds()
}

export default Vue.extend({
  components: {
    BreedList,
    Search
  },
  async asyncData () {
    await loadAll()
    return {}
  },
  computed: {
    breeds: () => breedStore.breeds
  },
  mounted () {
    breedStore.loadImages()
  },
  methods: {
    async searchChange (val: string) {
      if (val.trim()) {
        breedStore.setSearchWord(val.trim())
        breedStore.setPage(0)
        breedStore.setMode('search')
        search()
      } else {
        breedStore.setMode('all')
        await loadAll()
        breedStore.loadImages()
      }
    }
  }
})
</script>
