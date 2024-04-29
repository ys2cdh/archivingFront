<template>
  <div>
      <h1>Home Page</h1>
      <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
}
</script>

<style>
</style>
