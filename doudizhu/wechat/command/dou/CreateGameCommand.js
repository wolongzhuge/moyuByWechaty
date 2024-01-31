// 创建游戏命令
const ICommand = require("./ICommand");
const { DouDiZhuGame } = require("../../../dou/game");
const { findContactByName } = require("./utils");

class CreateGameCommand extends ICommand {
  constructor() {
    super();
  }

  async execute({gameMap, room, contact, message, bot}) {
    // 获取游戏
    let game = gameMap.get(room.id);
    // 如果游戏已经存在
    if (game) {
      await message.say("游戏已经存在，请加入游戏");
      return;
    }
    // 非好友
    if (!(await findContactByName(bot, contact.name()))) {
      await message.say("您不是我的好友，无法进行游戏");
      return;
    }
    // 创建游戏
    gameMap.set(room.id, new DouDiZhuGame());
    game = gameMap.get(room.id);
    game.addPlayer(contact.name());
    await message.say(
      "欢迎来到陈帅泳斗地主，游戏规则同普通斗地主\n" +
        "请注意，所有命令都需要@机器人才能生效\n" +
        "除了第一位加入斗地主的玩家使用<斗地主>命令进入，其余玩家均为<上桌>" +
        "当上桌人数到达三人后便开始游戏，请注意查看私聊，里面有你的牌\n" +
        "进入抢地主阶段后，抢地主请输入<抢/y>，不抢地主请输入<不/n> \n" +
        "B表示大王，S表示小王，X表示10\n" +
        "出牌有以下几种格式：\n" +
        "1、<出+对应的牌>，如<出334455>\n" +
        "2、<对应的牌>，如<334455>\n"
    );
  }
}

module.exports = CreateGameCommand;
