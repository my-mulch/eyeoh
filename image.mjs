
export default class Image {
    constructor(blob) {
        createImageBitmap(blob).then(function (bitmap) {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const region = [0, 0, bitmap.width, bitmap.height]

            canvas.width = bitmap.width
            canvas.height = bitmap.height

            context.drawImage(bitmap, ...region)
            this.data = context.getImageData(...region).data

            canvas.remove()
        }.bind(this))
    }
}
