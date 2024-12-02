const { ActivityType } = require('discord.js');

let spugneSegate = 0;

module.exports = {
    name: 'ready',
    async execute() {
        /*function updatespugneSegate() {
            client.user.setActivity({ name: spugneSegate == 1 ? `${spugneSegate} Spugna Segata!` : `${spugneSegate} Spugne Segate!`, type: ActivityType.Custom });
            spugneSegate++;
            setTimeout(updatespugneSegate, 60000);
        };
        updatespugneSegate();*/
        console.log(`${client.user.tag} ha iniziato a segare spugne!`);
        client.user.setPresence({ activities: [{ name: 'Sega Spugne, i migliori.', type: ActivityType.Custom }], status: 'dnd' });
    },
};
