<template>
  <div class="input-container">
    <input
      v-model="value"
      placeholder="Search"
      @input.prevent="onChange"
    >
    <button class="clear" @click="clear">
      Clear
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Data {
  value: string
}

interface Methods {
  onChange: (e: Event) => void,
  clear: () => void
}

export default Vue.extend<Data, Methods, {}, {}>({
  name: 'Search',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onChange (e: Event) {
      this.$emit('change', (e.target as HTMLInputElement).value)
    },
    clear () {
      this.value = ''
      this.$emit('change', '')
    }
  }
})
</script>

<style scoped lang="scss">
  .input-container {
    margin: 10px 0 10px 10px;
    input {
      height: 40px;
      padding: 0 10px;
      width: 200px;
    }
    button {
      margin-left: 10px;
      height: 40px;
      padding: 0 20px;
      background: linear-gradient(darksalmon, khaki);
      border: none;
      box-shadow: none;
      border-radius: 4px;
      outline: none;
      color: white;
      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
