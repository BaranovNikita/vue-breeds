<template>
  <div class="pagination" :class="{ loading }">
    <div class="page" :class="{ disabled: currentPage === 1 }" @click="changePage(1)">
      First
    </div>
    <div class="page" :class="{ disabled: currentPage === 1 }" @click="prev">
      Preview
    </div>
    <slot v-for="page of pagesCount">
      <div
        v-if="pageRendered(page)"
        :key="page"
        class="page"
        :class="{ selected: page === currentPage}"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
      <div
        v-if="dotsRendered(page)"
        :key="`dots-${page}}`"
        class="dots"
      >
        ...
      </div>
    </slot>
    <div class="page" :class="{ disabled: currentPage === pagesCount }" @click="next">
      Next
    </div>
    <div class="page" :class="{ disabled: currentPage === pagesCount }" @click="changePage(pagesCount)">
      Last
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Props {
  itemsLength: number,
  currentPage: number,
  pageLimit: number,
  loading: boolean
}

interface Computed {
  pagesCount: number
}

interface Methods {
  next: () => void,
  prev: () => void,
  changePage: (page: number) => void,
  pageRendered: (page: number) => boolean,
  dotsRendered: (page: number) => boolean
}

export default Vue.extend<{}, Methods, Computed, Props>({
  name: 'Pagination',
  props: {
    itemsLength: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageLimit: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pagesCount (): number {
      return Math.round(this.itemsLength / this.pageLimit)
    }
  },
  methods: {
    next () {
      if (this.currentPage < this.pagesCount) {
        this.changePage(this.currentPage + 1)
      }
    },
    prev () {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1)
      }
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    pageRendered (page) {
      return page === 1 ||
        page === this.pagesCount ||
        (this.currentPage - page < 3 && this.currentPage - page > -3) ||
        (page <= 5 && this.currentPage < 3) ||
        (page >= this.pagesCount - 4 && this.currentPage > this.pagesCount - 2)
    },
    dotsRendered (page) {
      return ((this.currentPage === this.pagesCount && this.currentPage - page === 5) ||
        (this.currentPage !== this.pagesCount && this.currentPage - page === 4) ||
        (this.currentPage !== 1 && this.currentPage - page === -3) ||
        (this.currentPage === 1 && this.currentPage - page === -4)) &&
        page !== this.pagesCount
    }
  }
})
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    &.loading {
      opacity: .5;
      pointer-events: none;
    }
    .page {
      border: 1px solid #ddd;
      padding: 0 5px;
      min-width: 40px;
      height: 40px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      text-align: center;
      cursor: pointer;
      transition: background-color .3s;
      margin: 0 2px;
      &:not(.selected):not(.disabled):hover {
        background-color: orange;
      }
      &.selected {
        background-color: red;
        color: white;
      }
      &.disabled {
        cursor: default;
        opacity: .5;
      }
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .dots {
      align-items: center;
      display: flex;
      margin: 0 5px;
    }
  }
</style>
