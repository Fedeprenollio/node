const fs = require("node:fs/promises");


//ASINCRONO

( 
   async ()=>{
   console.log("Leyendo el primer archivo")
   const text = await   fs.readFile("./archivo.txt", "utf-8")
       
   console.log("Su contenido del primero: ",text)
   console.log("Hacer cosas mientras lee el archivo")
   
   
   console.log("Leyendo el segundo archivo")
   const secondText = await fs.readFile("./archivo2.txt", "utf-8")
       
  console.log("Su contenido del segundo",secondText)
})()


