<template>
  <section class="content">
    <div class="breeds">
      <breed v-for="breed of breeds" :key="breed.id" :breed="breed" />
    </div>
    <pagination
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
import { Breed } from '~/types'

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
    changePage (page: number) {
      breedStore.changePage(page)
    }
  }
})
</script>

<style scoped lang="scss">
  .breeds {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
