interface AstNode {
  type: string;
  children: [];
  value?: number;
  maxChildren: number;
}

class Parser {
  readonly priority = {
    ROOT: 0,
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    NUMBER: 3,
  };

  stack;
  static priority: any;
  constructor() {
    this.stack = [Parser.RootNode()];
  }

  static RootNode(): AstNode {
    return {
      type: "ROOT",
      children: [],
      maxChildren: 0,
    };
  }

  static isFullNode(node): boolean {
    if (this.isNoChildNode(node)) {
      return false;
    }
    return node && node.children && node.children.length >= node.maxChildren;
  }

  static isNotFullNode(node): boolean {
    if (this.isNoChildNode(node)) {
      return false;
    }
    return node && node.children && node.children.length < node.maxChildren;
  }

  static isNoChildNode(node): boolean {
    return node.maxChildren === 0;
  }

  static NumberNode(value?: number) {
    return {
      type: "NUMBER",
      children: [],
      value,
      maxChildren: 0,
    };
  }

  static AddNode() {
    return {
      type: "+",
      children: [...arguments],
      maxChildren: 2, // 能有两个 child
    };
  }
  static SubNode() {
    return {
      type: "-",
      children: [...arguments],
      maxChildren: 2, // 能有两个 child
    };
  }
  static MulNode() {
    return {
      type: "*",
      children: [...arguments],
      maxChildren: 2, // 能有两个 child
    };
  }
  static DivNode() {
    return {
      type: "/",
      children: [...arguments],
      maxChildren: 2, // 能有两个 child
    };
  }

  start(token) {
    const top = this.stack[this.stack.length - 1]; // 栈顶
    if (token.type === "NUMBER") {
      //  1 1
      //  1 + 1 1
      if (Parser.isFullNode(top)) throw new Error("数字前一项不能是满项");
      const number = Parser.NumberNode(token.value);
      if (Parser.isNotFullNode(top)) {
        return Parser.topChildPush(number);
      } else {
        return stackPush(number);
      }
    } else if (token.type === "") {
      // 后置符号
      if (Parser.isFullNode(top)) {
        if (Parser.priority[token.type] > Parser.priority[top.type]) {
          // 1 + 2 *
          return this.rob(token.value, top.children);
        } else {
          //  1 +
          //  1 + 2 +
          link(token.value);
          return retire(token.value);
        }
      }
    }
  }

  createTypeNode(type) {
    switch (type) {
      case "+":
        return Parser.AddNode();
      case "-":
        return Parser.SubNode();
      case "*":
        return Parser.MulNode();
      case "/":
        return Parser.DivNode();
      case "NUMBER":
        return Parser.NumberNode();
    }
  }

  retire(type) {
    const number = this.stack.pop();
    this.stack.push(this.createTypeNode(type)?.children.push(number));
  }

  rob() {}

  link() {}
}
