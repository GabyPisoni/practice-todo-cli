import {Command} from '@oclif/core'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseCommand } from './baseCommand.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class List extends BaseCommand {
  static args = {}
  static description = 'Get List Todo'
  static examples = [
    `<%= config.bin %> <%= command.id %>`,
  ]
  static flags = {}
  dataPath = path.join(__dirname, '../data/todo.json');
  
  async run(): Promise<void> {
    await this.parse(List);
    await this.listTodo();
  }
  
  async listTodo(): Promise<void> {
    const data = JSON.parse(await fs.readFile(this.dataPath, 'utf-8'));
    this.displayTodos(data);
  }
}
