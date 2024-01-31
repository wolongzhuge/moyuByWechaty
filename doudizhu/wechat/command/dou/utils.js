// 通过名字查找联系人
async function findContactByName(bot,name) {
    const contact = await bot.Contact.find({name});
    return contact;
}

// 判断是否是正在游戏中的玩家
function isPlayerInGame(game,contact) {
    const name = contact.name();
    const players = game.players;
    const idMap = players.map((player) => player.id);
    return game && idMap.includes(name);
}

// 出牌阶段解析牌
function getCards(content) {
    let uppercaseContent = content.toUpperCase();
    uppercaseContent = uppercaseContent.replace(/c/gi, '').replace(/\s+/g, '');
    uppercaseContent = uppercaseContent.replace(/10/g, "X");
    if (uppercaseContent.length === 0) {
        return ("陈帅").split("");
    }
    if (uppercaseContent.includes("出")) {
        return uppercaseContent.split("出")[1].split("");
    } else {
        return uppercaseContent.split("");
    }
}

// 公布每个人剩余牌数
function showCards(game) {
    const players = game.players;
    let result = "";
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (player === game.landlord) {
            result += player.id + "(地主)剩余牌数：" + player.cards.length + "\n";
        } else {
            result += player.id + "剩余牌数：" + player.cards.length + "\n";
        }
    }
    return result;
}

module.exports = {
    findContactByName,
    isPlayerInGame,
    getCards,
    showCards,
}
