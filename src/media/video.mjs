
async function vidread(path) {
    const videoBlob = await this.load(path)

    let data,
        time,
        frame,
        delta,
        frameChannels,
        frameCount,
        frameDimensions,
        videoWidth,
        videoHeight

    const vidtag = document.createElement('video')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    vidtag.src = URL.createObjectURL(videoBlob)

    vidtag.onloadedmetadata = function (event) {
        time = 0
        frame = 0
        delta = 1 / MyIOConfiguration.FRAME_RATE
        videoWidth = event.target.videoWidth
        videoHeight = event.target.videoHeight
        frameChannels = MyIOConfiguration.NUM_CHANNELS
        frameDimensions = [0, 0, videoWidth, videoHeight]

        data = new Uint8ClampedArray(frameCount * frameChannels * videoWidth * videoHeight)

        vidtag.currentTime = time
    }

    vidtag.onseeked = function (event) {
        context.drawImage(vidtag, ...frameDimensions)
        const frameData = context.getImageData(...frameDimensions).data

        data.set(frameData, frame * frameData.length)

        frame += 1
        time += delta

        if (time > vidtag.duration) {
            vidtag.remove()
            canvas.remove()

            const video = bb
                .array({ with: data })
                .reshape({ shape: [videoWidth, videoHeight, frameChannels, frameCount] })

            this.push(video)

            return video
        }

        vidtag.currentTime = time

    }

}
