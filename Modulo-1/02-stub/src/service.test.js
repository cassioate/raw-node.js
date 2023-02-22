const Service = require('./service')
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";
const BASE_URL_3 = "https://swapi.dev/api/planets/3/";

// Os mocks foram obtidos através do comando "node service.test.js > mocks/alderaan.json" que permitiu copiar o arquivo que apareceu no console.log diretamente para a pasta mocks.
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
};

(async () => {
  // Os mocks foram obtidos através do comando "node service.test.js > mocks/alderaan.json" que permitiu copiar o arquivo que apareceu no console.log diretamente para a pasta mocks.
  // {
  //   // Essa é a forma que chama pra internet direto
  //   const service = new Service()
  //   const withoutStub = await service.makeRequest(BASE_URL_2)
  //   console.log(JSON.stringify(withoutStub))
  // }

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  {
    // Essa é a forma que chama pra internet direto
    const response = await service.makeRequest(BASE_URL_1)
    deepStrictEqual(response, mocks.tatooine)
  }

  {
    // Essa é a forma que chama pra internet direto
    const response = await service.makeRequest(BASE_URL_3)
    deepStrictEqual(response, mocks.alderaan)
  }
})()