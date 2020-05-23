<template>
  <section class="content">
    <img v-if="!breed || loading" src="/images/loading.gif" class="loader">
    <div v-else>
      <section>
        <h1>{{ breed.name }}</h1>
        <div class="description">
          <div class="breed-group">
            <span>Group:</span>
            {{ breed.breed_group }}
          </div>
          <div class="breed-for">
            <span>For:</span>
            {{ breed.bred_for }}
          </div>
          <div class="breed-weight">
            <span>Weight:</span>
            <ul>
              <li>Imperial: {{ breed.weight.imperial }} lb</li>
              <li>Metric: {{ breed.weight.metric }} kg</li>
            </ul>
          </div>
          <div class="breed-height">
            <span>Height:</span>
            <ul>
              <li>Imperial: {{ breed.height.imperial }} in</li>
              <li>Metric: {{ breed.height.metric }} cm</li>
            </ul>
          </div>
          <div class="breed-lifespan">
            <span>Life span:</span>
            {{ breed.life_span }}
          </div>
        </div>
      </section>
      <section>
        <h2>Photos</h2>
        <carousel
          :per-page="1"
          navigationEnabled
        >
          <slide v-for="image of breed.images" class="carousel-item" :key="image.id">
            <img :src="image.url" :alt="image.id">
          </slide>
        </carousel>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { breedStore } from '~/utils/store-accessor'

interface Computed {
  breed?: Breed,
  loading: boolean
}

export default Vue.extend<{}, {}, Computed, {}>({
  name: 'Breed',
  async asyncData ({ params }) {
    await breedStore.loadBreed(+params.id)
    return {}
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
  section.content {
    max-width: 1140px;
    margin: 0 auto;
    section {
      margin-bottom: 10px;
    }
    h1 {
      font-size: 37px;
      font-weight: 800;
    }
    h2 {
      font-size: 27px;
      font-weight: 600;
    }
    .description {
      font-size: 17px;
      & > div {
        margin-bottom: 10px;
        span {
          text-decoration: underline;
          font-style: italic;
        }
      }
    }
    .carousel-item {
      position: relative;
      margin: 0 auto;
      img {
        width: 100%;
        height: 400px;
        object-fit: contain;
      }
    }
  }
</style>
