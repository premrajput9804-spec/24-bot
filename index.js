const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
        host: 'Mera_Falix_Server_IP', // Apna Falix IP dalo (bina port ke)
        port: 25565,                  // Apna Falix numeric port dalo
        username: 'Bot_24x7_Player',
        version: '26.1.2'             // 🔥 Ab ye ekdum sahi format me hai!
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
