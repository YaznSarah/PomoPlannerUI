<template>
  <div class="container">
    <div v-if="boards.length === 0" class="alert alert-secondary" role="alert">
      You have no boards, create one below
    </div>
    <div class="card drag-el" v-for="board in boards" :key="board.id">
      <div class="card-body">
        <h5 class="card-title">{{ board.title }}</h5>
        <router-link :to="'/?id=' + board.id">Go to board</router-link>
        <a href="#" class="card-link" @click="deleteBoard(board)">Delete</a>
      </div>
    </div>
    <div class="col-4 offset-4">
      <input
        type="text"
        class="form-control"
        placeholder="Board title"
        aria-describedby="basic-addon2"
        v-model="newBoardTitle"
      />
      <div class="input-group-append">
        <button class="btn btn-warning" type="button" @click="createBoard()" :disabled="newBoardTitle.trim().length == 0">
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
  computed:{
    boards() {
      return this.$store.state.boards
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  name: "BoardList",
  methods: {
    async createBoard() {
      this.$store.dispatch("addBoard", this.newBoardTitle);
    },
    async deleteBoard(){
      this.$store.dispatch("deleteBoard", board)
    }
  },
};
</script>