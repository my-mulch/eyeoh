import bb from 'big-box'

export default class MyIO {
    async static imread(path) {
        const response = await fetch(path)
        const imageBlob = await response.blob()
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

        canvas.remove()

        return image
    }
}
