import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

  async remove(id: string): Promise<any[]> {
    const idNumber = Number.parseInt(id, 10);
    const data = await this.getAll();
    const deleteTask = data.filter((_: any, idx: number) => idx !== idNumber);
    await fs.writeFile(this.dataPath, JSON.stringify(deleteTask, null, 2));
    return deleteTask;
  }
}
