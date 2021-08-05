# task-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### TODO
- Add a new computed property for toDoTasks and completeTasks
- Instead of having the same foreach... in each column... make a component called CardList that takes in one PROPERTY (lookup vue property) called taskList and pass in the computed property
- Lookup drag and drop functionality 
- Add support for assignee and description
- Use a real database, can start with SQLite
- Swap out the tasks const with references to the database`