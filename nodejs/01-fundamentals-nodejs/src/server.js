import http from "node:http"

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
const users = []

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    request.body = null
  }
  
  if (method === "GET" && url === "/users") {
    return response
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body

    users.push({
      id: 1,
      name,
      email
    })

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(3333)
