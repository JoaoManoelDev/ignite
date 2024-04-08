import http from "node:http"

const server = http.createServer((request, response) => {
  const { method, url } = request
  
  console.log("METHOD", method)
  console.log("URL", url)


  if (method === "GET" && url === "/users") {
    return response.end("List of users")
  }

  if (method === "POST" && url === "/users") {
    return response.end("Creating users")
  }

  return response.end("Hello World")
})

server.listen(3333)
