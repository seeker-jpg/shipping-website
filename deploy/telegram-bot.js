#!/usr/bin/env node
/**
 * CORELY - Telegram Bot Helper
 * 
 * Ce script permet d'obtenir le Chat ID en tapant /id dans le groupe.
 * 
 * Usage:
 *   1. Ajoutez votre TELEGRAM_BOT_TOKEN dans .env.local
 *   2. Lancez: node deploy/telegram-bot.js
 *   3. Tapez /id dans votre groupe Telegram
 *   4. Le bot répondra avec le Chat ID
 *   5. Copiez le Chat ID dans votre .env.local
 *   6. Arrêtez le script (Ctrl+C)
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envPathAlt = path.join(__dirname, '..', '.env');
  
  let envFile = '';
  
  if (fs.existsSync(envPath)) {
    envFile = fs.readFileSync(envPath, 'utf8');
  } else if (fs.existsSync(envPathAlt)) {
    envFile = fs.readFileSync(envPathAlt, 'utf8');
  } else {
    console.error('❌ Fichier .env.local ou .env non trouvé');
    console.log('   Créez un fichier .env.local avec:');
    console.log('   TELEGRAM_BOT_TOKEN=votre_token_ici');
    process.exit(1);
  }
  
  const lines = envFile.split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  }
}

loadEnv();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN non configuré dans .env.local');
  process.exit(1);
}

let lastUpdateId = 0;

// Make HTTPS request
function makeRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    https.get(url.toString(), (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Send message
async function sendMessage(chatId, text, threadId = null) {
  const params = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown'
  };
  
  if (threadId) {
    params.message_thread_id = threadId;
  }
  
  return makeRequest('sendMessage', params);
}

// Process incoming updates
async function processUpdates() {
  try {
    const response = await makeRequest('getUpdates', {
      offset: lastUpdateId + 1,
      timeout: 30
    });
    
    if (!response.ok) {
      console.error('❌ Erreur API:', response.description);
      return;
    }
    
    for (const update of response.result) {
      lastUpdateId = update.update_id;
      
      const message = update.message;
      if (!message || !message.text) continue;
      
      const chatId = message.chat.id;
      const chatType = message.chat.type;
      const chatTitle = message.chat.title || 'Chat Privé';
      const threadId = message.message_thread_id;
      const text = message.text.trim();
      
      // Handle /id command
      if (text === '/id' || text.startsWith('/id@')) {
        console.log(`\n📨 Commande /id reçue de: ${chatTitle}`);
        
        let responseText = `🆔 *Informations du Chat*\n\n`;
        responseText += `📋 *Chat ID:* \`${chatId}\`\n`;
        responseText += `📝 *Type:* ${chatType}\n`;
        responseText += `💬 *Nom:* ${chatTitle}\n`;
        
        if (threadId) {
          responseText += `🧵 *Thread ID:* \`${threadId}\`\n`;
        }
        
        responseText += `\n✅ Copiez ce Chat ID dans votre fichier .env.local:\n`;
        responseText += `\`TELEGRAM_CHAT_ID=${chatId}\``;
        
        if (threadId) {
          responseText += `\n\`TELEGRAM_THREAD_ID=${threadId}\``;
        }
        
        await sendMessage(chatId, responseText, threadId);
        
        console.log(`✅ Chat ID envoyé: ${chatId}`);
        if (threadId) {
          console.log(`✅ Thread ID: ${threadId}`);
        }
      }
      
      // Handle /start command
      if (text === '/start' || text.startsWith('/start@')) {
        await sendMessage(chatId, 
          `👋 *Bienvenue sur CORELY Bot!*\n\n` +
          `Commandes disponibles:\n` +
          `• /id - Obtenir le Chat ID de ce groupe\n` +
          `• /help - Afficher l'aide\n\n` +
          `Ce bot vous enverra des notifications pour:\n` +
          `🔍 Les visiteurs du site\n` +
          `🛒 Les nouvelles commandes`,
          threadId
        );
      }
      
      // Handle /help command
      if (text === '/help' || text.startsWith('/help@')) {
        await sendMessage(chatId,
          `📚 *Aide - CORELY Bot*\n\n` +
          `*Commandes:*\n` +
          `• /id - Affiche le Chat ID et Thread ID\n` +
          `• /start - Message de bienvenue\n` +
          `• /help - Cette aide\n\n` +
          `*Configuration:*\n` +
          `1. Tapez /id dans ce groupe\n` +
          `2. Copiez le Chat ID\n` +
          `3. Ajoutez-le à .env.local:\n` +
          `   \`TELEGRAM_CHAT_ID=xxx\`\n` +
          `4. Redémarrez votre serveur Next.js`,
          threadId
        );
      }
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Main loop
async function main() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║         CORELY - Telegram Bot Helper         ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('');
  console.log('🤖 Bot démarré et en écoute...');
  console.log('');
  console.log('📝 Instructions:');
  console.log('   1. Ajoutez le bot à votre groupe Telegram');
  console.log('   2. Tapez /id dans le groupe');
  console.log('   3. Copiez le Chat ID dans .env.local');
  console.log('   4. Appuyez sur Ctrl+C pour arrêter');
  console.log('');
  console.log('⏳ En attente de la commande /id...');
  console.log('');
  
  // Polling loop
  while (true) {
    await processUpdates();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error);
