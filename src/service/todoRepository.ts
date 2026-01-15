import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Todo } from '../models/todo.js';

export class TodoRepository {
  private readonly dataPath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.dataPath = path.join(__dirname, '../data/todo.json');
  }

  async getAll() {
    return JSON.parse(await fs.readFile(this.dataPath, 'utf8'));
  }

  private async writeAll(data: Todo[]): Promise<void> {
    await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
  }

  async remove(id: string): Promise<any[]> {
    const idNumber = Number.parseInt(id, 10);
    const data = await this.getAll();
    const deleteTask = data.filter((_: any, idx: number) => idx !== idNumber);
    await this.writeAll(deleteTask);
    return deleteTask;
  }

  async add(task: Todo): Promise<any[]> {
    const data = await this.getAll();
    data.push(task);
    await this.writeAll(data);
    return data;
  }

  async update(id: string, task: Todo): Promise<any[]> {
    const idx = Number.parseInt(id, 10);
    if (Number.isNaN(idx)) {
      throw new Error('El id debe ser numérico');
    }

    const data = await this.getAll();
    if (idx < 0 || idx >= data.length) {
      throw new Error(`No existe tarea con índice ${idx}`);
    }

    data[idx] = task;
    await this.writeAll(data);
    return data;
  }
}
