require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const prefix = process.env.prefix;
const fs = require('fs');

client.login(token);

fs.readdir('./events/', (err, files) => { 
	if (err) return console.error(err); 
	files.forEach(file => {
		const eventFunction = require(`./events/${file}`); 
		if (eventFunction.disabled) return; 

		const event = eventFunction.event || file.split('.')[0];  
		const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; 
		const once = eventFunction.once; 

		
		try {
			emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
		} catch (error) {
			console.error(error.stack);
		}
	});
});
  
client.on("message", message => {
    if (message.author.bot) return;
    if ( !message.content.startsWith(prefix) ) return;
  
    //Split prefix of command
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    //Get command arguments
    let args = message.content.split(" ").slice(1);
    //Run the command from his respective file
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
});

