const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SIGN = ["+", "-", "*", "/"];
export const EOF = Symbol("EOF");

type tokenType = "NUMBER" | "SIGN" | "EOF";
type inputType = string | typeof EOF;

interface Token {
  type: tokenType;
  value: string;
}

class Lexer {
  private token: string[]; // 每个token生成所需要的缓存池
  private _tokens: Token[]; // token列表
  private state: Function; // 状态

  get tokens(): Token[] {
    return this._tokens;
  }

  set tokens(value: Token[]) {
    this._tokens = value;
  }

  constructor() {
    this.token = [];
    this.tokens = [];
    this.state = this.start;
  }

  start(char: inputType) {
    // EOF
    if (char === EOF) {
      return;
    }
    // 数字
    if (NUMBERS.includes(char)) {
      this.token.push(char);
      return this.inInt;
    }
    // .
    if (char === ".") {
      this.token.push(char);
      return this.inFloat;
    }
    // 符号
    if (SIGN.includes(char)) {
      this.emitToken("SIGN", char);
      return this.start;
    }
  }

  inInt(char: string) {
    // 数字
    if (NUMBERS.includes(char)) {
      this.token.push(char);
      return this.inInt;
    }
    // .
    if (char === ".") {
      this.token.push(char);
      return this.inFloat;
    }
    this.emitToken("NUMBER", this.token.join(""));
    this.token = [];
    // 因为没有用token收下这个字符，所以需要回到start继续处理这个字符
    return this.start(char);
  }

  inFloat(char: string) {
    // 不支持以点开头的写法
    if (this.token.length == 1 && this.token[0] == ".") {
      throw new Error("不支持以点开头的写法");
    }
    // 数字
    if (NUMBERS.includes(char)) {
      this.token.push(char);
      return this.inFloat;
    }
    // .
    if (char === ".") {
      throw new Error("浮点数只能有一个点");
    }
    this.emitToken("NUMBER", this.token.join(""));
    this.token = [];
    // 因为没有用token收下这个字符，所以需要回到start继续处理这个字符
    return this.start(char);
  }

  emitToken(type: tokenType, value: string) {
    this.tokens.push({ type, value });
  }

  push(char: inputType) {
    this.state = this.state(char);
  }
}

export const lexer = new Lexer();
