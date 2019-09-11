import fs from 'fs'
import { app } from 'electron'
import path from 'path'

const create = (data, filepath) => {
  return new Promise((resolve, reject) => {
    if (!data) reject(new Error('no data need to write'))

    let dir = filepath && path.dirname(filepath)
    if (!dir || dir === '.') {
      dir = app.getPath('downloads')
    } else {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    }

    let filename = filepath && path.basename(filepath)
    if (!filename) filename = `odexp_${Date.parse(new Date())}.txt`

    const fp = path.join(dir, filename)
    writefile(data, fp).then(res => resolve(res)).catch(err => reject(err))
  })
}

const writefile = (data, filepath) => {
  return new Promise((resolve, reject) => {
    if (!data) reject(new Error('no data need to write'))
    if (!fs.existsSync(path.dirname(filepath))) reject(new Error('invalid file path'))

    fs.writeFile(filepath, data, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(filepath)
      }
    })
  })
}

const txt = {
  create
}

export default txt
