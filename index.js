
const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Bot online come ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "/bug") {
    message.reply(
      "Salve, per segnalare un problema con il bot contatta **ria.assistenza@gmail.com**",
    );
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('/analizza')) return;

  const user = message.mentions.users.first() || message.author;
  const member = message.guild.members.cache.get(user.id);

  const accountCreated = `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`;
  const joinedServer = `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`;

  const embed = new EmbedBuilder()
    .setTitle(`🔍 Analisi sicurezza per ${user.username}`)
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: '🕓 Account creato', value: accountCreated, inline: true },
      { name: '📌 Entrato nel server', value: joinedServer, inline: true },
      { name: '🤖 Bot', value: user.bot ? '✅ Sì' : '❌ No', inline: true },
    )
    .setColor(user.bot ? 0xffcc00 : 0x00cc99)
    .setFooter({ text: 'Analisi basata su dati pubblici' });
    
  message.reply({ embeds: [embed] });
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot online!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server attivo su porta 3000');
});

client.login(process.env.TOKEN);

client.on('messageCreate', message => {
  if (message.author.bot) return;

  // Controlla se il messaggio inizia con !embed
  if (message.content.startsWith('/segnalazione')) {
    // Rimuove il comando e prende il resto del messaggio
    const descrizione = message.content.slice('/segnalazione'.length).trim();

    // Se non c'è descrizione, avvisa l'utente
    if (!descrizione) {
      return message.reply('❗ Scrivi una descrizione dopo il comando. Esempio: `!embed Ciao a tutti!`');
    }

    // Crea l'embed
    const embed = new EmbedBuilder()
      .setTitle('🔔Nuova segnalazione!⚠️')
      .setDescription(descrizione)
      .setColor(0xFF0000
);

    // Invia l'embed
    message.channel.send({ embeds: [embed] });
  }
});


const fs = require('fs');
require('dotenv').config();



client.once('ready', () => {
  console.log(`🤖 Bot online come ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('/verifica')) return;

  const user = message.mentions.users.first() || message.author;
  const userId = user.id;

  // Legge il database
  let stato = 'sicuro';
  try {
    const rawData = fs.readFileSync('./utenti_sospetti.json');
    const db = JSON.parse(rawData);
    stato = db[userId] || 'sicuro';
  } catch (err) {
    console.error('Errore lettura DB:', err);
    return message.reply('❌ Errore nel leggere il database.');
  }

  // Crea embed
  let colore, emoji, descrizione;
  if (stato === 'pericoloso') {
    colore = 0xff0000;
    emoji = '🚨';
    descrizione = '⚠️ Questo utente è **PERICOLOSO**.';
  } else {
    colore = 0x00cc66;
    emoji = '✅';
    descrizione = '✅ Questo utente è **SICURO**.';
  }

  const embed = new EmbedBuilder()
    .setTitle(`${emoji} Analisi utente`)
    .setDescription(descrizione)
    .addFields(
      { name: 'Utente', value: user.tag, inline: true },
      { name: 'ID', value: userId, inline: true },
      { name: 'Stato', value: stato.toUpperCase(), inline: false }
    )
    .setColor(colore)
    .setThumbnail(user.displayAvatarURL())
    .setFooter({ text: 'Analisi basata sul database locale' });

  message.channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);


app.get('/', (req, res) => res.send('Bot online!'));

app.listen(3000, () => {
  console.log('🌐 Server keep-alive attivo su porta 3000');
});

