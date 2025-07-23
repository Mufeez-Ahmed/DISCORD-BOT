require('dotenv').config({path : '.env.local'});
const {Client,GatewayIntentBits} = require("discord.js")

const client = new Client({intents : [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});

client.on("messageCreate",(message)=>{
    if(message.author.bot) return;
    message.reply({content: "Hi from bot"})
})
client.on('interactionCreate',(interaction)=>{
  client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'clear') {
    const amount = interaction.options.getInteger('amount');
    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: "Please enter a number between 1 and 100.", ephemeral: true });
    }
    await interaction.deferReply({ ephemeral: true });
    try {
      const deleted = await interaction.channel.bulkDelete(amount, true);
      await interaction.editReply(`🧹 Deleted ${deleted.size} messages!`);
    } catch (err) {
      await interaction.editReply("❌ Failed to delete messages. I can only delete messages newer than 14 days and need Manage Messages permissions.");
    }
  }
  console.log(interaction);
    interaction.reply("pong!");
});
    
})

client.login(process.env.token_id);

