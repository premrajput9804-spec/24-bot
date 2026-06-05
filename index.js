const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'kheerasmp.falix.me', 
        port: 40101,                
        username: 'Bot_24x7_Player',
        hideErrors: false
    });

    bot.on('spawn', () => {
        console.log("🔥 BOOM! Bot successfully SMP me enter kar gaya hai!");
        bot.chat('/gamemode creative');

        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            bot.setControlState(randomAction, true);
            setTimeout(() => { bot.setControlState(randomAction, false); }, 2000);
        }, 4000);
    });

    bot.on('end', (reason) => {
        console.log(`Bot disconnect ho gaya (${reason}). 10 second me firse try kar raha hu...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log("⚠️ Connection me dikkat aa rahi hai: ", err.message);
    });
}

createBot();
