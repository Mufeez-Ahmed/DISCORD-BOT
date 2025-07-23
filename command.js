const { REST, Routes } = require('discord.js');
require('dotenv').config({ path: '.env.local' }); // Optional if using .env.local

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
  name: "clear",
  description: "Bulk delete messages.",
  options: [
    {
      name: "amount",
      description: "Number of messages to delete (max 100 at once)",
      type: 4, // INTEGER
      required: true
    }
  ]
},
];

const rest = new REST({ version: '10' }).setToken(process.env.token_id);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.client_id),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error reloading commands:', error);
  }
})();
