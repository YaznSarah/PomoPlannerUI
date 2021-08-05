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
    getters: {
        getTasksByStatus: (state) => (status) => {
            console.log(state.tasks)
            return state.tasks.filter((item) => {
                return item.status == status
            })
        }
    },
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
            console.log(task)
            commit('updateTask', task)
        },
    }
})

export default store;