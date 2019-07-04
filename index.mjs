
export default class Myio {
    static imread(path) {
        return fetch('http://localhost:8000/sofunny.jpg')
            .then(success => success.text())
    }
}
