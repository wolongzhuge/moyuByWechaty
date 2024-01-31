// 胜率榜命令
const ICommand = require("./ICommand");
const fileUtil = require("../../../utils/fileUtils");

class ListCommand extends ICommand {
  constructor() {
    super();
  }

  async execute({message}) {
    const list = fileUtil.getWinRate();
    if (!list) {
      await message.say("暂无胜率榜");
      return;
    }else {
        await message.say(list);
    }
  }
}

module.exports = ListCommand;
