import http from "node:http"

import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

/*
  Stateful => Sempre tem informação guardada em memória (Depende das informações
    que são salvas em memória para que ela funcione. Ao perder esses dados em
    memória ela pode funcionar diferente.)

  Stateless => Não salva nada em memória. Salva informações em dispositivos
    externos como banco de dados, arquivos de texto etc. Ao fechar o sistema e
    abrir ela funcionará igual.

  Headers (request/response) => Metadados. Informações adicionais que não tem a
  ver com o dado retornado do back-end para o front-ent, mas sim de como que
  aquele dado pode ser interpretado pelo front-end.
*/

// APP STATEFUL


const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)
  
  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  console.log(route)

  if (route) {
    return route.handler(request, response)
  }

  return response.writeHead(404).end()
})

server.listen(3333)
