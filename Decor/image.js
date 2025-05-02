export function getImg(name) {
    return fetch("https://space-flight-k6no.onrender.com/rocket")
    .then(res => res.json())
    .then(Img => {
        let img = null;
        Img.result.find(rocket => {
            if( name === rocket.name){
                img = rocket.image;
            }
        })
        return img;
    })
}

