const CommandHandler = require("../CommandHandler");
const CreateGameCommand = require("./CreateGameCommand");
const JoinGameCommand = require("./JoinGameCommand");
const BeLandlordsCommand = require("./BeLandlordsCommand");
const DontBeLandlordsCommand = require("./DontBeLandlordsCommand");
const PlayCardCommand = require("./PlayCardCommand");
const ListCommand = require("./ListCommand");
const GameOverCommand = require("./GameOverCommand");
const SurrenderCommand = require("./SurrenderCommand");
const DouCommandHandler = new CommandHandler();

function registerDouCommand() {
  DouCommandHandler.registerCommand("斗地主", new CreateGameCommand());
  DouCommandHandler.registerCommand("上桌", new JoinGameCommand());
  DouCommandHandler.registerCommand("抢地主", new BeLandlordsCommand());
  DouCommandHandler.registerCommand("不抢", new DontBeLandlordsCommand());
  DouCommandHandler.registerCommand("出牌", new PlayCardCommand());
  DouCommandHandler.registerCommand("胜率榜", new ListCommand());
  DouCommandHandler.registerCommand("结束", new GameOverCommand());
  DouCommandHandler.registerCommand("投降", new SurrenderCommand());
}

// 根据message的内容，得到对应的命令
function getDouCommand(mentionSelf, contentTrim) {
  let commandName = "";
  if (mentionSelf) {
    if (contentTrim.includes("胜率榜")) {
      commandName = "胜率榜";
    } else if (contentTrim.includes("结束")) {
      commandName = "结束";
    } else if (contentTrim === "投降") {
      commandName = "投降";
    } else if (
      contentTrim === "抢" ||
      contentTrim === "抢地主" ||
      contentTrim === "y"
    ) {
      commandName = "抢地主";
    } else if (
      contentTrim === "不" ||
      contentTrim === "不抢" ||
      contentTrim === "n"
    ) {
      commandName = "不抢";
    } else if (contentTrim.includes("胜率榜")) {
      commandName = "胜率榜";
    } else if (contentTrim.includes("斗地主")) {
      commandName = "斗地主";
    } else if (contentTrim.includes("上桌")) {
      commandName = "上桌";
    } else {
      commandName = "出牌";
    }
  } else {
    if (contentTrim.substring(0, 2) === "cc") {
      commandName = "出牌";
    }
  }
  return commandName;
}

module.exports = {
  registerDouCommand,
  DouCommandHandler,
  getDouCommand,
};
