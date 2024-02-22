const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(pc.red(`No se pudo leer el directorio: ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // stat= info del directorio
    } catch {
      console.err(`No se pudo leer el directorio: ${folder}`)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${pc.green(fileType)} ${pc.yellow(file.padEnd(30))}  ${pc.blue(fileSize.toString().padStart(10))} ${pc.bgYellow(fileModified)}`
  })

  const fileInfo = await Promise.all(filesPromises)
  fileInfo.forEach(info => {
    console.log(info)
  })
}

ls(folder)
