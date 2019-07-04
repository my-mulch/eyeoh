import Image from './image'

export default class Myio {

    static imread(path) {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', path, true)
        xhr.responseType = 'blob'

        xhr.onload = function () {
            const imgtag = document.createElement('img')
            imgtag.onload = function () { URL.revokeObjectURL(imgtag.src) }
            imgtag.src = URL.createObjectURL(this.response)
            
            console.log(new Image(imgtag))
        }

        xhr.send()

    }

}
