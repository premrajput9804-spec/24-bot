const mineflayer = require('mineflayer');
const express = require('express');

// 🌐 Render ka Port Scan Bypass karne ke liye Web Server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot ekdum mast chal raha hai!');
});

app.listen(PORT, () => {
    console.log(`Web server active hai port ${PORT} par. Render ab khush hai!`);
});

// -----------------------------------------
// 🎮 MINECRAFT BOT LOGIC CHALU
// -----------------------------------------
let bot;
let playTimer;
let leaveTimer;

function createBot() {
    console.log("Bot connect karne ki koshish kar raha hai...");
    
    bot = mineflayer.createBot({
        host: 'kheerasmp.falix.me', 
        port: 25565,                
        username: 'DEVELOPER'
    });

    bot.on('spawn', () => {
        console.log("🔥 Bot SMP me enter kar gaya hai! Anti-Cheat bypass movement active.");
        bot.chat('make mee oppppppppp ( ｡ •̀ ᴖ •́ ｡)💢');

        const moveInterval = setInterval(() => {
            if (!bot) return;

            const allActions = ['forward', 'back', 'left', 'right', 'jump', 'sprint'];
            allActions.forEach(action => bot.setControlState(action, false));

            const movements = ['forward', 'back', 'left', 'right'];
            const randomMove = movements[Math.floor(Math.random() * movements.length)];
            
            if (Math.random() > 0.4) {
                bot.setControlState(randomMove, true);
                if (Math.random() > 0.6) {
                    bot.setControlState('jump', true);
                }
            }

            const randomYaw = (Math.random() * Math.PI * 2) - Math.PI;
            const randomPitch = (Math.random() * Math.PI * 0.2) - (Math.PI * 0.1); 
            bot.look(randomYaw, randomPitch, false); 

            setTimeout(() => {
                if (bot) {
                    bot.setControlState(randomMove, false);
                    bot.setControlState('jump', false);
                }
            }, 2000);

        }, 3500); 

        clearTimeout(playTimer);
        clearTimeout(leaveTimer);

        playTimer = setTimeout(() => {
            if (!bot) return;
            console.log("⏳ 2 ghante poore ho gaye! Safely disconnecting for a 2-minute break...");
            clearInterval(moveInterval);
            
            if (bot) {
                bot.quit();
                bot = null;
            }

            leaveTimer = setTimeout(() => {
                console.log("🔄 Break khatam! Rejoining now...");
                createBot();
            }, 120000); 

        }, 7200000); 
    });

    bot.on('end', (reason) => {
        console.log(`Bot connection ended (${reason}).`);
        setTimeout(() => {
            if (!bot) createBot();
        }, 10000);
    });

    bot.on('error', (err) => {
        console.log("⚠️ Connection dikkat: ", err.message);
    });
}

createBot();
