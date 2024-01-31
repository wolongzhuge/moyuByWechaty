// 生成一副扑克牌
function createDeck() {
  const suits = ["", "", "", ""];
  const ranks = [
    "2",
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
  ];
  const jokers = ["S", "B"];
  const deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(rank);
    }
  }

  for (const joker of jokers) {
    deck.push(joker);
  }
  return deck;
}

// 洗牌
function shuffle(array) {
  const newArray = [...array];
  let m = newArray.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [newArray[m], newArray[i]] = [newArray[i], newArray[m]];
  }
  return newArray;
}

// 发牌
function dealCards(deck) {
  const d = shuffle(deck);
  const bottomCards = d.slice(0, 3);
  const playerCards = [d.slice(3, 20), d.slice(20, 37), d.slice(37, 54)];

  return { bottomCards, playerCards };
}

// 排序，是否倒序
function sortCards(cards, reverse = false) {
  // 默认['B', 'S', '2', 'A', 'K', 'Q', 'J', 'X', '9', '8', '7', '6', '5', '4', '3']
  if (reverse) {
    return cards.sort((a, b) => {
      return getCardValue(a) - getCardValue(b);
    });
  } else {
    return cards.sort((a, b) => {
      return getCardValue(b) - getCardValue(a);
    });
  }
}

// 按照牌的值对牌进行排序
function sortCardsByValue(cards) {
  return cards.sort((a, b) => getCardValue(a) - getCardValue(b));
}

// 将飞机带翅膀的牌型拆分成飞机部分和翅膀部分
function splitCardsToAirplaneAndWings(cards) {
  const sortedCards = sortCardsByValue(cards);
  const groups = [];
  let group = [sortedCards[0]];

  for (let i = 1; i < sortedCards.length; i++) {
    const currentCard = sortedCards[i];
    const prevCard = sortedCards[i - 1];
    if (getCardValue(currentCard) === getCardValue(prevCard)) {
      group.push(currentCard);
    } else {
      groups.push(group);
      group = [currentCard];
    }
  }

  groups.push(group);

  const result = [];
  let airplane = [];
  let wings = [];

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (group.length >= 3) {
      airplane = airplane.concat(group);
    } else {
      wings = wings.concat(group);
    }
  }

  if (airplane.length > 0) {
    result.push(airplane);
  }

  if (wings.length > 0) {
    result.push(wings);
  }

  return result;
}

function getCardValue(card) {
  const cardValues = {
    3: 0,
    4: 1,
    5: 2,
    6: 3,
    7: 4,
    8: 5,
    9: 6,
    X: 7,
    J: 8,
    Q: 9,
    K: 10,
    A: 11,
    2: 12,
    S: 13,
    B: 14,
  };

  return cardValues[card];
}

// 定义牌型枚举
const cardTypes = {
  ROCKET: "ROCKET", // 火箭
  BOMB: "BOMB", // 炸弹
  SINGLE: "SINGLE", // 单张
  PAIR: "PAIR", // 对子
  TRIPLE: "TRIPLE", // 三张
  TRIPLE_WITH_SINGLE: "TRIPLE_WITH_SINGLE", // 三带一
  TRIPLE_WITH_PAIR: "TRIPLE_WITH_PAIR", // 三带一对
  STRAIGHT: "STRAIGHT", // 顺子
  CONSECUTIVE_PAIRS: "CONSECUTIVE_PAIRS", // 连对
  AIRPLANE: "AIRPLANE", // 飞机
  AIRPLANE_WITH_WINGS: "AIRPLANE_WITH_WINGS", // 飞机带单张
  AIRPLANE_WITH_PAIRS: "AIRPLANE_WITH_PAIRS", // 飞机带对子
  FOUR_WITH_TWO: "FOUR_WITH_TWO", // 四带二
  FOUR_WITH_TWO_PAIRS: "FOUR_WITH_TWO_PAIRS", // 四带两对
};

