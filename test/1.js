fetch("https://space-flight-k6no.onrender.com/rocket")
.then(res => res.json())
.then(data => {
    console.log(data)
})