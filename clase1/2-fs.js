const fs = require("node:fs")

const stats =  fs.statSync("./archivo.txt")
console.log("Es archivo",stats.isFile())
console.log("Es directorio",stats.isDirectory())
console.log("Es enlace simbolico",stats.isSymbolicLink())
console.log("Su tamaño",stats.size, " bites")