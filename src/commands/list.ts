import {Command} from '@oclif/core'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {TodoRepository} from '../service/todoRepository.js'
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
  private repo = new TodoRepository()
  
  async run(): Promise<void> {
    await this.parse(List);
    const todoAll = await this.repo.getAll();
    this.displayTodos(todoAll);
  }
}
