<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.commit('initialiseStore')
  },
  logout(){
    this.$store.commit('logout')
  },
}
</script>

<style>
</style>
