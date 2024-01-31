// 玩家相关测试文件
const { Player } = require("../../dou/player");

describe("Player", () => {
  test("draw", () => {
    const player = new Player(1);
    player.draw([1, 2, 3]);
    expect(player.cards).toEqual([1, 2, 3]);
  });

  test("setLandlord", () => {
    const player = new Player(1);
    player.setLandlord();
    expect(player.isLandlord).toEqual(true);
  });

  test("play", () => {
    const player = new Player(1);
    player.draw([1, 2, 3]);
    player.play([1, 2]);
    expect(player.cards).toEqual([3]);
  });
});
