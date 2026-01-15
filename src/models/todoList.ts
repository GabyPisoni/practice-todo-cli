import { Todo } from "./todo.js";

export class TodoList {
  todos: Todo[] = [];
  addTask(todo: Todo) {
    this.todos.push(todo);
  }
  removeTask(id: number) {
    this.todos = this.todos.filter((_, index) => {
      return index !== id;
    });
  }
}