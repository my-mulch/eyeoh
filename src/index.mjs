import MyIOSocket from './sources/socket'
import MyIODragDrop from './sources/dragdrop'

class MyIO extends Array {
    constructor() {
        super()

        this.socket = new MyIOSocket()
        this.dragdrop = new MyIODragDrop()
    }

    async load(path) {
        const response = await fetch(path)

        return response.blob()
    }

    async imread(path) {
        const imageBlob = await this.load(path)
        const bitmap = await createImageBitmap(imageBlob)

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const region = [0, 0, bitmap.width, bitmap.height]

        canvas.width = bitmap.width
        canvas.height = bitmap.height

        context.drawImage(bitmap, ...region)

        const data = context.getImageData(...region).data
        const image = bb
            .array({ with: data })
            .reshape({ shape: [bitmap.width, bitmap.height, 4] })

        this.push(image)

        canvas.remove()

        return image
    }

}

export default new MyIO()
