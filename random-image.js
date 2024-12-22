const [images,loadImage] = require('./load-images')
const imagesArray = loadImage(images);
const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex]
}

module.exports = randomImage;