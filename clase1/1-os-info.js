const os = require('node:os')

console.log('Nombre de OS: ', os.platform())
console.log('Version del SO: ', os.release())
console.log('Arquitectyra: ', os.arch())
console.log('CPUs: ', os.cpus())
console.log('Memoria libre: ', os.freemem() / 1024 / 1024)
console.log('Memoria total: ', os.totalmem() / 1024 / 1024)
console.log('uptine: ', os.uptime() / 60 / 60)
