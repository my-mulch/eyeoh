import Image from './image'

export default class Myio {

    static imread(path) {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', path, true)
        xhr.responseType = 'blob'

        xhr.onload = function () {
            const imgtag = document.createElement('img')
            imgtag.onload = function () { imread.data = new Image(imgtag) }
            imgtag.src = URL.createObjectURL(this.response)
        }

        xhr.send()

    }

}
