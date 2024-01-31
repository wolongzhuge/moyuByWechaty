// 结束命令
const ICommand = require("./ICommand");
const { isPlayerInGame, findContactByName } = require("./utils");

class GameOverCommand extends ICommand {
  constructor() {
    super();
  }

  async execute({gameMap, room, contact, message, bot}) {
    // 获取游戏
    const game = gameMap.get(room.id);
    // 如果游戏不存在
    if (!game) {
      await message.say("游戏已经结束");
      return;
    }

    // 不在游戏中
    if (!isPlayerInGame(game,contact)) {
      await message.say("您不在游戏中，无法结束游戏");
      return;
    }

    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法进行游戏");
      return;
    }

    const content = await message.mentionText();
    const contentTrim = content.trim();

    if (game && game.status <= 1) {
      if (contentTrim.includes("结束")) {
        await message.say("本次斗地主结束");
        gameMap.delete(room.id);
        return;
      }
    } else {
      await message.say("游戏已经开始，无法结束");
      return;
    }
  }
}

module.exports = GameOverCommand;
