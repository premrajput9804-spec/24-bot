const mineflayer = require('mineflayer');

let bot;
let playTimer;
let leaveTimer;

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

        // Random movement chalu rakhne ke liye timer
        const moveInterval = setInterval(() => {
            if (!bot) return;
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            bot.setControlState(randomAction, true);
            setTimeout(() => { if(bot) bot.setControlState(randomAction, false); }, 2000);
        }, 4000);

        // Clear existing timers to avoid multi-triggers
        clearTimeout(playTimer);
        clearTimeout(leaveTimer);

        // ⏱️ LOGIC: 2 Ghante (7200000 ms) baad bot ko disconnect karna hai
        playTimer = setTimeout(() => {
            console.log("⏳ 2 ghante poore ho gaye! Safely disconnecting for a 2-minute break...");
            clearInterval(moveInterval);
            
            if (bot) {
                bot.quit(); // Server se exit
                bot = null;
            }

            // ⏱️ LOGIC: 2 Minute (120000 ms) ke break ke baad rejoin karna hai
            leaveTimer = setTimeout(() => {
                console.log("🔄 Break khatam! Rejoining the server now...");
                createBot();
            }, 120000); 

        }, 7200000); 
    });

    bot.on('end', (reason) => {
        console.log(`Bot connection ended (${reason}).`);
        // Agar bot kisi error ya server restart ki wajah se nikla hai (break ki wajah se nahi), toh 10 sec me reconnect karega
        if (bot) {
            console.log("Unexpected disconnect! 10 second me firse try kar raha hu...");
            setTimeout(createBot, 10000);
        }
    });

    bot.on('error', (err) => {
        console.log("⚠️ Connection me dikkat: ", err.message);
    });
}

// Start the bot loop
createBot();
