<template>
  <div class="timer">
    <div class="radial"></div>
    <h2>{{ minutes }}:{{ seconds }}</h2>
    <button class="btn btn-light" @click="setTime()">Reset</button>
    <button class="btn btn-success" @click="start()">Start</button>
    <button class="btn btn-danger" @click="stop()">Stop</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      inputTime: 60 * 20,
      interval: null,
    };
  },
  computed: {
    minutes() {
      return Math.floor(this.time / 60);
    },
    seconds() {
      let seconds = Math.floor(this.time % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return seconds;
    },
  },
  mounted() {
    this.time = this.inputTime;
  },
  methods: {
    setTime() {
      this.time = this.inputTime;
    },
    start() {
      if (this.interval === null) {
        this.interval = setInterval(() => {
          this.time--;
          let percent = Math.floor(this.time/this.inputTime * 100);
          console.log(percent)
          document.documentElement.style.setProperty('--percentage', percent+'%');

        }, 1000);
      }
    },
    stop() {
      if (this.interval !== null) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
};
</script>

<style>

.timer {
  position:fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  margin: 20px;
}
.radial {
  background: conic-gradient(#EFB709 var(--percentage), white 0);
  border-radius: 50%;  
  height: 120px; 
  width: 120px;
  margin: 0 auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
</style>