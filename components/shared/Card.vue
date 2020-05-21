<template>
  <div class="card">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card'
}
</script>

<style scoped lang="scss">
  .card {
    background: white;
    border: 1px solid #DBDBDB;
    box-sizing: border-box;
    box-shadow: 0 4px 14px rgba(70, 97, 138, 0.2);
    border-radius: 8px;
    padding: 20px;
  }
</style>
