//Clase 1: Arrancando express
/*
var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.send("Hola desde express");
});

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000")
})*/

//Clase 2: Configuración de express + pug + pasar parametros + pasar arreglos

var express = require("express");
var app = express();

const pug = require('pug');

app.use(express.static(__dirname+"/public"));

var perros_array = [
    {raza: "Pug", texto: "perro de compañia", imagen:"canelita.jpg"},
    {raza: "Doberman", texto: "perro de caza", imagen:"canelita.jpg"},
    {raza: "Peludito", texto: "bola de pelos", imagen:"canelita.jpg"}
]

app.get("/", (req, res) => {
    //res.send("index.html");
    res.render("index.pug", {
        titulo: "Perros",
        texto: "Perros del mundo",
        imagen: "perros.jpg",
        perros: perros_array
    });
});

app.get("/perro/:raza", (req, res) => {
    var datosPerro = perros_array.filter((perro) => {
        if(req.params.raza == perro.raza){
            return perro;
        } 
    })[0];
    res.render("perro.pug", {
        raza: req.params.raza,
        data: datosPerro
    });
});

app.use((req, res) => {
    res.status(400);
    let err = req.originalUrl;
    res.render("404.pug", {texto:err});
})

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000")
})
