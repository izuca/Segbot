const fs = require('node:fs');
const path = require('node:path');
const images = [
    'https://c.tenor.com/690jBcTy_1MAAAAM/adm-kilbin.gif',
    'https://media.tenor.com/images/083fa722f64ce784fa084673512f4d05/tenor.gif',
    'https://media.tenor.com/DuThn51FjPcAAAAC/nerd-emoji-nerd.gif',
    'https://media.tenor.com/images/850f9afcd4220bff6fd68cfe9e19e642/tenor.gif',
    'https://c.tenor.com/mHoMM0sgfysAAAAC/void.gif',
    'https://c.tenor.com/ohhXLh9oys4AAAAd/forever-jojo.gif',
    'https://c.tenor.com/j2yy3RnZ0csAAAAd/mimir-the-piterroles.gif',
    'https://media.tenor.com/32LEtADcrNoAAAAd/monkey.gif'
];

const loadImages = (images) => {
    const foldersPath = path.join(__dirname, 'images');
    const imageFiles = fs.readdirSync(foldersPath).filter(file => !file.endsWith('.txt'));
    for (const image of imageFiles) {
        const imagePath = path.join(foldersPath, image);
        images.push(imagePath)    
    }
    console.log(images)
    return images
}

module.exports = [images,loadImages];