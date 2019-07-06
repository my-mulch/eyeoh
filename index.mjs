import Image from './image'

export default class Myio {
    
    static imread(path) {
        return fetch(path)
            .then(function (response) { return response.blob() })
            .then(function (blob) { return new Image(blob) })
    }

}
