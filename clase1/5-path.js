const path = require("node:path")

//barra separadora en el SO
console.log(path.sep)

//unir rutas con el join
const filePath = path.join("content", "subfolder", "test.txt")
console.log(filePath)


const base = path.basename(filePath)
console.log(base)

//sin la extension
const fileName = path.basename(filePath, ".txt")
console.log(fileName)

//solo la extension
const extension = path.extname("image.img")
console.log(extension)