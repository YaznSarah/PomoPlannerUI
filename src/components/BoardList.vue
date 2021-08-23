<template>
  <div class="container">
    <div v-if="boards.length === 0" class="alert alert-secondary" role="alert">
      You have no boards, create one below
    </div>
    <div class="card drag-el" v-for="board in boards" :key="board.id">
      <div class="card-body">
        <h5 class="card-title">{{ board.title }}</h5>
        <router-link :to="'/?id=' + board.id">Go to board</router-link>
        <a href="#" class="card-link float-end" @click="deleteBoard(board)"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
            /></svg>
            </a>
      </div>
    </div>
    <br />
    <div class="col-4 offset-4">
      <input
        type="text"
        class="form-control"
        placeholder="Enter Board title"
        aria-describedby="basic-addon2"
        v-model="newBoardTitle"
      />
      <br />
      <div class="input-group-append">
        <button
          class="btn btn-warning"
          type="button"
          @click="createBoard()"
          :disabled="newBoardTitle.trim().length == 0"
        >
          Create Board
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      newBoardTitle: "",
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  name: "BoardList",
  methods: {
    async createBoard() {
      this.$store.dispatch("addBoard", this.newBoardTitle);
    },

    async deleteBoard(board) {
      this.$store.dispatch("deleteBoard", board);
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 5px;
}

.card-link{
  color:inherit;
}
</style>