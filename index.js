const mineflayer = require('mineflayer');
const express = require('express');

// 🌐 Render Port Scan Bypass Web Server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot ekdum mast chal raha hai!');
});

app.listen(PORT, () => {
    console.log(`Web server active hai port ${PORT} par.`);
});

// -----------------------------------------
// 🎮 MINECRAFT BOT 24/7 SYSTEM
// -----------------------------------------
let bot;
let playTimer;
let leaveTimer;
let isFirstJoin = true; // 🔥 Isse track hoga ki bot pehli baar aaya hai ya nahi

function createBot() {
    console.log("Bot connect karne ki koshish kar raha hai...");
    
    bot = mineflayer.createBot({
        host: 'kheerasmp.falix.gg', 
        port: 40101,                
        username: 'Bot_24x7_Player'
    });

    bot.on('spawn', () => {
        console.log("🔥 Bot SMP me enter kar gaya hai!");
        bot.chat('/gamemode creative');

        // 👑 FIRST JOIN MESSAGE LOGIC
        if (isFirstJoin) {
            setTimeout(() => {
                if (bot) {
                    bot.chat('merko opp banao 😡'); 
                    console.log("📢 Pehli baar join karne par gusse wala message bhej diya!");
                    isFirstJoin = false; // Ab ye hamesha ke liye false ho gaya
                }
            }, 5000); // Server me aane ke 5 second baad message bheje kf taaki safe rahe
        }

        // 🏃‍♂️ Safe Movement Loop (Anti-Cheat Bypass)
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

        // Timers ko reset karein naye session ke liye
        clearTimeout(playTimer);
        clearTimeout(leaveTimer);

        // ⏱️ LOOP LOGIC: Exactly 120 Minutes (7200000 ms) tak khelega
        playTimer = setTimeout(() => {
            if (!bot) return;
            console.log("⏳ 120 minutes poore ho gaye! Safely disconnecting for a 1-minute break...");
            clearInterval(moveInterval);
            
            if (bot) {
                bot.quit(); // Server se bahar nikla
                bot = null;
            }

            // ⏱️ LOOP LOGIC: Exactly 1 Minute (60000 ms) ke break ke baad wapas join karega
            leaveTimer = setTimeout(() => {
                console.log("🔄 1 minute ka break khatam! Rejoining the server now...");
                createBot(); // Rejoin loop chalu
            }, 60000); 

        }, 7200000); 
    });

    bot.on('end', (reason) => {
        console.log(`Bot connection ended (${reason}).`);
        // Agar bot khud se break lekar nahi nikla (kisi crash ya restart ki wajah se nikla), toh 10 sec me reconnect karega
        setTimeout(() => {
            if (!bot) {
                console.log("Unexpected disconnect hua tha, wapas try kar raha hu...");
                createBot();
            }
        }, 10000);
    });

    bot.on('error', (err) => {
        console.log("⚠️ Connection dikkat: ", err.message);
    });
}

// Start the sequence
createBot();
