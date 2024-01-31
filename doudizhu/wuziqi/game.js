// 创建一个二维数组表示棋盘
const chessboard = new Array(15).fill(0).map(() => new Array(15).fill('-'));

// 当前玩家，1代表先手玩家，2代表后手玩家
let currentPlayer = 1;

// 打印棋盘
function printChessboard() {
    console.clear();
    console.log('  0 1 2 3 4 5 6 7 8 9 10 11 12 13 14');
    for (let i = 0; i < chessboard.length; i++) {
        let rowStr = `${i} `;
        for (let j = 0; j < chessboard[i].length; j++) {
            if (chessboard[i][j] === '-') {
                rowStr += '─ ';
            } else if (chessboard[i][j] === 'X') {
                rowStr += '● ';
            } else if (chessboard[i][j] === 'O') {
                rowStr += '○ ';
            }
        }
        console.log(rowStr);
    }
}

// 下棋函数
function playChess(row, col) {
    if (row < 0 || row >= 15 || col < 0 || col >= 15) {
        console.log('输入的坐标超出范围，请重新输入。');
        return;
    }

    if (chessboard[row][col] !== '-') {
        console.log('该位置已经有棋子了，请重新输入。');
        return;
    }

    chessboard[row][col] = currentPlayer === 1 ? 'X' : 'O';
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // 检查是否有玩家胜出
    if (checkWinner(row, col)) {
        console.log(`玩家 ${currentPlayer === 1 ? 2 : 1} 获胜！`);
        return;
    }

    printChessboard();
}

// 检查是否有玩家获胜
function checkWinner(row, col) {
    const directions = [
        [1, 0], // 横向
        [0, 1], // 纵向
        [1, 1], // 右斜向下
        [1, -1] // 左斜向下
    ];

    for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i];

        let count = 1;
        let x = row - dx;
        let y = col - dy;
        while (x >= 0 && x < 15 && y >= 0 && y < 15 && chessboard[x][y] === chessboard[row][col]) {
            count++;
            x -= dx;
            y -= dy;
        }

        x = row + dx;
        y = col + dy;
        while (x >= 0 && x < 15 && y >= 0 && y < 15 && chessboard[x][y] === chessboard[row][col]) {
            count++;
            x += dx;
            y += dy;
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

// 开始游戏
printChessboard();
console.log('请输入下棋的坐标，格式为行,列（例如3,4）。');

// 监听控制台输入
process.stdin.on('data', input => {
    const [row, col] = input.toString().trim().split(',');

    playChess(parseInt(row), parseInt(col));
});