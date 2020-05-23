<template>
  <header>
    <nuxt-link to="/" class="logo">
      BREEDS
    </nuxt-link>
    <nuxt-link to="/favorite" class="favorite">
      Favorite breeds
    </nuxt-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
  header {
    height: 50px;
    background-color: darksalmon;
    display: flex;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
    .logo {
      font-size: 30px;
      color: white;
      text-decoration: none;
    }
    .favorite {
      color: white;
      text-decoration: none;
    }
  }
</style>
