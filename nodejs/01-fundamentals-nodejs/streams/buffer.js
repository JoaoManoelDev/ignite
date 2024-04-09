/*
  Buffer => É uma representação de um espaço na memória no computador, usado
  especificamente para transitar dados de uma maneira muito rápida, ou seja, os
  dados armazenados no buffer são armazenados para logo serem tratados/enviados
  para outro lugar e logo removidos. São maneiras de salvar e ler da memória de
  uma maneira muito performática. O node utiliza esse modelo de buffer na
  leitura e na escrita de streams porque é mais performático ler parcialmente
  uma informação de forma binária (como o buffer guarda) ao invés de um
  text/string.
*/

const buf = Buffer.from("hello")

console.log(buf) // <Buffer 68 65 6c 6c 6f> -> Hexadecimal

console.log(buf.toJSON()) // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }
