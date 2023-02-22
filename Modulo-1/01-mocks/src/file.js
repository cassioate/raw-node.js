// import { readFile } from 'fs/promises'
// import { join } from 'path'

const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age" ]
}

class File {
  static async csvTojson(filePath) {
    const content = await this.getFileContent(filePath)
    const validation = await this.isValid(content)
    if(!validation.valid) throw new Error(validation.error)
    return this.parseCSVToJSON(content)
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8")
  }
  
  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\r\n')
    // Criou uma string igual id,name,profession,age para ser comparada com o header
    const isHeaderValid = header === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLengthAccepted = (
      fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines
    )

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    
    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\r\n')

    const firstLine = lines.shift()
    const header = firstLine.split(',')
    const users = lines.map((line) => {
      const columns = line.split(',')
      let user = {}
      columns.forEach((item, index) => {
        if (parseInt(item)){
          user[header[index]] = parseInt(item)
        } else {
          user[header[index]] = item
        }

      })
      return user
    })

    return users
  }

}

module.exports = File