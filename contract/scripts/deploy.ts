import { ethers } from "hardhat";

async function deploy() {
  const [deployer] = await ethers.getSigners();

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  console.log("counter address:", counter.address);
  console.log("deployer address:", deployer.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
