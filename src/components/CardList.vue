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
        <p class="card-text mb-3">
          <label class="form-label">Points</label>
          <input type="number" v-model="task.points" min="1" max="13">
          <textarea class="form-control" rows="3" v-model="task.description"></textarea>
        </p>
        <a href="#" class="card-link" @click="updateTask(task)">Save</a>
        <a href="#" class="card-link" @click="deleteTask(task)">Delete</a>
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
        <button class="btn btn-warning" type="button" @click="createTask()" :disabled="newTaskTitle.trim().length == 0"> 
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
      await this.$store.dispatch("getTasks");
    },

    async createTask() {
      this.$store.dispatch("addTask", {title: this.newTaskTitle, boardId: this.$store.state.board.id});
    },
    startDrag(event, task) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("taskId", task.id);
    },

    onDrop(event, status) {
      const taskId = event.dataTransfer.getData("taskId");
      console.log(taskId);
      let task = this.$store.getters.getTaskById(taskId);
      task.status = status;
      this.$store.dispatch("updateTask", task);
    },
    updateTask(task) {
      console.log(task)
      this.$store.dispatch("updateTask", task);
    }
  },
};
</script>

<style scoped>
.card:hover {
  background-color: lightskyblue;
}

.card {
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