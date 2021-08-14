<template>
  <div
    class="col-3 offset-1 drop-zone"
    id="column"
    @drop="onDrop($event, status)"
    @dragover.prevent
  >
    <div class="header">{{ status }}</div>
    <div
      class="card drag-el"
      v-for="task in filteredTasks"
      :key="task.id"
      draggable="true"
      @dragstart="startDrag($event, task)"
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
    <div class="input-group mb-3" v-if="status == 'to-do'">
          <input
            type="text"
            class="form-control"
            placeholder="Task title"
            aria-describedby="basic-addon2"
            v-model="newTaskTitle"
          />
          <div class="input-group-append">
            <button
              class="btn btn-warning"
              type="button"
              @click="createTask()"
            >
              Add Task
            </button>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      newTaskTitle: "",
    };
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

    async createTask() {
      this.$store.dispatch("addTask", this.newTaskTitle);
    },
    startDrag(event, task) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("taskId", task.id);
    },

    onDrop(event, status) {
      const taskId = event.dataTransfer.getData("taskId");
      let task = this.$store.getters.getTaskById(taskId);
      task.status = status;
      this.$store.dispatch("updateTask", task);
    },
  },
};
</script>

<style scoped>
.card:hover {
  background-color: lightskyblue;
}

.card{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 5px;
}

.drag-el {
  background: lightcyan;
}

.drop-zone {
  background: lightblue;
  padding: 15px;
  border-radius: 15px;
}
</style>