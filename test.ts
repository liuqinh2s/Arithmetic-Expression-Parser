import { lexer } from "./lexer";

const input = `1 + 2.3`;

for (let c of input.split("")) {
  lexer.push(c);
}

console.log(lexer.tokens);
