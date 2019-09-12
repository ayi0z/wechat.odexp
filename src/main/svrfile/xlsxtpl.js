import fs from 'fs'
import xlsx from 'node-xlsx'
// import { app } from 'electron'
// import path from 'path'

const create = (data, tplpath, filepath) => {
  return new Promise((resolve, reject) => {
    if (!data) reject(new Error('no data need to write'))
    if (!tplpath || !fs.existsSync(tplpath)) reject(new Error('no template'))

    let tplsheet = xlsx.parse(tplpath)
    console.log(tplsheet)
    resolve(JSON.stringify(tplsheet))

    // let buffer = xlsx.build(data)

    // let dir = filepath && path.dirname(filepath)
    // if (!dir || dir === '.') {
    //   dir = app.getPath('downloads')
    // } else {
    //   if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, { recursive: true })
    //   }
    // }

    // let filename = filepath && path.basename(filepath)
    // if (!filename) filename = `odexp_${Date.parse(new Date())}.xlsx`

    // const fp = path.join(dir, filename)
    // writefile(buffer, fp).then(res => resolve(res)).catch(err => reject(err))
  })
}

// const writefile = (buffer, filepath) => {
//   return new Promise((resolve, reject) => {
//     if (!buffer) reject(new Error('no data need to write'))
//     if (!fs.existsSync(path.dirname(filepath))) reject(new Error('invalid file path'))

//     fs.writeFile(filepath, buffer, (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(filepath)
//       }
//     })
//   })
// }

export default { create }
