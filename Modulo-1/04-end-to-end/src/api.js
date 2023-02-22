const http = require('http')

const DEFAULT_USER = {username: 'Cassio', password: '123456'}

const routes ={
  '/contact:get': async (req, res) => {
    res.write('contact us page')
    return res.end()
  },

  '/login:post': async(request, response) => {
    // response é um iterator! POR ISSO É NECESSARIO UTILIZAR A FORMA ABAIXO, O DATA REPRESENTA O RESULTADO FINAL DESSE ITERATOR E NÃO UM OBJETO DENTRO DE REQUEST
    for await (const data of request) {
      const user = JSON.parse(data)
        if(
            user.username !== DEFAULT_USER.username ||
            user.password !== DEFAULT_USER.password
        ) {
          response.writeHead(401)
          response.write("Logging failed!")   
          return response.end()
        }

        response.write("Logging has succeeded!")
        return response.end()
    }
},

  default: async (req, res) => {
    res.write('Hello World!')
    return res.end()
  }
}

const handler = (req, res) => {
  const {url, method} = req
  const routeKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  return chosen(req, res)
}

// utilizei o "curl -i localhost:3000" para bater nessa rota via cmd
const app = http.createServer(handler)
                                      .listen(3000, () => console.log('app running at', 3000))

module.exports = app