// 判断是否为四带二
function isFourWithTwo(cards) {
  if (cards.length !== 6) {
    return false; // 四带二需要6张牌
  }

  const counts = {};
  for (let card of cards) {
    if (!counts[card]) {
      counts[card] = 0;
    }
    counts[card]++;
  }

  // 遍历计数对象，找出四张牌的数量和单牌的数量
  let hasFourOfAKind = false;
  let hasOtherCards = false;

  for (let count of Object.values(counts)) {
    if (count === 4) {
      hasFourOfAKind = true;
    } else {
      hasOtherCards = true;
    }
  }

  // 必须有四张相同的牌，且剩下两张可以是任意牌
  return hasFourOfAKind && hasOtherCards;
}

// 判断是否为四带二对
function isFourWithTwoPairs(cards) {
  if (cards.length !== 8) {
    return false; // 四带二对需要8张牌
  }

  // 统计每张牌出现的次数
  const cardCounts = cards.reduce((counts, card) => {
    counts[card] = (counts[card] || 0) + 1;
    return counts;
  }, {});

  // 检查是否有四张相同的牌
  const quads = Object.keys(cardCounts).filter(
    (card) => cardCounts[card] === 4
  );
  if (quads.length !== 1) {
    return false; // 必须只有一个四张相同的牌
  }

  // 检查剩余的牌是否都是成对出现
  const pairs = Object.keys(cardCounts).filter(
    (card) => cardCounts[card] === 2
  );
  if (pairs.length !== 2) {
    return false; // 剩下的牌必须是两个对子
  }

  return true; // 所有条件满足，是四带二对
}

// 判断是否为顺子
function isStraight(cards) {
  if (cards.length < 5) {
    return false;
  }

  const sortedCards = [...cards].sort(
    (a, b) => getCardValue(b) - getCardValue(a)
  );

  if (cards.includes("2") || cards.includes("S") || cards.includes("B")) {
    return false;
  }

  for (let i = 1; i < sortedCards.length; i++) {
    if (getCardValue(sortedCards[i - 1]) - getCardValue(sortedCards[i]) !== 1) {
      return false;
    }
  }

  return true;
}

// 判断是否为连对
function isConsecutivePairs(cards) {
  if (cards.length < 6 || cards.length % 2 !== 0) {
    return false;
  }

  // 获取牌值，并按牌值排序
  const values = cards.map((card) => getCardValue(card)).sort((a, b) => a - b);

  // 连对不能包含2、小王、大王
  if (values.includes(12) || values.includes(13) || values.includes(14)) {
    return false;
  }

  for (let i = 0; i < values.length - 2; i += 2) {
    // 检查每一对牌是否相等
    if (values[i] !== values[i + 1]) {
      return false;
    }
    // 检查每一对牌与下一对牌是否连续
    if (values[i] + 1 !== values[i + 2]) {
      return false;
    }
  }

  // 检查最后一对牌是否相等
  return values[values.length - 2] === values[values.length - 1];
}

// 判断是否为飞机
function isAirplane(cards) {
  if (isConsecutivePairs(cards)) {
    return false;
  }

  if (cards.length < 6 || cards.length % 3 !== 0) {
    return false;
  }

  const sortedCards = [...cards].sort(
    (a, b) => getCardValue(b) - getCardValue(a)
  );

  for (let i = 0; i < sortedCards.length - 3; i += 3) {
    if (
      getCardValue(sortedCards[i]) !== getCardValue(sortedCards[i + 1]) ||
      getCardValue(sortedCards[i + 1]) !== getCardValue(sortedCards[i + 2])
    ) {
      return false; // 检查每组的三张牌是否相等
    }
    if (
      i < sortedCards.length - 3 &&
      getCardValue(sortedCards[i]) - 1 !== getCardValue(sortedCards[i + 3])
    ) {
      return false; // 检查每组三张牌之间是否连续
    }
  }

  return true;
}

// 判断是否为飞机带单张
function isAirplaneWithWings(cards) {
  if (isConsecutivePairs(cards)) {
    return false;
  }

  if (cards.length < 8 || cards.length % 4 !== 0) {
    return false;
  }

  const [airplane, wings] = splitCardsToAirplaneAndWings(cards);

  if (airplane?.length !== wings?.length * 3) {
    return false;
  }

  if (!isAirplane(airplane)) {
    return false;
  }

  return true;
}

