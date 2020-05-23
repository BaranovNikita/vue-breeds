<template>
  <section class="content">
    <div class="breeds">
      <breed v-for="breed of breeds" :key="breed.id" :breed="breed" />
    </div>
    <pagination
      v-if="total > pageLimit"
      :current-page="page + 1"
      :items-length="total"
      :page-limit="pageLimit"
      :loading="loading"
      @changePage="changePage"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import BreedItem from './BreedItem.vue'
import Pagination from '~/components/shared/Pagination.vue'
import { breedStore } from '~/utils/store-accessor'

interface Computed {
  page: number,
  pageLimit: number,
  total: number,
  breeds: Breed[],
  loading: boolean
}

interface Methods {
  changePage: (page: number) => void
}

export default Vue.extend<{}, Methods, Computed, {}>({
  name: 'BreedList',
  components: {
    Pagination,
    Breed: BreedItem
  },
  computed: {
    breeds: () => breedStore.breeds,
    loading: () => breedStore.loading,
    page () {
      return breedStore.page
    },
    pageLimit () {
      return breedStore.pageLimit
    },
    total () {
      return breedStore.total
    }
  },
  methods: {
    async changePage (page: number) {
      await breedStore.changePage(page)
      breedStore.loadImages()
    }
  }
})
</script>

<style scoped lang="scss">
  .breeds {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .content {
    padding-bottom: 50px;
  }
</style>
