<template>
  <div class="container">
    <div class="align-middle" style="height:100%">
      <div class="spinner-border align-middle" role="status" v-if="loading">
      </div>
    </div>
    <div class="row" v-if="!loading">
      <div class="col-4">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Task title"
            aria-describedby="basic-addon2"
            v-model="newTaskTitle"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="createTask()"
            >
              Button
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <card-list status="to-do"></card-list>
        <card-list status="in-progress"></card-list>
        <card-list status="complete"></card-list>
      </div>
    </div>
  </div>
</template>

<script>
import CardList from './CardList.vue'
export default {
  name: "Dashboard",
  components: {
    'card-list': CardList,
  },
  data() {
    return {
      tasks: [],
      newTaskTitle: "",
      loading: true
    };
  },
  mounted() {
    this.getTasks()
  },
  // computed: {
  //   inProgressTasks(){
  //     return this.tasks.filter((item) => item.status == 'in-progress')
  //   },
  //   completedTasks(){
  //     return this.tasks.filter((item) => item.status == 'complete')
  //   },
  //   toDoTasks(){
  //     return this.tasks.filter((item) => item.status == 'to-do')
  //   }
  // },
  methods: {
    async getTasks() {
      await this.$store.dispatch('getTasks')
      this.loading = false;
    },
    async createTask() {
      this.$store.dispatch('addTask', this.newTaskTitle)
    },
  },
};
</script>

<style>
</style>
