const userSchema = require('../../schemas/userSchema');

let cooldowns = [];

module.exports = {
    name: 'messageCreate',
    async execute(msg) {
        if (msg.author.bot) return;
        if (msg.content.includes('<@949809500548911176>')) {
            var cooldown = cooldowns.find(x => x.id == msg.author.id);
            if (cooldown && cooldown.minutes > 0) return;
            cooldowns.push({ id: msg.author.id, minutes: 60 });
            try {
                let msg1 = await msg.reply(`Congratulazioni ${msg.author}, hai guadagnato una  🧽  per aver menzionato <@949809500548911176>!\nUsa il comando **/stats**, per visualizzare le tue statistiche e quelle egli altri utenti.\n-# - Questo messaggio si canellerà tra **10 secondi**.`);
                setTimeout(() => {
                    try {
                        msg1.delete();
                    } catch (e) {};
                }, 10000);
            } catch (e) {};
            var data = await userSchema.findOne({ userId: msg.author.id });
            if (!data) {
                await userSchema.create({
                    userId: msg.author.id,
                    spugneSegate: 1,
                });
            } else {
                await userSchema.updateOne({ userId: msg.author.id }, { spugneSegate: data.spugneSegate + 1 });
            };
        };
    },
};

setInterval(() => {
    cooldowns = cooldowns.map(c => {
        if (c.minutes > 0) {
            return { ...c, minutes: c.minutes - 1 };
        } else {
            return null;
        }
    }).filter(c => c != null);
}, 60000);