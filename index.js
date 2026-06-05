const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'kheerasmp.falix.me', // ⚠️ APNA FALIX IP DALO (Bina port ke)
        port: 25565,                  // ⚠️ APNA FALIX PORT DALO
        username: 'Bot_24x7_Player',  
        version: '26.1.2'             // ⚠️ APNA MINECRAFT VERSION DALO
    });

    bot.on('spawn', () => {
        console.log("Bot server me aa gaya hai!");
        bot.chat('/gamemode creative');

        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            bot.setControlState(randomAction, true);
            setTimeout(() => { bot.setControlState(randomAction, false); }, 2000);
        }, 4000);
    });

    bot.on('end', () => {
        console.log("Bot disconnect ho gaya. 10 second me firse connect ho rha hai...");
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log("Error aaya: ", err));
}

createBot();
