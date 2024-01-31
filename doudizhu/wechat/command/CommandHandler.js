class CommandHandler {
  constructor() {
    this.commands = {};
  }

  registerCommand(commandName, command) {
    this.commands[commandName] = command;
  }

  async handle(commandName, args) {
    if (this.commands[commandName]) {
      await this.commands[commandName].execute(args);
    } else {
      if (commandName){
        console.log(`Command ${commandName} not recognized`);
      }
    }
  }
}

module.exports = CommandHandler;
