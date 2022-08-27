import dotenv from "dotenv";
dotenv.config();
// task https://zenn.dev/hayatoomori/articles/04e4dd3b87db82
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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

task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default config;
