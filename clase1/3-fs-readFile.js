const { error } = require("node:console")
const fs = require("node:fs")


//SINCRONO
// console.log("Leyendo el primer archivo")
// const text = fs.readFileSync("./archivo.txt", "utf-8")
// console.log("Su contenido",text)


// console.log("Leyendo el segundo archivo")
// const secondText = fs.readFileSync("./archivo2.txt", "utf-8")
// console.log("Su contenido",secondText)


//ASINCRONO
console.log("Leyendo el primer archivo")
 fs.readFile("./archivo.txt", "utf-8", (error, text)=>{
    
    console.log("Su contenido del primero: ",text)
})

console.log("Hacer cosas mientras lee el archivo")


console.log("Leyendo el segundo archivo")
 fs.readFile("./archivo2.txt", "utf-8", (error, secondText)=>{
    
    console.log("Su contenido del segundo",secondText)
})