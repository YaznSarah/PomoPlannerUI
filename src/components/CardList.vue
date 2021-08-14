<template>
  <div class="col-3 offset-1 bg-light drop-zone" id = "column"
    @drop="this.onDrop($event, this.status)"
    @dragover.prevent
    >
    {{ status }}
    <div
      class="card drag-el"
      v-for="task in filteredTasks"
      :key="task.id"
      draggable="true"
      @dragstart="this.startDrag($event, task)"
    >
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ task.status }}</h6>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="card-link" @click="deleteTask(task)">Delete</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  mounted() {},
  computed: {
    filteredTasks() {
      return this.$store.getters.getTasksByStatus(this.status);
    },
  },
  name: "CardList",
  props: {
    status: String,
  },
  methods: {
    async deleteTask(task) {
      this.$store.dispatch("deleteTask", task);
    },
    startDrag(event, task) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("taskId", task.id);
    },
    
    onDrop(event, status) {
      const taskId = event.dataTransfer.getData('taskId')
      let task = this.$store.getters.getTaskById(taskId);
      task.status = status;
      this.$store.dispatch("updateTask", task)
    }
  },
};
</script>

<style>
.card:hover {
  background-color: #f8f9fa;
}

.drag-el {
  background: bisque;
}
</style>