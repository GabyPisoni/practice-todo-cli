import {Command} from '@oclif/core'
import chalk from 'chalk'
import { Priority, Status } from '../types/enums.js'
import { Todo } from '../models/todo.js';

export abstract class BaseCommand extends Command {
  protected displayTodos(todos: Todo[]): void {
    this.log(chalk.blue.bold("\n=== Lista de Tareas ===\n"));
    for (const [index, todo] of todos.entries()) {
      this.log(
        chalk.cyan(`[${index}]`) + 
        chalk.green.bold(` ${todo.title}`) +
        chalk.yellow(` [${Status[todo.status]}]`) +
        chalk.magenta(` (Prioridad: ${Priority[todo.priority]})`)
      );
      this.log(chalk.gray(`    Vence: ${todo.due_date}`));
      this.log(chalk.gray(`    Descripción: ${todo.description}`));
      this.log(chalk.gray("    " + "-".repeat(50)));
    }
  }
}