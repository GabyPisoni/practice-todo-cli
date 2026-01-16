import { Args } from '@oclif/core';
import { TodoRepository } from '../service/todoRepository.js';
import { Todo } from '../models/todo.js';
import { Status, Priority } from '../types/enums.js';
import { TodoListFormatter } from '../ui/TodoListFormatter.js';
import { Prompt } from '../ui/Prompt.js';

export default class Update extends TodoListFormatter {
  static args = {
    id: Args.string({ description: 'props para editar una tarea', required: false }),
  };
  static description = 'Update a Todo task';
  private repo = new TodoRepository();
  private prompt = new Prompt();

  private async updateTitle(): Promise<string> {
    return this.prompt.ask("Edita el título: ");
  }

  private async updateDescription(): Promise<string> {
    return this.prompt.ask("Edita la descripción: ");
  }

  private async updateStatus(): Promise<Status> {
    this.log("\n=== Selecciona estado ===");
    this.log("1. ABIERTA");
    this.log("2. EN_PROGRESO");
    this.log("3. COMPLETADA");
    const value = await this.prompt.ask("Edita un número: ");
    const num = Number(value);
    return num === 2
      ? Status.IN_PROGRESS
      : num === 3
        ? Status.COMPLETED
        : Status.OPEN;
  }

  private async updatePriority(): Promise<Priority> {
    this.log("\n=== Selecciona prioridad ===");
    this.log("1. BAJA");
    this.log("2. MEDIA");
    this.log("3. ALTA");
    const value = await this.prompt.ask("Edita prioridad: ");
    const num = Number(value);
    return num === 2
      ? Priority.MEDIUM
      : num === 3
        ? Priority.HIGH
        : Priority.LOW;
  }

  private async updateDate(): Promise<Date> {
    const value = await this.prompt.ask("Edita fecha (YYYY-MM-DD): ");
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  async run(): Promise<void> {
    const { args } = await this.parse(Update);

    if (!args.id) this.error('El id es requerido');


    const title = await this.updateTitle();
    const description = await this.updateDescription();
    const status = await this.updateStatus();
    const priority = await this.updatePriority();
    const dueDate = await this.updateDate();

    const newTask = new Todo(title, description, status, priority, dueDate);
    const updateTodo = await this.repo.update(args.id, newTask);

    this.log('✅ Tarea agregada: ' + title);
    this.todoListFormat(updateTodo);
    this.prompt.close();
  }
}

