// 抢地主命令
const ICommand = require("./ICommand");
const { isPlayerInGame, findContactByName } = require("./utils");

class BeLandlordsCommand extends ICommand {
  constructor() {
    super();
  }

  async execute({gameMap, room, contact, message, bot}) {
    // 获取游戏
    const game = gameMap.get(room.id);
    // 如果游戏不存在
    if (!game) {
      await message.say("游戏不存在，请创建游戏");
      return;
    }

    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法进行游戏");
      return;
    }

    // 不在游戏中
    if (!isPlayerInGame(game,contact)) {
      await message.say("您不在游戏中，请先加入游戏");
      return;
    }

    // 游戏不处于抢地主阶段
    if (game.status !== 1) {
      await message.say("游戏不处于抢地主阶段");
      return;
    }
    const currentPlayer = game.getCurrentPlayer();

    // 未到当前玩家抢地主
    if (currentPlayer.id !== contact.name()) {
      await message.say("未到您进行抢地主");
      return;
    }

    // 抢地主
    game.robLandlord(currentPlayer, true);
    game.drawBottomCards(game.landlord);
    await contact.say("您是地主，您的牌是：" + game.landlord.cards.join(","));
    // 通知所有玩家游戏开始
    await message.say(
      "斗地主游戏正式开始，地主是：" +
        game.landlord.id +
        "\n" +
        "底牌是：" +
        game.bottomCards.join(",")
    );
  }
}

module.exports = BeLandlordsCommand;
