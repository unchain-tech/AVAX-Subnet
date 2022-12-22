import { ethers } from "hardhat";
import { Overrides } from "ethers";

async function deploy() {
  const [deployer] = await ethers.getSigners();

  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy({
    value: 10000,
  } as Overrides);
  await bank.deployed();

  console.log("bank address:", bank.address);
  console.log("deployer address:", deployer.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
