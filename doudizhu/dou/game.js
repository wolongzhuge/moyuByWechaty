const {
  createDeck,
  dealCards,
  shuffle,
  checkCardType,
  compareCards,
} = require("./card");
const { Player } = require("./player");

// 游戏类
class DouDiZhuGame {
  constructor() {
    this.reset();
  }

  // 初始化游戏
  initGame() {
    let { bottomCards, playerCards } = dealCards(shuffle(this.deck));
    this.bottomCards = bottomCards;
    // 发牌给玩家
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].draw(playerCards[i]);
    }

    // 进入抢地主阶段
    this.isRobLandlord = true;
    this.status = 1;
  }

    // 抢地主
    robLandlord(player, isRob) {
      if (!isRob){
        this.notRobLandlordCount++;
        // 玩家索引加一
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 3;
      }else {
        this.landlord = player;
        player.setLandlord();
        this.notRobLandlordCount = 0;
        this.isRobLandlord = false;
        this.startPlay()
      }
    }

  // 玩家摸底牌
    drawBottomCards(player) {
        player.draw(this.bottomCards);
    }

  // 添加玩家
  addPlayer(id) {
    // 超过三人，不能再加入
    if (this.players.length >= 3) {
        return;
    }
    const player = new Player(id);
    this.players.push(player);
  }

  startPlay() {
    this.status = 2;
    this.started = true;
  }

  // 获取当前玩家
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  // 判断当前游戏是否已经开始
  isStarted() {
    return this.started;
  }

  // 设置游戏结束
  setGameOver(player) {
    this.gameOver = true;
    const isLandlordWin = player.isLandlord;
    this.winner = isLandlordWin ? "地主" : "农民";
  }

  // 出牌
  play(cards) {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (cards.length !== 0) {
      const cardType = checkCardType(cards);
      if (!cardType) {
        return false;
      }
      if (this.lastPlay) {
        const result = compareCards(cards, this.lastPlay);
        if (result <= 0 || result === null) {
          return false;
        }
      }
      // 确定玩家真的有这些牌，有这么多张
      const tempCards = [...currentPlayer.cards];
        for (let i = 0; i < cards.length; i++) {
            const index = tempCards.indexOf(cards[i]);
            if (index === -1) {
                return false;
            }
            tempCards.splice(index, 1);
        }

      currentPlayer.play(cards);
      this.lastPlay = cards;
      // 检查游戏是否结束
      this.checkGameOver(currentPlayer);

      // 未结束，继续下一玩家出牌
      if (!this.gameOver) {
        this.nextPlayer();
      }
      this.passCount = 0;
    } else {
      if(!this.lastPlay){
        return false;
      }
      this.pass();
    }
    return true;
  }

  // 当前玩家不出
  pass() {
    this.passCount++;
    // 如果连续2个玩家都不出牌，那么上一次出牌的玩家可以继续出牌
    if (this.passCount === 2) {
      this.passCount = 0;
      this.lastPlay = null;
    }
    this.nextPlayer();
  }

  nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 3;
  }

  // 检查游戏是否结束
  checkGameOver(player) {
    console.log("length:" + player.cards.length)
    if (player.cards.length === 0) {
      this.setGameOver(player);
    }
  }

  // 重置游戏
  reset() {
    this.status = 0;
    this.deck = createDeck(); // 创建一副牌
    this.players = []; // 创建玩家
    this.currentPlayerIndex = 0; // 当前出牌的玩家索引
    this.lastPlay = null; // 上一次出的牌
    this.gameOver = false; // 游戏结束标志
    this.winner = null; // 赢家
    // 游戏是否已经开始
    this.started = false;
    this.bottomCards = null; // 底牌
    // 保存地主玩家
    this.landlord = null;
    // 当前跳过的次数
    this.passCount = 0;
    // 是否位于抢地主阶段
    this.isRobLandlord = false;
    // 当前不抢地主的次数
    this.notRobLandlordCount = 0;
  }
}

module.exports = { DouDiZhuGame };
