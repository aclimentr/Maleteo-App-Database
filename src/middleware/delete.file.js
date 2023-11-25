const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
        const imageArray = url.split('/')
        const nombreImg = imageArray[imageArray.length - 1].split('.')
        const nameFolder = imageArray[imageArray.length - 2]
        const imageToDelete = `${nameFolder}/${nombreImg[0]}`
        cloudinary.uploader.destroy(imageToDelete, ()=> console.log('imagen eliminada'));
}

module.exports = {deleteFile}