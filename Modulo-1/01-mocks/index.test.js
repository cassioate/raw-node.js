const { rejects, deepStrictEqual } = require('assert')
const File = require('./src/file')
const { error } = require('./src/constants');
const { json } = require('stream/consumers');

(async () => {
  // Caso de teste 1
  {
    const filePath = './mocks/invalid-header.csv'
    const result = File.csvTojson(filePath)
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    await rejects(result, rejection)
    console.log('TEST PASSED')
  }
  // Caso de teste 2
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvTojson(filePath)
    await rejects(result, rejection)
    console.log('TEST PASSED')
  }
  // Caso de teste 3
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvTojson(filePath)
    const expectedJSON = [
      {
        "id": 123,
        "name": "Cassio Tessaro",
        "profession": "Javascript Insstructor",
        "age": 28
      },
      {
        "id": 321,
        "name": "Xuxão Melo",
        "profession": "Javascript specialista",
        "age": 80
      },
      {
        "id": 231,
        "name": "Carlinho",
        "profession": "Golang Developer",
        "age": 20
      }
    ]

    deepStrictEqual(JSON.stringify(expectedJSON), JSON.stringify(result))
    console.log('TEST PASSED')
  }

  // const filePath2 = './mocks/invalid-header.csv'
  // const filePath3 = './mocks/emptyFile-invalid.csv'

  // const rejection2 = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
  // const rejection3 = new Error(error.FILE_LENGTH_ERROR_MESSAGE)

  // const result2 = File.csvTojson(filePath2)
  // const result3 = File.csvTojson(filePath3)

  // await rejects(result2, rejection2)
  // await rejects(result3, rejection3)
})()
