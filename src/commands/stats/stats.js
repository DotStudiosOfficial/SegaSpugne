const { EmbedBuilder } = require('discord.js');
const userSchema = require('../../schemas/userSchema');

module.exports = {
    name: 'stats',
    async execute(i) {
        const user = i.options.getUser('user') || i.user;
        var data = await userSchema.findOne({ userId: user.id });
        if (!data) return i.reply({ content: `${user} non possiede nessuna  🧽  :C`, ephemeral: true });
        let users = await userSchema.find();
        let rank = await users.sort((a, b) => b.spugneSegate - a.spugneSegate).findIndex(u => u.userId == data.userId) + 1;
        let embed = new EmbedBuilder()
        .setColor('Yellow')
        .setThumbnail(user.displayAvatarURL() || null)
        .setTitle(`Statistiche di ${user.globalName || user.username}`)
        .addFields(
            { name: '🧽 Spugne', value: `${data.spugneSegate}`, inline: true },
            { name: '💎 Rank', value: `#${rank}`, inline: true },
        );
        i.reply({ embeds: [embed], ephemeral: true });
    },
};