import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv"; // 環境構築時にこのパッケージはインストールしてあります。

// .envファイルから環境変数をロードします。
dotenv.config();

if (process.env.TEST_ACCOUNT_PRIVATE_KEY === undefined) {
  console.log("private key is missing");
}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts:
        process.env.TEST_ACCOUNT_PRIVATE_KEY !== undefined
          ? [process.env.TEST_ACCOUNT_PRIVATE_KEY]
          : [],
    },
    local: {
      url: "http://127.0.0.1:9650/ext/bc/Dt1JxLbGtGVa9HpfoWXGrDLozmjK8wZtu9WbFzYN6mxUw2Fe2/rpc",
      gasPrice: 225000000000,
      chainId: 321123,
      accounts:
        process.env.TEST_ACCOUNT_PRIVATE_KEY !== undefined
          ? [process.env.TEST_ACCOUNT_PRIVATE_KEY]
          : [],
    },
  },
};

export default config;
