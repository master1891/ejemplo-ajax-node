const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("./public"))


app.listen(3000,() =>{
    console.log("Servidor iniciado");
});

//rutas
app.get('/',(req,res) =>{
    res.setHeader("Content-Type","text/html");
    res.sendFile('/public/index.html');
});

app.post("/new",(req, res)=>{

    

    const nombre = req.body.nombre;
    const rating = req.body.rating;

   
    let file = fs.readFileSync("./peliculas.json","utf-8");

    const json = JSON.parse(file);

    json.peliculas.push({'nombre':nombre,"rating":parseInt(rating)});

    fs.writeFileSync('./peliculas.json',JSON.stringify(json));

    res.setHeader("Content-Type","text/plain");

    res.send("Datos guardados con exito");


});

app.get("/get-peliculas",(req,res) =>{
    const fil = fs.readFileSync('./peliculas.json',"utf-8")
    res.setHeader('content-Type',"text/json");

    res.send(fil);

});



