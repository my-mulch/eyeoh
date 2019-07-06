import bb from 'big-box'

export default class Image {
    constructor(blob) {
        const imgtag = document.createElement('img')
        const canvas = document.createElement('canvas')

        imgtag.src = URL.createObjectURL(blob)

        createImageBitmap(imgtag).then(function (bitmap) {
            const context = canvas.getContext('2d')
            const region = [0, 0, bitmap.width, bitmap.height]

            canvas.width = bitmap.width
            canvas.height = bitmap.height

            context.drawImage(bitmap, ...region)
            const data = context.getImageData(...region).data

            canvas.remove()
            imgtag.remove()

            return bb
                .array({ with: data })
                .reshape({ shape: [bitmap.height, bitmap.width, 4] })
        })
    }
}
