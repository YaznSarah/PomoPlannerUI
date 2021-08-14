import { createStore, createLogger } from 'vuex'
const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
    plugins: debug ? [createLogger()] : [],
    state() {
        return {
            tasks: [],
            loggedIn: false
        }
    },
    // only mutations can affect the state
    mutations: {
        addTask(state, task) {
            state.tasks.push(task)
        },
        removeTask(state, task) {
            state.tasks = state.tasks.filter((item) => {
                return task.id !== item.id
            })
        },
        updateTask(state, task) {
            for (let t in state.tasks) {
                if (state.tasks[t].id == task.id) {
                    state.tasks[t] = task
                }
            }
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        }
    },
    // getters allow you to create utility functions for access state, but are not required
    getters: {
        getTasksByStatus: (state) => (status) => {
            return state.tasks.filter((item) => {
                return item.status == status
            })
        },
        getTaskById: (state) => (id) => {
            return state.tasks.filter((item) => {
                return item.id == id
            })[0]
        }
    },
    // actions exist to allow you to trigger mutations asynchronously in one place
    actions: {
        async getTasks({ commit }) {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const tasks = await response.json();
            commit('setTasks', tasks)
        },
        async deleteTask({ commit }, task) {
            await fetch("http://localhost:3000/tasks/" + task.id, {
                method: "DELETE",
            });
            commit('removeTask', task)
        },
        async addTask({ commit }, taskTitle) {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: taskTitle,
                    status: "to-do",
                }),
            });
            const task = await response.json();
            commit('addTask', task)
        },
        async updateTask({ commit }, task) {
            await fetch("http://localhost:3000/tasks/" + task.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: task.title,
                    status: task.status,
                    description: task.description
                }),
            });
            commit('updateTask', task)
        }
    }
})

export default store;