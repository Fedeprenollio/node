const {readFile} = require("node:fs/promises");


//Paralelo

Promise.all(
[  readFile("./archivo.txt", "utf-8"),
  readFile("./archivo2.txt", "utf-8")]
)
.then(
  ([firstText,secondText])=>{
    console.log("Su contenido del segundo",secondText)
    console.log("Su contenido del primero: ",firstText)

  }
)


  //  console.log("Leyendo el primer archivo")
       
  //  console.log("Hacer cosas mientras lee el archivo")
   
   
  //  console.log("Leyendo el segundo archivo")


