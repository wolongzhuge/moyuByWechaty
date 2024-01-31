// 不抢地主命令
const ICommand = require("./ICommand");
const { isPlayerInGame, findContactByName } = require("./utils");

class DontBeLandlordsCommand extends ICommand {
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

    // 不抢地主
    // 保存当前玩家
    const player = game.getCurrentPlayer();
    game.robLandlord(player, false);
    // 判断是否所有玩家都不抢地主
    if (game.notRobLandlordCount === 3) {
      await message.say("所有玩家都不抢地主，重新开始游戏");
      // 获取当前游戏玩家
      const players = game.players;
      // 玩家牌数清空
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        player.cards = [];
      }

      // 游戏重置
      game.reset();
      // 重新开始游戏
      game.players = players;
      game.initGame();
      // 随机选择一个玩家开始进行抢地主
      const index = Math.floor(Math.random() * 3);
      game.currentPlayerIndex = index;
      // 私聊告诉每个玩家自己的牌
      for (let i = 0; i < game.players.length; i++) {
        const player = game.players[i];
        const contact = await findContactByName(player.id);
        await contact.say("您的牌是：" + player.cards.join(","));
      }
      await message.say(
        "游戏开始，" +
          game.players[index].id +
          "开始抢地主" +
          "请选择是否抢地主\n" +
          "<抢>和<y>表示抢地主\n" +
          "<不抢>和<n>表示不抢地主"
      );
    } else {
      // 通知下一个玩家抢地主
      await message.say(
        player.id +
          "不抢地主，" +
          game.players[game.currentPlayerIndex].id +
          "进行抢地主。"
      );
    }
  }
}

module.exports = DontBeLandlordsCommand;
