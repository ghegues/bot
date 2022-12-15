const qrcode = require('qrcode-terminal');

const { Client, LocalAuth, MessageMedia  } = require('whatsapp-web.js');
const { saveMedia } = require('./controllers/save')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    }
    
});

client.on('qr', qr => {
    console.log(qr);
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
    else if(message.body.startsWith("!st")) {
        const chat = await message.getChat();
        if(message.hasMedia) {
            const media = await message.downloadMedia();
            const mediaToSend = new MessageMedia(media.mimetype,(media.data).toString('base64'))
            chat.sendMessage(
                mediaToSend,
                    {sendMediaAsSticker: true}
                )

            saveMedia(media);
        }
    }
});
 
 

client.initialize();
