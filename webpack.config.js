import * as path from "path";

const __dirname = path.resolve();

const config = {
  mode: "production",
  optimization: {
    minimize: false,
  },
  entry: "./src/test.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "test.bundle.js",
  },
  // 指定webpack打包时使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: "ts-loader",
        // 要排除的文件
        exclude: /^node_modules|dist$/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};

export default config;
