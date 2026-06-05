const mineflayer = require('mineflayer');

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
        bot.chat('/gamemode creative');

        // 🏃‍♂️ NATURAL MOVEMENT LOOP (Har 3.5 Second me action badlega - Safe for Anti-Cheat)
        const moveInterval = setInterval(() => {
            if (!bot) return;

            // Saare controls reset karo
            const allActions = ['forward', 'back', 'left', 'right', 'jump', 'sprint'];
            allActions.forEach(action => bot.setControlState(action, false));

            // Random direction select karo
            const movements = ['forward', 'back', 'left', 'right'];
            const randomMove = movements[Math.floor(Math.random() * movements.length)];
            
            // 60% chance hai ki bot sach me chalega (baki 40% wo bas ek jagah khada hoke gardan ghumayega - ekdum real human look)
            if (Math.random() > 0.4) {
                bot.setControlState(randomMove, true);

                // 40% chance chalte-chalte halki si jump marne ki
                if (Math.random() > 0.6) {
                    bot.setControlState('jump', true);
                }
            }

            // 👀 LOOK LOGIC: Gardan ko dheere se hilaao (Bina lag ke)
            const randomYaw = (Math.random() * Math.PI * 2) - Math.PI;
            const randomPitch = (Math.random() * Math.PI * 0.2) - (Math.PI * 0.1); // Limit pitch taaki sir jhatke na mare
            bot.look(randomYaw, randomPitch, false); // False matlab smoother transition

            // 2 second baad movement roko (1.5 second ka rest period taaki anti-cheat packet trigger na ho)
            setTimeout(() => {
                if (bot) {
                    bot.setControlState(randomMove, false);
                    bot.setControlState('jump', false);
                }
            }, 2000);

        }, 3500); // Delay badha kar 3.5 second kar diya hai taaki socket close na ho!

        // Standard 2-hour break logic
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
        console.log(`Bot connection ended (${reason}). 10 second me firse try kar raha hu...`);
        // Socket close hone par ye code 10 second me bot ko automatic rejoin karwayega!
        setTimeout(() => {
            if (!bot) createBot();
        }, 10000);
    });

    bot.on('error', (err) => {
        console.log("⚠️ Connection dikkat: ", err.message);
    });
}

createBot();
