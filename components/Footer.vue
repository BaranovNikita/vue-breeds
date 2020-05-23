<template>
  <footer>
    <div class="copyright">
      © Baranov Nikita 2020
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
  footer {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: khaki;
    .copyright {
      color: white;
      font-size: 16px;
    }
  }
</style>
