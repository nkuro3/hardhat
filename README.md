# hardhat guide
公式ドキュメントをやった備忘録
[Hardhat official guide](https://hardhat.org/hardhat-runner/docs/guides/project-setup)

### Guides
#### Setting up a project
typescriptでprojectを作成
```
npm init -y

npm install --save-dev hardhat

npx hardhat
> Create a TypeScript project
```
#### Compiling your contracts
コントラクトをコンパイルする
```
npx hardhat compile
```
#### Testing contracts
テスト
コントラクトはデプロイすると修正不可のためしっかり行う。
以下のコマンドでtestディレクトリ配下の実行する。
```
npx hardhat test
```
defaultのテストコードのわからなかったところ
- [ethers.getSigners](https://note.com/standenglish/n/n630a99326be8)
- [getter](https://docs.soliditylang.org/en/v0.8.13/contracts.html#getter-functions)
- [loadfixture](https://hardhat.org/hardhat-network-helpers/docs/reference#loadfixture())
- [time.increaseTo](https://hardhat.org/hardhat-network-helpers/docs/reference#increaseto(timestamp))
- [time.latest](https://hardhat.org/hardhat-network-helpers/docs/reference#latest())

#### Deploying your contracts
ローカルネットワーク（hardhat network）にデプロイする
```
hardhat networkを起動する。
npx hardhat node

別ターミナルで実行
npx hardhat run --network localhost scripts/deploy.ts
```
#### Verifying your contracts
テストネットにデプロイする。
EtherscanのApiKey、AlchemyのApiKey、MetamaskのPrivateKeyを取得する。
これらを.envファイルに設定する。
```
npm install dotenv --save
```
`process.env.`を利用するには以下のようにimportする。

```ts
hardhat.config.ts

import dotenv from "dotenv";
dotenv.config();
...
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  etherscan: {
    apiKey: process.env.ETHERSCAN_MY_FIRST_API_KEY,
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_HARDHAT_API_KEY}`,
      accounts: [`${process.env.METAMASK_GOERLI_PRIVATE_KEY}`],
    },
  },
};
```
goerliデプロイ
```
npx hardhat run scripts/deploy.ts --network goerli
```
コントラクトが正常にデプロイされているか確認する。
Lockコントラクトのアドレスと引数unlockTimeを渡す。
```
npx hardhat verify --network goerli <address> <unlock time>
```
#### Writing tasks and scripts
```
npx hardhat compile
npx hardhat node
npx hardhat run
npx hardhat verify
```
これらは`task`と呼ばれ、デフォルトで用意されているコマンドである。
taskはhardhat.config.tsにカスタムで作成することができる。

```ts
hardhat.config.ts

// task はデフォルトでは宣言されていないので、hardhat/configに追加する。
import { HardhatUserConfig, task } from "hardhat/config";
...

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
```
カスタムTaskの作成の詳細については[こちら](https://hardhat.org/hardhat-runner/docs/advanced/create-task#creating-a-task)を参照

### Advanced
#### Running tests in VS Code
vscodeでmochaをgui的に実行できる。
[拡張機能](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter)をインストール。
`.mocharc.json`を用意
```json
{
  "require": "hardhat/register",
  "timeout": 40000,
  "_": ["test/*.ts"]
}
```
