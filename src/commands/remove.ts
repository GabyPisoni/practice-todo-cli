import { Args } from '@oclif/core';

import { TodoRepository } from '../service/todoRepository.js';
import { BaseCommand } from './baseCommand.js';

export default class Remove extends BaseCommand {
  static args = {
    id: Args.string({ description: 'ID o índice de la tarea a eliminar', required: true }),
  };
static description = 'Remove a Todo task';
  private repo = new TodoRepository();

  async run(): Promise<void> {
    const { args } = await this.parse(Remove);
    const deleteTask = await this.repo.remove(args.id);
    this.log('✅ Tarea eliminada.');
    this.displayTodos(deleteTask);
  }
}
