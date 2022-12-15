const mimeDb = require('mime-db')
const fs = require('fs')

/**
 * Salvando arquivos recebidos
 * @param {*} media 
 */


const saveMedia = (media) => {
    const extensionProcess = mimeDb[media.mimetype];
    const ext = extensionProcess.extensions[0];
    const fullPath = `${__dirname}\\media\\${Date.now()}.${ext}`;
    fs.writeFile(fullPath, media.data, { encoding: 'base64' }, function (err) {
        console.log('** Arquivo de mídia salvo **');
    });
}

module.exports = {saveMedia}