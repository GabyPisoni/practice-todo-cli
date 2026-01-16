import readline from 'node:readline'

export class Prompt {
     private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
    ask(question: string): Promise<string> {
    return new Promise((resolve) => this.rl.question(question, resolve));
  }
  close(): void {
    this.rl.close();
  }
}