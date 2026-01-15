import {Args} from '@oclif/core'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseCommand } from './baseCommand.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Remove extends BaseCommand {
  static args = {
    id: Args.string({description: 'ID o índice de la tarea a eliminar', required: true}),
  }
  static description = 'Remove a Todo task'
  static examples = [
    `<%= config.bin %> <%= command.id %> 0`,
  ]
  static flags = {}
  dataPath = path.join(__dirname, '../data/todo.json');
  
  async run(): Promise<void> {
    const {args} = await this.parse(Remove);
    await this.removeTodo(args.id);
  }
  
  async removeTodo(id: string): Promise<void> {
    const data = JSON.parse(await fs.readFile(this.dataPath, 'utf-8'));
    const idNumber = parseInt(id);
    
    const deleteTask = data.filter((_: any, index: any) => {
      return index !== idNumber;
    });
    
    await fs.writeFile(this.dataPath, JSON.stringify(deleteTask, null, 2));
    
    this.log("✅ Tarea eliminada.");
    this.displayTodos(deleteTask);
  }
}