// 判断是否为飞机带对子
function isAirplaneWithPairs(cards) {
  // 连对返回false
  if (isConsecutivePairs(cards)) {
    return false;
  }

  if (cards.length < 10) {
    return false;
  }

  const [airplane, wings] = splitCardsToAirplaneAndWings(cards);

  // 飞机牌的数量是翅膀牌的 3/2
  if (airplane?.length !== (wings?.length * 3) / 2) {
    return false;
  }

  if (!isAirplane(airplane)) {
    return false;
  }

  return true;
}

// 判断是否为炸弹
function isBomb(cards) {
  if (cards.length !== 4) {
    return false;
  }
  const cardValueSet = new Set(cards);
  if (cardValueSet.size !== 1) {
    return false;
  }
  return true;
}

// 判断是否为火箭
function isRocket(cards) {
  // 火箭为大小王
  if (cards.length !== 2) {
    return false;
  }
  if (cards.includes("S") && cards.includes("B")) {
    return true;
  }
  return false;
}

// 判断是否为三张
function isTriple(cards) {
  if (cards.length !== 3) {
    return false;
  }
  const cardValueSet = new Set(cards);
  if (cardValueSet.size !== 1) {
    return false;
  }
  return true;
}

function countCardValues(cards) {
  const cardCounts = {};
  cards.forEach((card) => {
    const value = card;
    cardCounts[value] = (cardCounts[value] || 0) + 1;
  });
  return cardCounts;
}

// 判断是否为三带一
function isTripleWithSingle(cards) {
  if (cards.length !== 4) {
    return false;
  }
  const cardCounts = countCardValues(cards);
  return Object.values(cardCounts).includes(3);
}

// 判断是否为三带一对
function isTripleWithPair(cards) {
  if (cards.length !== 5) {
    return false;
  }
  const cardCounts = countCardValues(cards);
  const values = Object.values(cardCounts);
  return values.includes(3) && values.includes(2);
}

// 判断牌型
function checkCardType(cards) {
  if (isRocket(cards)) {
    return cardTypes.ROCKET;
  } else if (isBomb(cards)) {
    return cardTypes.BOMB;
  } else if (isTripleWithPair(cards)) {
    return cardTypes.TRIPLE_WITH_PAIR;
  } else if (isTripleWithSingle(cards)) {
    return cardTypes.TRIPLE_WITH_SINGLE;
  } else if (isTriple(cards)) {
    return cardTypes.TRIPLE;
  } else if (isAirplaneWithPairs(cards)) {
    return cardTypes.AIRPLANE_WITH_PAIRS;
  } else if (isAirplaneWithWings(cards)) {
    return cardTypes.AIRPLANE_WITH_WINGS;
  } else if (isAirplane(cards)) {
    return cardTypes.AIRPLANE;
  } else if (isConsecutivePairs(cards)) {
    return cardTypes.CONSECUTIVE_PAIRS;
  } else if (isStraight(cards)) {
    return cardTypes.STRAIGHT;
  } else if (isFourWithTwo(cards)) {
    return cardTypes.FOUR_WITH_TWO;
  } else if (cards.length === 1) {
    return cardTypes.SINGLE;
  } else if (cards.length === 2) {
    return cardTypes.PAIR;
  } else if (isFourWithTwoPairs(cards)) {
    return cardTypes.FOUR_WITH_TWO_PAIRS;
  }
  return null;
}

// 比较牌的大小，返回-1表示cards1小于cards2，返回1表示cards1大于cards2，返回null表示牌型不同无法比较，返回0表示牌型相同但是牌的大小相同
/**
 *
 * @param cards1
 * @param cards2
 * (a) 火箭最大，可以打任意其他的牌。
 *
 * (b) 炸弹比火箭小，比其他牌大。都是炸弹时按牌的分值比大小。
 *
 * (c)  除火箭和炸弹外，其他牌必须要牌型相同且总张数相同才能比大小。
 *
 * 相同牌型按牌的分值比大小。 依次是 大王 > 小王 >2>A>K>Q>J>X>9>8>7>6>5>4>3。
 *
 * 顺牌按最大的一张牌的分值来比大小。
 *
 * 飞机带翅膀和四带二按其中的三顺和四张部分来比，带的牌不影响大小。
 */
