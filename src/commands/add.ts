import readline from 'node:readline';
import { Args } from '@oclif/core';
import { TodoRepository } from '../service/todoRepository.js';
import { Todo } from '../models/todo.js';
import { Status, Priority } from '../types/enums.js';
import { TodoListFormatter } from '../ui/TodoListFormatter.js';

export default class Add extends TodoListFormatter {
  static args = {
    id: Args.string({ description: 'props para registrar una tarea', required: false }),
  };
  static description = 'Add a Todo task';
  private repo = new TodoRepository();
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  private ask(question: string): Promise<string> {
    return new Promise((resolve) => this.rl.question(question, resolve));
  }

  private async addTitle(): Promise<string> {
    return this.ask("Ingresa el título: ");
  }

  private async addDescription(): Promise<string> {
    return this.ask("Ingresa la descripción: ");
  }

  private async addStatus(): Promise<Status> {
    this.log("\n=== Selecciona estado ===");
    this.log("1. ABIERTA");
    this.log("2. EN_PROGRESO");
    this.log("3. COMPLETADA");
    const value = await this.ask("Ingresa un número: ");
    const num = Number(value);
    return num === 2
      ? Status.IN_PROGRESS
      : num === 3
      ? Status.COMPLETED
      : Status.OPEN;
  }

  private async addPriority(): Promise<Priority> {
    this.log("\n=== Selecciona prioridad ===");
    this.log("1. BAJA");
    this.log("2. MEDIA");
    this.log("3. ALTA");
    const value = await this.ask("Ingresa prioridad: ");
    const num = Number(value);
    return num === 2
      ? Priority.MEDIUM
      : num === 3
      ? Priority.HIGH
      : Priority.LOW;
  }

  private async addDate(): Promise<Date> {
    const value = await this.ask("Ingresa fecha (YYYY-MM-DD): ");
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  async run(): Promise<void> {
    const title = await this.addTitle();
    const description = await this.addDescription();
    const status = await this.addStatus();
    const priority = await this.addPriority();
    const dueDate = await this.addDate();

    const newTask = new Todo(title, description, status, priority, dueDate);
    const addTodo = await this.repo.add(newTask);
    
    this.log('✅ Tarea agregada: ' + title);
    this.todoListFormat(addTodo);
    
    this.rl.close();
  }
}

