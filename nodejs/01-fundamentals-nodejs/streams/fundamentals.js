/*
  No node toda porta de entrada e saída é automaticamente uma stream. Um exemplo
  de porta de entrada e saída são os request/response com server http

  stdin  => Tudo o que o usuário digita no terminal
  stdout => O retorno do app no terminal

  process.stdin // Recebe uma stream
    .pipe(process.stdout) // Encaminha a stream

  chunk => Pedaço de dado. Nunca pode ser um formato primitivo, deve ser um
    buffer
*/

// Construindo streams do zero
import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i)) //converte o "i" para um buffer
  
        this.push(buf)
      }
    }, 1000)
  }
}


new OneToHundredStream().pipe(process.stdout)