function compareCards(cards1, cards2) {
  const type1 = checkCardType(cards1);
  const type2 = checkCardType(cards2);

  if (type1 === cardTypes.ROCKET) {
    return 1;
  }

  if (type2 === cardTypes.ROCKET) {
    return -1;
  }

  if (type1 === cardTypes.BOMB && type2 !== cardTypes.BOMB) {
    return 1;
  }

  if (type2 === cardTypes.BOMB && type1 !== cardTypes.BOMB) {
    return -1;
  }

  if (type1 !== type2) {
    return null;
  }

  if (type1 === cardTypes.BOMB && type2 === cardTypes.BOMB) {
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.SINGLE) {
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.PAIR) {
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.TRIPLE) {
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.TRIPLE_WITH_SINGLE) {
    const triple1 = cards1.filter(
      (card) => cards1.indexOf(card) !== cards1.lastIndexOf(card)
    );
    const triple2 = cards2.filter(
      (card) => cards2.indexOf(card) !== cards2.lastIndexOf(card)
    );
    return getCardValue(triple1[0]) - getCardValue(triple2[0]);
  }

  if (type1 === cardTypes.TRIPLE_WITH_PAIR) {
    const triple1 = cards1.filter(
      (card) => cards1.indexOf(card) !== cards1.lastIndexOf(card)
    );
    const triple2 = cards2.filter(
      (card) => cards2.indexOf(card) !== cards2.lastIndexOf(card)
    );
    return getCardValue(triple1[0]) - getCardValue(triple2[0]);
  }

  if (type1 === cardTypes.STRAIGHT) {
    // 不同长度的顺子不能比较
    if (cards1.length !== cards2.length) {
      return null;
    }
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.CONSECUTIVE_PAIRS) {
    // 不同长度的连对不能比较
    if (cards1.length !== cards2.length) {
      return null;
    }
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.AIRPLANE) {
    // 不同长度的飞机不能比较
    if (cards1.length !== cards2.length) {
      return null;
    }
    return getCardValue(cards1[0]) - getCardValue(cards2[0]);
  }

  if (type1 === cardTypes.AIRPLANE_WITH_WINGS) {
    // 不同长度的飞机不能比较
    if (cards1.length !== cards2.length) {
      return null;
    }

    const [airplane1, wings1] = splitCardsToAirplaneAndWings(cards1);
    const [airplane2, wings2] = splitCardsToAirplaneAndWings(cards2);

    // 比较飞机部分，最大的一张牌的大小，第一张不一定最大
    const maxCard1 = sortCardsByValue(airplane1)[0];
    const maxCard2 = sortCardsByValue(airplane2)[0];
    return getCardValue(maxCard1) - getCardValue(maxCard2);
  }

  if (type1 === cardTypes.AIRPLANE_WITH_PAIRS) {
    // 不同长度的飞机不能比较
    if (cards1.length !== cards2.length) {
      return null;
    }

    const [airplane1, wings1] = splitCardsToAirplaneAndWings(cards1);
    const [airplane2, wings2] = splitCardsToAirplaneAndWings(cards2);

    // 比较飞机部分，最大的一张牌的大小，第一张不一定最大
    const maxCard1 = sortCardsByValue(airplane1)[0];
    const maxCard2 = sortCardsByValue(airplane2)[0];
    return getCardValue(maxCard1) - getCardValue(maxCard2);
  }

  if (type1 === cardTypes.FOUR_WITH_TWO) {
    const counts1 = countCardValues(cards1);
    const counts2 = countCardValues(cards2);

    const four1 = Object.keys(counts1).find((card) => counts1[card] === 4);
    const four2 = Object.keys(counts2).find((card) => counts2[card] === 4);

    return getCardValue(four1) - getCardValue(four2);
  }

  if (type1 === cardTypes.FOUR_WITH_TWO_PAIRS) {
    const counts1 = countCardValues(cards1);
    const counts2 = countCardValues(cards2);

    const four1 = Object.keys(counts1).find((card) => counts1[card] === 4);
    const four2 = Object.keys(counts2).find((card) => counts2[card] === 4);

    return getCardValue(four1) - getCardValue(four2);
  }

  return null;
}

// 检查牌是否合法
function isValidCards(cards) {
  const type = checkCardType(cards);
  return type !== null;
}

// 导出
module.exports = {
  createDeck,
  shuffle,
  dealCards,
  sortCards,
  checkCardType,
  cardTypes,
  compareCards,
  isValidCards,
};
