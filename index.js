const mineflayer = require('mineflayer');

let bot;
let playTimer;
let leaveTimer;

function createBot() {
    console.log("Bot connect karne ki koshish kar raha hai...");
    
    bot = mineflayer.createBot({
        host: 'kheerasmp.falix.me', 
        port: 25565,                
        username: 'smp op'
    });

    bot.on('spawn', () => {
        console.log("🔥 Bot SMP me enter kar gaya hai aur non-stop movement shuru!");
        bot.chat('/gamemode creative');

        // 🏃‍♂️ SUPER ACTIVE MOVEMENT LOOP (Har 1.5 Second me action badlega)
        const moveInterval = setInterval(() => {
            if (!bot) return;

            // Saare purane control states ko pehle clear karo
            const allActions = ['forward', 'back', 'left', 'right', 'jump', 'sprint'];
            allActions.forEach(action => bot.setControlState(action, false));

            // Randomly select movements
            const movements = ['forward', 'back', 'left', 'right'];
            const randomMove = movements[Math.floor(Math.random() * movements.length)];
            
            // 1. Chalna shuru karo
            bot.setControlState(randomMove, true);

            // 2. 70% chance hai ki wo tez daudega (Sprint)
            if (Math.random() > 0.3) {
                bot.setControlState('sprint', true);
            }

            // 3. 50% chance hai ki wo chalte-chalte koodega (Jump)
            if (Math.random() > 0.5) {
                bot.setControlState('jump', true);
            }

            // 4. 👀 CAMERA MOVE: Gardan ko random direction me ghumao (Yaw & Pitch)
            const randomYaw = (Math.random() * Math.PI * 2) - Math.PI; // -3.14 to 3.14
            const randomPitch = (Math.random() * Math.PI * 0.4) - (Math.PI * 0.2); // Thoda upar neeche dekhna
            bot.look(randomYaw, randomPitch, true);

            // 1.2 second baad movement rok do (taaki agle 0.3 sec me naya random action ready ho sake)
            setTimeout(() => {
                if (bot) {
                    bot.setControlState(randomMove, false);
                    bot.setControlState('jump', false);
                    bot.setControlState('sprint', false);
                }
            }, 1200);

        }, 1500); // ⏱️ Delay kam kar diya hai (1.5 Second)

        // Standard 2-hour break logic (Jo Falix ke logs me human break dikhane ke liye zaroori hai)
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
        if (bot) {
            console.log("Unexpected disconnect! 10 second me try kar raha hu...");
            setTimeout(createBot, 10000);
        }
    });

    bot.on('error', (err) => {
        console.log("⚠️ Connection dikkat: ", err.message);
    });
}

createBot();
