/*
  No node toda porta de entrada e saída é automaticamente uma stream. Um exemplo
  de porta de entrada e saída são os request/response com server http

  stdin  => Tudo o que o usuário digita no terminal
  stdout => O retorno do app no terminal

  process.stdin // Recebe uma stream
    .pipe(process.stdout) // Encaminha a stream

  chunk => Pedaço de dado. Nunca pode ser um formato primitivo, deve ser um
    buffer

  buffer => Modelo que o node usa para transicionar dados entre streams

  _read() => O método _read() é um método especial específico já implementado
    para a classe Readable do módulo stream do Node e é usado para fornecer a
    implementação de leitura de dados da fonte. Ao herdar da classe Readable e
    substituir o método _read(), você está fornecendo sua própria implementação
    personalizada para a leitura de dados da stream. O método _read() é chamado
    automaticamente pela implementação interna da classe Readable sempre que
    houver uma demanda por mais dados na stream.
*/

// Construindo streams do zero
import { Readable, Writable, Transform } from "node:stream"

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

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  // (pedaço, como está codificado, função chamada quando termina)
  _write(chunk, encoding, callback) { 
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())