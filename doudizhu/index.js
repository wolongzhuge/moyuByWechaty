const { WechatyBuilder } = require("wechaty");
const qrTerm = require("qrcode-terminal");
const {
  registerDouCommand,
  DouCommandHandler,
  getDouCommand,
} = require("./wechat/command/dou/index");

const gameMap = new Map();

const bot = WechatyBuilder.build({
  name: "doudizhu",
});

// 注册斗地主命令
registerDouCommand();

bot
  .on("scan", (qrcode, status) => {
    qrTerm.generate(qrcode);
  })
  .on("login", (user) => {
    console.log(`User ${user} logged in`);
  })
  .on("message", async (message) => {
    const room = message.room();
    const content = await message.mentionText();
    const contact = message.talker();
    const contentTrim = content.trim();
    if (room) {
      // 群聊模式
      const mentionSelf = await message.mentionSelf();
      const commandName = getDouCommand(mentionSelf, contentTrim);
      await DouCommandHandler.handle(
        commandName,
          {
            gameMap,
            room,
            contact,
            message,
            bot
          }
      );
    } else {
      // 私聊模式
      console.log(contentTrim);
    }
  });

// 启动机器人
bot
  .start()
  .then(() => console.log("Bot started."))
  .catch((error) => console.error("Bot failed to start:", error));
