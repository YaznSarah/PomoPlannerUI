<template>
  <div id="wrapper">
    <div id="sidebar-wrapper">
      <div id="app">
        <button @click="start">Start</button>
        <button @click="stop">Stop</button>
        <button @click="reset">Reset</button>
        <p>{{ formattedElapsedTime }}</p>
      </div>
      <ul class="sidebar-nav"></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      elapsedTime: 0,
      timer: undefined
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    }
  }
};
</script>

<style scoped>
.sidebar-header {
  width: 50px;
}
</style>