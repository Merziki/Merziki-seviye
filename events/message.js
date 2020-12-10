const ayarlar = require('../merziki.json');
const db = require('quick.db');
let talkedRecently = new Set();
module.exports = async message => {
if(message.author.bot) return

  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
  let bakım = await db.fetch('bakım');
  if(message.author.id !== ayarlar.sahip){
  if(bakım){
  return message.channel.send(`**<a:hype:742101366129819680> Sizlere En İyi Hizmeti Verebilmek İçin Bakımdayız.\n<:soru:742101322869899289> Bakım Sebebi: \`${bakım}\`\n<a:hype:742101366129819680> Lütfen Daha Sonra Tekrar Deneyin.**`)
     }
    }
      var args = message.content.split(' ').slice(1)

     var dill = 'tr'
	if(db.has(`dil_${message.guild.id}`) === true) {
		var dill = "en"
	}
	const dil = client[dill]
  
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, args, dil, dill);
  }
};