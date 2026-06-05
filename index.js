const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'kheerasmp.falix.gg', // Maine aapke tab se sahi host nikal liya hai!
        port: 40101,                // Maine aapke tab ke URL se sahi port nikal liya hai!
        username: 'Bot_24x7_Player'
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
