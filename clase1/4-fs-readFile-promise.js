const fs = require("node:fs/promises")


//ASINCRONO
console.log("Leyendo el primer archivo")
 fs.readFile("./archivo.txt", "utf-8")
    .then( text=>  console.log("Su contenido del primero: ",text))

console.log("Hacer cosas mientras lee el archivo")


console.log("Leyendo el segundo archivo")
 fs.readFile("./archivo2.txt", "utf-8")
    .then( secondText=>     console.log("Su contenido del segundo",secondText)
    )