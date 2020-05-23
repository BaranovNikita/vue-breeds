<template>
  <card class="breed">
    <h2 class="breed-name">
      {{ breed.name }}
    </h2>
    <nuxt-link :to="`/breed/${breed.id}`">
      <img v-if="breed.images && breed.images.length" :src="breed.images[0].url" class="breed-photo">
      <img v-else src="/images/loading.gif" class="breed-photo">
    </nuxt-link>
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
  </card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '~/components/shared/Card.vue'

interface Props {
  breed: Breed
}

export default Vue.extend<{}, {}, {}, Props>({
  name: 'Breed',
  components: {
    Card
  },
  props: {
    breed: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
  .breed {
    margin: 10px 20px;
    flex: 0 1 17%;
    &-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-photo {
      width: 100%;
      margin-bottom: 10px;
      height: 200px;
      object-fit: cover;
      object-position: top;
    }
  }
</style>
