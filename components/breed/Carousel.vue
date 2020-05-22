<template>
  <div class="carousel">
    <div v-if="currentItem" class="image">
      <div class="arrow left" :class="{ disabled: !selectedItem }" @click="changeItem(selectedItem - 1)" />
      <img :src="currentItem.url" :alt="currentItem.alt">
      <div class="arrow right" :class="{ disabled: selectedItem === items.length - 1 }" @click="changeItem(selectedItem + 1)" />
    </div>
    <img v-else src="/images/loading.gif">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface CarouselItem {
  alt: string,
  url: string,
  title?: string
}

interface Props {
  items: CarouselItem[]
}

interface Data {
  selectedItem: number
}

interface Methods {
  changeItem: (idx: number) => void
}

interface Computed {
  currentItem: CarouselItem
}

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'Carousel',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedItem: 0
    }
  },
  computed: {
    currentItem () {
      if (this.items.length) {
        return this.items[this.selectedItem]
      }
      return null
    }
  },
  methods: {
    changeItem (idx) {
      this.selectedItem = idx
    }
  }
})
</script>

<style scoped lang="scss">
 .carousel {
   position: relative;
   .arrow {
     position: absolute;
     top: 50%;
     width: 50px;
     height: 50px;
     border: solid black;
     border-width: 0 20px 20px 0;
     padding: 20px;
     cursor: pointer;
     &.left {
       left: -80px;
       transform: rotate(135deg) translateX(-50%);
     }
     &.right {
       right: -80px;
       transform: rotate(-45deg) translateY(-50%);
     }
     &.disabled {
       border-color: gray;
       pointer-events: none;
     }
   }
   .image {
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
