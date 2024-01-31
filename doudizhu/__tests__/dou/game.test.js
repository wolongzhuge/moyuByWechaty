const { DouDiZhuGame } = require("../../dou/game");

describe("DouDiZhuGame", () => {
  test("initGame", () => {
    const game = new DouDiZhuGame();
    game.addPlayer(1);
    game.addPlayer(2);
    game.addPlayer(3);
    game.initGame();
    // 先判断地主
    const landlord = game.landlord;
    if (landlord.isLandlord) {
      expect(landlord.cards.length).toEqual(20);
    }
    // 再判断其他玩家
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i] !== landlord) {
        expect(game.players[i].cards.length).toEqual(17);
      }
    }
  });

  test("startPlay", () => {
    const game = new DouDiZhuGame();
    game.addPlayer(1);
    game.addPlayer(2);
    game.addPlayer(3);
    game.initGame();
    game.startPlay();
    expect(game.isStarted()).toEqual(true);
  });

  test("play", () => {
    const game = new DouDiZhuGame();
    game.addPlayer(1);
    game.addPlayer(2);
    game.addPlayer(3);
    game.initGame();
    game.startPlay();
    const currentPlayer = game.getCurrentPlayer();
    const cards = currentPlayer.cards.slice(0, 1);
    game.play(cards);
    // 可能是16或19
    expect(currentPlayer.cards.length).toBeLessThanOrEqual(19);
    expect(game.lastPlay).toEqual(cards);
    expect(game.currentPlayerIndex).toEqual(1);
  });

  test("pass", () => {
    const game = new DouDiZhuGame();
    game.addPlayer(1);
    game.addPlayer(2);
    game.addPlayer(3);
    game.initGame();
    game.startPlay();
    const currentPlayer = game.getCurrentPlayer();
    const currentIndex = game.currentPlayerIndex;
    const cards = currentPlayer.cards.slice(0, 1);
    game.play(cards);
    game.pass();
    expect(game.currentPlayerIndex).toEqual((currentIndex + 2) % 3);
  });

  test("setGameOver", () => {
    const game = new DouDiZhuGame();
    game.addPlayer(1);
    game.addPlayer(2);
    game.addPlayer(3);
    game.initGame();
    game.startPlay();
    game.setGameOver(true);
    expect(game.gameOver).toEqual(true);
  });

  test("getCurrentPlayer", () => {
    const game = new DouDiZhuGame();
    game.addPlayer(1);
    game.addPlayer(2);
    game.addPlayer(3);
    game.initGame();
    game.startPlay();
    const currentPlayer = game.getCurrentPlayer();
    expect(currentPlayer.id).toEqual(game.landlord.id);
  });
});
