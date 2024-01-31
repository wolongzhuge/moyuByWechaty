const fs = require("fs");

class FileUtils {
    constructor() {
    }

    static recordResult(userName, isWin) {
        const fs = require('fs');
        // 读取已有的用户记录
        let userRecords = {};
        try {
            userRecords = JSON.parse(fs.readFileSync('userRecords.json'));
        } catch (err) {
            // 如果文件不存在或读取失败，则认为是新用户
        }

        // 更新用户记录
        if (!userRecords[userName]) {
            userRecords[userName] = {totalGames: 0, totalWins: 0};
        }
        userRecords[userName].totalGames++;
        if (isWin) {
            userRecords[userName].totalWins++;
        }

        // 计算胜率
        const winRate = userRecords[userName].totalWins / userRecords[userName].totalGames;

        // 保存用户记录
        fs.writeFileSync('userRecords.json', JSON.stringify(userRecords));

        // 返回结果
        return {
            totalGames: userRecords[userName].totalGames,
            totalWins: userRecords[userName].totalWins,
            winRate,
        };
    }


    static getWinRate() {
        const fs = require('fs');
        // 读取已有的用户记录
        let userRecords = {};
        try {
            userRecords = JSON.parse(fs.readFileSync('userRecords.json'));
        } catch (err) {
            // 如果文件不存在或读取失败，则认为是新用户
        }

        // 将用户记录转换为数组
        const recordsArray = Object.entries(userRecords);

        // 根据胜率进行排序
        recordsArray.sort((a, b) => {
            const winRateA = a[1].totalWins / a[1].totalGames;
            const winRateB = b[1].totalWins / b[1].totalGames;
            return winRateB - winRateA;
        });

        // 构造胜率信息字符串
        let result = '';
        for (const [userName, record] of recordsArray) {
            const winRate = record.totalWins / record.totalGames;
            result += `${userName}  总场数：${record.totalGames}  胜率：${winRate.toFixed(2)}\n`;
        }

        return result;
    }
}

module.exports = FileUtils;
