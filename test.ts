import { EOF, lexer } from "./lexer";

const input = `1 + 2.3`;

for (let c of input.split("")) {
  lexer.push(c);
}
lexer.push(EOF);

console.log(lexer.tokens);
