// 命令接口
class ICommand {
  constructor(at = true, scope = 1) {
    // 是否是艾特指令
    this.at = at;
    // 指令适用范围，0: 私聊，1: 群聊，2: 通用
    this.scope = scope;
  }

  execute() {
    throw new Error("This method should be overwritten!");
  }
}

module.exports = ICommand;
