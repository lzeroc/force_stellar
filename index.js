var StellarSdk = require('stellar-sdk');
const schedule = require('node-schedule');
const server = new StellarSdk.Server('https://h.fchain.io');
StellarSdk.Networks.PUBLIC;


function getRndLetterNumber(randomFlag, min, max) {
    var str = "S";
    var arr = ['A', 'B', 'C', 'D'];

    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];

    var range = min,
        arr = ['2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
};

function run() {
    var rule = new schedule.RecurrenceRule();
    rule.second = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
    schedule.scheduleJob(rule, main);
}

async function main() {
    for (let i = 0; i < 1000; i++) {
        let secret = getRndLetterNumber(false, 54);
        try {
            let keypair = StellarSdk.Keypair.fromSecret(secret);
            let address = keypair.publicKey();
            let ret = await server.loadAccount(address);
            let amount;
            ret.balances.forEach(item => {
                if (item.asset_type === 'native') {
                    amount = item.balance;
                }
            });
            let pool = await require('./pool');
            let data = {
                address: address,
                secret: secret,
                amount: amount,
            }
            await pool.query('insert into account set ?', data);
        } catch (e) {
            continue;
        }
    }
}

run();
