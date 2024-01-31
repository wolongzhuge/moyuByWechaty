// 牌相关测试文件
const {
  createDeck,
  shuffle,
  dealCards,
  sortCards,
  checkCardType,
  cardTypes,
  compareCards,
} = require("../../dou/card");

describe("牌基础测试", () => {
  test("创建一副牌", () => {
    const deck = createDeck();
    expect(deck.length).toBe(54);
  });

  test("洗牌", () => {
    const deck = createDeck();
    const shuffledDeck = shuffle(deck);
    expect(shuffledDeck.length).toBe(54);
    expect(shuffledDeck).not.toEqual(deck);
  });

  test("发牌", () => {
    const deck = createDeck();
    const { bottomCards, playerCards } = dealCards(shuffle(deck));
    expect(bottomCards.length).toBe(3);
    expect(playerCards.length).toBe(3);
    expect(playerCards[0].length).toBe(17);
    expect(playerCards[1].length).toBe(17);
    expect(playerCards[2].length).toBe(17);
  });

  test("牌排序", () => {
    const cards = [
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "X",
      "J",
      "Q",
      "K",
      "S",
      "B",
      "2",
      "A",
    ];
    const sCards = sortCards(cards);
    expect(sCards).toEqual([
      "B",
      "S",
      "2",
      "A",
      "K",
      "Q",
      "J",
      "X",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
    ]);
  });

  test("判断是否为四带二", () => {
    const cards = ["3", "3", "3", "3", "4", "4"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.FOUR_WITH_TWO);
  });

  test("判断是否为顺子", () => {
    const cards = ["3", "4", "5", "6", "7"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.STRAIGHT);
  });

  test("判断是否为飞机带一对", () => {
    const cards = ["3", "3", "3", "4", "4", "4", "5", "5", "6", "6"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.AIRPLANE_WITH_PAIRS);
  });

  test("判断是否为飞机带单张", () => {
    const cards = ["3", "3", "3", "4", "4", "4", "5", "6"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.AIRPLANE_WITH_WINGS);
  });

  test("判断是否为飞机", () => {
    const cards = ["3", "3", "3", "4", "4", "4"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.AIRPLANE);
  });

  test("判断是否为连对", () => {
    const cards = ["3", "3", "4", "4", "5", "5"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.CONSECUTIVE_PAIRS);
  });

  test("判断是否为单张", () => {
    const cards = ["3"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.SINGLE);
  });

  test("判断是否为对子", () => {
    const cards = ["3", "3"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.PAIR);
  });

  test("判断是否为三张", () => {
    const cards = ["3", "3", "3"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.TRIPLE);
  });

  test("判断是否为三带一", () => {
    const cards = ["3", "3", "3", "4"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.TRIPLE_WITH_SINGLE);
  });

  test("判断是否为三带二", () => {
    const cards = ["3", "3", "3", "4", "4"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.TRIPLE_WITH_PAIR);
  });

  test("判断是否为炸弹", () => {
    const cards = ["3", "3", "3", "3"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.BOMB);
  });

  test("判断是否为王炸", () => {
    const cards = ["S", "B"];
    const type = checkCardType(cards);
    expect(type).toBe(cardTypes.ROCKET);
  });

  // 各种牌型比较

  test("单张比较", () => {
    const cards1 = ["3"];
    const cards2 = ["4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("对子比较", () => {
    const cards1 = ["3", "3"];
    const cards2 = ["4", "4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("三张比较", () => {
    const cards1 = ["3", "3", "3"];
    const cards2 = ["4", "4", "4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("三带一比较", () => {
    const cards1 = ["3", "3", "3", "4"];
    const cards2 = ["4", "4", "4", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("三带二比较", () => {
    const cards1 = ["3", "3", "3", "4", "4"];
    const cards2 = ["4", "4", "4", "5", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("顺子比较", () => {
    const cards1 = ["3", "4", "5", "6", "7"];
    const cards2 = ["4", "5", "6", "7", "8"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("连对比较", () => {
    const cards1 = ["3", "3", "4", "4", "5", "5"];
    const cards2 = ["4", "4", "5", "5", "6", "6"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("飞机比较", () => {
    const cards1 = ["3", "3", "3", "4", "4", "4"];
    const cards2 = ["4", "4", "4", "5", "5", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("飞机带翅膀比较", () => {
    const cards1 = ["3", "3", "3", "4", "4", "4", "5", "5", "6", "6"];
    const cards2 = ["4", "4", "4", "5", "5", "5", "6", "6", "7", "7"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("四带二比较", () => {
    const cards1 = ["3", "3", "3", "3", "4", "4"];
    const cards2 = ["4", "4", "4", "4", "5", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  test("炸弹比较", () => {
    const cards1 = ["3", "3", "3", "3"];
    const cards2 = ["4", "4", "4", "4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 特殊牌型之间比较

  // 王炸大于一切
  test("王炸大于一切", () => {
    const cards1 = ["S", "B"];
    const cards2 = ["3", "3", "3", "3"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(1);
  });

  // 炸弹大于其他
  test("炸弹大于其他", () => {
    const cards1 = ["3", "3", "3", "3"];
    const cards2 = ["4", "4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(1);
  });
});

describe("compareCards function tests", () => {
  // 测试单牌比较
  test("单牌比较大小", () => {
    const cards1 = ["3"];
    const cards2 = ["4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试对子比较
  test("对子比较大小", () => {
    const cards1 = ["4", "4"];
    const cards2 = ["5", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试三张牌比较
  test("三张牌比较大小", () => {
    const cards1 = ["4", "4", "4"];
    const cards2 = ["5", "5", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试炸弹比较
  test("炸弹比较大小", () => {
    const cards1 = ["4", "4", "4", "4"];
    const cards2 = ["5", "5", "5", "5"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试王炸比较
  test("王炸比较大小", () => {
    const cards1 = ["S", "B"];
    const cards2 = ["6", "6", "6", "6"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(1);
  });

  // 测试顺子比较
  test("顺子比较大小", () => {
    const cards1 = ["3", "4", "5", "6", "7"];
    const cards2 = ["4", "5", "6", "7", "8"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试连对比较
  test("连对比较大小", () => {
    const cards1 = ["3", "3", "4", "4", "5", "5"];
    const cards2 = ["4", "4", "5", "5", "6", "6"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试飞机带单张比较
  test("飞机带单张比较大小", () => {
    const cards1 = ["3", "3", "3", "4", "4", "4", "5", "6"];
    const cards2 = ["4", "4", "4", "5", "5", "5", "6", "7"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试四带二比较
  test("四带二比较大小", () => {
    const cards1 = ["3", "3", "3", "3", "5", "6"];
    const cards2 = ["4", "4", "4", "4", "6", "7"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试四带两对比较
  test("四带两对比较大小", () => {
    const cards1 = ["3", "3", "3", "3", "4", "4", "5", "5"];
    const cards2 = ["4", "4", "4", "4", "5", "5", "6", "6"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(-1);
  });

  // 测试不同牌型无法比较
  test("不同牌型比较为null", () => {
    const cards1 = ["3", "3"];
    const cards2 = ["4", "4", "4"];
    const result = compareCards(cards1, cards2);
    expect(result).toBe(null);
  });
});

describe("checkCardType function tests", () => {
  test("单牌", () => {
    expect(checkCardType(["3"])).toBe(cardTypes.SINGLE);
  });

  test("对子", () => {
    expect(checkCardType(["3", "3"])).toBe(cardTypes.PAIR);
  });

  test("三张", () => {
    expect(checkCardType(["3", "3", "3"])).toBe(cardTypes.TRIPLE);
  });

  test("炸弹", () => {
    expect(checkCardType(["3", "3", "3", "3"])).toBe(cardTypes.BOMB);
  });

  test("王炸", () => {
    expect(checkCardType(["S", "B"])).toBe(cardTypes.ROCKET);
  });

  test("三带一", () => {
    expect(checkCardType(["3", "3", "3", "4"])).toBe(
      cardTypes.TRIPLE_WITH_SINGLE
    );
  });

  test("三带一对", () => {
    expect(checkCardType(["3", "3", "3", "4", "4"])).toBe(
      cardTypes.TRIPLE_WITH_PAIR
    );
  });

  test("四带二", () => {
    expect(checkCardType(["3", "3", "3", "3", "4", "5"])).toBe(
      cardTypes.FOUR_WITH_TWO
    );
  });

  test("四带两对", () => {
    expect(checkCardType(["3", "3", "3", "3", "4", "4", "5", "5"])).toBe(
      cardTypes.FOUR_WITH_TWO_PAIRS
    );
  });

  test("无效牌型", () => {
    expect(checkCardType(["3", "4", "5", "7", "8"])).toBe(null);
  });

  // 顺子
  test("短顺子", () => {
    expect(checkCardType(["3", "4", "5", "6", "7"])).toBe(cardTypes.STRAIGHT);
  });

  test("长顺子", () => {
    expect(
      checkCardType([
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "X",
        "J",
        "Q",
        "K",
        "A",
      ])
    ).toBe(cardTypes.STRAIGHT);
  });

  // 连对
  test("短连对", () => {
    expect(checkCardType(["3", "3", "4", "4", "5", "5"])).toBe(
      cardTypes.CONSECUTIVE_PAIRS
    );
  });

  test("长连对", () => {
    expect(
      checkCardType(["3", "3", "4", "4", "5", "5", "6", "6", "7", "7"])
    ).toBe(cardTypes.CONSECUTIVE_PAIRS);
  });

  // 飞机
  test("短飞机", () => {
    expect(checkCardType(["3", "3", "3", "4", "4", "4"])).toBe(
      cardTypes.AIRPLANE
    );
  });

  test("长飞机", () => {
    expect(checkCardType(["3", "3", "3", "4", "4", "4", "5", "5", "5"])).toBe(
      cardTypes.AIRPLANE
    );
  });

  // 飞机带小翼
  test("短飞机带小翼", () => {
    expect(checkCardType(["3", "3", "3", "4", "4", "4", "5", "6"])).toBe(
      cardTypes.AIRPLANE_WITH_WINGS
    );
  });

  test("长飞机带小翼", () => {
    expect(
      checkCardType([
        "3",
        "3",
        "3",
        "4",
        "4",
        "4",
        "5",
        "5",
        "5",
        "6",
        "7",
        "8",
      ])
    ).toBe(cardTypes.AIRPLANE_WITH_WINGS);
  });

  // 飞机带大翼
  test("短飞机带大翼", () => {
    expect(
      checkCardType(["3", "3", "3", "4", "4", "4", "5", "5", "6", "6"])
    ).toBe(cardTypes.AIRPLANE_WITH_PAIRS);
  });

  test("长飞机带大翼", () => {
    expect(
      checkCardType([
        "3",
        "3",
        "3",
        "4",
        "4",
        "4",
        "5",
        "5",
        "5",
        "6",
        "6",
        "7",
        "7",
        "8",
        "8",
      ])
    ).toBe(cardTypes.AIRPLANE_WITH_PAIRS);
  });

  // 假飞机
  test("假飞机", () => {
    expect(checkCardType(["3", "3", "3", "5", "5", "5", "6", "7"])).toBe(null);
  });
});
