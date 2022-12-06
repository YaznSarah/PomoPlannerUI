<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light navbar bg-light p-4 border border-2 rounded-3">
      <a class="navbar-brand" href="/">Blog Bay</a>
      <span class="navbar-text">
        <button class="btn btn-primary" v-if="this.$store.getters.isAuthenticated" @click="logout">Logout</button>
      </span>
    </nav>
    <div class="mt-5">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  methods: {
    async logout() {
      await this.$store.commit('logout')
      this.$router.push('/login')
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #e6eefb;
  margin-top: 60px;
}

html {
  background: #e6eefb;
}

.sidebar {
  width: 200px;
  background: #ffff;
}
</style>
